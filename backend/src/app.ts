import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import authRoutes from './routes/authRoutes';
import courseRoutes from './routes/courseRoutes';
import lessonRoutes from './routes/lessonRoutes';
import practiceRoutes from './routes/practiceRoutes';
import leaderboardRoutes from './routes/leaderboardRoutes';
import achievementRoutes from './routes/achievementRoutes';
import adminRoutes from './routes/adminRoutes';
import { errorHandler } from './middleware/errorHandler';

export const createApp = (): express.Application => {
  const app = express();

  // Basic security and parsing middlewares
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(cors({ origin: '*' }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  // Static directory for audio files and uploaded assets
  app.use('/assets', express.static(path.join(__dirname, '../public/assets')));
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      app: 'LingoPulse API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    });
  });

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/courses', courseRoutes);
  app.use('/api/lessons', lessonRoutes);
  app.use('/api/practice', practiceRoutes);
  app.use('/api/leaderboard', leaderboardRoutes);
  app.use('/api/achievements', achievementRoutes);
  app.use('/api/admin', adminRoutes);

  // Global Error Handler
  app.use(errorHandler);

  return app;
};
