import express from 'express';
import { FormateurController } from '../controllers/FormateurController.mjs';

const router = express.Router();

router.get('/questions/create', FormateurController.renderCreateQuestionForm);
router.post('/questions', FormateurController.createQuestion);
router.get('/questions', FormateurController.listQuestions);

export default router;
