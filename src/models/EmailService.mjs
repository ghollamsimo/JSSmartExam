import nodemailer from 'nodemailer';
import 'dotenv/config';

export class EmailService {
    static transporter = nodemailer.createTransport({
        service: 'gmail',  
        auth: {
            user: process.env.EMAIL_student, 
            pass: process.env.EMAIL_PASS,    
        },
    });

    // Méthode d'envoi d'email
    static async sendEmail({ to, subject, text, html }) {
        const mailOptions = {
            from: '"École" <no-reply@ecole.com>', // Expéditeur
            to,                                  // Destinataire
            subject,                             // Objet de l'email
            text,                                // Version texte de l'email
            html                                 // Version HTML de l'email
        };

        try {
            const info = await EmailService.transporter.sendMail(mailOptions);
            console.log("Message envoyé : %s", info.messageId);
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email : ", error);
            throw error;
        }
    }
}
