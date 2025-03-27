import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminOverview from "./pages/AdminOverview";
import AdminHome from "./pages/AdminHome";
import TutorHome from "./pages/TutorHome";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin/home" element={<AdminHome />} />
                <Route path="/tutor/home" element={<TutorHome />} />
                <Route path="/admin/overview" element={<AdminOverview />} />
            </Routes>
        </Router>
    );
}

export default App;
