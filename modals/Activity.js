import mongoose from "mongoose";

// Define the structure of the Activity document
const activitySchema = new mongoose.Schema({
  // Title of the activity
  title: String,

  // Description or details about the activity
  description: String,

  // Location where the activity will take place
  location: String,

  // Date and time of the activity
  dateTime: Date,
});

// Create the Activity model from the schema
const Activity = mongoose.model("Activity", activitySchema);

// Export the model to use it in other parts of the app
export default Activity;
