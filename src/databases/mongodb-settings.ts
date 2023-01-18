import mongoose from "mongoose";

export default async function mongodbConnection () {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(`${process.env.MONGO_CONNECTION_URI}`);
    console.log("MongoDB connection established.");
  } catch (err) {
    console.error(err);
  }
}