// src/models/sujet.mjs
import db from '../config/db.mjs';

export class Sujet {
    static async findAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM sujet', (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results); // Assurez-vous que 'results' est un tableau
            });
        });
    }
}
