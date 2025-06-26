const  jwt  = require("jsonwebtoken");
const dotenv = require("dotenv");

async function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Verify the token (assuming you have a function to do this)
    const user = await  jwt.verify(token, process.env.JWT_SECRET);


    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.log("User authenticated user is :", user);
    req.user = user;
    
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ message: `Internal server error ${error.message}` });
  }
}
 module.exports = authMiddleware;