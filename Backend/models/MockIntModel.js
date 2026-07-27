import mongoose from "mongoose";

const mockIntSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      requried: true,
    },
    userEmail: {
      type: String,
      requried: true,
    },
    ResumeContent: {
        type:String,
        required:true,
        default:"This is candidate's resume"
    },
    JDContent: {
        type:String,
        required:true
    },
    IntQuestions: {
        type:[String],
        required:true,
        default:["Introduce yourself please?"]
    },
    answers: {
        type:[String],
    },
    Score: {
        type:String,
    },
    Result: {
        type:[String]
    },
    Improvements: {
        type:[String]
    },
  },
  { timestamps: true },
);

export const Mock = mongoose.model("Mock", mockIntSchema);
