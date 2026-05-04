import express from 'express'
import { analyze1 } from '../controller/analysisController.js';

const AnalyzeRouter = express.Router();

AnalyzeRouter.post('/analyze',analyze1);

export default AnalyzeRouter;