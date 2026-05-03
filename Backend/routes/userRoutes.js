import express from 'express'
import {loginUser, parseJD, registerUser} from '../controller/userController.js';
import multer from 'multer';
import authUser from '../middleware/authUser.js';
import { handleupload, textparse } from '../controller/resumeController.js';

const userRouter = express.Router();
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid file type"), false);
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/upload", authUser,upload.single('pdf'),handleupload);
userRouter.post("/parse", textparse);
userRouter.post("/jdupload",parseJD);

export default userRouter;