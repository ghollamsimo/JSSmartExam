import db from '../config/settings.mjs'
import ClassRequest from "../requests/ClassRequest.mjs";

class ClassModel {
    static index(callback) {
        const sql = "SELECT * FROM classes";
        db.query(sql, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }
    static store(data, callback) {
        const errors = ClassRequest.validate(data);
        if (errors.length > 0) {
            return callback(new Error(`Validation failed: ${errors.join(', ')}`), null);
        }
        const { formateur_id, etudiant_id, name } = data;
        const sql = "INSERT INTO classes (formateur_id, etudiant_id, name) VALUES (?, ?, ?)";
        db.query(sql, [formateur_id, etudiant_id, name], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    }

    static destroy(id, callback) {
        const sql = 'DELETE FROM classes WHERE classe_id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    }

}

export default ClassModel;
