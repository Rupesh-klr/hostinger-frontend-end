// src/projects/auth/LocalSetupUserDetails.jsx
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/authSlice';

const LocalSetupUserDetails = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // 1. Extract parameters from the URL
        const jwtToken = searchParams.get('jwttoken');
        const authKey = searchParams.get('authkey');
        const isGoogleAuth = searchParams.get('googleauth') === 'true';
        const userDataRaw = searchParams.get('userauthdata');

        if (jwtToken && userDataRaw) {
            try {
                const parsedUser = JSON.parse(decodeURIComponent(userDataRaw));

                // 2. Format name as a string to prevent Minified React Error #31
                const formattedUser = {
                    ...parsedUser,
                    name: parsedUser.name?.givenName || parsedUser.displayName || "User",
                    isGoogleAuth: isGoogleAuth,
                    authKey: authKey
                };

                // 3. Store in LocalStorage
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('userInfo', JSON.stringify(formattedUser));

                // 4. Sync to Redux State
                dispatch(loginUser(formattedUser));

                console.log("✅ Local setup complete. Redirecting...");
                
                // 5. Redirect to the main portal
                // navigate('/main-portal');
            } catch (error) {
                console.error("❌ Failed to parse user data:", error);
                // navigate('/login');
            }
        }
    }, [searchParams, dispatch, navigate]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <p>Configuring your session, please wait...</p>
        </div>
    );
};

export default LocalSetupUserDetails;