import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            const { token } = res.data;

            const decoded = jwtDecode(token);


            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(decoded));


            if (decoded.role === "admin") {
                navigate("/admin/home");
            } else if (decoded.role === "tutor") {
                navigate("/tutor");
            } else {
                alert("Unauthorized role");
            }

        } catch (err) {
            console.error("Login error:", err.response?.data || err.message);
            alert(err.response?.data?.error || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin} style={{textAlign: "center", marginTop: "100px"}}>
            <h2>Login</h2>
            <label>Email:</label>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{display: "block", margin: "10px auto", padding: "10px"}}
            />
            <label>Password:</label>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{display: "block", margin: "10px auto", padding: "10px"}}
            />
            <button type="submit" disabled={loading} style={{padding: "10px 20px"}}>
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
};

export default Login;
