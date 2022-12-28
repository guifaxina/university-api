import mongoose from "mongoose";

export default async function mongodbConnection () {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://localhost:27017/universities");
    console.log("MongoDB connection established.");
  } catch (err) {
    console.error(err);
  }
}