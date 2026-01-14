// src/projects/common-elements/Navbar.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
// const Nav_default_config = {
//     logingPageEndpoint: '/main-portal/login',
//     signupPageEndpoint: '/main-portal/signup',
//     profilePageEndpoint: '/main-portal/profile',
//     homePgeEndpoint: '/',
//     logoSrc: '/logo-VR.svg',
// };

const SignupPage = ({ type }) => {
    //<h1>{type} </h1>
    const { isLoggedIn, userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setMobileMenu] = useState(false);


    // Truncate name to 10 characters for mobile display
    const displayName = userInfo?.name?.length > 10 
        ? `${userInfo.name.substring(0, 10)}...` 
        : userInfo?.name;

    return (
        <>
        <h1>{type} </h1>
        <p>Welcome to the {type === "Portal" ? "Management Dashboard" : "Platform"}</p>
            {/* Login form goes here */}
            <h1>Coming Soon</h1>
        singUp up page
        </>
    );
};

const styles = {
    nav: { display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#2c3e50', color: '#fff' },
    avatar: { width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px', border: '1px solid #fff' },
    userSection: { display: 'flex', alignItems: 'center', gap: '10px' },
    clickBtn: { backgroundColor: '#3498db', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' },
};

export default SignupPage;