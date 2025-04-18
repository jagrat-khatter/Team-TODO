import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignupPage from './components/signupPage'; // Keep the correct PascalCase import
import Dashboard from './components/Dashboard'; // Assuming you have a Dashboard component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* You can add more routes here for other pages */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;