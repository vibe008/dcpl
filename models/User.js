import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    number: Number,
    passwordHash: String,
    role: { type: String, default: "admin" },
}, { timestamps: true })

export default mongoose.models.User || mongoose.model("User",userSchema)