import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;
import { MONGODB_URI } from "./config";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

// Use a global variable to cache the connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Function to connect to the MongoDB database
export async function connectDB() {
  try {
    // If connection is already established, return it
    if (cached.conn) {
      return cached.conn;
    }

    // If connection promise is already in progress, wait for it to resolve
    if (!cached.promise) {
      const opts = {
        bufferCommands: false, // Disable buffering of commands
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

      // Connect to MongoDB using Mongoose
      cached.promise = mongoose.connect(MONGODB_URI, opts);

      // Event listener for successful connection
      mongoose.connection.once("connected", () => {
        console.log("MongoDB connected successfully");
        // You can perform additional initialization here if needed
      });

      // Event listener for connection error
      mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
        // Exit the process on critical error
        process.exit(1);
      });
    }

    // Wait for the connection promise to resolve and cache the connection
    cached.conn = await cached.promise;

    return cached.conn;

  } catch (error) {

    console.error("MongoDB connection error:", error.message);

    throw new Error("Failed to connect to MongoDB");
  }
}
