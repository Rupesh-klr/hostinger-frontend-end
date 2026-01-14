import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '../../store/authSlice'; // ADDED: logoutUser
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../'; 
import logo from '@/assets/svg/google-icon-logo-svgrepo-com.svg';

const LoginPage = ({ type, subRoot }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({ email: '', password: '' });

  console.log("App Component is rendering..-----.");
//   useEffect(() => {
//     // This log SHOULD print now
//     console.log("✅ Setting up message listener for auth popup");

//     const handleMessage = (event) => {
//       if (event.origin !== "https://dodgerblue-hare-128861.hostingersite.com") return;

//       if (event.data?.type === "AUTH_SUCCESS") {
//         const user = event.data.user;
//         const formattedUser = {
//           ...user,
//           name: user?.name?.givenName || user?.displayName || "User"
//         };

//         localStorage.setItem('userInfo', JSON.stringify(formattedUser));
//         dispatch(loginUser(formattedUser));
//         navigate('/main-portal');
//       }
//     };

//     window.addEventListener("message", handleMessage);
//     return () => window.removeEventListener("message", handleMessage);
//   }, [dispatch, navigate]);
    // SECTION: Cross-Tab Session Sync
    // useEffect(() => {
    //     const authChannel = new BroadcastChannel('auth_sync');
    //     authChannel.onmessage = (event) => {
    //         console.log("Syncing message received in this tab:", event.data);
    //         if (event.data.type === 'LOGIN') {
    //             dispatch(loginUser(event.data.user)); // Syncs Redux
    //         } else if (event.data.type === 'LOGOUT') {
    //             dispatch(logoutUser()); // Syncs Logout
    //         }
    //     };

    //     return () => authChannel.close();
    //     // const syncLogout = (event) => {
    //     //     // Synchronize logout/login across different browser tabs
    //     //     if (event.key === 'userInfo' && !event.newValue) {
    //     //         dispatch(logoutUser());
    //     //         navigate('/login');
    //     //     }
    //     //     if (event.key === 'userInfo' && event.newValue) {
    //     //         dispatch(loginUser(JSON.parse(event.newValue)));
    //     //     }
    //     // };

    //     window.addEventListener('storage', syncLogout);
    //     return () => window.removeEventListener('storage', syncLogout);
    // }, [dispatch, navigate]);

    // SECTION: Google Auth via Popup
    const handleGoogleLogin = () => {
        const width = 500, height = 600;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        const currentFrontendUrl = window.location.origin;

        // Origin and callback endpoint passed to handle cross-origin redirection
        const authUrl = `https://dodgerblue-hare-128861.hostingersite.com/auth/google?origin=${encodeURIComponent(currentFrontendUrl)}&callbackendpoint=/${subRoot}/local-setup-userdetails`;
        console.log("Auth URL:", authUrl);
        const popup = window.open(authUrl, "google-auth", `width=${width},height=${height},left=${left},top=${top}`);

        if (!popup) {
            alert("Please allow popups for this website");
            return;
        }

        
        // Safety: ensure listener is removed if the user manually closes the popup

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
                                autoComplete="username" // Browser Best Practice
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
                                autoComplete="current-password" // Browser Best Practice
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

                    <div style={{justifyContent: 'center', display: 'flex'}} >
                        <button onClick={handleGoogleLogin} style={styles.googleBtn}>
                            <img src={logo} alt="Google" width="30" height="30" style={{ marginRight: '10px' }} />
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