const express = require("express");
const {updateWorkLog,workHours,attendance, getTutorProfile, getPersonalTutorHours, getTutorEvents, getWorkLogs, deleteWorkLog}= require("../controllers/TutorController");
const {authMiddleware} = require("../middleware/auth");

const router = express.Router();

router.get("/personal-work-hours", authMiddleware, getPersonalTutorHours);

router.post("/work-hours",authMiddleware,workHours) ;
router.post("/attendance",authMiddleware,attendance);
router.get("/profile", authMiddleware, getTutorProfile);
router.get("/events", authMiddleware, getTutorEvents);
router.get("/work-logs", authMiddleware, getWorkLogs);
router.delete("/work-logs/:id", authMiddleware, deleteWorkLog);
router.put('/work-logs/:id', authMiddleware, updateWorkLog);

module.exports = router;