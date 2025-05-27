const NavTabs = ({ active, setActive }) => {
    return (
        <div style={{ margin: "1rem" }}>
            <button onClick={() => setActive("overview")} disabled={active === "overview"}>Overview</button>
            <button onClick={() => setActive("attendance")} disabled={active === "attendance"}>Attendance Overview</button>
            <button onClick={() => setActive("tutors")} disabled={active === "tutors"}>Tutors Overview</button>
        </div>
    );
};

export default NavTabs;
