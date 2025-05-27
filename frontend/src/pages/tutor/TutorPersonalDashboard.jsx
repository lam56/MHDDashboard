import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart } from '@mui/x-charts';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const TutorPersonalDashboard = () => {
    const [workHours, setWorkHours] = useState(null);
    const [events, setEvents] = useState([]);
    const [team, setTeam] = useState("");

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("token");


                const profileRes = await axios.get("http://localhost:5000/api/tutor/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTeam(profileRes.data.team);


                const today = new Date();
                const month = today.getMonth();
                const year = today.getFullYear();
                const hoursRes = await axios.get(`http://localhost:5000/api/tutor/personal-work-hours?month=${month}&year=${year}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setWorkHours(hoursRes.data);


                const eventsRes = await axios.get(`http://localhost:5000/api/tutor/events`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEvents(eventsRes.data);

            } catch (err) {
                console.error("Error loading dashboard:", err.message);
            }
        };

        fetchDashboardData();
    }, []);

    if (!workHours) {
        return <div>Loading...</div>;
    }
    const remainingHours = workHours.totalTarget - workHours.totalWorked;
    //const getStatusColor = () => {
      //  const progressPercentage = (workHours.totalWorked / workHours.totalTarget) * 100;
        //if (progressPercentage >= 90) return "#4caf50";
        //if (progressPercentage >= 70) return "#ff9800";
        //return "#f44336";
    //};
    return (
        <div style={{padding: "2rem"}}>
            <h2>📈 Your Contract Work Hours</h2>


            <div style={{display: "flex", gap: "1rem", marginBottom: "1.5rem"}}>

                <div style={{flex: 1, padding: "1rem", border: "1px solid #ddd", borderRadius: "4px"}}>
                    <h3>Worked Hours</h3>
                    <div style={{fontSize: "1.5rem", fontWeight: "bold", color: "#4caf50"}}>
                        {workHours.totalWorked}
                    </div>
                    <div>Contract period</div>
                </div>


                <div style={{flex: 1, padding: "1rem", border: "1px solid #ddd", borderRadius: "4px"}}>
                    <h3>Target Hours</h3>
                    <div style={{fontSize: "1.5rem", fontWeight: "bold", color: "#2196f3"}}>
                        {workHours.totalTarget}
                    </div>
                    <div>Contract period</div>
                </div>


                <div style={{
                    flex: 1,
                    padding: "1rem",
                    border: "2px solid #ff9800",
                    borderRadius: "4px",
                    backgroundColor: "#fff3e0"
                }}>
                    <h3>Remaining Hours</h3>
                    <div style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: remainingHours <= 0 ? "#4caf50" : "#f44336"
                    }}>
                        {remainingHours <= 0 ? 0 : remainingHours}
                    </div>
                    <div>
                        {remainingHours <= 0
                            ? "✅ Contract target completed!"
                            : `Remaining for contract period`}
                    </div>
                </div>
            </div>

            <BarChart
                xAxis={[
                    {
                        scaleType: 'band',
                        data: ['Worked', 'Target'],
                    },
                ]}
                series={[
                    {
                        data: [workHours.totalWorked, workHours.totalTarget],
                        label: 'Hours',
                        color: '#4caf50',
                    },
                ]}
                height={300}
            />

            <h2 style={{marginTop: "3rem"}}>📅 Team Events - {team}</h2>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                height="70vh"
            />
        </div>
    );
};

export default TutorPersonalDashboard;
