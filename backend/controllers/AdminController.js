const AdminService = require("../services/AdminService");
exports.getAllEvents = async (req, res) => {
    try {
        const events = await AdminService.getAllEvents(req.query.team);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const eventId = await AdminService.createEvent(req.body);
        res.status(201).json({ message: "Event created", id: eventId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        await AdminService.deleteEvent(req.params.id);
        res.json({ message: "Event deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await AdminService.getAllUsers(req.query.team);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        await AdminService.createUser(req.body);
        res.status(201).json({ message: "User created successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await AdminService.deleteUser(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllAttendance = async (req, res) => {
    try {
        const attendance = await AdminService.getAllAttendance(req.query);
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDailyAttendance = async (req, res) => {
    try {
        const dailyAttendance = await AdminService.getDailyAttendance(req.query);
        res.json(dailyAttendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTutorHours = async (req, res) => {
    try {
        const hours = await AdminService.getTutorHours(req.query);
        res.json(hours);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getMonthlyAttendanceTrends = async (req, res) => {
    try {
        const trends = await AdminService.getMonthlyAttendanceTrends(req.query);
        res.json(trends);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
