const db = require('../config/db');

// Get all tutors
exports.getTutors = (req, res) => {
    const query = 'SELECT * FROM tutors';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.json(results);
    });
};

// Add a new tutor
exports.addTutor = (req, res) => {
    const { name, weeklyTargetHours } = req.body;
    const query = 'INSERT INTO tutors (name, weeklyTargetHours) VALUES (?, ?)';
    db.query(query, [name, weeklyTargetHours], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.json({ message: 'Tutor added successfully', tutorId: results.insertId });
    });
};
