import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    filename: String,
    path: String,
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});


const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;