import React from "react";
import { Leaf } from "lucide-react";
import { Link } from "react-router";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="glass-effect rounded-3xl shadow-2xl p-12 max-w-md w-full mx-4 backdrop-blur-xl z-10 animate-fadeInUp">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-emerald-400 to-green-500 p-4 rounded-full inline-block mb-6 shadow-lg">
            <Leaf className="text-white" size={48} />
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-2">AgriAssist</h1>
          <p className="text-gray-600 text-lg">Empowering farmers with AI-driven insights</p>
        </div>
        <div className="flex flex-col space-y-4">
          <Link to="/login">
            <button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-lg hover:scale-105 transform">
              Login
            </button>
          </Link>

          <Link to="/login">
            <button className="w-full bg-white/95 text-green-600 py-3 rounded-xl border-2 border-green-600 hover:bg-white hover:shadow-lg transition-all duration-300 font-semibold text-lg hover:scale-105 transform">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
