import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TeamDashboard from './components/TeamDashboard';

function App() {
    return (
        <div className="App">
            <header className="App-header bg-dark text-white p-4">
                <div className="container">
                    <h1 className="text-center">Math Helpdesk Dashboard</h1>
                    <TeamDashboard />
                </div>
            </header>
        </div>
    );
}

export default App;
