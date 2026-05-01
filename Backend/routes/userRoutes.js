import express from 'express'
import { handleupload, loginUser, registerUser, textparse} from '../controller/userController.js';
import multer from 'multer';
import authUser from '../middleware/authUser.js';


const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }// 5mb
});

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/upload", authUser,upload.single('pdf'),handleupload);
userRouter.post("/parse", authUser,textparse);

export default userRouter;