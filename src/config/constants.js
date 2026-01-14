// src/config/constants.js
// import { BACKEND_URL, PROJECT_CONFIG, MAX_NAME_LENGTH } from '@/config/constants.js';
export const BACKEND_URL = 'https://dodgerblue-hare-128861.hostingersite.com';

export const PROJECT_CONFIG = {
    SOLAR: { basePath: '/solar-fintech', theme: 'green' },
    EDTECH: { basePath: '/edtech-project', theme: 'blue' }
};

// 3. Export Auth Configuration
export const AUTH_ROLES = {
    ADMIN: 1,
    USER: 2
};
export const sidebarLinks = [
    { title: 'Main Portal', path: '/', icon: '🏠', roles: [1, 2] },
    { title: 'Solar Fintech', path: '/solar-fintech', icon: '☀️', roles: [1, 2] },
    { title: 'EdTech Portal', path: '/edtech', icon: '🎓', roles: [1, 2] },
    { title: 'Settings', path: '/settings', icon: '⚙️', roles: [1, 2] }, // Admin only
    { title: 'Profile', path: '/profile', icon: '👤', roles: [1, 2] }, // Admin only
];
// 4. Export UI Limits
export const MAX_NAME_LENGTH = 10;

