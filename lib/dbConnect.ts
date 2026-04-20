import mongoose from "mongoose"

const MONGODB_URI =
  process.env.MONGODB_URI!

if (!MONGODB_URI) {

  throw new Error(
    "Please define MONGODB_URI in .env.local"
  )

}



/* ⭐ GLOBAL TYPE */

interface MongooseCache {

  conn: typeof mongoose | null

  promise:
    Promise<typeof mongoose> | null

}



declare global {

  // eslint-disable-next-line no-var

  var mongooseCache:
    MongooseCache | undefined

}



/* ⭐ CACHE SETUP */

let cached: MongooseCache =
  global.mongooseCache ||
  {
    conn: null,
    promise: null
  }



/* ⭐ CONNECT FUNCTION */

async function dbConnect() {

  if (cached.conn) {

    return cached.conn

  }



  if (!cached.promise) {

    cached.promise =
      mongoose.connect(
        MONGODB_URI
      )
  }



  cached.conn =
    await cached.promise



  global.mongooseCache =
    cached



  return cached.conn

}



export default dbConnect