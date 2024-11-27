import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import VictimPage from './components/VictimPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/victim/:_id" element={<VictimPage />} />
      </Routes>
    </Router>
  );
}