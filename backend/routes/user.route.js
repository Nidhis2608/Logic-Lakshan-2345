const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");

const userRouter = express.Router();

// Route to register a new user
userRouter.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  // Check if all required fields are provided
  if (!username || !email || !password ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the email is already registered
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({ username, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to login an existing user
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userID: user._id, username: user.username, role: user.role }, "masai");

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to get all users
userRouter.get("/", async (req, res) => {
  try {
    const { username, email, role } = req.query;
    let query = {};

    if (username) {
      query.username = { $regex: new RegExp(username, "i") };
    }

    if (email) {
      query.email = { $regex: new RegExp(email, "i") };
    }

    if (role) {
      query.role = role;
    }

    const users = await UserModel.find(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to delete a user
userRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User successfully deleted", deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Endpoint to update a user
userRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, { username, email, role }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User successfully updated", updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = { userRouter };
