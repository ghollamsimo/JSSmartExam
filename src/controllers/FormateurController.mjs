import { Question } from '../models/question.mjs';
import { Sujet } from '../models/sujet.mjs';
import { SousSujet } from '../models/sousSujet.mjs';
import { Reponse } from '../models/reponse.mjs';


export class FormateurController {
  static async renderCreateQuestionForm(req, res) {
    try {
        const sujets = await Sujet.findAll();
        const sousSujets = await SousSujet.findAll();
        console.log('sujets:', sujets);
        console.log('sousSujets:', sousSujets);
       
        res.render('formateur/createQuestion', { sujets, sousSujets });
    } catch (error) {
        console.error('Error rendering createQuestion form:', error.stack);
        res.status(500).send('Server Error');
    }
}

static async createQuestion(req, res) {
    try {
      const { content, niveau, sujetId, sousSujetId, reponses } = req.body;
  
      // Création de la question et récupération de l'ID
      const question = await Question.create(content, niveau, sujetId, sousSujetId);
  
      if (!question || !question.question_id) {
        throw new Error('La question n\'a pas été insérée correctement.');
      }
  
      // Créer les réponses associées à la question
      for (const reponse of reponses) {
        await Reponse.create(reponse.texte_reponse, reponse.est_correcte, question.question_id);
      }
  
      res.redirect('/formateur/questions');
    } catch (error) {
        console.log(req);
        console.log(res);
      console.error('Erreur lors de la création de la question et des réponses:', error.message);
      res.status(500).send('Erreur serveur');
    }
  }
  

    static async listQuestions(req, res) {
        const questions = await Question.findAll();
        res.render('formateur/listQuestions', { questions });
    }
}
