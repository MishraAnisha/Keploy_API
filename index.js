// index.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import route from "./routes/userroutes.js";

const app = express();

const PORT = process.env.PORT || 5000;
const MONGOURL =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URL_TEST
    : process.env.MONGO_URL;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/user", route);

// MongoDB connection (skip when testing)
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(MONGOURL)
    .then(() => {
      console.log("✅ Database connected successfully.");
      app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("❌ MongoDB connection error:", error);
    });
}

export default app;
