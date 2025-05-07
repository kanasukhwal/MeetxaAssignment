import express from "express";
import Activity from "../modals/Activity.js"; // ✅ Check if the folder name is "models", not "modals"

const router = express.Router();

// Route to create a new activity
router.post("/", async (req, res) => {
  const { title, description, location, dateTime } = req.body;

  // Check if all required fields are provided
  if (!title || !description || !location || !dateTime) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Create a new activity object
    const newActivity = new Activity({ title, description, location, dateTime });

    // Save the activity to the database
    await newActivity.save();

    // Send a success response
    res.status(201).json({ message: "Activity created successfully", activity: newActivity });
  } catch (err) {
    // Handle errors during activity creation
    res.status(500).json({ error: "Failed to create activity" });
  }
});

// Route to get all activities
router.get("/", async (req, res) => {
  try {
    // Fetch all activities from the database
    const activities = await Activity.find();

    // Send the list of activities
    res.json(activities);
  } catch (err) {
    // Handle errors during fetch
    res.status(500).json({ error: "Failed to fetch activities" });
  }
});

export default router;