import express from 'express';
import ClassController from '../controllers/ClassController.mjs';
import StudentController from '../controllers/StudentController.mjs';

const router = express.Router();
router.get('/classes',  ClassController.getAllClasses)
router.post('/create/class', ClassController.CreateClass);
router.post('/delete/class', ClassController.DeleteClass);
router.get('/', (req, res)=> {
    res.render('../views/pages/student/home')
})

router.post('/create/student', StudentController.createStudent);
export default router;
