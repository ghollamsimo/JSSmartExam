import express from 'express';
import QuestionController from '../controllers/QuestionController.mjs';

const router = express.Router();

router.get('/questions', QuestionController.getAllQuestion);
router.post('/question', QuestionController.CreateQuestion);

export default router;
