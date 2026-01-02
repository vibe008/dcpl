import mongoose from "mongoose";

const EmpanelmentsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String,
  category: String,
  department: String,
  city: String,
  empanelledDate: String,
  validity: Date,
}, { timestamps: true });

export default mongoose.models.Empanelments 
  || mongoose.model("Empanelments", EmpanelmentsSchema);
