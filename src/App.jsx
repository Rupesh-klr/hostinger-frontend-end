import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SolarHome, EdtechHome, MainPortal } from './projects';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to a landing page or one of the projects */}
        <Route path="/" element={<MainPortal />} />

        {/* Project 1: Solar Fintech */}
        <Route path="/solar-fintech/*" element={<SolarHome />} />

        {/* Project 2: EdTech */}
        <Route path="/edtech/*" element={<EdtechHome />} />

        {/* Main Portal */}
        <Route path="/main-portal/*" element={<MainPortal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;