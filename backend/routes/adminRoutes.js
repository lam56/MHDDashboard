const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const { adminOnly } = require("../middleware/roles");
const { getDailyAttendance, getMonthlyAttendanceTrends} = require("../controllers/AdminController");
const { getTutorHours } = require("../controllers/AdminController");
const {getAllAttendance, createUser, getAllUsers, deleteUser, createEvent, deleteEvent, getAllEvents} = require("../controllers/AdminController");




router.get("/attendance/daily", authMiddleware, adminOnly, getDailyAttendance);
router.get("/tutor-hours",authMiddleware, adminOnly, getTutorHours)
router.get("/attendance/all", authMiddleware,adminOnly, getAllAttendance);
router.post("/create-user",authMiddleware, adminOnly, createUser);
router.get("/users",authMiddleware, adminOnly, getAllUsers);
router.delete("/delete-user/:id", authMiddleware, adminOnly,deleteUser);
router.get("/events",authMiddleware, adminOnly, getAllEvents);
router.post("/events/create", authMiddleware, adminOnly,createEvent);
router.delete("/events/:id", authMiddleware, adminOnly, deleteEvent);
router.get("/attendance/monthly-trends", authMiddleware, adminOnly, getMonthlyAttendanceTrends);





module.exports = router;
