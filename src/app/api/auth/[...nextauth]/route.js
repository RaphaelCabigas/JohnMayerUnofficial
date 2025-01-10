import { connectDB } from "@/src/utils/db";
import User from "@/src/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

// Configuration for nextAuth
export const authOptions = {
    providers: [
        // Custom credential provider allows users to login by the account they registered
        CredentialsProvider({
            // name of the credential provider
            name: "Credentials",
            // credentials defines the fields user's need to fill out
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" }
            },

            // authorize method validates the user's credentials
            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    await connectDB();
                    // Find the user in the database
                    const user = await User.findOne({ email });
                    if (!user) {
                        // If there's no user registered
                        // return nothing which means authentication failed
                        console.error("Invalid Email.");
                        return null;
                    }
                    // compare the password against the user's encrypted password from the database
                    const isPasswordValid = await bcrypt.compare(password, user.password);
                    if (!isPasswordValid) {
                        // if password is incorrect then return nothing
                        console.error("Invalid Password.");
                        return null;
                    }
                    // If the email and password is correct then return the user data
                    return user;
                } catch (error) {
                    // show in console the error message from the thrown error of the connectDB
                    console.error("Server Error:", error.message);
                    throw new Error("MongoDB Connection Error");
                }
            },
        }),
        // Google OAuth configuration
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // Github OAuth configuration
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    // change the default signin page made by nextauth to my a custom login page
    pages: {
        signIn: "/login",
    },
    // The secret is used to sign and encrypt the JWT tokens which makes it more secure
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        // callback to handling the signin process after authentication
        async signIn({ user, account }) {
            // if provider is credentials set sign in is successful so that it allows the custome credentials to be provider to be used
            if (account.provider === "credentials") {
                return true;
            }
            // Handle Oauth login for google and github
            if (account.provider === "github" || account.provider === "google") {
                try {
                    await connectDB();
                    // Find the user in the database
                    const userExists = await User.findOne({ email: user.email });
                    // If user exists that uses the same email address for both oauth providers
                    if (userExists) {
                        // check if the oauth provider used doesn't exist for the user
                        if (!userExists.oauthProviders.includes(account.provider)) {
                            // add the oauth provider to the user
                            userExists.oauthProviders.push(account.provider);
                        }
                        // update the user's data in the database
                        await userExists.save();
                        // success
                        return true;
                    } else {
                        // If user doesn't exist, create the user
                        // save the oauthprovider's name and email and oauthprovider in the database 
                        const newUser = new User({
                            name: user.name,
                            email: user.email,
                            oauthProviders: [account.provider],
                        });
                        // add the user's data in the database
                        await newUser.save();
                        // success
                        return true;
                    }
                } catch (error) {
                    // login unsuccessful
                    console.error(`Error during ${account.provider} sign-in ${error}`);
                    return false;
                }
            }
        }
    },
};

// Initialize the NextAuth handler with the configarion options
const handler = NextAuth(authOptions);

// GET handles checking the authentication status
// POST handles the login process
export { handler as GET, handler as POST };