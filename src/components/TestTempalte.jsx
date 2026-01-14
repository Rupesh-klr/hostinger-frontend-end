// src/components/TestTempalte.jsx

// Use ../ to go up from 'components' to 'src', then into 'assets'
// import heroImageUrl from '../assets/images/hero-logo-VR.jpg'; 
// import logo from '../assets/assets/svg/logo-VR.svg'; // Check if your file is logo-VR.svg or icon.svg
// No more guessing how many dots (../) you need!
import heroImageUrl from '@/assets/images/hero-logo-VR.jpg';
import logo from '@/assets/svg/icon.svg'; // If logo is in src
function TestTempalte() {
    return (
        <div>
            <img src={heroImageUrl} alt="Hero" />
            
            {/* Note: In your screenshot, logo-VR.svg is in 'public', not 'assets/svg' */}
            {/* If it's in public, use a direct string path like this: */}
            <img src="/logo-VR.svg" alt="Static Logo" />
            
            <nav>
                <img src={logo} alt="Project Logo" width="50" height="50" />
            </nav>
        </div>
    );
}
// Ensure this is at the very bottom
export default TestTempalte;