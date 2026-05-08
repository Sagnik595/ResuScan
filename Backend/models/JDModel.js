import mongoose from "mongoose";

const JDSchema = new mongoose.Schema({
    comName:{
        type:String,
        required:true,
        default:""
    },

    companyLogo:{
        type:String,
        default:""
    },

    jobTitle:{
        type:String,
        required:true
    },

    location:{
        type:String,
        required:true,
        default:"Remote"
    },

    jobType:{
        type:String,
        required:true,
        default:"Full-Time"
    },

    salary:{
        type:String,
        required:true,
        default:"Not Disclosed"
    },

    experience:{
        type:String,
        required:true,
        default:"0-1 Years"
    },

    desc:{
        type:String,
        required:true
    },

    skills:{
        type:[String],
        required:true,
        default:[]
    },

    deadline:{
        type:Date,
        required:true
    },
},{timestamps:true});

export const jd = mongoose.model("jd", JDSchema);