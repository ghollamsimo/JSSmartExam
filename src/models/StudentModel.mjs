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
}

export default StudentModel