import express from 'express';
import QuestionController from '../controllers/QuestionController.mjs';
import TestController from "../controllers/TestController.mjs";

const router = express.Router();

router.get('/questions', QuestionController.getAllQuestion);
router.post('/question', QuestionController.CreateQuestion);
router.get('/test', TestController.getAllTest)
router.post('/test', TestController.createTest)
export default router;
