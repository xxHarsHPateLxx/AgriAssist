import React from "react";
import { Leaf } from "lucide-react";
import { Link } from "react-router";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <Leaf className="mx-auto mb-4 text-green-600" size={48} />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AgriAssist</h1>
          <p className="text-gray-600">Empowering farmers with AI</p>
        </div>
        <div className="flex flex-col space-y-4">
          <Link to="/login">
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
              Login
            </button>
          </Link>

          <Link to="/login">
            <button className="w-full bg-white text-green-600 py-3 rounded-lg border-2 border-green-600 hover:bg-green-50 transition-colors font-semibold">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
