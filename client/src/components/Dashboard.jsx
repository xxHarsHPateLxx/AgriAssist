import React, { useState, useEffect } from 'react';
import { MessageCircle, TrendingUp, Activity, Calendar } from 'lucide-react';
import { Sun, Cloud, ExternalLink, Sprout, Thermometer, CloudRain, Eye } from 'lucide-react';
import { sampleChats, samplePredictions } from "../data";
import WeatherCard from '../components/WeatherCard';
import axios from 'axios';
import { Link } from 'react-router';


import { useAuth } from '../context/AuthContext';

const Dashboard = () => {

  const [currentTime, setCurrentTime] = useState(new Date());
  const [animateCards, setAnimateCards] = useState(false);
  const getCurrentSeason = () => {
    const month = currentTime.getMonth() + 1;
    if (month >= 6 && month <= 9) return { name: "Kharif Season", icon: "🌾", color: "text-green-600" };
    if (month >= 10 && month <= 3) return { name: "Rabi Season", icon: "🌾", color: "text-yellow-600" };
    return { name: "Zaid Season", icon: "🌱", color: "text-green-500" };
  };

  const [season, setSeason] = useState(getCurrentSeason());
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const now = Date.now();


  const governmentSchemes = [
    {
      id: 1,
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      description: "Crop insurance scheme covering drought, pests, and post-harvest losses to stabilize farmer income. Voluntary since 2016.",
      category: "Insurance",
      icon: "🛡️",
      url: "https://www.pmfby.gov.in/farmerRegistrationForm"
    },
    {
      id: 2,
      title: "PM Kusum Scheme",
      description: "Subsidized solar irrigation pumps (60–90%) to reduce diesel use and promote clean energy and irrigation.",
      category: "Clean Energy",
      icon: "🔆",
      url: "https://pmkusum.mnre.gov.in/"
    },
    {
      id: 3,
      title: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
      description: "Improves irrigation via drip systems, water harvesting, and NABARD-funded micro‑irrigation projects.",
      category: "Irrigation",
      icon: "🚿",
      url: "https://pmksy.gov.in/"
    },
    {
      id: 4,
      title: "PM AASHA (Annadata Aay Sanrakshan Abhiyan)",
      description: "Provides MSP assurance through Price Support, Deficiency Payments, and Private Procurement.",
      category: "Price Support",
      icon: "📈",
      url: "https://www.india.gov.in/spotlight/pradhan-mantri-annadata-aay-sanrakshan-abhiyan-pm-aasha"
    },
    {
      id: 5,
      title: "PM Kisan Samman Nidhi",
      description: "₹6,000/year direct income support for small and marginal farmers (≤2 ha land).",
      category: "Income Support",
      icon: "💰",
      url: "https://pmkisan.gov.in/"
    },
    {
      id: 6,
      title: "National Horticulture Mission",
      description: "Supports production of fruits, vegetables, spices & medicinal plants with central/state funding.",
      category: "Horticulture",
      icon: "🍇",
      url: "https://nhb.gov.in/ApplyOnline.aspx?enc=3ZOO8K5CzcdC%2FYq6HcdIxNtjy6Wv3Ly9JEdncYU%2FNiE%3D"
    },
    {
      id: 7,
      title: "PM Matsya Sampada Yojana",
      description: "Boosts fisheries infrastructure, processing, and productivity under the 'Blue Revolution'.",
      category: "Fisheries",
      icon: "🐟",
      url: "https://pmmsy.dof.gov.in/"
    },
    {
      id: 8,
      title: "Integrated Scheme for Agriculture Marketing (ISAM)",
      description: "Supports FPO formation and e-NAM platform to modernize agri-markets and farmer access.",
      category: "Marketing",
      icon: "🛒",
      url: "https://enam.gov.in/web/Enam_ctrl/enam_registration"
    },
    {
      id: 9,
      title: "Soil Health Card Scheme & NMSA",
      description: "Provides soil analysis and promotes sustainable, climate-resilient farming practices.",
      category: "Soil Health",
      icon: "🌱",
      url: "http://soilhealth.dac.gov.in"
    },
    {
      id: 10,
      title: "Sub-Mission on Agricultural Mechanization (SMAM)",
      description: "Subsidizes machinery banks, drone tech, and modern equipment to promote farm mechanization.",
      category: "Mechanization",
      icon: "🚜",
      url: "https://mahadbt.maharashtra.gov.in/Farmer/SchemeData/SchemeData?str=E9DDFA703C38E51AC7B56240D6D84F28"
    }
  ];

  const fetchWeather = async (lat, lon) => {
    try {
      const res = await fetch(`http://localhost:8000/api/weather?lat=${lat}&lon=${lon}`);
      const data = await res.json();
      setWeather(data);
      localStorage.setItem('weather', JSON.stringify(data));
      localStorage.setItem('weatherTimestamp', now);
    } catch (err) {
      setError("Unable to fetch weather");
      console.error(err);
    }
  };


  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    setTimeout(() => setAnimateCards(true), 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {

    const cachedWeather = localStorage.getItem('weather');
    const cacheTime = localStorage.getItem('weatherTimestamp');


    if (cachedWeather && cacheTime && now - cacheTime < 30 * 60 * 1000) {
      // use cached data
      setWeather(JSON.parse(cachedWeather));
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          pos => {
            const { latitude, longitude } = pos.coords;
            fetchWeather(latitude, longitude);
          },
          err => {
            setError("Location access denied");
            console.error(err);
          }
        );
      } else {
        setError("Geolocation not supported");
      }
    }


  }, []);


  return (
    <>
      {/* Welcome Banner */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-lg transform hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">Welcome back, Mr. {user.displayName} ! 👋</h2>
              <p className="text-xl text-green-100 mb-4">Let's grow smarter today 🌾</p>
              <div className="flex items-center space-x-4 text-green-100">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">{season.name}</span>
                </div>
                <span className="text-2xl">{season.icon}</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <Sprout className="w-16 h-16 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transform transition-all duration-700 delay-200 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Chats</p>
              <p className="text-2xl font-bold text-gray-800">{sampleChats.length}</p>
            </div>
            <MessageCircle className="text-green-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Predictions Made</p>
              <p className="text-2xl font-bold text-gray-800">{samplePredictions.length}</p>
            </div>
            <TrendingUp className="text-blue-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Avg Accuracy</p>
              <p className="text-2xl font-bold text-gray-800">91%</p>
            </div>
            <Activity className="text-purple-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">This Month</p>
              <p className="text-2xl font-bold text-gray-800">24</p>
            </div>
            <Calendar className="text-orange-600" size={32} />
          </div>
        </div>
      </div> */}



      {/* Weather & Season Panel */}
      <WeatherCard animateCards={animateCards} weather={weather} error={error} season={getCurrentSeason()} />

      {/* Government Schemes */}
      <div className={`transform transition-all duration-700 delay-300 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="text-2xl mr-3">🏛️</span>
            Latest Government Schemes
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {governmentSchemes.map((scheme, index) => (
              <div
                key={scheme.id}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200 hover:border-green-300 transition-all duration-300 group cursor-pointer transform hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: animateCards ? 'slideInUp 0.6s ease-out forwards' : 'none'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{scheme.icon}</span>
                  <span className="text-xs bg-green-200 text-green-700 px-2 py-1 rounded-full font-medium">
                    {scheme.category}
                  </span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2 group-hover:text-green-700 transition-colors">
                  {scheme.title}
                </h4>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {scheme.description}
                </p>
                <div className="flex items-center text-green-600 font-semibold text-sm group-hover:text-green-700">
                  <Link to={scheme.url}>
                    <Eye className="w-4 h-4 mr-1" />
                    <span>Read More</span>
                    <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>

  );
};

export default Dashboard;


