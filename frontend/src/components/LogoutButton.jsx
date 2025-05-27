import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");
        }
    };

    return (
        <button onClick={handleLogout} style={{ float: "right", padding: "8px 16px", margin: "10px" }}>
            Logout
        </button>
    );
};

export default LogoutButton;
