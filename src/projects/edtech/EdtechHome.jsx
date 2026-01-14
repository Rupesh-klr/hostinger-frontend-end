// src/projects/edtech-project/EdtechHome.jsx
import React, { useState } from 'react';
import { apiRequest } from '../../utils/exportUtils';

const EdtechHome = () => {
    const [studentName, setStudentName] = useState('');

    const handleEnroll = async (e) => {
        e.preventDefault();
        try {
            // Using the central bridge for a POST call with a body
            const response = await apiRequest('/api/edtech/enroll', 'POST', { 
                name: studentName,
                timestamp: new Date()
            });
            alert(`Success: ${response.message}`);
        } catch (err) {
            alert("Enrollment failed: " + err.message);
        }
    };

    return (
        <div style={{ padding: '20px', borderLeft: '5px solid blue' }}>
            <h1>EdTech Learning Portal</h1>
            <form onSubmit={handleEnroll}>
                <input 
                    type="text" 
                    placeholder="Enter Student Name" 
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                />
                <button type="submit">Enroll Student</button>
            </form>
        </div>
    );
};

export default EdtechHome;