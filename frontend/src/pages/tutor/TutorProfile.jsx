// src/pages/tutor/TutorProfile.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const TutorProfile = () => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/api/tutor/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfile(res.data);
            } catch (err) {
                console.error("Failed to load profile", err);
            }
        };
        fetchProfile();
    }, []);



    return (
        <div style={{ padding: "2rem" }}>
            <h2>👤 Tutor Profile</h2>

            <div style={{ marginBottom: "2rem" }}>
                <p><b>Name:</b> {profile.name}</p>
                <p><b>Email:</b> {profile.email}</p>
                <p><b>Team:</b> {profile.team}</p>
                <p><b>Contract Start:</b> {profile.start_date}</p>
                <p><b>Contract End:</b> {profile.end_date}</p>
                <p><b>Total Hours:</b> {profile.total_hours}</p>
                <p><b>Vacation Days:</b> {profile.vacation_days}</p>
            </div>
        </div>
    );
};

export default TutorProfile;
