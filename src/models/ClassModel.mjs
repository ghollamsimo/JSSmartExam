import db from '../config/settings.mjs'

class ClassModel {
    static index(callback) {
        const sql = "SELECT * FROM classeformateur";
        db.query(sql, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }
}

export default ClassModel;
