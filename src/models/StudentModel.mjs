import db from '../config/settings.mjs';

class StudentModel {
    static async getTestsPassedByStudent(studentId) {
        const query = `
            SELECT t.test_id, t.formateur_id, t.score_reussite, t.droit_visualiser_reponses, t.droit_voir_resultat, t.nombre_chances, t.remarques, t.consignes, t.date_debut, t.date_fin, p.score_obtenu, p.tentative_numero, p.resultat_final, p.date_passage
            FROM passagetest p
            JOIN Test t ON p.test_id = t.test_id
            WHERE p.etudiant_id = ?;
        `;
        return new Promise((resolve, reject) => {
            db.query(query, [studentId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
}

export default StudentModel;
