import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Next.js hot-reloading can cause multiple connections to open.
// This caches the database connection across hot reloads in development.
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // If we already have a connection, use it
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection exists, create a new one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // 👇 THIS IS THE MAGIC FIX 👇
      // Forces Mongoose to completely ignore the .env database name 
      // and strictly connect to 'garment-store'
      dbName: "garment-store", 
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;