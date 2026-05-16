import os
import hmac
import hashlib
import asyncio
import logging
from datetime import datetime, timezone
from typing import Optional

from fastapi import FastAPI, HTTPException, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv
import setuptools
import razorpay
import resend
import psycopg2
from psycopg2.extras import RealDictCursor

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Speakupp API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Environment variables
RAZORPAY_KEY_ID = os.environ.get("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.environ.get("RAZORPAY_KEY_SECRET")
RESEND_API_KEY = os.environ.get("RESEND_API_KEY")
ZOOM_LINK = os.environ.get("ZOOM_LINK", "https://zoom.us/j/YOUR_MEETING_ID")
DATABASE_URL = os.environ.get("DATABASE_URL")
FRONTEND_URL = os.environ.get("FRONTEND_URL", "https://speakupp.vercel.app")

# Initialize Razorpay client
razorpay_client = None
if RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET:
    razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

# Initialize Resend
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Database connection
def get_db_connection():
    if not DATABASE_URL:
        return None
    try:
        conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
        return conn
    except Exception as e:
        logger.error(f"Database connection error: {e}")
        return None

# Initialize database tables
def init_db():
    conn = get_db_connection()
    if not conn:
        logger.warning("No database connection - skipping table creation")
        return
    
    try:
        cursor = conn.cursor()
        
        # Create bookings table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS bookings (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                plan VARCHAR(100) NOT NULL,
                amount INTEGER NOT NULL,
                payment_id VARCHAR(255),
                order_id VARCHAR(255) NOT NULL,
                zoom_link TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Create settings table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS settings (
                key VARCHAR(100) PRIMARY KEY,
                value TEXT
            )
        """)
        
        # Insert default zoom link if not exists
        cursor.execute("""
            INSERT INTO settings (key, value) VALUES ('zoom_link', %s)
            ON CONFLICT (key) DO NOTHING
        """, (ZOOM_LINK,))
        
        conn.commit()
        cursor.close()
        conn.close()
        logger.info("Database tables initialized successfully")
    except Exception as e:
        logger.error(f"Error initializing database: {e}")

# Initialize DB on startup
@app.on_event("startup")
async def startup_event():
    init_db()

# Pydantic models
class CreateOrderRequest(BaseModel):
    name: str
    email: EmailStr
    plan: str
    amount: int  # Amount in paise

class VerifyPaymentRequest(BaseModel):
    razorpay_payment_id: str
    razorpay_order_id: str
    razorpay_signature: str
    name: str
    email: EmailStr
    plan: str
    amount: int

class UpdateZoomLinkRequest(BaseModel):
    zoom_link: str

# Get current zoom link from settings
def get_zoom_link():
    conn = get_db_connection()
    if not conn:
        return ZOOM_LINK
    
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT value FROM settings WHERE key = 'zoom_link'")
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        return result['value'] if result else ZOOM_LINK
    except Exception as e:
        logger.error(f"Error getting zoom link: {e}")
        return ZOOM_LINK

# Send confirmation email
async def send_confirmation_email(name: str, email: str, plan: str, amount: int, zoom_link: str):
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not set - skipping email")
        return
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0fdfa; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); padding: 40px 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px;">SpeakUpp</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your Confidence Journey Begins!</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
                <h2 style="color: #1a1a2e; margin: 0 0 20px 0; font-size: 24px;">Hi {name}! 👋</h2>
                
                <div style="background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%); border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center;">
                    <p style="font-size: 20px; color: #14b8a6; margin: 0; font-weight: bold;">🎊 Your Seat is Confirmed!</p>
                </div>
                
                <table style="width: 100%; margin: 25px 0; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Plan</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1a1a2e; font-weight: 600; text-align: right;">{plan}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Amount Paid</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #14b8a6; font-weight: 600; text-align: right;">₹{amount // 100}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; color: #6b7280;">Class Time</td>
                        <td style="padding: 12px 0; color: #1a1a2e; font-weight: 600; text-align: right;">7:00 PM IST</td>
                    </tr>
                </table>
                
                <!-- Zoom Button -->
                <div style="text-align: center; margin: 35px 0;">
                    <a href="{zoom_link}" style="display: inline-block; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); color: #ffffff; text-decoration: none; padding: 18px 45px; border-radius: 50px; font-size: 18px; font-weight: bold; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.4);">
                        🎥 Join Zoom Class
                    </a>
                </div>
                
                <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 20px 0 0 0;">
                    Save this link! You'll use it to join the live session.
                </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="color: #1a1a2e; margin: 0 0 10px 0; font-weight: 600;">Sandhya | SpeakUpp</p>
                <p style="color: #6b7280; margin: 0; font-size: 14px;">
                    📞 +91 9599 539864 &nbsp;|&nbsp; 📧 speakupp3@gmail.com
                </p>
            </div>
        </div>
    </body>
    </html>
    """
    
    params = {
        "from": "onboarding@resend.dev",
        "to": [email],
        "subject": "Your Speakupp Class is Confirmed! 🎉",
        "html": html_content
    }
    
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email sent successfully to {email}: {result}")
        return result
    except Exception as e:
        logger.error(f"Failed to send email: {e}")
        return None

# API Endpoints

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "Speakupp API"}

