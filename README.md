# AgriAssist

An intelligent agricultural assistance platform that leverages AI, real-time weather data, and predictive analytics to help farmers make informed decisions.

## Features

- **AI-Powered Chat Assistant** - Ask questions about farming, agriculture, and agricultural schemes with RAG-based responses
- **Weather Integration** - Real-time weather information and forecasts for planning agricultural activities
- **Crop Yield Prediction** - Machine learning models to predict crop yields based on various parameters
- **News & Updates** - Latest agricultural news and policy updates
- **User Dashboard** - Centralized hub for monitoring and managing farm data
- **Secure Authentication** - User registration and login with Firebase

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Firebase** - Authentication
- **Axios** - HTTP client

### Backend
- **Python** - Server language
- **FastAPI** - Web framework
- **LangChain** - LLM orchestration and RAG
- **Mistral AI** - Large Language Model
- **FAISS** - Vector database for semantic search
- **Scikit-learn** - Machine learning
- **Pandas** - Data processing

## Project Structure

```
AgriAssist/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Context API for state management
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── server/                # Python backend
    ├── main.py            # FastAPI app entry point
    ├── llm.py             # RAG chain setup
    ├── ingest.py          # Document ingestion for vector store
    ├── prediction.py      # ML prediction models
    ├── news_routes.py     # News API endpoints
    ├── weather_routes.py  # Weather API endpoints
    ├── docs/              # PDF documents for RAG
    ├── faiss_index/       # Vector store index
    ├── requirements.txt
    └── .env               # Environment variables
```

## Prerequisites

- Node.js (v16+) and npm
- Python (v3.8+)
- pip (Python package manager)
- Git

## Installation

### Clone the Repository
```bash
git clone <repository-url>
cd AgriAssist
```

### Frontend Setup
```bash
cd client
npm install
```

### Backend Setup
```bash
cd ../server
pip install -r requirements.txt
```

## Configuration

### Backend Environment Variables
Create a `.env` file in the `server/` directory:

```
MISTRAL_API_KEY=your_mistral_api_key
# Add other environment variables as needed
```

### Frontend Configuration
Update Firebase configuration in `client/src/firebase.js` with your Firebase project credentials.

## Running the Project

### Start Backend Server
```bash
cd server
python main.py
```
The backend will run on `http://localhost:8000`

### Start Frontend Development Server
```bash
cd client
npm run dev
```
The frontend will run on `http://localhost:5173`

## API Endpoints

### Chat/RAG
- `POST /api/chat` - Send a query to the AI assistant

### Weather
- `GET /api/weather` - Get weather data

### Prediction
- `POST /api/predict` - Get crop yield predictions

### News
- `GET /api/news` - Get latest agricultural news

## Data Ingestion

To ingest new documents into the vector store:

```bash
cd server
python ingest.py
```

This will process PDFs in the `docs/` folder and update the FAISS index.

## Project Features Details

### Chat Assistant
- Uses Retrieval Augmented Generation (RAG) with FAISS
- Trained on agricultural documents and schemes
- Responds to farming-related queries with contextual information

### Prediction Module
- Predicts crop yields based on historical data
- Uses machine learning models
- Processes `yield_dataset.csv` for training

### Weather Integration
- Provides real-time weather updates
- Helps farmers plan activities based on forecasts

### News Module
- Aggregates agricultural news
- Updates on farming schemes and policies

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues or questions, please open an issue in the repository or contact the development team.
