// src/projects/auth/LoginPage.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../'; // Importing from your barrel index.js
import { apiRequest } from '../../utils/exportUtils';
import logo from '@/assets/svg/google-icon-logo-svgrepo-com.svg'; // If logo is in src

const LoginPage = ({ type, subRoot }) => {
    const dispatch = useDispatch(); // CRITICAL: Initialize dispatch here
    const { isLoggedIn } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    // Handle Google Auth via Popup (as we discussed for cross-domain)
    const handleGoogleLogin = () => {
        const width = 500, height = 600;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        const currentFrontend = window.location.origin;
// window.open(authUrl, "google-auth", "width=500,height=600");
        // Open the backend auth in a new window
        const authUrl = `https://dodgerblue-hare-128861.hostingersite.com/auth/google?origin=${currentFrontend}`;
    const popup = window.open(
        // "https://dodgerblue-hare-128861.hostingersite.com/auth/google",
        authUrl,
        "google-auth",
        `width=${width},height=${height},left=${left},top=${top}`
    );

    // Listen for the "Success" message from the popup
    window.addEventListener("message", (event) => {
        // if (event.origin !== "https://dodgerblue-hare-128861.hostingersite.com") return;

        // if (event.data.type === "AUTH_SUCCESS") {
        //     const userData = event.data.user;
        //     // Update Redux and LocalStorage
        //     dispatch(loginUser(userData));
        //     popup.close();
        //     navigate('/dashboard');
    // }
        if (!event.data || event.data.type !== "AUTH_SUCCESS") return;

        // Now 'dispatch' will be recognized
        dispatch(loginUser(event.data.user)); 
        navigate('/dashboard');
        
    }, { once: true });
        // The popup will handle the postMessage to update your state
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Email Login is Coming Soon! Please use Google Login.");
    };

    return (
        <div className="auth-page" style={styles.pageContainer}>
            <Navbar />

            <main style={styles.mainContent}>
                <div style={styles.loginCard}>
                    <h2 style={{ textAlign: 'center' }}>{type} Login</h2>
                    <p style={{ textAlign: 'center', color: '#666' }}>Welcome back to our platform</p>

                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                style={styles.input}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                style={styles.input}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        <button type="submit" style={styles.submitBtn}>
                            Login with Email
                        </button>
                    </form>

                    <div style={styles.divider}>
                        <span style={styles.dividerLine}></span>
                        <span style={styles.dividerText}>OR</span>
                        <span style={styles.dividerLine}></span>
                    </div>

                    <div style={{justifyContent: 'center',  display: 'flex'}} >

                        {/* Google Login Button */}
                        <button onClick={handleGoogleLogin} style={styles.googleBtn}>
                            <img src={logo}
                                alt="Google" width="50" height="50" style={{ marginRight: '10px' }} />
                            Sign in with Google
                        </button>
                    </div>

                    <p style={styles.footerText}>
                        Don't have an account? <span style={{ color: '#3498db', cursor: 'pointer' }} onClick={() => navigate(`/${subRoot}/signup`)}>Sign up</span>
                    </p>
                </div>
            </main>
        </div>
    );
};

const styles = {
    pageContainer: { display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f4f7f6' },
    mainContent: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' },
    loginCard: { background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px' },
    form: { display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
    input: { padding: '12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem' },
    submitBtn: { padding: '12px', background: '#2c3e50', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    divider: { display: 'flex', alignItems: 'center', margin: '25px 0', gap: '10px' },
    dividerLine: { flex: 1, height: '1px', background: '#eee' },
    dividerText: { color: '#999', fontSize: '0.8rem' },
    googleBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', background: '#fff', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' },
    footerText: { textAlign: 'center', marginTop: '25px', fontSize: '0.9rem', color: '#777' }
};

export default LoginPage;