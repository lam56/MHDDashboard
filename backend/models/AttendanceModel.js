const db = require("../config/db");

exports.addAttendance = (tutorId, date, student_count, topics, session_type, notes) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO attendance (tutor_id, date, student_count, topics, session_type, notes)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(sql, [tutorId, date, student_count, topics, session_type, notes], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};

exports.findAll = (team, month, year) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT DATE_FORMAT(a.date, '%Y-%m-%d') as date, a.student_count, a.topics, a.session_type, a.notes
            FROM attendance a
            JOIN users u ON a.tutor_id = u.id
            WHERE u.team = ? AND MONTH(a.date) = ? AND YEAR(a.date) = ?
            ORDER BY a.date DESC
        `;
        db.query(sql, [team, parseInt(month) + 1, parseInt(year)], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.findDaily = (team, month, year) => {
    return new Promise((resolve, reject) => {
        const selectedYear = parseInt(year);
        const selectedMonth = parseInt(month);

        const start = new Date(selectedYear, selectedMonth, 1);
        const end = new Date(selectedYear, selectedMonth + 1, 1);

        const startStr = start.toISOString().split('T')[0];
        const endStr = end.toISOString().split('T')[0];

        const sql = `
            SELECT DATE_FORMAT(a.date, '%Y-%m-%d') as date, SUM(a.student_count) as students
            FROM attendance a
            JOIN users u ON a.tutor_id = u.id
            WHERE u.team = ? AND a.date >= ? AND a.date < ?
            GROUP BY DATE_FORMAT(a.date, '%Y-%m-%d')
            ORDER BY DATE_FORMAT(a.date, '%Y-%m-%d')
        `;
        db.query(sql, [team, startStr, endStr], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
exports.getMonthlyAttendanceTrends = ({ team, year }) => {
    return new Promise((resolve, reject) => {
        const todayStr = new Date().toISOString().split("T")[0];

        const sql = `
            SELECT MONTH(date) AS month, SUM(student_count) AS total_students
            FROM attendance a
            JOIN users u ON a.tutor_id = u.id
            WHERE u.team = ? AND YEAR(date) = ? AND date <= ?
            GROUP BY MONTH(date)
            ORDER BY month
        `;

        db.query(sql, [team, parseInt(year), todayStr], (err, results) => {
            if (err) return reject(err);

            const data = Array(12).fill(0);
            results.forEach(row => {
                data[row.month - 1] = row.total_students;
            });

            resolve(data);
        });
    });
};
