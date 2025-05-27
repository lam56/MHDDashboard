import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import TeamSelector from "../../components/TeamSelector";
import MonthBar from "../../components/MonthBar";
import OverviewGraphs from "../../components/OverviewGraphs";
import LogoutButton from "../../components/LogoutButton";



const AdminOverview = () => {
    const [selectedTeam, setSelectedTeam] = useState("Team EFS");
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const [attendance, setAttendance] = useState([]);
    const [tutorHours,setTutorHours] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    `http://localhost:5000/api/admin/attendance/daily?team=${selectedTeam}&month=${selectedMonth}&year=${selectedYear}`,
                    {
                        headers: {Authorization: `Bearer ${token}`},
                    }
                );
                setAttendance(res.data.map(entry => ({
                        ...entry,
                        date: entry.date.split("T")[0]
                    }))
                );
                console.log("📊 Attendance data:", res.data);


            } catch (err) {
                console.error("Failed to fetch attendance:", err.message);
            }
        };
        const fetchTutorHours = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    `http://localhost:5000/api/admin/tutor-hours?team=${selectedTeam}&month=${selectedMonth}&year=${selectedYear}`,
                    {
                        headers: {Authorization: `Bearer ${token}`},
                    }
                );
                setTutorHours(res.data);

                console.log("📊 tutor data:", res.data);

            } catch
                (err) {
                console.error("Failed to fetch wh:", err.message);

            }
        };

        fetchAttendance();
        fetchTutorHours();

    }, [selectedTeam, selectedMonth]);

    return (
        <div style={{padding: "2rem"}}>
            <TeamSelector selected={selectedTeam} setSelected={setSelectedTeam}/>
            <LogoutButton/>
            <div style={{marginTop: "1rem"}}>
                <button onClick={() => navigate("/admin/overview")}>Overview</button>
                <button onClick={() => navigate("/admin/overview/attendance")}>Attendance Details</button>
                <button onClick={() => navigate("/admin/overview/tutors")}>Tutors Details</button>
            </div>

            <MonthBar selected={selectedMonth} setSelected={setSelectedMonth}/>
            <div style={{marginTop: "1rem"}}>
                <label style={{marginRight: "0.5rem"}}>Year:</label>
                <select value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))}>
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                </select>
            </div>

            <OverviewGraphs attendance={attendance} tutorHours={tutorHours}/>

        </div>
    );
};

export default AdminOverview;
