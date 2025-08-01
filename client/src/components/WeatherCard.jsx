import React from 'react';
import { Sun, Thermometer, CloudRain } from 'lucide-react';

const WeatherCard = ({ animateCards, weather, error, season }) => {

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!weather) {
    return <div className="text-center text-gray-500">Loading weather...</div>;
  }

  return (
    <div className={`mb-8 transform transition-all duration-700 delay-200 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Sun className="w-6 h-6 mr-3 text-yellow-500" />
          Weather & Season Information
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Temperature */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Thermometer className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm text-gray-500 font-medium">Temperature</p>
            <p className="text-2xl font-bold text-gray-800">{weather.temperature}°C</p>
          </div>

          {/* Humidity as Rainfall */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <CloudRain className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm text-gray-500 font-medium">Humidity</p>
            <p className="text-2xl font-bold text-gray-800">{weather.humidity}%</p>
          </div>

          {/* Condition */}
          <div className="text-center">

            <div className='flex items-center justify-center mx-auto mb-3 w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-400 to-gray-600'>
              <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="" />
            </div>

            <p className="text-sm text-gray-500 font-medium">Condition</p>
            <p className="text-lg font-bold text-gray-800 capitalize">{weather.condition}</p>
          </div>

          {/* Season */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">{season.icon}</span>
            </div>
            <p className="text-sm text-gray-500 font-medium">Current Season</p>
            <p className={`text-lg font-bold ${season.color}`}>{season.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
