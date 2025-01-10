import mongoose from "mongoose";

// Export MongoDB connection used throughout the application
export const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        // Checks if database is already connected
        // console.log("Already connected to MongoDB");
        return;
    }
    try {
        // Get the database connection
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB ${con.connection.host}`);
    } catch (error) {
        // Throws an error message
        throw new Error("Connection error to MongoDB");
    }
}