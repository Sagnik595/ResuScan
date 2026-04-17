import express from 'express';
import authAdmin from '../middleware/authAdmin.js';
import { adminLogin } from '../controller/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/login',adminLogin);

export default adminRouter;