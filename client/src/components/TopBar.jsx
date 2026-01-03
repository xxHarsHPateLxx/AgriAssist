import React from 'react';
import { Menu, User } from 'lucide-react';
import { useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

const TopBar = ({ setSidebarOpen }) => {

  const { user } = useAuth();
  const location = useLocation();
  const currentPage = location.pathname.split('/')[1];
  
  return (
    <div className="bg-gradient-to-r from-white to-green-50 border-b border-gray-200 px-6 py-5 flex items-center justify-between shadow-sm">
      <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-700 hover:text-green-600 transition-colors">
        <Menu size={26} />
      </button>
      <h2 className="text-3xl font-bold gradient-text capitalize">{currentPage === 'dashboard' ? 'Dashboard' : currentPage.replace(/([A-Z])/g, ' $1')}</h2>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full border border-green-200">
          <div className="bg-gradient-to-br from-emerald-400 to-green-500 p-2 rounded-full">
            <User size={24} className="text-white" />
          </div>
          <span className="text-gray-700 font-semibold">{user?.displayName}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;