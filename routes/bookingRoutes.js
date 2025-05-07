import express from "express";
import Booking from "../modals/Booking.js"; // ✅ Ensure 'modals' is actually 'models'
import Activity from "../modals/Activity.js";
import authMiddleware from "../middlewares/auth.js"; // Auth middleware to protect routes

const router = express.Router();

// Route to book an activity (only for logged-in users)
router.post("/book", authMiddleware, async (req, res) => {
  const { activityId, _id } = req.body;

  try {
    // Check if the activity exists
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    // Create a new booking entry
    const booking = new Booking({
      userId: _id, // Consider using req.userId from the token instead of trusting the body
      activityId,
    });

    // Save the booking to the database
    await booking.save();

    // Respond with success
    res.status(201).json({ message: "Activity booked successfully" });
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: "Booking failed" });
  }
});

// Route to get current user's bookings
router.get("/my-bookings", authMiddleware, async (req, res) => {
  try {
    // Find all bookings for the logged-in user and include activity details
    const bookings = await Booking.find({ userId: req.userId }).populate("activityId");

    // Format the response data
    const response = bookings.map((booking) => ({
      id: booking._id,
      activity: booking.activityId?.title || "N/A",
      description: booking.activityId?.description || "",
      location: booking.activityId?.location || "",
      dateTime: booking.activityId?.dateTime || "",
      bookedAt: booking.bookedAt,
    }));

    // Send the response
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get bookings" });
  }
});

export default router;
