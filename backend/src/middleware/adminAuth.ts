import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from './auth';
import { ENV } from '../config/env';
import { User } from '../models/User';

export const requireAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // 1. Check master admin API key
  const adminSecretHeader = req.headers['x-admin-key'];
  if (adminSecretHeader && adminSecretHeader === ENV.ADMIN_SECRET_KEY) {
    return next();
  }

  // 2. Check Bearer token with admin role
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, ENV.JWT_SECRET) as { id: string };
      const user = await User.findById(decoded.id);
      if (user && user.role === 'admin') {
        req.user = user;
        return next();
      }
    } catch {
      // Continue to forbidden response
    }
  }

  res.status(403).json({ message: 'Forbidden: Administrator privileges required.' });
};
