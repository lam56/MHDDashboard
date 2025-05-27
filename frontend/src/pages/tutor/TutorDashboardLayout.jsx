import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "../../components/LogoutButton";

const TutorDashboardLayout = () => {
    const [tutor, setTutor] = useState({});

    useEffect(() => {
        const fetchTutor = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/api/tutor/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("Fetched tutor profile:", res.data);
                setTutor(res.data);
            } catch (err) {
                console.error("Failed to fetch tutor profile", err);
            }
        };
        fetchTutor();
    }, []);

    return (
        <div style={{ display: "flex" }}>

            <div style={{ width: "200px", background: "#f5f5f5", minHeight: "100vh", padding: "1rem" }}>
                <h3>Menu</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    <li><Link to="/tutor/profile">Profile</Link></li>
                    <li><Link to="/tutor/dashboard">Dashboard</Link></li>
                    <li><Link to="/tutor/logs">Work Logs</Link></li>
                </ul>
            </div>


            <div style={{flex: 1, padding: "2rem"}}>
                <h2>Welcome, {tutor?.name || "Loading..."} 👋</h2>
                <LogoutButton />

                <Outlet/>
            </div>
        </div>
    );
};

export default TutorDashboardLayout;
