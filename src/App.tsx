import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LessonsPage from './pages/LessonsPage';
import QuizPage from './pages/QuizPage';
import GamePage from './pages/GamePage';
import AdminPage from './pages/AdminPage';
import { userManager } from '../lib/userManager';

function App() {
  useEffect(() => {
    // Check if there's a stored user and redirect accordingly
    const checkUserSession = () => {
      const currentUser = userManager.getCurrentUser();
      if (currentUser) {
        // User is logged in, no need to redirect
        console.log('User session found:', currentUser.username);
      }
    };
    
    checkUserSession();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;