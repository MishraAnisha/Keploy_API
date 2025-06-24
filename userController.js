// At the top of controller/userController.js
console.log("✅ userController loaded");

import User from "../model/usermodel.js";

// Create a new user
export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    const { email } = userData;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }
    const savedUser = await userData.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// Fetch all users
export const fetch = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "User not Found." });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// Update user by id
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// Delete user by id
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }
    await User.findByIdAndDelete(id);
    return res.status(201).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};
