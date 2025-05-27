const db = require("../config/db");

exports.findByEmail = (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], callback);
};

exports.findAllByTeam = (team) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT u.id, u.name, u.email, u.role, u.team,
                   c.start_date, c.end_date, c.total_hours
            FROM users u
            LEFT JOIN contracts c ON u.id = c.tutor_id
            WHERE u.team = ?
        `;
        db.query(sql, [team], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.findProfileById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT u.name, u.email, u.team, c.start_date, c.end_date, c.total_hours, c.vacation_days
            FROM users u
            LEFT JOIN contracts c ON u.id = c.tutor_id
            WHERE u.id = ?
        `;
        db.query(sql, [id], (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) return reject(new Error("Tutor not found"));
            resolve(results[0]);
        });
    });
};

exports.create = (userData) => {
    return new Promise((resolve, reject) => {
        const { name, email, password = '', team, role, startDate, endDate, totalHours, vacationDays = 0 } = userData;

        const userSql = `INSERT INTO users (name, email, password, team, role) VALUES (?, ?, ?, ?, ?)`;

        db.query(userSql, [name, email, password, team, role.toLowerCase()], (err, userResult) => {
            if (err) return reject(err);

            const tutorId = userResult.insertId;
            const contractSql = `
                INSERT INTO contracts (tutor_id, start_date, end_date, total_hours, vacation_days)
                VALUES (?, ?, ?, ?, ?)
            `;
            db.query(contractSql, [tutorId, startDate, endDate, totalHours, vacationDays], (err2) => {
                if (err2) return reject(err2);
                resolve();
            });
        });
    });
};

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM users WHERE id = ?";
        db.query(sql, [id], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};
