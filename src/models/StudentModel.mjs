import db from '../config/db.mjs'


class StudentModel{
    static index(callback) {
        const sql  = 'SELECT * FROM etudiant'
        db.query(sql, (err, results) => {
            if (err) {
               return callback(err, null)
            }
            callback(null , results)
        })
    }

    static add(student, callback) {
        const { nom, prenom, date_naissance, adresse, date_inscription,email } = student; 
        const sql = 'INSERT INTO etudiant (nom, prenom, date_naissance, adresse, date_inscription ,email) VALUES (?, ?, ?, ?, ?, ?)'; 
        
        db.query(sql, [nom, prenom, date_naissance, adresse, date_inscription ,email], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
    
}

export default StudentModel