import express from 'express'
import { loginUser, registerUser, uploadResume } from '../controller/userController.js';
import upload from '../middleware/upload.js';

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/uploads", upload.single("resume"), uploadResume);


export default userRouter;