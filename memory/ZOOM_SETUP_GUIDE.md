# Speakupp - Zoom Meeting Setup Guide

## How to Set Up Your Zoom Meeting Link

### Step 1: Create Zoom Account (if you don't have one)
1. Go to [zoom.us](https://zoom.us)
2. Click "Sign Up, It's Free"
3. Create account with your email

### Step 2: Schedule a Recurring Meeting
1. Login to Zoom → Click "Schedule"
2. Enter meeting details:
   - **Topic**: "Speakupp Live Class"
   - **Recurring meeting**: Check this ✅
   - **Recurrence**: Weekly
   - **Time**: 7:00 PM IST (for weekday classes)
   - **Duration**: 60-90 minutes
3. Click "Save"
4. Copy the meeting link (looks like: `https://zoom.us/j/1234567890`)

### Step 3: Update Website with Your Zoom Link

Open `/app/frontend/src/App.js` and find this line (around line 145):

```javascript
// ===== ZOOM MEETING CONFIGURATION =====
// UPDATE THIS LINK WITH YOUR ACTUAL ZOOM MEETING LINK
const ZOOM_MEETING_LINK = "https://zoom.us/j/YOUR_MEETING_ID";
// =====================================
```

Replace `YOUR_MEETING_ID` with your actual Zoom meeting ID.

**Example:**
```javascript
const ZOOM_MEETING_LINK = "https://zoom.us/j/1234567890";
```

### Step 4: Update Class Schedule (Optional)

To change class days/times, find the `schedule` array in App.js:

```javascript
const schedule = [
  {
    id: 1,
    day: "Monday",
    time: "7:00 PM",
    duration: "60 mins",
    topic: "Confidence Building Basics",
    status: "upcoming"
  },
  // ... more classes
];
```

---

## Current Schedule

| Day | Time | Topic | Duration |
|-----|------|-------|----------|
| Monday | 7:00 PM IST | Confidence Building Basics | 60 mins |
| Wednesday | 7:00 PM IST | Public Speaking Mastery | 60 mins |
| Friday | 7:00 PM IST | Communication Skills | 60 mins |
| Saturday | 11:00 AM IST | Weekend Special: Full Workshop | 90 mins |

---

## Tips for Running Zoom Classes

1. **Start 5 mins early** - Allow time for students to join
2. **Enable Waiting Room** - Control who joins
3. **Record sessions** - Share with students who missed
4. **Share Zoom link via WhatsApp** after payment confirmation
5. **Use Breakout Rooms** for small group activities

---

## Next Steps

- [ ] Create your Zoom account
- [ ] Schedule recurring meeting
- [ ] Update the ZOOM_MEETING_LINK in App.js
- [ ] Set up Razorpay for payments (provide API keys when ready)
