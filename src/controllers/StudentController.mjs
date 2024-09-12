import StudentModel from '../models/StudentModel.mjs'

class StudentController{
    static async getAllStudent(req, res){
        StudentModel.index((err, data) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching studnets" });
            }
            res.status(200).render('../views/pages/formateur/home', { data });
        })
    }
}

export default StudentController