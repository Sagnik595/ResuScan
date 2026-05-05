import express from 'express'
import { analyze1, analyze2 } from '../controller/analysisController.js';

const AnalyzeRouter = express.Router();

AnalyzeRouter.post('/analyze',analyze1);
AnalyzeRouter.post('/analyzeMissing',analyze2);

export default AnalyzeRouter;