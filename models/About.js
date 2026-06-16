import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    sideImage: {
      type: String,
      default: "/assets/aboutimg.png",
    },
    title: {
      type: String,
      default: "Dera Consultants Pvt. Ltd.",
    },
    foundedText: {
      type: String,
      default: "was founded by Ar. Mayank Garg in 2011. Later in 2014, it was converted to Dera Consultants Private Limited.",
    },
    directorsText: {
      type: String,
      default: "Dera Consultants Private Limited has 2 appointed Directors/decision makers: Mayank Garg and Anand Thakkar.",
    },
    teamText: {
      type: String,
      default: "Today, it is a design practice with over 25 people, with offices at:",
    },
    offices: [
      {
        city: { type: String, required: true },
        state: { type: String, required: true },
      }
    ],
    servicesText: {
      type: String,
      default: "We are a multidisciplinary practice that provides professional services in Architectural design, interior design, Engineering, Urban planning, Project management and construction management.",
    },
    philosophyText: {
      type: String,
      default: "We believe that design is essentially problem-solving. The objective is to find simple and elegant solutions to practical problems, within the unique constraints faced by each project.",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.About || mongoose.model("About", AboutSchema);
