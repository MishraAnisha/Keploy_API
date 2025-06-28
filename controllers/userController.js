// At the top of controller/userController.js
console.log("✅ userController loaded");

import User from "../models/userModels.js";

// ✅ Create a new user
export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    const { email } = userData;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ message: "User already exists." }); // 409 Conflict
    }

    const savedUser = await userData.save();
    res.status(201).json(savedUser); // ✅ 201 Created
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// ✅ Fetch all users
export const fetch = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." }); // optional
    }
    res.status(200).json(users); // ✅ 200 OK
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// ✅ Update user by ID
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedUser); // ✅ 200 OK (not 201)
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// ✅ Delete user by ID
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }

    await User.findByIdAndDelete(id);
    res.status(204).send(); // ✅ 204 No Content — successful delete with no body
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};
