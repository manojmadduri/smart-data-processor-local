import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import UploadPage from './pages/UploadPage';
import PricingPage from './pages/PricingPage';
import FeedbackPage from './pages/FeedbackPage';
import FineTuningGuide from './pages/FineTuningGuide';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="pt-20 pb-10 min-h-[calc(100vh-5rem)] flex flex-col items-center">
        <Routes>
          <Route path="/"       element={<Home />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/guide" element={<FineTuningGuide />} />
          

        </Routes>
      </div>
    </BrowserRouter>
  );
}
