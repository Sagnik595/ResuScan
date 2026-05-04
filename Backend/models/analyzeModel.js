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
    jodDesc:{
        type:String,
        required:true
    },
    score:{
        type:String,
        default:"0%"
    },
    missingSkills:{
        type:[String],
        default:[""]
    }
});

export const analyze = mongoose.model("analyze",analyzeSchema);