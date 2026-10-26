import { createApp } from './app';
import { connectDB } from './config/db';
import { ENV } from './config/env';

const startServer = async () => {
  const app = createApp();
  const PORT = parseInt(ENV.PORT, 10) || 5000;

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 [LingoPulse Server] Running in ${ENV.NODE_ENV} mode on port ${PORT}`);
  });

  // Connect to DB asynchronously so server is immediately healthy
  connectDB().catch((err) => {
    console.warn('[Database] Connection notice:', err);
  });
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}
