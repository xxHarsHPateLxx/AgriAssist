import { useState } from 'react';
import { BarChart3 } from 'lucide-react';

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

    if (predictionForm.soil_moisture && predictionForm.soil_ph && predictionForm.temperature && predictionForm.fertilizer_content && predictionForm.sunlight) {

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

          const prediction = {
            crop: predictionForm.crop,
            temperature: predictionForm.temperature,
            yield: data.predicted_yield,
            date: new Date().toLocaleDateString()
          };

          setPredictions(prev => [prediction, ...prev]);

          setPredictionForm({
            crop: '', soil_moisture: '', soil_ph: '', temperature: '', fertilizer_content: '', sunlight: ''
          });

        })
        .catch(error => {
          console.error(error);
        });

    }
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* crop yield prediction section */}
      <div className="lg:col-span-2 bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-enhanced border border-emerald-200 p-7">

        <h3 className="text-2xl font-bold gradient-text mb-6">📊 Crop Yield Prediction</h3>
        <form onSubmit={handlePrediction} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">🌡️ Temperature (°C)</label>
              <input
                type="number"
                value={predictionForm.temperature}
                onChange={(e) => setPredictionForm({ ...predictionForm, temperature: e.target.value })}
                className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white transition-all"
                placeholder="Average temperature"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">💧 Soil Moisture (%)</label>
              <input
                type="number"
                value={predictionForm.soil_moisture}
                onChange={(e) => setPredictionForm({ ...predictionForm, soil_moisture: e.target.value })}
                className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white transition-all"
                placeholder="Soil Moisture Content"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">⚖️ Soil pH</label>
              <input
                type="number"
                step="0.1"
                value={predictionForm.soil_ph}
                onChange={(e) => setPredictionForm({ ...predictionForm, soil_ph: e.target.value })}
                className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white transition-all"
                placeholder="Soil pH level"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">🌿 Fertilizer (kg/ha)</label>
              <input
                type="number"
                value={predictionForm.fertilizer_content}
                onChange={(e) => setPredictionForm({ ...predictionForm, fertilizer_content: e.target.value })}
                className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white transition-all"
                placeholder="Amount of fertilizer applied"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">☀️ Sunlight (hours/day)</label>
              <input
                type="number"
                value={predictionForm.sunlight}
                onChange={(e) => setPredictionForm({ ...predictionForm, sunlight: e.target.value })}
                className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white transition-all"
                placeholder="Sunlight available in hours per day"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 font-semibold flex items-center justify-center text-lg"
          >
            <BarChart3 className="mr-2" size={20} />
            Predict Yield
          </button>
        </form>

        <div>
          {predictedYield !== '' && (
            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl border border-emerald-300 shadow-md animate-fadeInUp">
              <h4 className="text-gray-700 text-xl font-bold mb-3">Yield Prediction Result:</h4>
              <div className="space-y-2 text-3xl font-bold text-transparent bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text">
                {predictedYield} tons/ha
              </div>
              <p className="text-sm text-gray-600 mt-3">Based on the environmental conditions you provided</p>
            </div>
          )}

        </div>

      </div>

      {/* recent predictions section */}
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-enhanced border border-blue-200 p-7">

        <h4 className="font-bold text-xl text-gray-800 mb-5 gradient-text">📈 Recent Predictions</h4>
        <div className="space-y-3">
          {predictions.map((prediction, idx) => (
            <div key={idx} className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-300 hover:shadow-lg transition-all transform hover:scale-105">
              <div className="flex justify-between items-start mb-2">
                <p className="font-semibold text-gray-800">{prediction.crop || 'Crop'}</p>
                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-semibold">Latest</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">🌡️ {prediction.temperature} °C</p>
              <p className="text-lg font-bold text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">{prediction.yield} tons/ha</p>
              <p className="text-xs text-gray-500 mt-2">📅 {prediction.date}</p>
            </div>
          ))}
          {predictions.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p>No predictions yet</p>
              <p className="text-sm mt-2">Fill the form and predict your yield</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Prediction;