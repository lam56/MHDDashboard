// frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TeamPerformance from './pages/TeamPerformance';
import ProjectPerformance from './pages/ProjectPerformance';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header">
                    <h1>Math Helpdesk Dashboard</h1>
                    <nav>
                        <Link to="/team-performance" className="nav-link">Team Performance</Link>
                        <Link to="/project-performance" className="nav-link">Project Performance</Link>
                    </nav>
                </header>

                <main>
                    <Routes>
                        <Route path="/team-performance" element={<TeamPerformance />} />
                        <Route path="/project-performance" element={<ProjectPerformance />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
