import jwt from "jsonwebtoken";

// Middleware to protect routes (check if user is authenticated)
const auth = async (req, res, next) => {
  try {
    // Get token from the Authorization header (format: Bearer <token>)
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // If token is missing, throw error
    if (!token) {
      throw new Error();
    }

    // Verify token using the secret key
    const decoded = jwt.verify(token, "your-secret-key");

    // Store user ID from token into request object
    req.userId = decoded.userId;

    // Move to the next middleware or route
    next();
  } catch (error) {
    // If token is invalid or missing, return 401 Unauthorized
    res.status(401).json({ message: "Please authenticate" });
  }
};

export default auth;
