import os
import httpx
from fastapi import APIRouter, HTTPException, Query
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

OPENWEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

@router.get("/api/weather")
async def get_weather(lat: float = Query(...), lon: float = Query(...)):
    if not OPENWEATHER_API_KEY:
        raise HTTPException(status_code=500, detail="API key not configured.")

    url = (
        f"https://api.openweathermap.org/data/2.5/weather?"
        f"lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric"
    )

    try:
        async with httpx.AsyncClient() as client:
            res = await client.get(url)
            if res.status_code != 200:
                raise HTTPException(status_code=res.status_code, detail="Weather API error")
            data = res.json()
            return {
                "location": data["name"],
                "temperature": data["main"]["temp"],
                "humidity": data["main"]["humidity"],
                "condition": data["weather"][0]["description"],
                "icon": data["weather"][0]["icon"]
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
