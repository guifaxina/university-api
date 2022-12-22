import mongoose from "mongoose";

export default async function mongodbConnection () {
    try {
        await mongoose.connect("mongodb://mongodb:27017/universities");
        console.log();
    } catch (err) {
        console.error(err);
    }
}