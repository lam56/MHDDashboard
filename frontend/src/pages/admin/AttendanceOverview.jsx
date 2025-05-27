import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TeamSelector from "../../components/TeamSelector";
import MonthBar from "../../components/MonthBar";
import LogoutButton from "../../components/LogoutButton";
import { LineChart } from '@mui/x-charts';

const AttendanceOverview = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState("Team EFS");
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedYear, setSelectedYear] = useState(2025);
    const [selectedTopic, setSelectedTopic] = useState("All");
    const [selectedDate, setSelectedDate] = useState("All");
    const [monthlyTrends, setMonthlyTrends] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:5000/api/admin/attendance/all?team=${selectedTeam}&month=${selectedMonth}&year=${selectedYear}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("📦 Raw attendance API response:", res.data);
                setAttendanceData(res.data);
            } catch (error) {
                console.error("Failed to fetch attendance:", error.message);
            }
        };

        fetchAttendance();
        console.log("🔍 AttendanceOverview loaded");

    }, [selectedTeam, selectedMonth, selectedYear]);
    useEffect(() => {
        const fetchMonthlyTrends = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:5000/api/admin/attendance/monthly-trends?team=${selectedTeam}&year=${selectedYear}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMonthlyTrends(res.data);
            } catch (err) {
                console.error("Failed to fetch trends", err.message);
            }
        };

        fetchMonthlyTrends();
    }, [selectedTeam, selectedYear]);
    const filteredData = attendanceData.filter(row =>
        (selectedTopic === "All" || row.topics === selectedTopic) &&
        (selectedDate === "All" || row.date === selectedDate)
    );
    const totalStudentCount = filteredData.reduce((sum, row) => sum + row.student_count, 0);

    return (
        <div style={{padding: "2rem"}}>
            <TeamSelector selected={selectedTeam} setSelected={setSelectedTeam}/>
            <LogoutButton/>
            <div style={{marginTop: "1rem"}}>
                <button onClick={() => navigate("/admin/overview")}>Overview</button>
                <button onClick={() => navigate("/admin/overview/attendance")}>Attendance</button>
                <button onClick={() => navigate("/admin/overview/tutors")}>Tutors</button>
            </div>

            <MonthBar selected={selectedMonth} setSelected={setSelectedMonth}/>

            <div style={{marginTop: "1rem"}}>
                <label style={{marginRight: "0.5rem"}}>Year:</label>
                <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                </select>
            </div>
            <div style={{marginTop: "1rem", display: "flex", gap: "2rem", alignItems: "center"}}>
                <div>
                    <label style={{marginRight: "0.5rem"}}>Topic:</label>
                    <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
                        <option value="All">All</option>
                        {[...new Set(attendanceData.map(a => a.topics))].map((topic, idx) => (
                            <option key={idx} value={topic}>{topic}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={{marginRight: "0.5rem"}}>Date:</label>
                    <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                        <option value="All">All</option>
                        {[...new Set(attendanceData.map(a => a.date))].map((date, idx) => (
                            <option key={idx} value={date}>{date}</option>
                        ))}
                    </select>
                </div>
            </div>


            <Typography variant="h5" gutterBottom>
                📅 Attendance
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Student Count</TableCell>
                            <TableCell>Topics</TableCell>
                            <TableCell>Session Type</TableCell>
                            <TableCell>Notes</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                        filteredData.map((row, index) => (

                            <TableRow key={index}>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.student_count}</TableCell>
                                <TableCell>{row.topics}</TableCell>
                                <TableCell>{row.session_type || "-"}</TableCell>
                                <TableCell>{row.notes || "-"}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell><strong>Total</strong></TableCell>
                            <TableCell><strong>{totalStudentCount}</strong></TableCell>
                            <TableCell />
                            <TableCell />
                            <TableCell />
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h6" style={{ marginTop: "3rem" }}>
                📈 Student Attendance Trend in {selectedYear}
            </Typography>
            <LineChart
                xAxis={[{
                    scaleType: 'point',
                    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                }]}
                series={[{
                    data: monthlyTrends,
                    label: "Total Students",
                    color: "#1976d2"
                }]}
                height={300}
            />
        </div>
    );
};

export default AttendanceOverview;
