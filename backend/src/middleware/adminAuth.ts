import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';
import { ENV } from '../config/env';

export const requireAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Check master admin API key if supplied
  const adminSecretHeader = req.headers['x-admin-key'];
  if (adminSecretHeader && adminSecretHeader === ENV.ADMIN_SECRET_KEY) {
    return next();
  }

  // Check user role
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ message: 'Forbidden: Administrator privileges required.' });
    return;
  }

  next();
};
