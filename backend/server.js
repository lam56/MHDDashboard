const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const tutorRoutes = require('./routes/tutorRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/tutors', tutorRoutes);

// Sample route to test server
app.get('/', (req, res) => {
    res.send('Mathe Helpdesk API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
