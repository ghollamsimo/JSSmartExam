import db from '../config/db.mjs';

class TestModel {
    static index(callback){
        const sql = 'SELECT * FROM test'
        db.query(sql, (err, result) =>{
            if (err) callback(err, null)
            callback(null, result)
        })
    }

    static showQuestionsByTest(testId) {
        const sql = `
            SELECT q.question_id, q.texte_question AS content, r.reponse_id, r.texte_reponse, r.is_correcte
            FROM question q
            LEFT JOIN reponse r ON q.question_id = r.question_id
            JOIN test_question tq ON q.question_id = tq.question_id
            WHERE tq.test_id = ?`;

        return new Promise((resolve, reject) => {
            db.query(sql, [testId], (err, result) => {
                if (err) return reject(err);

                const questions = [];
                const questionsMap = {};

                result.forEach(row => {
                    if (!questionsMap[row.question_id]) {
                        questionsMap[row.question_id] = {
                            id: row.question_id,
                            content: row.content,
                            correct_answer_id: null,
                            answers: []
                        };
                        questions.push(questionsMap[row.question_id]);
                    }
                    questionsMap[row.question_id].answers.push({
                        id: row.reponse_id,
                        text: row.texte_reponse,
                        is_correcte: row.is_correcte
                    });
                    if (row.is_correcte) {
                        questionsMap[row.question_id].correct_answer_id = row.reponse_id;
                    }
                });

                resolve(questions);
            });
        });
    }


    static showQuestion(callback){
        const sql = 'SELECT * FROM question'

        db.query(sql, (err, result) =>{
            if (err) callback(err, null)
            callback(null, result)
        })
    }
    static store(data, callback) {
        const insertTestSql = `INSERT INTO test (formateur_id, titre) VALUES (?, ?)`;

        db.query(insertTestSql, [data.formateur_id, data.test_name], (err, result) => {
            if (err) {
                return callback(err, null);
            }

            const testId = result.insertId;

            const insertQuestionsSql = `INSERT INTO test_question (test_id, question_id) VALUES ?`;

            const questionData = data.questions.map(question_id => [testId, question_id]);

            db.query(insertQuestionsSql, [questionData], (err, result) => {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, result);
            });
        });
    }
}

export default TestModel;
