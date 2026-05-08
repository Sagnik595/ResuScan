import express from 'express'
import authUser from '../middleware/authUser.js';
import { analyzeScore} from '../controller/analysisController.js';

const AnalyzeRouter = express.Router();

AnalyzeRouter.post('/analyze',analyzeScore);

export default AnalyzeRouter;