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
    // Check if there's a valid session and redirect accordingly
    const checkUserSession = () => {
      if (!userManager.isSessionValid()) {
        // Clear any old localStorage items for compatibility
        localStorage.removeItem('username');
        localStorage.removeItem('selectedCountry');
        localStorage.removeItem('selectedLanguage');
        
        // If we're not on login or register page, redirect to login
        const currentPath = window.location.pathname;
        if (currentPath !== '/login' && currentPath !== '/register') {
          window.location.href = '/login';
        }
      } else {
        // Refresh the session to extend its validity
        userManager.refreshSession();
      }
    };
    
    checkUserSession();
    
    // Set up session check interval
    const sessionCheckInterval = setInterval(checkUserSession, 5 * 60 * 1000); // Check every 5 minutes
    
    // Attempt to sync with Supabase in the background
    const syncData = async () => {
      try {
        await userManager.syncWithSupabase();
      } catch (error) {
        console.error('Error syncing with Supabase:', error);
      }
    };
    
    syncData();
    
    // Set up periodic sync
    const syncInterval = setInterval(syncData, 5 * 60 * 1000); // Sync every 5 minutes
    
    return () => {
      clearInterval(sessionCheckInterval);
      clearInterval(syncInterval);
    };
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