import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminHome from "./pages/admin/AdminHome";
import TutorHome from "./pages/tutor/TutorHome";
import AttendanceOverview from "./pages/admin/AttendanceOverview";
import TutorOverview from "./pages/tutor/TutorsOverview";
import ManageTeam from "./pages/admin/ManageTeam";
import CalendarPage from "./pages/admin/CalendarPage";
import CreateUser from "./pages/admin/CreateUser";
import TutorProfile from "./pages/tutor/TutorProfile";
import TutorDashboardLayout from "./pages/tutor/TutorDashboardLayout";
import TutorPersonalDashboard from "./pages/tutor/TutorPersonalDashboard";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin/home" element={<AdminHome />} />
                <Route path="/admin/overview" element={<AdminOverview />} />
                <Route path="/admin/overview/attendance" element={<AttendanceOverview />} />
                <Route path="/admin/overview/tutors" element={<TutorOverview />} />
                <Route path="/admin/manage" element={<ManageTeam />} />
                <Route path="/admin/calendar" element={<CalendarPage />} />
                <Route path="/admin/create-user" element={<CreateUser />} />

                <Route path="/attendance" element={<TutorHome />} />
                <Route path="/tutor" element={<TutorDashboardLayout />}>
                    <Route path="profile" element={<TutorProfile />} />
                    <Route path="dashboard" element={<TutorPersonalDashboard />} />
                    <Route path="logs" element={<TutorHome />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
