import { connectDB } from "@/src/utils/db";
import User from "@/src/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// User registration/creation
export async function POST(request) {
    try {
        await connectDB();
        // Get the user data from the request body
        const { name, email, password, oauthProviders } = await request.json();

        // Check if the user already exists with the same email
        const userExists = await User.findOne({ email });
        if (userExists) {
            // If user exists, return an error response
            return NextResponse.json({ message: "Email is already in use." }, { status: 401 });
        }

        // Hash the user's password 10 times 
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user and save it in the database
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            oauthProviders,
        });
        await newUser.save();

        // Return a success message with user name and email
        return NextResponse.json({
            message: "User registered successfully.", user: {
                name: newUser.name,
                email: newUser.email,
            }
        }, { status: 201 });
    } catch (error) {
        // return an error message
        console.error("Error during registration");
        return NextResponse.json({ message: "An error occurred while registering the user." }, { status: 500 });
    }
}