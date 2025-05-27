import AddWorkHours from "../../components/AddWorkHours";
import AddAttendance from "../../components/AddAttendance";
import {useEffect, useState} from "react";
import axios from "axios";

const TutorHome = () => {
    const [logs, setLogs] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editDate, setEditDate] = useState("");
    const [editHours, setEditHours] = useState("");


    const fetchLogs = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/tutor/work-logs", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setLogs(res.data);
    };

    const deleteLog = async (id) => {
        const token = localStorage.getItem("token");
        if (window.confirm("Delete this work log?")) {
            await axios.delete(`http://localhost:5000/api/tutor/work-logs/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchLogs();
        }
    };
    const startEdit = (log) => {
        setEditId(log.id);
        setEditDate(log.date);
        setEditHours(log.hours_worked);
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditDate("");
        setEditHours("");
    };

    const submitEdit = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.put(`http://localhost:5000/api/tutor/work-logs/${editId}`, {
                date: editDate,
                hours: editHours,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchLogs();
            cancelEdit();
        } catch (err) {
            console.error("Update failed:", err);
        }
    };
    function formatDateLocal(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA');
    }


    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <p>Please log your working hours and attendance below:</p>

            <div style={{display: "flex", gap: "2rem", marginTop: "2rem"}}>
                <div style={{flex: 1}}>
                    <AddWorkHours/>
                </div>
                <div>
                    <h2>🕓 Your  Logs</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Hours</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {logs.map(log => (
                            <tr key={log.id}>
                                <td>
                                    {editId === log.id ? (
                                        <input type="date" value={editDate}
                                               onChange={(e) => setEditDate(e.target.value)}/>
                                    ) : (
                                        formatDateLocal(log.date)
                                    )}
                                </td>
                                <td>
                                    {editId === log.id ? (
                                        <input type="number" value={editHours}
                                               onChange={(e) => setEditHours(e.target.value)}/>
                                    ) : (
                                        log.hours_worked
                                    )}
                                </td>
                                <td>
                                    {editId === log.id ? (
                                        <>
                                            <button onClick={submitEdit}>💾</button>
                                            <button onClick={cancelEdit}>✖</button>
                                        </>
                                    ) : (
                                        <select onChange={(e) => {
                                            if (e.target.value === "edit") startEdit(log);
                                            else if (e.target.value === "delete") deleteLog(log.id);
                                        }}>
                                            <option>⋯</option>
                                            <option value="edit">Edit</option>
                                            <option value="delete">Delete</option>
                                        </select>
                                    )}</td>
                            </tr>
                        ))}
                        {logs.length === 0 && (
                            <tr>
                                <td colSpan="3">No logs found.</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div style={{flex: 1}}>
                    <AddAttendance/>
                </div>
            </div>
        </div>
    );
};

export default TutorHome;
