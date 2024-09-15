import db from '../config/db.mjs';

class TestModel {
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
