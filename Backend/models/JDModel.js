import mongoose from "mongoose";

const JDSchema = new mongoose.Schema({
    desc:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        requried:true,
        default:[""]
    }
});

export const jd = mongoose.model("jd", JDSchema);