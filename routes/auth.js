import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js"; // Import auth functions

const router = express.Router();

// Route for registering a new user
router.post("/register", registerUser);

// Route for logging in a user
router.post("/login", loginUser);

export default router; // Export the router to use in main app
