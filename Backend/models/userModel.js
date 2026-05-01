import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    subscription:{
        type:String,
        default:"Basic"
    },
    resumeLimit:{
        type:Number,
        default:10,
        required:true,
    },
    role:{
        type:String,
        default:"User"
    },
    pdf:{
        type:Buffer,
    },
    token:{
        type:String
    }
})


const user = mongoose.model("user",userSchema);

export default user;