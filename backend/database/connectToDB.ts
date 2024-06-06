import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectionURL = process.env.DATABASECONNECTIONURL as string;

export const connectToDB = async () => {
    await mongoose.connect(connectionURL);
    console.log("Connected to database")
}