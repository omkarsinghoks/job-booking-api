const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcypt = require("bcrypt");
async function registerHandler(req, res) {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const hashPass = await bcypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashPass,
      role: role,
    });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required",
      });
    }
    // generate token and stored ito cookie
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const payload = {
      id: user._id,
      role: user.role,
      email: user.email,
    };
    console.log("Payload for JWT:", payload.id);
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(200).json({
      message: "User logged in successfully ",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: `Internal server error ${error.message}` });
  }
}

async function getUserProfileHandler(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile retrieved successfully",
      user
    });
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    res.status(500).json({ message: `Internal server error ${error.message}` });
  }
}


async function updateUserProfileHandler(req,res)
{  
   try {
      const id = req.user.id;
      const user = await User.findById(id);
      const {  profileUrl, Bio, resumeUrl, collegeName, skills, experience, contactNumber } = req.body;
       if(profileUrl) user.profileUrl = profileUrl;
       if(Bio) user.Bio = Bio;
        if(resumeUrl) user.resumeUrl = resumeUrl;
        if(collegeName) user.collegeName = collegeName; 
        if(skills) user.skills = skills;
        if(experience) user.experience = experience;
        if(contactNumber) user.contactNumber = contactNumber;
       await user.save();
      res.status(200).json({
          message: "User profile updated successfully",
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            profileUrl: user.profileUrl,
            Bio: user.Bio,
            resumeUrl: user.resumeUrl,
            collegeName: user.collegeName,
            skills: user.skills,
            experience: user.experience,
            contactNumber: user.contactNumber
          }
        });  
      
   } catch (error) {
     console.log(error.message);
      res.status(500).json({ message: `Internal server error ${error.message}` });
    
   }

}


module.exports = {
  registerHandler,
  loginHandler,
  getUserProfileHandler,
  updateUserProfileHandler,
};