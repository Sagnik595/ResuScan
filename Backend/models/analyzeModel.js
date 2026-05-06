import mongoose from "mongoose";

const analyzeSchema = new mongoose.Schema({
    resumeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume",
        required: true,
    },
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "jd",
        required: true,
    },
    jobDesc:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        default:0
    },
    missingSkills:{
        type:[String],
        default:[]
    },
    recommendations: {
        skill_improvements: [String],
        resume_improvements: [String],
        project_suggestions: [String],
        learning_roadmap: [String]
        }
}, {timestamps:true});

export const analyze = mongoose.model("analyze",analyzeSchema);