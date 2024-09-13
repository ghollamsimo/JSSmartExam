import FormateurModel from "../models/FormateurModel.mjs";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

class FormateurController {
    // Login method for formateur
    static login(req, res) {
        const { email, password } = req.body;

        // Find formateur by email
        FormateurModel.findByEmail(email, (err, formateur) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (!formateur) {
                return res.status(404).json({ message: "Formateur not found" });
            }

            console.log("Formateur password hash:", formateur.password_hash); // Log password hash from database

            // Compare provided password with the hash in the database
            bcrypt.compare(password, formateur.password_hash, (err, isMatch) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Internal server error" });
                }

                console.log("Password match:", isMatch); 

                if (!isMatch) {
                    return res.status(401).json({ message: "Invalid credentials" });
                }

                // Create JWT token after successful authentication
                const token = jwt.sign(
                    { formateur_id: formateur.formateur_id, email: formateur.email },  // Payload
                    process.env.JWT_SECRET,  // Secret key from .env file
                    { expiresIn: '1h' }  // Token expiration time
                );

                console.log("Generated JWT Token:", token);  // Log generated token for debugging

                

                // Redirect to dashboard with formateur's name and token
                res.render('pages/dashboard', { name: formateur.nom, token });
            });
        });
    }

    // Register method for formateur
    static register(req, res) {
        const { nom, prenom, date_naissance, adresse, specialite, email, password } = req.body;

        FormateurModel.createFormateur(nom, prenom, date_naissance, adresse, specialite, email, password, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error registering formateur" });
            }
            res.status(201).json({ message: "Formateur registered successfully" });
        });
    }
}

export default FormateurController;
