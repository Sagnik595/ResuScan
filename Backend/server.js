import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api/user",userRouter);
app.use("/api/admin",adminRouter);

app.get("/",(req,res)=>{
    res.send("This will be the starting API for ResuScan");
})

app.listen(port,()=>{console.log("Server Started");
})
