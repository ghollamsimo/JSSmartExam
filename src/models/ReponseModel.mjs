import db from '../config/db.mjs';

export class ReponseModel {
    static store(data, callback){
        const sql = 'INSERT INTO reponse (texte_reponse, question_id, is_correcte) Values (?, ?, ?)';
        const {texte_reponse, question_id, is_correcte} = data
        db.query(sql, [texte_reponse, question_id, is_correcte], (err, results) => {
            if (err) callback(err, null)
            callback(null, results)
        })
    }
  }
  