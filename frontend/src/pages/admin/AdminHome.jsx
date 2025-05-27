import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";

const AdminHome = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <LogoutButton />
            <h2>Welcome, Admin</h2>

            <p>What would you like to do?</p>

            <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "2rem" }}>
                <button onClick={() => navigate("/admin/manage")} style={buttonStyle}>
                     Manage Team
                </button>

                <button onClick={() => navigate("/admin/overview")} style={buttonStyle}>
                     View Overview
                </button>
            </div>
        </div>
    );
};

const buttonStyle = {
    padding: "1rem 2rem",
    fontSize: "1.1rem",
    cursor: "pointer",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "Orange",
    color: "white"
};

export default AdminHome;
