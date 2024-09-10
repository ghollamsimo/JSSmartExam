import ClassModel from "../models/ClassModel.mjs";

class ClassController {
    static async getAllClasses(req, res) {
        ClassModel.index((err, data) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching classes" });
            }
            res.status(200).render('../views/pages/formateur/home', { data });
        });
    }

    static async CreateClass(req, res) {
        const {formateur_id, etudiant_id , name} = req.body;

        ClassModel.store({formateur_id, etudiant_id, name}, (err, results) => {
            if (err){
                return res.status(500).json({error: 'Error creating class'})
            }else{
                res.redirect('/classes')
            }
        })
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
