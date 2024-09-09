import express from 'express';
import ClassController from "../controllers/ClassController.mjs";

const router = express.Router();

router.get('/classes', ClassController.getAllClasses);

export default router;
