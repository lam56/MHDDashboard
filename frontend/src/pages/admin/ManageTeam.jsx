// src/pages/admin/ManageTeam.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TeamSelector from "../../components/TeamSelector";
import LogoutButton from "../../components/LogoutButton";



const ManageTeam = () => {
    const [team, setTeam] = useState("Team EFS");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/api/admin/delete-user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });


            setUsers(prev => prev.filter(u => u.id !== userId));
            alert("User deleted");
        } catch (err) {
            console.error("Error deleting user:", err.message);
            alert("Failed to delete user");
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:5000/api/admin/users?team=${team}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(res.data);
            } catch (err) {
                console.error("Error fetching team:", err.message);
            }
        };

        fetchUsers();
    }, [team]);

    return (
        <div style={{padding: "2rem"}}>
            <TeamSelector selected={team} setSelected={setTeam}/>
            <LogoutButton/>

            <Typography variant="h5" gutterBottom>👥 Team Management</Typography>

            <div style={{display: "flex", justifyContent: "flex-start", marginBottom: "1rem", gap: "1rem"}}>
                <button onClick={() => navigate("/admin/create-user")}>➕ Create New User</button>
                <button onClick={() => navigate("/admin/calendar")}>📅 Calendar</button>
            </div>

            <TableContainer component={Paper} style={{marginTop: "1rem"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Total Hours</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.start_date?.split("T")[0] || "-"}</TableCell>
                                <TableCell>{user.end_date?.split("T")[0] || "-"}</TableCell>
                                <TableCell>{user.total_hours || "-"}</TableCell>
                                <TableCell>
                                    <span onClick={() => handleDelete(user.id)}
                                          style={{color: "red", cursor: "pointer"}}>DELETE</span><br/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ManageTeam;
