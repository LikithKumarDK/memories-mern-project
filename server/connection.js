import mongoose from "mongoose";
import dotenv from "dotenv";

// env 
dotenv.config();

const { CONNECTION_URL } = process.env;

const connectToDatabase = async () => {
    await mongoose.connect(CONNECTION_URL);
}

export { connectToDatabase };