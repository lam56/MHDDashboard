

const EventModel = require("../models/EventModel");
const UserModel = require("../models/UserModel");
const AttendanceModel = require("../models/AttendanceModel");
const { fetchTutorHours } = require("../utils/tutorHoursHelper");

exports.getAllEvents = (team) => {
    return EventModel.findByTeam(team);
};

exports.createEvent = (eventData) => {
    return EventModel.create(eventData);
};

exports.deleteEvent = (eventId) => {
    return EventModel.delete(eventId);
};

exports.getAllUsers = (team) => {
    return UserModel.findAllByTeam(team);
};

exports.createUser = (userData) => {
    return UserModel.create(userData);
};

exports.deleteUser = (userId) => {
    return UserModel.delete(userId);
};

exports.getAllAttendance = ({ team, month, year }) => {
    return AttendanceModel.findAll(team, month, year);
};

exports.getDailyAttendance = ({ team, month, year }) => {
    return AttendanceModel.findDaily(team, month, year);
};
exports.getMonthlyAttendanceTrends = (query) => {
    const { team, year } = query;

    if (!team || !year) {
        throw new Error("Missing team or year");
    }

    return AttendanceModel.getMonthlyAttendanceTrends({ team, year });
};
exports.getTutorHours = ({ team, month, year }) => {
    const selectedMonth = parseInt(month);
    const selectedYear = parseInt(year);

    const whereCondition = "u.team = ?";
    const params = [team];

    return new Promise((resolve, reject) => {
        fetchTutorHours(whereCondition, params, selectedMonth, selectedYear, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
