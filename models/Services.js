import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Service title is required"],},
    description: {
        type: String,
        required: [true, "Service description is required"],
    },
})

export default mongoose.models.Services || mongoose.model("Services", ServiceSchema);