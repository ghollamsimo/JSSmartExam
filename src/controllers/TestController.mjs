import TestModel from "../models/TestModel.mjs";

class TestController {
    static async getAllTest(req, res) {
        TestModel.showQuestion((err, data) => {
            if (err){
                res.status(500).send('Error')
            }else {
                res.render('../views/formateur/testpage', { questions: data });
            }
        })
    }

    static async createTest(req, res) {
        try {
            const { formateur_id, test_name, questions } = req.body;

            const testData = {
                formateur_id: formateur_id,
                test_name: test_name,
                questions: Array.isArray(questions) ? questions : [questions]
            };

            TestModel.store(testData, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Error creating test' });
                }
                res.redirect('/test');
            });
        } catch (error) {
            console.error('Error in createTest:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }
}

export default TestController;
