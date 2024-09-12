import { QuestionModel } from "../models/QuestionModel.mjs";
import { promisify } from 'util';
import {SujetModel} from "../models/SujetModel.mjs";
import {SousSujetModel} from "../models/SousSujetModel.mjs";
import {ReponseModel} from "../models/ReponseModel.mjs";

const questionIndex = promisify(QuestionModel.index.bind(QuestionModel))
const sujetIndex = promisify(SujetModel.index.bind(SujetModel))
const sousSujetIndex = promisify(SousSujetModel.index.bind(SousSujetModel))

class QuestionController {

    static async getAllQuestion(req, res){
        const [questionData, sujetData, sousSujetData] = await Promise.all([
            questionIndex(),
            sujetIndex(),
            sousSujetIndex()
        ])
        res.status(200).render('../views/formateur/createQuestion', {
            questions: questionData,
            sujet: sujetData,
            soussujet: sousSujetData,
        })
    }
    static async CreateQuestion(req, res) {
        const questiondata = {
            texte_question: req.body.texte_question,
            difficulty: req.body.difficulty,
            type_question: req.body.type_question,
            points: req.body.points,
            sujet_id: req.body.sujet_id,
            sous_sujet_id: req.body.sous_sujet_id
        };

        await QuestionModel.create(questiondata, async (err, questionResults) => {
            if (err) {
                return res.render('../views/formateur/createQuestion', { error: 'Error creating question' });
            }

            const question_id = questionResults.insertId;
            const reponses = req.body.reponses;
            for (let i = 0; i < reponses.length; i++) {
                const reponseData = {
                    texte_reponse: reponses[i].content,
                    question_id: question_id,
                    is_correcte: reponses[i].isCorrect ? true : false
                };

                await ReponseModel.store(reponseData, (err, result) => {
                    if (err) {
                        return res.render('../views/formateur/createQuestion', { error: 'Error inserting answers' });
                    }
                });
            }

            res.render('../views/formateur/home', { success: 'Question and answers created successfully' });
        });
    }
}

export default QuestionController;
