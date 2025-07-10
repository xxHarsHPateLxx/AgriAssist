import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { samplePredictions } from '../data';

const Prediction = () => {

  const [predictedYield, setpredictedYield] = useState('')
  const [predictions, setPredictions] = useState([]);
  const [predictionForm, setPredictionForm] = useState({
    crop: '',
    temperature: '',
    soil_moisture: '',    
    soil_ph: '',
    fertilizer_content: '',
    sunlight: ''
  });

  const handlePrediction = (e) => {
    e.preventDefault();
    
    if (predictionForm.crop && predictionForm.soil_moisture && predictionForm.soil_ph && predictionForm.temperature && predictionForm.fertilizer_content && predictionForm.sunlight) {
      
      const reqOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Soil_Moisture: predictionForm.soil_moisture,
          Soil_pH: predictionForm.soil_ph,
          Temperature: predictionForm.temperature,
          Fertilizer_Content: predictionForm.fertilizer_content,
          Sunlight: predictionForm.sunlight
        })
      };

      fetch('http://localhost:8000/predict', reqOptions)
        .then(response => response.json())
        .then(data => {
          setpredictedYield(data.predicted_yield);
        })
        .catch(error => {
          console.error(error);
        });
      
      const prediction = {
        crop: predictionForm.crop,
        temperature: predictionForm.temperature,
        yield: predictedYield,
        date: new Date().toLocaleDateString()
      };

      setpredictedYield(prediction.yield)
      setPredictions([prediction, ...predictions]);
      setPredictionForm({ crop: '', soil_moisture: '', soil_ph: '', temperature: '', fertilizer_content: '', sunlight: ''});
    }
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* crop yield prediction section */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">

        <h3 className="text-lg font-semibold text-gray-800 mb-6">Crop Yield Prediction</h3>
        <form onSubmit={handlePrediction} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Crop Type</label>
              <select
                value={predictionForm.crop}
                onChange={(e) => setPredictionForm({ ...predictionForm, crop: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                required
              >
                <option value="">Select Crop</option>
                <option value="Wheat">Wheat</option>
                <option value="Rice">Rice</option>
                <option value="Corn">Corn</option>
                <option value="Soyabean">Soyabean</option>
              </select>
            </div> */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Temperature (°C)</label>
              <input
                type="number"
                value={predictionForm.temperature}
                onChange={(e) => setPredictionForm({ ...predictionForm, temperature: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="Average temperature"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Soil Moisture (%)</label>
              <input
                type="number"
                value={predictionForm.soil_moisture}
                onChange={(e) => setPredictionForm({ ...predictionForm, soil_moisture: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="Soil Moisture Content"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Soil pH</label>
              <input
                type="number"
                step="0.1"
                value={predictionForm.soil_ph}
                onChange={(e) => setPredictionForm({ ...predictionForm, soil_ph: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="Soil pH level"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Fertilizer Content(kg/ha)</label>
              <input
                type="number"
                value={predictionForm.fertilizer_content}
                onChange={(e) => setPredictionForm({ ...predictionForm, fertilizer_content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="Amount of fertilizer applied"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Sunlight (hours/day)</label>
              <input
                type="number"
                value={predictionForm.sunlight}
                onChange={(e) => setPredictionForm({ ...predictionForm, sunlight: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="Sunlight available in hours per day"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center"
          >
            <BarChart3 className="mr-2" size={20} />
            Predict Yield
          </button>
        </form>

        <div>
          {predictedYield !== '' && (
            <div className="mt-8 p-4 bg-green-100 rounded-lg border border-green-200">
              <h4 className="text-gray-700 text-xl font-bold mb-5">Yield Prediction:</h4>
              <div className="space-y-3 text-lg font-bold text-green-600">
                {predictedYield} tons/ha
              </div>
            </div>
          )}

        </div>

      </div>

      {/* recent predictions section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

        <h4 className="font-semibold text-gray-800 mb-4">Recent Predictions</h4>
        <div className="space-y-3">
          {/* {predictions.length === 0 && samplePredictions.map(prediction => (
            <div key={prediction.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium text-gray-800">{prediction.crop}</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{prediction.confidence}</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{prediction.soil} soil</p>
              <p className="text-lg font-bold text-green-600">{prediction.yield}</p>
              <p className="text-xs text-gray-500">{prediction.date}</p>
            </div>
          ))} */}
          {predictions.map(prediction => (
            <div key={prediction.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium text-gray-800">{prediction.crop}</p>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{prediction.confidence}</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{prediction.temperature} °C</p>
              <p className="text-lg font-bold text-blue-600">{prediction.yield}</p>
              <p className="text-xs text-gray-500">{prediction.date}</p>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default Prediction;