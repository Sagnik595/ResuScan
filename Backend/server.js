import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.get("/",(req,res)=>{
    res.send("This will be the starting API for ResuScan");
})

app.listen(port,()=>{console.log("Server Started");
})
