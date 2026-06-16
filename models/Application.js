import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    position: { type: mongoose.Schema.Types.ObjectId, ref: "Position", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    status: { type: String, enum: ["pending", "reviewed", "rejected", "accepted"], default: "pending" },
}, { timestamps: true });

export default mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
