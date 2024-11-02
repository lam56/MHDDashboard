const express = require('express');
const { getTutors, addTutor } = require('../controllers/tutorController');
const router = express.Router();

router.get('/', getTutors); // Get all tutors
router.post('/add', addTutor); // Add a new tutor

module.exports = router;
