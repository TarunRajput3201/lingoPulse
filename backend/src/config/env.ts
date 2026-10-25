import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const ENV = {
  PORT: process.env.PORT || '5000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/lingopulse',
  JWT_SECRET: process.env.JWT_SECRET || 'super_secret_lingopulse_jwt_key_2026',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '30d',
  ADMIN_SECRET_KEY: process.env.ADMIN_SECRET_KEY || 'admin_secret_lingo_master_key',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || '*',
};
