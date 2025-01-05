import { connectDB } from "@/src/utils/db";
import User from "@/src/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        // connect to the database
        await connectDB();
        // Request json data of user details
        const { name, email, password } = await request.json();

        // Check the user model for any existing users
        const userExists = await User.findOne({ email }).select("_id");
        if (userExists) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Encrypts the user's password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Otherwise return the user details and save it in the database
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        // Alert the user account created successfully
        return NextResponse.json({ message: "User registered." }, { status: 201 });
    } catch (error) {
        // If there was an error in creating the account then alert the user server error
        return NextResponse.json({ message: "An error occurred while registering the user." }, { status: 500 });
    }
}