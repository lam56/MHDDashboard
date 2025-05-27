const db = require("../config/db");

exports.addWorkHours = (tutorId, date, hours) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO work_hours (tutor_id, date, hours_worked) VALUES (?, ?, ?)";
        db.query(sql, [tutorId, date, hours], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};
exports.updateWorkLog = (id, date, hours) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE work_hours SET date = ?, hours_worked = ? WHERE id = ?";
        db.query(sql, [date, hours, id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
exports.findByTutorId = (tutorId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, date, hours_worked FROM work_hours WHERE tutor_id = ? ORDER BY date DESC`;

        db.query(sql, [tutorId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.deleteById = (logId, tutorId) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM work_hours WHERE id = ? AND tutor_id = ?`;

        db.query(sql, [logId, tutorId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};
