import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SolarHome, EdtechHome, MainPortal, LoginPage, SignupPage } from './projects';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to a landing page or one of the projects */}
        <Route path="/" element={<MainPortal />} />
        <Route path="/login" element={<LoginPage type="Global" />} />
        <Route path="/signup" element={<SignupPage type="Global" />} />

        {/* Project 1: Solar Fintech */}
        <Route path="/solar-fintech/*" element={<SolarHome />} />

        {/* Project 2: EdTech */}
        <Route path="/edtech/*" element={<EdtechHome />} />

        {/* Main Portal */}
        {/* <Route path="/main-portal/*" element={<MainPortal />} /> */}
        <Route path="/main-portal">
            <Route index element={<MainPortal />} />
            <Route path="login" element={<LoginPage type="Portal" subRoot = "main-portal" />} />
            <Route path="signup" element={<SignupPage type="Portal" subRoot = "main-portal" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;