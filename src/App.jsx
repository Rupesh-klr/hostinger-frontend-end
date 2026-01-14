import { SolarHome, EdtechHome, MainPortal, LoginPage, SignupPage , LocalSetupUserDetails} from './projects';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from './store/authSlice';
// 1. LOG OUTSIDE: If you don't see this, the file isn't being loaded
console.log("🚀 App.jsx file has been loaded by Vite");
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 1. ADD THIS LOG HERE
  console.log("App Component is rendering..-----.");

  useEffect(() => {
    // This log SHOULD print now
    console.log("✅ Setting up message listener for auth popup");

    const handleMessage = (event) => {
    console.log("✅ Setting up message listener for auth popup111");
      if (event.origin !== "https://dodgerblue-hare-128861.hostingersite.com") return;

      if (event.data?.type === "AUTH_SUCCESS") {
        const user = event.data.user;
        const formattedUser = {
          ...user,
          name: user?.name?.givenName || user?.displayName || "User"
        };

        localStorage.setItem('userInfo', JSON.stringify(formattedUser));
        dispatch(loginUser(formattedUser));
        navigate('/main-portal');
      }
    };

    console.log("✅ Setting up message listener for auth popup22");
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [dispatch, navigate]);
  return (
    <Routes>
      <Route path="/" element={<MainPortal />} />
      <Route path="/login" element={<LoginPage type="Global" />} />
      <Route path="/signup" element={<SignupPage type="Global" />} />

      {/* Project Routes */}
      <Route path="/solar-fintech/*" element={<SolarHome />} />
      <Route path="/edtech/*" element={<EdtechHome />} />

      {/* Main Portal Routes */}
      <Route path="/main-portal">
        <Route index element={<MainPortal />} />
        <Route path="login" element={<LoginPage type="Portal" subRoot="main-portal" />} />
        <Route path="signup" element={<SignupPage type="Portal" subRoot="main-portal" />} />
        <Route path="local-setup-userdetails" element={<LocalSetupUserDetails />} />
      </Route>
    </Routes>
  );
}

export default App;