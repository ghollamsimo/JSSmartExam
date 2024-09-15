import { EmailService } from '../models/emailService.mjs';
import StudentModel from '../models/StudentModel.mjs'

class StudentController{
    static async getAllStudent(req, res){
        StudentModel.index((err, data) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching studnets" });
            }
            res.status(200).render('../views/pages/formateur/home', { data });
        })
    }

     static async createStudent(req, res) {
        const { nom, prenom, date_naissance, adresse, date_inscription,email } = req.body;

        const newStudent = {
            nom,
            prenom,
            date_naissance,
            adresse,
            date_inscription,
            email
        };

        StudentModel.add(newStudent, async (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error adding student" });
            }

            try {
                await EmailService.sendEmail({
                    to: email,
                    subject: "Bienvenue à l'école",
                    text: `Bonjour ${prenom}, bienvenue dans notre école !`,
                    html: `<div style="font-family: Arial, sans-serif; color: #333;">
                <div style="text-align: center;">
                    <img src="http://localhost:3000/assets/logo.png" alt="Logo" style="width: 150px; margin-bottom: 20px;">
                </div>
                <h1 style="color: #4CAF50;">Bonjour ${prenom} ${nom}</h1>
                <p style="font-size: 16px;">
                    Bienvenue dans notre école ! Veuillez utiliser votre email pour accéder à notre plateforme.
                    </br>
                    <h3>Veuillez trouver votre email adresse  : <strong>${email}</strong>.</p></h3>
                </p>
                <p style="font-size: 14px; color: #777;">
                    Nous sommes ravis de vous accueillir et nous vous souhaitons une excellente expérience.
                </p>
                <footer style="margin-top: 30px; font-size: 12px; color: #888;">
                    <p>École XYZ, Adresse, Ville</p>
                </footer>
            </div>
            `
                });
                console.log(`Email envoyé à ${email}`);
            } catch (emailErr) {
                console.error("Erreur lors de l'envoi de l'email : ", emailErr);
            }

            
            res.redirect('/');
        });
    }

}

export default StudentController