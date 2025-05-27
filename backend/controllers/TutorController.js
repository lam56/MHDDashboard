const TutorService = require("../services/TutorService");

exports.getTutorEvents = async (req, res) => {
    try {
        const events = await TutorService.getTutorEvents(req.user.team);
        res.json(events);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPersonalTutorHours = async (req, res) => {
    try {
        const hours = await TutorService.getPersonalTutorHours(req.user.id, req.query);
        res.json(hours);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTutorProfile = async (req, res) => {
    try {
        const profile = await TutorService.getTutorProfile(req.user.id);
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.workHours = async (req, res) => {
    try {
        await TutorService.workHours(req.user.id, req.body);
        res.json({ message: "Work hours added" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.attendance = async (req, res) => {
    try {
        await TutorService.attendance(req.user.id, req.body);
        res.json({ message: "Attendance added" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getWorkLogs = async (req, res) => {
    try {
        const workLogs = await TutorService.getWorkLogs(req.user.id);
        res.json(workLogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteWorkLog = async (req, res) => {
    try {
        await TutorService.deleteWorkLog(req.user.id, req.params.id);
        res.json({ message: "Work log deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateWorkLog = async (req, res) => {
    const { id } = req.params;
    const { date, hours } = req.body;

    if (!date || !hours) {
        return res.status(400).json({ message: "Date and hours are required." });
    }

    try {
        await TutorService.updateWorkLog(id, date, hours);
        res.json({ message: "Work log updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during update." });
    }
};
