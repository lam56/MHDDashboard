const TeamSelector = ({ selected, setSelected }) => {
    const teams = ["Team EFS", "Team SON"];

    return (
        <div>
            <label>Team: </label>
            <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                {teams.map((team) => (
                    <option key={team} value={team}>{team}</option>
                ))}
            </select>
        </div>
    );
};

export default TeamSelector;
