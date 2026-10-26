import mongoose from 'mongoose';
import { ENV } from './env';

export const connectDB = async (): Promise<void> => {
  if (!ENV.MONGO_URI) {
    console.warn('[Database Warning] MONGO_URI is not set. Please set it in your environment variables.');
    return;
  }

  try {
    const conn = await mongoose.connect(ENV.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.warn(`[Database Warning] Initial connection could not be established: ${error?.message || error}`);
    console.warn('[Database] Retrying connection in background...');
    setTimeout(() => {
      connectDB().catch(() => {});
    }, 5000);
  }
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect();
};
