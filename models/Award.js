import mongoose from "mongoose";

const AwardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Award title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Award description is required"],
      trim: true,
      default: "",
    },
    year: {
      type: String,
      required: [true, "Award year is required"],
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Award || mongoose.model("Award", AwardSchema);
