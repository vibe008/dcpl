import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    email: { required: true, type: String },
    phone: { required: false, type: String },
    name: { required: true, type: String },
    message: { required: true, type: String },
    subject: { required: true, type: String },
    date: { type: Date, default: Date.now }
})

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);