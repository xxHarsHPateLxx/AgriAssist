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
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-green-50 border-r border-green-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-16 px-6 bg-green-600 text-white">
        <div className='flex items-center gap-2'>
          <Leaf className=" text-white" size={30} />
        <h1 className="text-xl font-bold">AgriAssist</h1>
        </div>
        
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
          <X size={24} />
        </button>
      </div>
      <nav className="mt-8">
        {navItems.map(item => (
          <Link key={item.id} to={`/${item.id}`}>
          <button
            
            onClick={() => { setSidebarOpen(false); }}
            className={`w-full flex items-center px-6 py-3 text-left hover:bg-green-100 transition-colors ${currentPage === item.id ? 'bg-green-100 border-r-4 border-green-600' : ''}`}
          >
            <item.icon className="mr-3" size={20} />
            {item.label}
          </button>
          </Link>
          
        ))}

        <button
          onClick={handleLogout}
          className="w-full flex items-center px-6 py-3 text-left hover:bg-red-100 text-red-600 transition-colors mt-8"
        >
          <LogOut className="mr-3" size={20} />
          Logout
        </button>

        
      </nav>
    </div>
  );
};

export default Sidebar;