# SpeakUpp - Complete Platform PRD

## Platform Overview
Online Zoom-based coaching/motivation platform by Sandhya.

## Tech Stack
- **Backend**: Python FastAPI (Railway deployment)
- **Frontend**: React (Vercel deployment)
- **Database**: PostgreSQL
- **Payments**: Razorpay
- **Email**: Resend

## Environment Variables Required

### Backend (.env on Railway)
```
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RESEND_API_KEY=your_resend_api_key
ZOOM_LINK=https://zoom.us/j/YOUR_MEETING_ID
DATABASE_URL=postgresql://user:password@host:5432/speakupp
FRONTEND_URL=https://speakupp.vercel.app
```

### Frontend (.env on Vercel)
```
REACT_APP_BACKEND_URL=https://speakupp-production.up.railway.app
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/create-order` | POST | Create Razorpay order |
| `/api/verify-payment` | POST | Verify payment & send email |
| `/api/admin/bookings` | GET | Get all bookings (password protected) |
| `/api/admin/zoom-link` | PUT | Update Zoom link |
| `/api/zoom-link` | GET | Get current Zoom link |

## Database Tables

### bookings
- id, name, email, plan, amount, payment_id, order_id, zoom_link, created_at

### settings
- key, value (stores zoom_link)

## Features Implemented ✅

### Frontend
- [x] Landing page with turquoise theme
- [x] Schedule section: 2 classes/month, every 15 days
- [x] Pricing: ₹199/class (Student), ₹299/class (Regular)
- [x] Payment modal with Name/Email form
- [x] Razorpay integration
- [x] Success modal with Zoom link
- [x] Admin page at /admin (password: admin123)
- [x] Admin dashboard with bookings table
- [x] Zoom link management in admin

### Backend
- [x] Razorpay order creation
- [x] Payment verification (HMAC-SHA256)
- [x] PostgreSQL database integration
- [x] Resend email integration
- [x] Confirmation email with Zoom link
- [x] Admin API endpoints

## Contact Info
- Email: Speakupp3@gmail.com
- Phone: +91 9599 539864
- Domain: speakupp.in

## Admin Access
- URL: /admin
- Password: admin123

---
*Last Updated: January 2026*
