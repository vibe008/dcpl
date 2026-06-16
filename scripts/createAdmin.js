import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Correct file path resolver for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// ✅ Import model with full path + extension
import User from "../models/User.js";

const MONGO_URL = process.env.MONGO_URI;

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ MongoDB connected");

    const hashed = await bcrypt.hash("admin123", 10);

    const user = await User.create({
      name: "Admin",
      email: "admin@site.com",
      passwordHash: hashed,
      role: "admin",
    });

    console.log("✅ Admin created:", user.email);
    await mongoose.disconnect();
    console.log("🔌 Disconnected from DB");
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
  }
}

createAdmin();
