import mongoose from "mongoose";

export const connectDB = async () => {
    // Checks if database is already connected
    if (mongoose.connection.readyState >= 1) {
        console.log("Already connected to MongoDB");
        return;
    }
    // Connect to MongoDB database and connect to the server
    try {
        // Get the database connection
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB ${connection.connection.host}`);
    } catch (error) {
        throw new Error(`Error connecting to MongoDB`);
    }
}