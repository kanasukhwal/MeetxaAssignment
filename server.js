import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config"; // Loads environment variables from .env file

// Import route files
import activityRoutes from "./routes/activityRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/auth.js";

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for frontend running at localhost:5173
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Connect to MongoDB using URL from environment variables
mongoose.connect(process.env.MONGO_DB_URL, {
  autoIndex: true, // Automatically build indexes (useful during development)
});

// Set server port
const PORT = process.env.PORT || 4000;

// Test route to verify server is working
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Define API routes
app.use("/api/auth", authRoutes); // For /register and /login
app.use("/api/activities", activityRoutes); // For activity create and fetch
app.use("/api", bookingRoutes); // For /book and /my-bookings

// Start the server
app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});

// const port = process.env.PORT || 5000; // Default to 5000 for local, Vercel will provide PORT
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
