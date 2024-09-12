import db from '../config/db.mjs'; // Importer le pool de connexions MySQL

export class Question {
  constructor(question_id , texte_question, typeQuestion, points, sujet_id, sous_sujet_id, difficulty) {
    this.question_id  = question_id ; // Identifiant unique de la question
    this.texte_question = texte_question; // Contenu de la question
    this.typeQuestion = typeQuestion; // Type de la question : choix_unique ou choix_multiple
    this.points = points; // Points attribués à la question
    this.sujet_id  = sujet_id ; // Identifiant du sujet auquel la question appartient
    this.sous_sujet_id  = sous_sujet_id ; // Identifiant du sous-sujet auquel la question appartient
    this.difficulty = difficulty; // Identifiant du niveau de difficulté
  }

  static async create(texte_question, points, difficulty, sujet_id, sous_sujet_id ) {
    try {
      const [result] = await db.query(
        'INSERT INTO question (texte_question, points, difficulty, sujet_id, sous_sujet_id) VALUES (?, ?, ?, ?,?)', 
        [texte_question, difficulty, points, sujet_id, sous_sujet_id ]
      );

      // Vérifiez si l'insertion a réussi et récupérez l'ID de la question insérée
      if (result && result.insertId) {
        return { question_id: result.insertId };
      } else {
        throw new Error('L\'insertion de la question a échoué.');
      }
    } catch (error) {
      console.error('Erreur lors de la création de la question:', error.message);
      throw error;
    }
  }

  static async findAll() {
    try {
      // Récupération de toutes les questions
      const [rows] = await db.query('SELECT * FROM question');
      return rows;
    } catch (error) {
      console.error('Erreur lors de la récupération de toutes les questions:', error.message);
      throw error;
    }
  }

  static async findById(questionId) {
    try {
      // Récupération d'une question par son identifiant
      const [rows] = await db.query('SELECT * FROM question WHERE question_id = ?', [questionId]);
      return rows[0]; // Retourne la première ligne du résultat (question trouvée)
    } catch (error) {
      console.error('Erreur lors de la récupération de la question par ID:', error.message);
      throw error;
    }
  }

  

  static async delete(questionId) {
    try {
      // Suppression de la question par son identifiant
      const [result] = await db.query('DELETE FROM question WHERE question_id = ?', [questionId]);
      return result.affectedRows;
    } catch (error) {
      console.error('Erreur lors de la suppression de la question:', error.message);
      throw error;
    }
  }
}
