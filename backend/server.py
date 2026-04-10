from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Sandhya Confidence Coach API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "Sandhya Confidence Coach"}

@app.get("/api/pricing")
async def get_pricing():
    return {
        "plans": [
            {
                "id": "basic",
                "name": "Basic",
                "price": 999,
                "currency": "₹",
                "period": "month",
                "features": [
                    "2 group Zoom sessions per month",
                    "Access to session recordings",
                    "Email support"
                ],
                "popular": False
            },
            {
                "id": "standard",
                "name": "Standard",
                "price": 1999,
                "currency": "₹",
                "period": "month",
                "features": [
                    "Weekly group Zoom sessions",
                    "Access to community support",
                    "Session recordings",
                    "Priority email support"
                ],
                "popular": True
            },
            {
                "id": "premium",
                "name": "Premium",
                "price": 3999,
                "currency": "₹",
                "period": "month",
                "features": [
                    "Weekly group sessions",
                    "1 private 1-on-1 session per month",
                    "Priority support",
                    "Personalized feedback",
                    "Exclusive resources"
                ],
                "popular": False
            }
        ]
    }

@app.get("/api/schedule")
async def get_schedule():
    return {
        "classes": [
            {"day": "Monday", "time": "7:00 PM", "timezone": "IST"},
            {"day": "Wednesday", "time": "7:00 PM", "timezone": "IST"},
            {"day": "Saturday", "time": "7:00 PM", "timezone": "IST"}
        ],
        "note": "All sessions are conducted via Zoom"
    }

@app.get("/api/testimonials")
async def get_testimonials():
    return {
        "testimonials": [
            {
                "id": 1,
                "name": "Priya Sharma",
                "role": "Marketing Executive",
                "text": "Sandhya's classes have completely transformed how I present myself at work. I went from dreading meetings to confidently leading them!",
                "rating": 5
            },
            {
                "id": 2,
                "name": "Anjali Mehta",
                "role": "Entrepreneur",
                "text": "After just 3 months with Sandhya, I successfully pitched to investors and secured funding. Her techniques are life-changing.",
                "rating": 5
            },
            {
                "id": 3,
                "name": "Kavitha Reddy",
                "role": "Software Engineer",
                "text": "I used to struggle with public speaking. Now I regularly present at tech conferences. Thank you, Sandhya!",
                "rating": 5
            }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8001)))
