import { connectDB } from "@/src/utils/db";
import User from "@/src/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const emailValidation = /^[a-zA-Z0-9_-]{5,40}@jm\.unofficial$/;
const nameValidation = /^[a-zA-Z0-9_-]{5,40}$/;
const passwordValidation = /^[a-zA-Z0-9_-]{5,40}$/;

// User registration/creation
export async function POST(request) {
    try {
        await connectDB();
        // Get the user data from the request body
        const { name, email, password, oauthProviders } = await request.json();
        // Stores the error messages
        const errors = [];

        // Testing field validations through api calls through thunder client
        if (!email || !name || !password) {
            errors.push({ message: "All fields are required." });
        }
        if (!nameValidation.test(name)) {
            errors.push({ name_error: "Invalid name 5-40 chars (a-z, A-Z, 0-9, underscores, and hyphens)" });
        }
        if (!emailValidation.test(email)) {
            errors.push({ email_error: "Invalid email 5-40 chars (a-z, A-Z, 0-9, underscores, and hyphens) ending with @jm.unofficial." });
        }

        if (!passwordValidation.test(password)) {
            errors.push({ password_error: "Invalid password 5-40 chars (a-z, A-Z, 0-9, underscores, and hyphens)" });
        }
        // If there are any errors, return an error response with the errors array
        if (errors.length > 0) {
            return NextResponse.json({ errors }, { status: 400 });
        }

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