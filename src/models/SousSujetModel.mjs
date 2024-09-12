import db from '../config/db.mjs';

export class SousSujetModel {
    static async index(callback) {
        const sql = 'SELECT * FROM soussujet'
        await db.query(sql, (err, results) => {
            if(err) callback(err, null)
            callback(null, results);
        })
    }
}
