import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SolarHome from './projects/solar-fintech/SolarHome';
import EdtechHome from './projects/edtech/EdtechHome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to a landing page or one of the projects */}
        <Route path="/" element={<h1>Main Portal</h1>} />

        {/* Project 1: Solar Fintech */}
        <Route path="/solar-fintech/*" element={<SolarHome />} />

        {/* Project 2: EdTech */}
        <Route path="/edtech/*" element={<EdtechHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;