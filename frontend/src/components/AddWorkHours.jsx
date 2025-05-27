import { useState } from "react";
import axios from "axios";

const AddWorkHours = () => {
    const [date, setDate] = useState("");
    const [hours, setHours] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {


            await axios.post("http://localhost:5000/api/tutor/work-hours", {
                date, hours: Number(hours)
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            alert("Work hours logged successfully!");
            setDate("");
            setHours("");
        } catch (err) {
            console.error("Failed to submit work hours:", err);

            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("Something went wrong while logging hours.");
            }
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <h3>Add Work Hours</h3>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="Hours" required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddWorkHours;
