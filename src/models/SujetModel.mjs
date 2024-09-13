import db from '../config/db.mjs';

export class SujetModel {
    static async index(callback) {
        const sql = 'SELECT * FROM sujet'
        await db.query(sql, (err, results) => {
            if (err) callback(err, null)
            callback(null, results)
        });
    }
}
