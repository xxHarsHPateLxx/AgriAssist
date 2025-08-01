# main.py

import os
import joblib
import numpy as np
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableLambda
from langchain_together import Together

from news_routes import router as news_router
from weather_routes import router as weather_router

# Load environment variables
load_dotenv()

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

# Constants
INDEX_DIR = "faiss_index"

# Load components for RAG
embedding = HuggingFaceEmbeddings(model_name="sentence-transformers/paraphrase-MiniLM-L3-v2")
vectordb = FAISS.load_local(INDEX_DIR, embedding, allow_dangerous_deserialization=True)
retriever = vectordb.as_retriever()

llm = Together(
    model="mistralai/Mistral-7B-Instruct-v0.2",
    temperature=0.7,
    max_tokens=512,
    together_api_key=os.getenv("TOGETHER_API_KEY"),
)

prompt = ChatPromptTemplate.from_template(
    "You are an expert farming assistant. Use the context below to answer the user’s question. "
    "Do not assume context is part of the question.\n\nContext:\n{context}\n\nQuestion:\n{question}\n\nAnswer:"
)


# Format documents from retriever into a single string
def format_docs(docs):
    return "\n\n---\n\n".join(doc.page_content.strip() for doc in docs)


# Build inputs for prompt
def build_inputs(inputs):
    docs = retriever.invoke(inputs["query"])
    context_str = format_docs(docs)
    return {"context": context_str, "question": inputs["query"]}


# Define the RAG chain
rag_chain = RunnableLambda(build_inputs) | prompt | llm | StrOutputParser()

# Load yield prediction model
model, feature_cols = joblib.load("yield_model.pkl")


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
        result = rag_chain.invoke({"query": request.query})
        return ChatResponse(answer=result)
    except Exception as e:
        print("💥 Error in /chat:", e)
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
