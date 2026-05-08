import mongoose from "mongoose";

// we can incorporate changes in this model just to make it look enhanced in the frontend...

const JDSchema = new mongoose.Schema({
    comName:{
        type:String,
        required:true,
        default:""
    },
    jobTitle:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true,
        default:[""]
    }
});

export const jd = mongoose.model("jd", JDSchema);