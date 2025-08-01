from fastapi import APIRouter
import httpx
import os
from dotenv import load_dotenv

load_dotenv()  # to load API_KEY from .env

router = APIRouter()

@router.get("/news")
async def get_agriculture_news():
    api_key = os.getenv("GNEWS_API_KEY")
    url = f"https://gnews.io/api/v4/search?q=agriculture&lang=en&token={api_key}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        data = response.json()
    return data.get("articles", [])
