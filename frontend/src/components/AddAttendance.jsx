import { useState } from "react";
import axios from "axios";

const AddAttendance = () => {
    const [date, setDate] = useState("");
    const [students, setStudents] = useState("");
    const [topics, setTopics] = useState("");
    const [sessionType, setSessionType] = useState("");
    const [notes, setNotes] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {


            await axios.post("http://localhost:5000/api/tutor/attendance", {
                date,
                student_count: Number(students),
                topics,
                sessionType,
                notes
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            alert("Attendance submitted!");
        } catch (err){
            if (err.response) {
                alert(`❌ Error: ${err.response.data.error || "Server error"}`);
            } else if (err.request) {
                alert("❌ Network error. Please try again.");
            } else {
                alert(`❌ Unexpected error: ${err.message}`);
            }
        }
        setDate("");
        setStudents("");
        setTopics("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add Attendance</h3>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
            <input type="number" value={students} onChange={(e) => setStudents(e.target.value)}
                   placeholder="Students Helped" required/>
            <input type="text" value={topics} onChange={(e) => setTopics(e.target.value)} placeholder="Topics"
                   required/>
            <div>
                <label>Session Type:</label>
                <select value={sessionType} onChange={(e) => setSessionType(e.target.value)} required>
                    <option value="">Select</option>
                    <option value="Group">Group</option>
                    <option value="1-on-1">1-on-1</option>
                </select>
            </div>

            <div>
                <label>Notes:</label>
                <select value={notes} onChange={(e) => setNotes(e.target.value)}>
                    <option value="">None</option>
                    <option value="Exam prep">Exam prep</option>
                    <option value="New student">New student</option>
                    <option value="Revision">Revision</option>
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddAttendance;
