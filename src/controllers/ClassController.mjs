import ClassModel from "../models/ClassModel.mjs";

class ClassController {
    static getAllClasses(req, res) {
        ClassModel.index((err, data) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching classes" });
            }
            res.status(200).json(data);
        });
    }
}

export default ClassController;
