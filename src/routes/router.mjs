import express from 'express';
import ClassController from "../controllers/ClassController.mjs";

const router = express.Router();

router.get('/classes', ClassController.getAllClasses);
router.get('/classes/form', (req, res) => {
    res.render('../views/pages/formateur/form');
});



router.post('/create/class', ClassController.CreateClass)
router.post('/delete/class', ClassController.DeleteClass)

export default router;
