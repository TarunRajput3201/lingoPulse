import { createApp } from './app';
import { connectDB } from './config/db';
import { ENV } from './config/env';

import { Course } from './models/Course';
import { seedDatabase } from './seed/seedCourses';

const startServer = async () => {
  const app = createApp();
  const PORT = parseInt(ENV.PORT, 10) || 5000;

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 [LingoPulse Server] Running in ${ENV.NODE_ENV} mode on port ${PORT}`);
  });

  // Connect to DB asynchronously and auto-seed if first launch
  connectDB().then(async () => {
    try {
      const count = await Course.countDocuments();
      if (count === 0) {
        console.log('[Auto-Seed] Initializing curriculum in empty database...');
        await seedDatabase({ preserveUsers: true });
        console.log('[Auto-Seed] Initial curriculum ready!');
      }
    } catch (err) {
      console.warn('[Auto-Seed] Note during seed check:', err);
    }
  }).catch((err) => {
    console.warn('[Database] Connection notice:', err);
  });
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}
