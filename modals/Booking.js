import mongoose from "mongoose";

// Define the structure for a Booking document
const bookingSchema = new mongoose.Schema({
  // Reference to the user who made the booking
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // Reference to the activity that was booked
  activityId: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },

  // Date and time when the booking was made (defaults to current time)
  bookedAt: { type: Date, default: Date.now },
});

// Export the Booking model
export default mongoose.model("Booking", bookingSchema);
