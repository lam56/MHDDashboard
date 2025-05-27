import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "tutor",
        team: "Team EFS",
        startDate: "",
        endDate: "",
        totalHours: "",
        vacationDays: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:5000/api/admin/create-user", formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("User created successfully!");
            navigate("/admin/manage");
        } catch (err) {
            console.error("Failed to create user:", err.message);
            alert("Error creating user");
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Create New User</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="admin">Admin</option>
                    <option value="tutor">Tutor</option>
                </select>
                <input type="text" name="team" placeholder="Team" value={formData.team} onChange={handleChange} required />
                <label>Contract Start Date:</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                <label>Contract End Date:</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
                <input type="number" name="totalHours" placeholder="Total Contract Hours" value={formData.totalHours} onChange={handleChange} required />
                <input type="number" name="vacationDays" placeholder="Vacation Days" value={formData.vacationDays} onChange={handleChange} />

                <button type="submit" style={{ marginTop: "1rem" }}>Create User</button>
            </form>
        </div>
    );
};

export default CreateUser;