@app.post("/api/create-order")
async def create_order(request: CreateOrderRequest):
    if not razorpay_client:
        raise HTTPException(status_code=500, detail="Razorpay not configured")
    
    try:
        # Create Razorpay order
        order_data = {
            "amount": request.amount,  # Amount in paise
            "currency": "INR",
            "receipt": f"speakupp_{int(datetime.now(timezone.utc).timestamp())}",
            "payment_capture": 1
        }
        
        order = razorpay_client.order.create(data=order_data)
        
        logger.info(f"Order created: {order['id']} for {request.email}")
        
        return {
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
            "key_id": RAZORPAY_KEY_ID
        }
    except Exception as e:
        logger.error(f"Error creating order: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/verify-payment")
async def verify_payment(request: VerifyPaymentRequest):
    if not razorpay_client:
        raise HTTPException(status_code=500, detail="Razorpay not configured")
    
    try:
        # Verify signature using HMAC-SHA256
        message = f"{request.razorpay_order_id}|{request.razorpay_payment_id}"
        generated_signature = hmac.new(
            RAZORPAY_KEY_SECRET.encode(),
            message.encode(),
            hashlib.sha256
        ).hexdigest()
        
        if generated_signature != request.razorpay_signature:
            logger.error("Payment signature verification failed")
            raise HTTPException(status_code=400, detail="Payment verification failed")
        
        # Get current zoom link
        zoom_link = get_zoom_link()
        
        # Save to database
        conn = get_db_connection()
        if conn:
            try:
                cursor = conn.cursor()
                cursor.execute("""
                    INSERT INTO bookings (name, email, plan, amount, payment_id, order_id, zoom_link, created_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """, (
                    request.name,
                    request.email,
                    request.plan,
                    request.amount,
                    request.razorpay_payment_id,
                    request.razorpay_order_id,
                    zoom_link,
                    datetime.now(timezone.utc)
                ))
                conn.commit()
                cursor.close()
                conn.close()
                logger.info(f"Booking saved for {request.email}")
            except Exception as e:
                logger.error(f"Error saving booking: {e}")
        
        # Send confirmation email
        await send_confirmation_email(
            request.name,
            request.email,
            request.plan,
            request.amount,
            zoom_link
        )
        
        logger.info(f"Payment verified for {request.email}")
        
        return {
            "success": True,
            "zoom_link": zoom_link,
            "message": "Payment verified successfully"
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error verifying payment: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/admin/bookings")
async def get_bookings(x_admin_password: Optional[str] = Header(None)):
    # Simple password protection
    if x_admin_password != "admin123":
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    conn = get_db_connection()
    if not conn:
        return {"bookings": []}
    
    try:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, name, email, plan, amount, payment_id, order_id, zoom_link, created_at
            FROM bookings
            ORDER BY created_at DESC
        """)
        bookings = cursor.fetchall()
        cursor.close()
        conn.close()
        
        # Convert to list of dicts with proper formatting
        result = []
        for booking in bookings:
            result.append({
                "id": booking["id"],
                "name": booking["name"],
                "email": booking["email"],
                "plan": booking["plan"],
                "amount": booking["amount"],
                "payment_id": booking["payment_id"],
                "order_id": booking["order_id"],
                "zoom_link": booking["zoom_link"],
                "created_at": booking["created_at"].isoformat() if booking["created_at"] else None
            })
        
        return {"bookings": result}
    except Exception as e:
        logger.error(f"Error getting bookings: {e}")
        return {"bookings": []}

@app.put("/api/admin/zoom-link")
async def update_zoom_link(request: UpdateZoomLinkRequest, x_admin_password: Optional[str] = Header(None)):
    # Simple password protection
    if x_admin_password != "admin123":
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database not available")
    
    try:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO settings (key, value) VALUES ('zoom_link', %s)
            ON CONFLICT (key) DO UPDATE SET value = %s
        """, (request.zoom_link, request.zoom_link))
        conn.commit()
        cursor.close()
        conn.close()
        
        logger.info(f"Zoom link updated to: {request.zoom_link}")
        
        return {"success": True, "zoom_link": request.zoom_link}
    except Exception as e:
        logger.error(f"Error updating zoom link: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/zoom-link")
async def get_current_zoom_link():
    return {"zoom_link": get_zoom_link()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8001)))
