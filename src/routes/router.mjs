import express from 'express';
import ClassController from "../controllers/ClassController.mjs";
import FormateurController from "../controllers/FormateurController.mjs";

const router = express.Router();

router.get('/classes', ClassController.getAllClasses);

// Route to render the login page
router.get('/login', (req, res) => {
    res.render('pages/login');
});

// Route to handle login form submission
router.post('/login', FormateurController.login);

// Route to render the registration page
router.get('/register', (req, res) => {
    res.render('pages/register');
});



// Route to handle registration form submission
router.post('/register', FormateurController.register);

router.get('/dashboard', (req, res) => {
    // Render dashboard view with session data
// Correctly pass 'name' to the view
res.render('pages/dashboard', { name: formateur.nom });
});

export default router;
