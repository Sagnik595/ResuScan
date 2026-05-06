import express from 'express'
import { analyzeScore} from '../controller/analysisController.js';

const AnalyzeRouter = express.Router();

AnalyzeRouter.post('/analyze',analyzeScore);

export default AnalyzeRouter;