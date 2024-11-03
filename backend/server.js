const express = require('express');
const cors = require('cors');
const tutorRoutes = require('./routes/tutorRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/tutors', tutorRoutes);
app.use('/api/attendance', attendanceRoutes);


// Add this at the top of server.js after app is initialized
app.get('/api/test', (req, res) => {
    res.send('Test route is working');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
