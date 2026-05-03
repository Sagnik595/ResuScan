import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    parsedText: {
      type: String,
      default:"",
    },
    skills: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

export const Resume = new mongoose.model("Resume", resumeSchema);
