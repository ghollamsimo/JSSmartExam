import express from 'express';
import ClassController from "../controllers/ClassController.mjs";
import FormateurController from "../controllers/FormateurController.mjs";
import StudentController from '../controllers/StudentController.mjs';

const router = express.Router();

router.get('/classes', ClassController.getAllClasses);

// Render the login page (This route is fine, but we ensure it's not auto-redirected)
// router.get('/login', (req, res) => {
//     res.render('pages/login');
// });

// Handle login form submission (This route should handle logic but not auto-redirect)
// router.post('/login', FormateurController.login);

// Render the registration page
router.get('/register', (req, res) => {
    res.render('pages/register');
});

// Handle registration form submission
router.post('/register', FormateurController.register);

// Render the dashboard view (Ensure no redirects in this route)
router.get('/dashboard', (req, res) => {
    res.render('pages/dashboard', { name: 'Default Name' }); // Provide a default value if needed
});

// Route to display tests passed by the student (No authentication or redirection logic here)
router.get('/student/tests', StudentController.getTestsPassedByStudent);

export default router;
