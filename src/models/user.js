import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
},
    // timestamps for when the user created an account
    { timestamps: true })

// Create a model for the Users collection which either creates a new collection or gets the existing collection
const User = models.Users || model("Users", userSchema);

export default User;