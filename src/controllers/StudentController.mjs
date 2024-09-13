import StudentModel from '../models/StudentModel.mjs';

class StudentController {
    static async getTestsPassedByStudent(req, res) {
        try {
            // Use a hardcoded or default studentId to fetch the tests
            const studentId = 1; 

            // Fetch tests for the student
            const tests = await StudentModel.getTestsPassedByStudent(studentId);

            // Render the EJS template to show the tests
            res.render('pages/student/student-tests', { tests });
        } catch (error) {
            console.error('Error fetching tests:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

export default StudentController;
