import { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography
} from "@mui/material";
import axios from "axios";
import TeamSelector from "../../components/TeamSelector";
import MonthBar from "../../components/MonthBar";
import LogoutButton from "../../components/LogoutButton";
import { useNavigate } from "react-router-dom";

const TutorOverview = () => {
    const [tutors, setTutors] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState("Team EFS");
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTutorData = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:5000/api/admin/tutor-hours?team=${selectedTeam}&month=${selectedMonth}&year=${selectedYear}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTutors(res.data);
            } catch (err) {
                console.error("Failed to load tutor data:", err.message);
            }
        };

        fetchTutorData();
    }, [selectedTeam, selectedMonth, selectedYear]);

    return (
        <div style={{ padding: "2rem" }}>
            <TeamSelector selected={selectedTeam} setSelected={setSelectedTeam} />
            <LogoutButton />
            <div style={{ marginTop: "1rem" }}>
                <button onClick={() => navigate("/admin/overview")}>Overview</button>
                <button onClick={() => navigate("/admin/overview/attendance")}>Attendance</button>
                <button onClick={() => navigate("/admin/overview/tutors")}>Tutors</button>
            </div>

            <MonthBar selected={selectedMonth} setSelected={setSelectedMonth} />
            <div style={{ marginTop: "1rem" }}>
                <label style={{ marginRight: "0.5rem" }}>Year:</label>
                <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                </select>
            </div>

            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
                👥 Tutor Hours Overview
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Actual Hours</TableCell>
                            <TableCell>Target (Month)</TableCell>
                            <TableCell>Total Worked(from Contract start)</TableCell>
                            <TableCell>Total Target(from Contract start)</TableCell>
                            <TableCell>Hours Left</TableCell>
                            <TableCell>Progress</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tutors.map((tutor, index) => {
                            const progress = Math.round((tutor.actual / tutor.target) * 100);
                            const status = progress >= 100 ? "🟢 Ahead" : progress >= 70 ? "🟡 OK" : "🔴 Behind";

                            return (
                                <TableRow key={index}>
                                    <TableCell>{tutor.name}</TableCell>
                                    <TableCell>{tutor.actual}</TableCell>
                                    <TableCell>{tutor.target}</TableCell>
                                    <TableCell>{tutor.totalWorked}</TableCell>
                                    <TableCell>{tutor.totalTarget}</TableCell>
                                    <TableCell>{tutor.hoursLeft}</TableCell>
                                    <TableCell>{progress}%</TableCell>
                                    <TableCell>{status}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TutorOverview;
