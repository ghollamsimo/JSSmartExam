import ClassModel from "../models/ClassModel.mjs";
import { promisify } from 'util';
import StudentModel from "../models/StudentModel.mjs";

const classIndex = promisify(ClassModel.index.bind(ClassModel));
const studentIndex = promisify(StudentModel.index.bind(StudentModel));

class ClassController {
    static async getAllClasses(req, res) {
        try {
            const [classesData, studentsData] = await Promise.all([
                classIndex(),
                studentIndex()
            ]);
            res.status(200).render('../views/pages/formateur/home', { classes: classesData,
                students: studentsData,
                success: req.query.success,
                error: req.query.error });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async CreateClass(req, res) {
        const classData = {
            formateur_id: req.body.formateur_id,
            etudiant_id: req.body.etudiant_id_json,
            name: req.body.name
        };

        ClassModel.store(classData, (err, results) => {
            if (err) {
                return res.redirect('/classes?error=Error creating class');
            }
            res.redirect('/classes?success=Class created successfully');
        });
    }

    static async DeleteClass(req, res) {
        const { id } = req.body;
        ClassModel.destroy(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error deleting class' });
            } else {
                res.redirect('/classes');
            }
        });
    }
}

export default ClassController;
