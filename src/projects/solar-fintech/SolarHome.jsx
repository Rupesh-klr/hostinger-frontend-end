// src/projects/solar-fintech/SolarHome.jsx
import React, { useEffect, useState } from 'react';
import { downloadAsCSV , apiRequest } from '../../utils/exportUtils';
import TestTempalte from '../../components/TestTempalte';
// import { downloadAsCSV , apiRequest } from '../../utils/exportUtils';

const SolarHome = () => {
    const [panelData, setPanelData] = useState([]);

    useEffect(() => {
        const fetchSolarStats = async () => {
            try {
                // Using the central bridge for a GET call
                const data = await apiRequest('/api/solar/stats');
                setPanelData(data);
            } catch (err) {
                console.error("Failed to load Solar data");
            }
        };
        fetchSolarStats();
    }, []);

    return (
        <div style={{ padding: '20px', borderLeft: '5px solid green' }}>
            <h1>Solar Fintech Dashboard</h1>
            <p>Managing renewable energy investments via Hostinger Backend.</p>
            
            <button onClick={() => downloadAsCSV(panelData, 'solar_investments.csv')}>
                Export to CSV
            </button>

            <div className="stats-grid">
                {/* {panelData.map(item => (
                    <div key={item.id} className="card">
                        <h3>{item.location}</h3>
                        <p>Output: {item.kilowatts} kWh</p>
                    </div>
                ))} */}
                sample text
            </div>
            <TestTempalte />
            <h1>Solar Home Component</h1>
        </div>
    );
};

export default SolarHome;