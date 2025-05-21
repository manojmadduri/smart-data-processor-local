import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import UploadPage from './pages/UploadPage';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="pt-20 pb-10 min-h-[calc(100vh-5rem)] flex flex-col items-center">
        <Routes>
          <Route path="/"       element={<Home />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
