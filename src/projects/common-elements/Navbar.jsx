// src/projects/common-elements/Navbar.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
const Nav_default_config = {
    logingPageEndpoint: '/main-portal/login',
    signupPageEndpoint: '/main-portal/signup',
    profilePageEndpoint: '/main-portal/profile',
    homePgeEndpoint: '/',
    logoSrc: '/logo-VR.svg',
};

const Navbar = () => {
    const { isLoggedIn, userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setMobileMenu] = useState(false);

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

    // Truncate name to 10 characters for mobile display
    const displayName = userInfo?.name?.length > 10 
        ? `${userInfo.name.substring(0, 10)}...` 
        : userInfo?.name;

    return (
        <nav className="global-navbar" style={styles.nav}>
            <div className="nav-brand">
                <Link to={Nav_default_config.homePgeEndpoint}><img src={Nav_default_config.logoSrc} width="35" alt="Logo" /></Link>
            </div>

                <div className="nav-context" style={styles.navMiddle}>
                    {isLoggedIn ? (
                        <span>Welcome back, <strong>{userInfo?.name}</strong>!</span>
                    ) : (
                        <span>Explore our Solar & EdTech Solutions</span>
                    )}
                </div>
            {/* Desktop & Mobile Display Logic */}
            <div className={`nav-links nav-links-login-singnup ${isMobileMenuOpen ? 'open' : ''}`}>
                {isLoggedIn ? (
                    <div style={styles.userSection}>
                        <Link to={Nav_default_config.profilePageEndpoint}>
                            <img src={userInfo?.profilePic || '/default-avatar.png'} 
                                 style={styles.avatar} alt="Profile" />
                        </Link>
                        <span>Hi, {displayName}</span>
                        {/* <button onClick={() => navigate('/logout')}>Logout</button> */}
                         <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
                    </div>
                ) : (
                    <>
                        <button onClick={() => navigate(Nav_default_config.logingPageEndpoint)} style={styles.clickBtn}>Login</button>
                        <button onClick={() => navigate(Nav_default_config.signupPageEndpoint)} style={styles.clickBtn}>Sign Up</button>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    nav: { display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#2c3e50', color: '#fff' },
    avatar: { width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px', border: '1px solid #fff' },
    userSection: { display: 'flex', alignItems: 'center', gap: '10px' },
    clickBtn: { backgroundColor: '#3498db', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' },
};

export default Navbar;