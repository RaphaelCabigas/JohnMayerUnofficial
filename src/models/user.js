import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    // user's name as string and required
    name: {
        type: String,
        required: true,
    },
    // user's email as string and required and unique
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // user's password as string  
    // NOT required if is not authenticated by Open Authentication Providers 
    // Required for original authentication through registration
    password: {
        type: String,
        required: function () {
            // Only required if user is not logging in through the oauth provider
            // to allow oauthProviders to be included in the database
            return !this.oauthProviders;
        },
    },
    oauthProviders: {
        // Array of OAuth providers as strings
        type: [String],
        // and only allow these two oauth providers Google, Github
        enum: ["google", "github"],
        // set a default of empty
        default: null,
    }
},
    // timestamps for when the user created an account
    { timestamps: true })

// Create a model for the Users collection which either creates a new collection or gets the existing collection
const User = models.Users || model("Users", userSchema);

export default User;