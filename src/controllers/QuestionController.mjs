import { QuestionModel } from "../models/QuestionModel.mjs";
import { promisify } from 'util';
import { SujetModel } from "../models/SujetModel.mjs";
import { SousSujetModel } from "../models/SousSujetModel.mjs";
import { ReponseModel } from "../models/ReponseModel.mjs";

const questionIndex = promisify(QuestionModel.index.bind(QuestionModel));
const sujetIndex = promisify(SujetModel.index.bind(SujetModel));
const sousSujetIndex = promisify(SousSujetModel.index.bind(SousSujetModel));

class QuestionController {

    static async getAllQuestion(req, res) {
        const [questionData, sujetData, sousSujetData] = await Promise.all([
            questionIndex(),
            sujetIndex(),
            sousSujetIndex()
        ]);

        res.status(200).render('../views/formateur/createQuestion', {
            questions: questionData,
            sujet: sujetData,
            soussujet: sousSujetData,
        });
    }

    static async CreateQuestion(req, res) {
        const questions = req.body.questions;

        try {
            for (const question of questions) {
                const questionData = {
                    texte_question: question.texte_question,
                    difficulty: question.difficulty,
                    type_question: question.type_question,
                    points: question.points,
                    sujet_id: question.sujet_id,
                    sous_sujet_id: question.sous_sujet_id
                };

                const questionResults = await new Promise((resolve, reject) => {
                    QuestionModel.create(questionData, (err, result) => {
                        if (err) return reject(err);
                        resolve(result);
                    });
                });

                const question_id = questionResults.insertId;
                const reponses = question.reponses;

                const reponsePromises = reponses.map(reponse => {
                    const reponseData = {
                        texte_reponse: reponse.content,
                        question_id: question_id,
                        is_correcte: reponse.isCorrect ? true : false
                    };

                    return new Promise((resolve, reject) => {
                        ReponseModel.store(reponseData, (err, result) => {
                            if (err) return reject(err);
                            resolve(result);
                        });
                    });
                });

                await Promise.all(reponsePromises);
            }

            res.render('../views/formateur/home', { success: 'Questions and responses created successfully' });
        } catch (err) {
            console.error("Error creating questions or responses:", err);
            res.render('../views/formateur/createQuestion', { error: 'Error creating questions or responses' });
        }
    }
}

export default QuestionController;
