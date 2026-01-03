import React from 'react'
import { Routes, Route } from 'react-router'
import { useState, useEffect, useRef } from 'react'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ChatPage from './pages/ChatPage'
import PredictionPage from './pages/PredictionPage'
import NewsPage from './pages/NewsPage'

import ProtectedRoute from './components/ProtectedRoute'


const App = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

 
  return (
    <div>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> </ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><ChatPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /></ProtectedRoute>} />
        <Route path="/prediction" element={<ProtectedRoute><PredictionPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /></ProtectedRoute>} />

        <Route path="/news" element={<ProtectedRoute><NewsPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /></ProtectedRoute>} />
        
      
      </Routes>
    

    </div>
  )
}

export default App


