import mongoose from "mongoose";
import { serverConfig } from "..";

export async function connectDB(){
    try {
        const mongoUrl=serverConfig.MONGO_DB_URL
        await mongoose.connect(mongoUrl)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDb",error)
        throw error
    }
}