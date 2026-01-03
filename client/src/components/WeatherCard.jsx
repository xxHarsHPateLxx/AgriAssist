import React from 'react';
import { Sun, Thermometer, CloudRain } from 'lucide-react';

const WeatherCard = ({ animateCards, weather, error, season }) => {

  if (error) {
    return <div className="text-red-500 text-center p-4 font-semibold">{error}</div>;
  }

  if (!weather) {
    return <div className="text-center text-gray-500 py-8 animate-pulse">
      <div className="inline-block">
        <div className="w-12 h-12 border-4 border-green-300 border-t-green-600 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4">Loading weather...</p>
    </div>;
  }

  return (
    <div className={`mb-10 transform transition-all duration-700 delay-200 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} animate-fadeInUp`}>
      <div className="bg-gradient-to-br from-white to-emerald-50 rounded-3xl p-8 shadow-lg border border-emerald-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl mr-4">
            <Sun className="w-6 h-6 text-white" />
          </div>
          Weather & Season Information
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Temperature */}
          <div className="text-center bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200 hover:shadow-lg transition-all transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <Thermometer className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm text-gray-600 font-semibold">Temperature</p>
            <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text">{weather.temperature}°C</p>
          </div>

          {/* Humidity */}
          <div className="text-center bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <CloudRain className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm text-gray-600 font-semibold">Humidity</p>
            <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">{weather.humidity}%</p>
          </div>

          {/* Condition */}
          <div className="text-center bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-2xl border border-gray-300 hover:shadow-lg transition-all transform hover:scale-105">
            <div className='flex items-center justify-center mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-400 to-gray-600 shadow-md'>
              <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.condition} className="w-12 h-12" />
            </div>
            <p className="text-sm text-gray-600 font-semibold">Condition</p>
            <p className="text-lg font-bold text-gray-800 capitalize">{weather.condition}</p>
          </div>

          {/* Season */}
          <div className="text-center bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-300 hover:shadow-lg transition-all transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-2xl">{season.icon}</span>
            </div>
            <p className="text-sm text-gray-600 font-semibold">Current Season</p>
            <p className={`text-lg font-bold ${season.color}`}>{season.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
