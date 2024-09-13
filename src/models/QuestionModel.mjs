import db from '../config/db.mjs';

export class QuestionModel {

  static async create(data, callback) {
    const sql = 'INSERT INTO question (texte_question, points, difficulty, type_question, sujet_id, sous_sujet_id) VALUES (?, ?, ?, ?, ?, ?)';
    const { texte_question, points, difficulty, type_question, sujet_id, sous_sujet_id } = data;

    await db.query(sql, [texte_question, points, difficulty, type_question, sujet_id, sous_sujet_id], (err, result) => {
      if (err) callback(err, null);
      callback(null, result);
    });
  }

  static async index(callback) {
    const sql = `
      SELECT 
          question.texte_question, 
          question.type_question, 
          question.points, 
          question.difficulty,
          sujet.intitule AS sujet_intitule, 
          soussujet.intitule AS sous_sujet_intitule
      FROM question
      INNER JOIN sujet ON question.sujet_id = sujet.sujet_id
      INNER JOIN soussujet ON question.sous_sujet_id = soussujet.sous_sujet_id
    `;
    await db.query(sql, (err, results) => {
      if (err) callback(err, null);
      callback(null, results);
    });
  }


  static async findById(questionId) {
    try {
      const [rows] = await db.query('SELECT * FROM question WHERE question_id = ?', [questionId]);
      return rows[0];
    } catch (error) {
      console.error('Erreur lors de la récupération de la question par ID:', error.message);
      throw error;
    }
  }

  

  static async delete(questionId) {
    try {
      const [result] = await db.query('DELETE FROM question WHERE question_id = ?', [questionId]);
      return result.affectedRows;
    } catch (error) {
      console.error('Erreur lors de la suppression de la question:', error.message);
      throw error;
    }
  }
}
