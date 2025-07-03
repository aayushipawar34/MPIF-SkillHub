import { validationResult } from "express-validator";
import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import admin from "../middlewares/firebaseAdmin.js";
import dotenv from "dotenv";
dotenv.config();

// Utility to generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// Send OTP via email
const sendOTP = (email, otp) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_ID,
      to: email,
      subject: "Email Verification OTP",
      html: `<h3>Your OTP is: <b>${otp}</b></h3>
             <p>Please enter this OTP to verify your account.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return reject(false);
      return resolve(true);
    });
  });
};

// Signup 
export const signUpAction = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: "Invalid data", details: error.array() });
    }

    const { username, email, contact, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { contact }, { username }] });
    if (existingUser) {
      return res.status(409).json({ error: "Email, username, or contact already exists" });
    }

    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const otp = generateOTP();

    const emailStatus = await sendOTP(email, otp);
    if (!emailStatus) {
      return res.status(500).json({ error: "Failed to send OTP" });
    }

const isAdmin = email === "admin@gmail.com";

const user = await User.create({
  username,
  email,
  contact,
  password: hashedPassword,
  role: isAdmin ? "admin" : "user",
  verified: isAdmin ? true : false,
  otp: isAdmin ? null : otp,
});


    res.status(201).json({ message: "User created. Verify your email using OTP.", user });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", detail: err.message });
  }
};
export const googleAuthAction = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: "idToken is required" });
    }

    // ✅ Firebase Admin SDK se token verify karo
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name, uid } = decodedToken;

    if (!email || !uid) {
      return res.status(400).json({ error: "Invalid Google user info" });
    }

    // ✅ User database mein hai ya nahi
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        username: name || email.split("@")[0],
        email,
        googleId: uid,
        verified: true,
        role: email === "admin@gmail.com" ? "admin" : "user",
      });
    }

    // ✅ Token create karna
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Google login successful",
      user,
      token,
    });
  } catch (err) {
    console.error("Google Auth Error:", err);
    return res.status(500).json({
      error: "Google authentication failed",
      detail: err.message,
    });
  }
};

export const verifyAccount = async (req, res) => {
  const { email, otp } = req.body;
  console.log("OTP Verify Request:", { email, otp });

  const user = await User.findOne({ email, otp });
  console.log("Found User:", user);

  if (!user) return res.status(400).json({ error: "Invalid OTP or email" });

  user.verified = true;
  user.otp = null;
  await user.save();

  res.status(200).json({ message: "Account verified successfully" });
};



// Sign In
export const signInAction = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ error: "Email not registered" });
    if (!user.verified && user.role !== "admin") {
      return res.status(401).json({ error: "Account not verified" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Sign In Success",
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        verified:user.verified,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "Email not registered" });

    const otp = generateOTP();
    user.otp = otp;
    await user.save();

    await sendOTP(email, otp);
    res.status(200).json({ message: "OTP sent to email for password reset" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email, otp });
    if (!user) return res.status(400).json({ error: "Invalid OTP or email" });

    const salt = bcrypt.genSaltSync(12);
    user.password = bcrypt.hashSync(newPassword, salt);
    user.otp = null;

    await user.save();
    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    delete updates.password;

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
