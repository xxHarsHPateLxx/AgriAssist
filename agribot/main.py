# main.py

import re
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableLambda
from langchain_together import Together

from news_routes import router as news_router
from weather_routes import router as weather_router

from dotenv import load_dotenv
import joblib
import numpy as np
load_dotenv()

# Load FAISS
INDEX_DIR = "faiss_index"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(news_router)
app.include_router(weather_router)


class ChatRequest(BaseModel):
    query: str


class ChatResponse(BaseModel):
    answer: str


# Load components
embedding = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vectordb = FAISS.load_local(INDEX_DIR, embedding, allow_dangerous_deserialization=True)
retriever = vectordb.as_retriever()
# llm = OllamaLLM(model="deepseek-r1:1.5b", temperature=0.7, max_tokens=512)


llm = Together(
    model="mistralai/Mixtral-8x7B-Instruct-v0.1",
    temperature=0.7,
    max_tokens=512,
    together_api_key=os.getenv("TOGETHER_API_KEY"),
)


prompt = ChatPromptTemplate.from_template(
    "You are an expert farming assistant. Use the context below to answer the user’s question. Do not assume context is part of the question.\n\nContext:\n{context}\n\nQuestion:\n{question}\n\nAnswer:"

)


# ✅ Fix: convert list of documents to string
def format_docs(docs):
    return "\n\n---\n\n".join(doc.page_content.strip() for doc in docs)



# ✅ Use only string values in prompt
def build_inputs(inputs):
    docs = retriever.invoke(inputs["query"])
    context_str = format_docs(docs)
    return {"context": context_str, "question": inputs["query"]}


# ✅ Final RAG chain
rag_chain = RunnableLambda(build_inputs) | prompt | llm | StrOutputParser()

# Load model and feature columns
model, feature_cols = joblib.load("yield_model.pkl")

# Define request schema
class YieldFeatures(BaseModel):
    # Example: customize based on your dataset's columns
    Temperature : float
    Fertilizer_Content: float
    Soil_Moisture: float
    Soil_pH: float
    Sunlight: float

@app.post("/predict")
def predict_yield(features: YieldFeatures):
    # Convert input to model input format
    input_data = np.array([[getattr(features, col) for col in feature_cols]])
    
    # Predict
    prediction = model.predict(input_data)[0]
    return {"predicted_yield": round(prediction, 3)}


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        result = rag_chain.invoke({"query": request.query})
        clean_response = re.sub(
            r"<think>.*?</think>", "", result, flags=re.DOTALL
        ).strip()
        return ChatResponse(answer=clean_response)
    except Exception as e:
        print("💥 Error in /chat:", e)
        raise HTTPException(status_code=500, detail=str(e))
    

