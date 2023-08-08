import mongoose from "mongoose";
mongoose.set("autoIndex", false);

type NullOrMongoose = typeof mongoose | null;
interface CacheConnection {
  client: NullOrMongoose;
}
const MONGO_URI =
  process.env.NODE_ENV === "development"
    ? process.env.MONGODB_URI_DEV
    : process.env.MONGODB_URI;
console.log(MONGO_URI, " mongo uri ");
if (!MONGO_URI) {
  throw new Error(
    "Please define the Mongo uri environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface ICacheConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}
declare global {
  var mongooseCache: ICacheConnection;
}

let cacheConnection: ICacheConnection = global.mongooseCache;

if (!cacheConnection) {
  cacheConnection = global.mongooseCache = { conn: null, promise: null };
}

export const dbConnect = async () => {
  return await mongoose
    .connect(MONGO_URI, {
      bufferCommands: false,
    })
    .then((mongoose) => mongoose);
};

export const connectToDatabase = async () => {
  if (cacheConnection.conn) return cacheConnection.conn;

  if (!cacheConnection.promise) {
    cacheConnection.promise = mongoose
      .connect(MONGO_URI, {
        bufferCommands: false,
      })
      .then((res) => res);
  }

  try {
    cacheConnection.conn = await cacheConnection.promise;
  } catch (e) {
    cacheConnection.promise = null;
    throw e;
  }

  return cacheConnection.conn;

  // return await mongoose
  //   .connect(MONGO_URI, {
  //     bufferCommands: false,
  //   })
  //   .then((res) => res);
};
