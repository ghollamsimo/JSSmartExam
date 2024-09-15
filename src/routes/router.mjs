import express from 'express';
import ClassController from '../controllers/ClassController.mjs';
import QuestionController from "../controllers/QuestionController.mjs";
import TestController from "../controllers/TestController.mjs";

const router = express.Router();

router.get('/classes',  ClassController.getAllClasses)
router.post('/create/class', ClassController.CreateClass);
router.post('/delete/class', ClassController.DeleteClass);
router.get('/', (req, res)=> {
    res.render('../views/pages/student/home')
})
router.get('/tests', (req, res)=> {
    res.render('../views/pages/student/testpage')
})
router.get('/questions', QuestionController.getAllQuestion);
router.post('/questions', QuestionController.CreateQuestion);
router.get('/test', TestController.getAllTest)
router.post('/test', TestController.createTest)
export default router;
