# main.py

import os
import subprocess
import sys
from pathlib import Path
import joblib
import numpy as np
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from news_routes import router as news_router
from weather_routes import router as weather_router

# Load environment variables
load_dotenv()

# Constants
BASE_DIR = Path(__file__).resolve().parent
FAISS_INDEX_FILE = BASE_DIR / "faiss_index" / "index.faiss"


def ensure_faiss_index() -> None:
    """Ensure FAISS index exists; build via ingest.py if missing."""
    if FAISS_INDEX_FILE.exists():
        return

    ingest_path = BASE_DIR / "ingest.py"
    try:
        subprocess.run([sys.executable, str(ingest_path)], cwd=BASE_DIR, check=True)
    except subprocess.CalledProcessError as exc:  # pragma: no cover - startup guard
        raise RuntimeError("Failed to build FAISS index via ingest.py") from exc

    if not FAISS_INDEX_FILE.exists():  # pragma: no cover - startup guard
        raise RuntimeError("FAISS index missing after ingest.py run")


# Build vector index before loading LLM chain
ensure_faiss_index()

from llm import rag_chain

# Initialize FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include additional routes
app.include_router(news_router)
app.include_router(weather_router)


# Load yield prediction model
model, feature_cols = joblib.load(str(BASE_DIR / "yield_model.pkl"))


# Request/response schemas
class ChatRequest(BaseModel):
    query: str


class ChatResponse(BaseModel):
    answer: str


class YieldFeatures(BaseModel):
    Temperature: float
    Fertilizer_Content: float
    Soil_Moisture: float
    Soil_pH: float
    Sunlight: float


# Routes

@app.get("/")
async def root():
    return {"message": "Hello from AgriAssist!"}

@app.post("/predict")
def predict_yield(features: YieldFeatures):
    input_data = np.array([[getattr(features, col) for col in feature_cols]])
    prediction = model.predict(input_data)[0]
    return {"predicted_yield": round(prediction, 3)}


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Invoke RAG chain
        result = rag_chain.invoke({"input": request.query})
        
        return ChatResponse(answer=result["answer"])
    except Exception as e:
        print("💥 Error in /chat:", e)
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
