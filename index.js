import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import route from "./routes/userRoutes.js";

import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-output.json");

const app = express();

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// JSON + URL encoded middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ ✅ Use PLURAL 'users' to match the routes
app.use("/api/users", route);

// ✅ Optional root check
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

// MongoDB connection
const PORT = process.env.PORT || 8000;
const MONGOURL =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URL_TEST
    : process.env.MONGO_URL;

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
