import express from 'express'
import authUser from '../middleware/authUser.js';
import { analyzeScore, getAnalysisById } from '../controller/analysisController.js';

const AnalyzeRouter = express.Router();

AnalyzeRouter.post('/analyze', authUser, analyzeScore);
AnalyzeRouter.get('/:id', authUser, getAnalysisById);

export default AnalyzeRouter;