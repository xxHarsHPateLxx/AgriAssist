import React from 'react';
import { MessageCircle, BarChart3, Newspaper, LogOut, X, LayoutDashboard, Leaf } from 'lucide-react';

import { Link } from 'react-router';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';

import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";

import { useAuth } from '../context/AuthContext';
import News from './News.jsx';


const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'chat', icon: MessageCircle, label: 'Chat Assistant' },
    { id: 'prediction', icon: BarChart3, label: 'Crop Prediction' },
    { id: 'news', icon: Newspaper, label: 'Latest News' }
  ];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {

  const location = useLocation();
  const currentPage = location.pathname.split('/')[1];
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const handleLogout = async () => {
  try {
    await signOut(auth);
    setUser(null);
    navigate('/');
  } catch (error) {
    console.error("Sign-out failed:", error.message);
  }
};  
  
  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-20 px-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg">
        <div className='flex items-center gap-3'>
          <div className="bg-white/20 p-2 rounded-lg">
            <Leaf className="text-white" size={24} />
          </div>
          <h1 className="text-lg font-bold tracking-tight">AgriAssist</h1>
        </div>
        
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
          <X size={24} />
        </button>
      </div>
      <nav className="mt-6 space-y-1 px-3">
        {navItems.map(item => (
          <Link key={item.id} to={`/${item.id}`}>
          <button
            
            onClick={() => { setSidebarOpen(false); }}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${
              currentPage === item.id 
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg font-semibold' 
                : 'text-gray-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <item.icon className="mr-3" size={20} />
            {item.label}
          </button>
          </Link>
          
        ))}

        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 rounded-lg text-left text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-all duration-200 mt-8 font-semibold"
        >
          <LogOut className="mr-3" size={20} />
          Logout
        </button>

        
      </nav>
    </div>
  );
};

export default Sidebar;