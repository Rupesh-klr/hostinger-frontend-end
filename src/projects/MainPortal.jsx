// src/projects/MainPortal.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { apiRequest } from '../utils/exportUtils';
import { Navbar, Sidebar } from './';
// Import your Redux actions (ensure these are created in your store)
// import { logoutUser } from '../store/authSlice'; 

const MainPortal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 1. Get user data from Redux Store
    const { isLoggedIn, userInfo } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        try {
            // 2. Post to backend to clear server-side session
            await apiRequest('/api/logout', 'POST');

            // 3. Clear Local Storage and Redux State
            localStorage.removeItem('userToken');
            // dispatch(logoutUser()); 

            alert("Logged out successfully");
            navigate('/');
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    // src/projects/MainPortal.jsx
    // src/projects/MainPortal.jsx

    return (
        <div className="portal-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Navbar />

            <div className="content-wrapper" style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <Sidebar />

                <main
                    className='dashboard-grid'
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column', // Stack children vertically
                        padding: '20px',
                        overflowY: 'auto'
                    }}
                >
                    {/* SECTION 1: HEADER AREA */}
                    <div className="header-section" style={{ marginBottom: '40px', textAlign: 'center' }}>
                        <h1>Hello, {isLoggedIn ? userInfo?.name : 'Guest'}! Welcome to the Portal</h1>
                    </div>

                    {/* SECTION 2: CARDS VIEW AREA */}
                    <div
                        className="cards-view"
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '20px',
                            flex: 1, // This pushes the footer down
                            alignItems: 'flex-start'
                        }}
                    >
                        {/* Solar Card */}
                        <div className="card" style={styles.card}>
                            <img src="/hero-logo-VR.jpg" alt="Solar Project" style={styles.cardImg} />
                            <div style={{ padding: '15px' }}>
                                <h3>Solar Fintech Overview</h3>
                                <p>Real-time monitoring of your green energy assets.</p>
                                <button onClick={() => navigate('/solar-fintech')}>Open Dashboard</button>
                            </div>
                        </div>

                        {/* EdTech Card */}
                        <div className="card" style={styles.card}>
                            <img src="/hero-logo-VR.jpg" alt="EdTech Project" style={styles.cardImg} />
                            <div style={{ padding: '15px' }}>
                                <h3>EdTech Overview</h3>
                                <p>Real-time learning with mentors.</p>
                                <button onClick={() => navigate('/edtech')}>Open Dashboard</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
             <footer style={{
                        marginTop: 'auto', // Sticks to the bottom
                        padding: '20px 0',
                        borderTop: '1px solid #ddd',
                        textAlign: 'center',
                        color: '#777'
                    }}>
                        copyright at rupesh
                    </footer>
        </div>
    );
};

// Basic Styles
const styles = {
    navBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#2c3e50', color: 'white' },
    navMiddle: { fontSize: '1.1rem', fontStyle: 'italic' },
    logoutBtn: { backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' },
    loginBtn: { backgroundColor: '#3498db', color: 'white', border: 'none', marginRight: '10px', padding: '5px 15px', cursor: 'pointer' },
    signupBtn: { backgroundColor: '#3498db', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' },
    header: { textAlign: 'center', margin: '40px 0' },
    dashboard: { display: 'flex', justifyContent: 'center', padding: '20px' },
    card: { width: '300px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', overflow: 'hidden', border: '1px solid #ddd' },
    cardImg: { width: '100%', height: '180px', objectFit: 'cover' }
};

export default MainPortal;