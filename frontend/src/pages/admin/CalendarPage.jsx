import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import LogoutButton from "../../components/LogoutButton";

const CalendarPage = () => {
    const [events, setEvents] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState("Team EFS"); // default team
    const [showHints, setShowHints] = useState(true);
    useEffect(() => {
        fetchEvents();
    }, [selectedTeam]); // whenever selectedTeam changes, reload events

    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`http://localhost:5000/api/admin/events?team=${selectedTeam}`,{
                headers: { Authorization: `Bearer ${token}` },
            });

            setEvents(res.data);
        } catch (err) {
            console.error("Failed to fetch events", err);
        }
    };

    const handleDateSelect = async (selectInfo) => {
        const title = prompt("Enter event title");
        const calendarApi = selectInfo.view.calendar;
        calendarApi.unselect();

        if (title) {
            const newEvent = {
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                team: selectedTeam,
                allDay: true,

            };

            try {
                const token = localStorage.getItem("token");
                const res = await axios.post("http://localhost:5000/api/admin/events/create", newEvent, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEvents((prev) => [...prev, { ...newEvent, id: res.data.id }]);
            } catch (err) {
                console.error("Event creation failed", err);
            }
        }
    };

    const handleEventClick = async (clickInfo) => {
        if (window.confirm(`Delete event '${clickInfo.event.title}'?`)) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`http://localhost:5000/api/admin/events/${clickInfo.event.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                clickInfo.event.remove();
                await fetchEvents();
            } catch (err) {
                console.error("Deletion failed", err);
            }
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <LogoutButton />

            <h2>📅 Team Calendar</h2>
            {showHints && (
                <div>
                    <button
                        style={{float: "right"}}
                        onClick={() => setShowHints(false)}
                        title="Hide hints"
                    >
                        ✕
                    </button>
                    <div>📝 How to use this calendar:</div>
                    <ul>
                        <li><strong>Create an event:</strong> Click on any day to add a new event</li>
                        <li><strong>Multiple events:</strong> You can create multiple events on the same day</li>
                        <li><strong>Delete an event:</strong> Click on an existing event to delete it</li>
                    </ul>
                </div>
            )}

            <div style={{marginBottom: "1rem"}}>
                <label>Select Team:</label>
                <select
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                    style={{ marginLeft: "1rem", padding: "0.5rem" }}
                >
                    <option value="Team EFS">Team EFS</option>
                    <option value="Team SON">Team SON</option>

                </select>
            </div>


            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                selectable={true}
                select={handleDateSelect}
                events={events}
                eventClick={handleEventClick}
                height="80vh"
            />
        </div>
    );
};

export default CalendarPage;
