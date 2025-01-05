import { connectDB } from "@/src/utils/db";
import User from "@/src/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        // allows the user to log in using custom credentials
        CredentialsProvider({
            name: "Credentials",
            credentials: {},

            // authorize method validates the user's credentials
            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    await connectDB();
                    const user = await User.findOne({ email });

                    if (user) {
                        const isPasswordValid = await bcrypt.compare(password, user.password);
                        if (isPasswordValid) {
                            return user;
                        }
                    }
                } catch (error) {
                    throw new Error(error);
                }
            },
        }),
    ],
    // Configures how long until an idle session expires and is now invalid
    session: {
        maxAge: 3600,
        // refresh the session when its not idle every 5 minutes
        updateAge: 300,
    },
    // The secret is used to sign and encrypt the JWT tokens which makes it more secure
    secret: process.env.NEXTAUTH_SECRET,
};

// Initialize the NextAuth handler with the configarion options
const handler = NextAuth(authOptions);

// GET handles checking the authentication status
// POST handles the login process
export { handler as GET, handler as POST };