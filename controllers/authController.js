import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../modals/User.js";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, phoneNumber, email, password } = req.body;

    // Check if any required field is missing
    if (!name || !phoneNumber || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user (you should hash password before saving for security)
    const user = new User({ name, phoneNumber, email, password });
    await user.save();

    // Respond with success message
    res.status(201).json({ user, message: "User registered successfully" });
  } catch (error) {
    // Handle server error
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
//user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user with given email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email not found" });
    }

    // Compare entered password with saved hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token for authentication
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1d",
    });

    // Send token in response
    res.json({ token });
  } catch (error) {
    // Handle server error
    res.status(500).json({ message: "Server error" });
  }
};
