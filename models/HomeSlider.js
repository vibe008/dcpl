import mongoose from "mongoose";

const MainSliderSchema = new mongoose.Schema(
  {
    mainimageurl: { type: String, required: true },
    sectors: { type: Array, default: [] },
    title: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.models.MainSlider ||
  mongoose.model("MainSlider", MainSliderSchema);
