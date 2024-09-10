import db from '../config/settings.mjs';
import bcrypt from 'bcryptjs';

class FormateurModel {
    static findByEmail(email, callback) {
        const sql = "SELECT * FROM Formateur WHERE email = ?";
        db.query(sql, [email], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result[0]);
        });
    }

    static createFormateur(nom, prenom, date_naissance, adresse, specialite, email, password, callback) {
        const sql = "INSERT INTO Formateur (nom, prenom, date_naissance, adresse, specialite, email, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?)";
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return callback(err, null);
            db.query(sql, [nom, prenom, date_naissance, adresse, specialite, email, hash], (err, result) => {
                if (err) return callback(err, null);
                callback(null, result);
            });
        });
    }
}

export default FormateurModel;
