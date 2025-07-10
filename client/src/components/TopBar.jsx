import React from 'react';
import { Menu, User } from 'lucide-react';
import { useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

const TopBar = ({ setSidebarOpen }) => {

  const { user } = useAuth();
  const location = useLocation();
  const currentPage = location.pathname.split('/')[1];
  
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
        <Menu size={24} />
      </button>
      <h2 className="text-2xl font-bold text-gray-800 capitalize">{currentPage === 'dashboard' ? 'Dashboard' : currentPage.replace(/([A-Z])/g, ' $1')}</h2>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <User size={32} className="bg-green-100 p-1 rounded-full" />
          <span className="text-gray-700">{user?.displayName}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;