// src/projects/index.js

// Import individual components
import MainPortal from './MainPortal';
import EdtechHome from './edtech/EdtechHome';
import SolarHome from './solar-fintech/SolarHome';
import SolarReport from './solar-fintech/SolarReport';

// Import Common Elements (from image_d3b1ea.png)
import Navbar from './common-elements/Navbar';
import LoginPage from './common-elements/Login';
import SignupPage from './common-elements/Signup';
import Sidebar from './common-elements/Sidebar';

// Export everything as a single object or named exports
export {
    MainPortal,
    EdtechHome,
    SolarHome,
    SolarReport,
    Navbar,
    Sidebar,
    LoginPage,
    SignupPage
};