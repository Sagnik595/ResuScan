import express from 'express';
import authAdmin from '../middleware/authAdmin.js';
import { adminLogin, getAllUser } from '../controller/adminController.js';
import { parseJD, uploadJD } from '../controller/jobController.js';

const adminRouter = express.Router();

adminRouter.post('/login',adminLogin);
adminRouter.get('/getusers',authAdmin,getAllUser);
adminRouter.post("/jdupload",authAdmin,uploadJD);
adminRouter.post("/jdparse",parseJD);

export default adminRouter;