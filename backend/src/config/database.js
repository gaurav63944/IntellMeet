import mongoose from 'mongoose';
import env from './env.js';

mongoose.set('strictQuery', true);

/**
 * Connects to MongoDB via Mongoose.
 * Fails loudly (throws) if the connection cannot be established so the
 * caller can decide how to handle startup failure — the app should not
 * silently run without a database.
 */
export async function connectDatabase() {
  try {
    await mongoose.connect(env.mongodbUri);
    console.log(`[database] Connected to MongoDB at ${env.mongodbUri}`);
  } catch (error) {
    console.error('[database] Failed to connect to MongoDB:', error.message);
    throw error;
  }

  mongoose.connection.on('error', (error) => {
    console.error('[database] MongoDB connection error:', error.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('[database] MongoDB disconnected');
  });
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
}

export default mongoose;
