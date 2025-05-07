import mongoose from "mongoose";
import bcrypt from 'bcrypt'

// Define the structure for a User document
const userSchema = new mongoose.Schema({
    // User's full name
    name: {
        type: String,
        required: true
    },

    // User's phone number (must be unique)
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },

    // User's email address (must be unique)
    email: {
        type: String,
        required: true,
        unique: true
    },

    // User's password (will be hashed before saving)
    password: {
        type: String,
        required: true
    }
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been changed or is new
    if (this.isModified('password')) {
        // Hash the password with a salt round of 10
        this.password = await bcrypt.hash(this.password, 10);
    }
    next(); // Proceed to save the user
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the model to use in other parts of the app
export default User;
