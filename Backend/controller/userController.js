import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import user from "../models/userModel.js";
import jwt from "jsonwebtoken";
import extract from "pdf-extraction";
import { SKILLS } from "../utils/skills.js";
import { extractSkills } from "../utils/extractSkills.js";

//API for user register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: "All fields are required" });
    if (!validator.isEmail(email))
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    if (password.length < 8)
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });

    const existing = await user.findOne({ email });
    if (existing)
      return res.status(400).json({ success: false, message: "User already exists" });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const userData = await user.create({
      name,
      email,
      password: hash,
      image: "",
      role: "user",
    });

    return res.status(201).json({ success: true, message: "Registration Successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Registration failed" });
  }
};

//API to login user and admin
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await user.findOne({ email });

    if (!userData) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = bcrypt.compareSync(password, userData.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign(
      {
        id: userData._id,
        role: userData.role || "user",
      },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    return res.json({
      success: true,
      message: "User logged in successfully",
      token,
      role: userData.role || "user",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userData = await user.findById(req.userID).select("-password -token");
    
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { registerUser, loginUser, getUserProfile };
