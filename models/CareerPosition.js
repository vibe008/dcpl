import mongoose from "mongoose";

const CareerPositionSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    department: { type: String, default: "" },
    location: { type: String, default: "" },
    type: { type: String, enum: ["full-time", "part-time", "contract", "internship", "temp"], default: "full-time" },
    slug: { type: String, unique: true, index: true },
    description: { type: String, default: "" },
    requirements: { type: [String], default: [] },
    responsibilities: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Position  ||
    mongoose.model("Position", CareerPositionSchema);