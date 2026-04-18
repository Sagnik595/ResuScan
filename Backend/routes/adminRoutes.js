import express from 'express';
import authAdmin from '../middleware/authAdmin.js';
import { adminLogin, getAllUser } from '../controller/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/login',adminLogin);
adminRouter.get('/getusers',authAdmin,getAllUser);

export default adminRouter;