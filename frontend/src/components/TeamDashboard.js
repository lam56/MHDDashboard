import React, { useEffect, useState } from 'react';
import { fetchTutors } from '../services/tutorService';

const TeamDashboard = () => {
    const [tutors, setTutors] = useState([]);

    useEffect(() => {
        const getTutors = async () => {
            const data = await fetchTutors();
            setTutors(data);
        };
        getTutors();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Team Performance</h2>
            <div className="list-group">
                {tutors.map((tutor) => (
                    <div key={tutor.id} className="list-group-item">
                        <h5 className="mb-1">{tutor.name}</h5>
                        <p className="mb-1"><strong>Weekly Target Hours:</strong> {tutor.weeklyTargetHours}</p>
                        <p className="mb-1"><strong>Actual Hours Worked:</strong> {tutor.actualHoursWorked}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamDashboard;
