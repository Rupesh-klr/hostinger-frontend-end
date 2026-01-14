import { useEffect } from 'react';

export const useAuthMessage = () => {
  useEffect(() => {
   const handleMessage = (event) => {
        // Verify origin for security
        if (event.origin === 'https://dodgerblue-hare-128861.hostingersite.com') {
            if (event.data.type === "AUTH_SUCCESS" || event.data.type === "AUTH_COMPLETE") {
                console.log('Auth success received:', event.data);
                
                // Store in localStorage from message
                if (event.data.user) {
                    localStorage.setItem('auth_user', JSON.stringify(event.data.user));
                }
                
                // If storage data is provided
                if (event.data.storage_data) {
                    Object.keys(event.data.storage_data).forEach(key => {
                        localStorage.setItem(key, 
                            typeof event.data.storage_data[key] === 'object' 
                                ? JSON.stringify(event.data.storage_data[key])
                                : event.data.storage_data[key]
                        );
                    });
                }
                
                // Redirect if needed
                if (event.data.redirect_to) {
                    window.location.href = event.data.redirect_to;
                }
                
                // Update app state
                setUser(event.data.user);
            }
            
            // Handle direct storage commands
            if (event.data.type === "STORE_LOCAL_STORAGE") {
                localStorage.setItem(event.data.key, event.data.value);
            }
        }
    };

    window.addEventListener('message', handleMessage);
    
    return () => window.removeEventListener('message', handleMessage);
  }, []);
};
