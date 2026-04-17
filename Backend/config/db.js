import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected successfully");
    } catch (error) {
        console.log("DB connection failed!!");
    }
}

export default connectDB;



