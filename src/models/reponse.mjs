import db from '../config/db.mjs'; // Importer le pool de connexions MySQL

export class Reponse {
    constructor(reponse_id, texte_reponse, est_correcte, question_id) {
      this.reponse_id = reponse_id;
      this.texte_reponse = texte_reponse;
      this.est_correcte = est_correcte;
      this.question_id = question_id;
    }
  
    static async create(texte_reponse, est_correcte, question_id) {
      const [rows] = await db.query('INSERT INTO reponse (texte_reponse, est_correcte, question_id) VALUES (?, ?, ?)', 
      [texte_reponse, est_correcte, question_id]);
      return rows;
    }
  
    static async findByQuestion(questionId) {
      const [rows] = await pool.query('SELECT * FROM reponses WHERE question_id = ?', [questionId]);
      return rows;
    }
  }
  