const EventModel = require("../models/EventModel");
const WorkHoursModel = require("../models/WorkHoursModel");
const AttendanceModel = require("../models/AttendanceModel");
const UserModel = require("../models/UserModel");
const { fetchTutorHours } = require("../utils/tutorHoursHelper");

exports.getTutorEvents = (team) => {
    if (!team) {
        throw new Error("Team not found for this tutor.");
    }
    return EventModel.findByTeam(team);
};

exports.getPersonalTutorHours = (tutorId, { month, year }) => {
    const selectedMonth = parseInt(month);
    const selectedYear = parseInt(year);

    const whereCondition = "u.id = ?";
    const params = [tutorId];

    return new Promise((resolve, reject) => {
        fetchTutorHours(whereCondition, params, selectedMonth, selectedYear, (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) return reject(new Error("Tutor not found"));
            resolve(results[0]);
        });
    });
};

exports.getTutorProfile = (tutorId) => {
    return UserModel.findProfileById(tutorId);
};

exports.workHours = async (tutorId, { date, hours }) => {
    const workDate = new Date(date);
    const today = new Date();
    workDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (isNaN(workDate)) throw new Error("Invalid date format.");
    if (workDate > today) throw new Error("Cannot log work hours for future dates.");
    if (workDate.getDay() === 0 || workDate.getDay() === 6) throw new Error("Cannot log work hours on weekends.");

    await WorkHoursModel.addWorkHours(tutorId, date, hours);
};
exports.getWorkLogs = async (tutorId) => {
    return await WorkHoursModel.findByTutorId(tutorId);
};


exports.deleteWorkLog = async (tutorId, logId) => {
    const result = await WorkHoursModel.deleteById(logId, tutorId);

    if (result.affectedRows === 0) {
        throw new Error("Work log not found or you don't have permission to delete it");
    }

    return result;
};
exports.updateWorkLog = (id, date, hours) => {
    return WorkHoursModel.updateWorkLog(id, date, hours);
};
exports.attendance = async (tutorId, { date, student_count, topics, session_type, notes }) => {
    const workDate = new Date(date);

    if (!date || !student_count || !topics) {
        throw new Error("Please fill in all required fields.");
    }
    if (isNaN(workDate)) throw new Error("Invalid date format.");
    if (workDate.getDay() === 0 || workDate.getDay() === 6) throw new Error("Cannot log attendance on weekends.");

    await AttendanceModel.addAttendance(tutorId, date, student_count, topics, session_type, notes);
};
