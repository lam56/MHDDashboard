const db = require("../config/db");

exports.findByTeam = (team) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT id, title, start, end, all_day FROM events WHERE team = ?";
        db.query(sql, [team], (err, results) => {
            if (err) return reject(err);
            const events = results.map(event => ({
                ...event,
                allDay: true
            }));
            resolve(events);
        });
    });
};

exports.create = ({ title, start, end, team, allDay = true }) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO events (title, start, end, team, all_day)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.query(sql, [title, start, end, team, allDay], (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId);
        });
    });
};

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM events WHERE id = ?";
        db.query(sql, [id], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};
