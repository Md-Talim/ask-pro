import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  const mongoDbUrl = process.env.MONGODB_URL;
  mongoose.set("strictQuery", true);

  if (!mongoDbUrl) {
    return console.log("⚠️ MISSING MONGODB_URL!");
  }

  if (isConnected) {
    return console.log("✅ MongoDB is already connected!");
  }

  try {
    await mongoose.connect(mongoDbUrl, {
      dbName: "FrontFlow",
    });

    isConnected = true;
    console.log("✅ MongoDB is connected.");
  } catch (error) {
    console.error("❌ MongoDB connection failed!", error);
  }
};
