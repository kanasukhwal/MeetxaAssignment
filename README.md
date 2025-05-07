# MeetXAssignment Backend

This is the backend for the MeetXAssignment project, built with Node.js, Express, and MongoDB. It provides APIs for user authentication, activity management, and booking activities.

## Project Structure


### Key Directories and Files

- **server.js**: Entry point of the application.
- **controllers/**: Contains logic for handling requests (e.g., `authController.js`).
- **middlewares/**: Middleware for authentication (`auth.js`).
- **modals/**: Mongoose schemas for MongoDB collections (`Activity.js`, `Booking.js`, `User.js`).
- **routes/**: API routes for activities, authentication, and bookings.

## Installation

1. Clone the repository.
2. Navigate to the `backend` directory.
3. Install dependencies:

   ```bash
   npm install

   MONGO_DB_URL=<your-mongodb-url>
JWT_SECRET_KEY=<your-secret-key>



npm start