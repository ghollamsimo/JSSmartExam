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

     // Insert a new student
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

        // Insertion dans la base de données
        StudentModel.add(newStudent, async (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error adding student" });
            }

            // Si l'insertion est réussie, envoie un email à l'étudiant
            try {
                await EmailService.sendEmail({
                    to: email,
                    subject: "Bienvenue à l'école",
                    text: `Bonjour ${prenom}, bienvenue dans notre école !`,
                    html: `<h1>Bonjour ${prenom} ${nom}</h1>
                           <p>Bienvenue à notre école ! Veuillez trouver votre email adresse  : <strong>${email}</strong>.</p>
                           <p>Cordialement,<br>L'équipe de l'école</p>`
                });
                console.log(`Email envoyé à ${email}`);
            } catch (emailErr) {
                console.error("Erreur lors de l'envoi de l'email : ", emailErr);
            }

            // Redirection après succès
            res.redirect('/');
        });
    }

}

export default StudentController