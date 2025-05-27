const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const MonthBar = ({ selected, setSelected }) => {
    return (
        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
            {months.map((m, i) => (
                <button
                    key={i}
                    onClick={() => setSelected(i)}
                    style={{
                        fontWeight: selected === i ? "bold" : "normal",
                        backgroundColor: selected === i ? "#4CAF50" : "#e0e0e0"
                    }}
                >
                    {m}
                </button>
            ))}
        </div>
    );
};

export default MonthBar;
