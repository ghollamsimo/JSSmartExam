// src/models/sousSujet.mjs
import db from '../config/db.mjs';

export class SousSujet {
    static async findAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM soussujet', (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return reject(error);
                }
                // Vérifiez le type de `results` ici
                console.log('Results from sous_sujet query:', results);
                resolve(results); // Assurez-vous que `results` est un tableau
            });
        });
    }
}
