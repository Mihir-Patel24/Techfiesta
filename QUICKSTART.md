# 🌱 SoilSync - Quick Start Guide

## 🚀 How to Run

### Step 1: Start Backend
```bash
cd backend
python app.py
```
**Expected Output:** `Starting SoilSync Backend Server...`
**URL:** http://localhost:5000

### Step 2: Start Frontend (New Terminal)
```bash
python -m http.server 8000
```
**URL:** http://localhost:8000

### Step 3: Open Browser
Go to: http://localhost:8000

## ✅ Test Features

### 1. Disease Detection
- Go to: http://localhost:8000/pages/disease.html
- Click "📸 Image Analysis" tab
- Upload any image
- Click "🔍 Analyze Image"
- **Expected:** AI detection result with treatment

### 2. Symptom Quiz
- Same page, click "📝 Symptom Quiz" tab  
- Click "🎯 Start Symptom Quiz"
- Answer 3 questions
- **Expected:** Disease analysis with recommendations

### 3. Weather System
- Go to: http://localhost:8000/pages/weather.html
- Enter city name (e.g., "Mumbai")
- Click "Get Weather"
- **Expected:** Weather data + farming advice

### 4. AI Chatbot
- Go to: http://localhost:8000/pages/chatbot.html
- Type: "help with crop disease"
- **Expected:** AI response with suggestions

### 5. Voice Features
- On chatbot page, click 🎤 button
- Say something (allow microphone)
- **Expected:** Text appears + voice response

## 🔧 Quick Test API

Open browser console (F12) and run:
```javascript
fetch('http://localhost:5000/api/chatbot/query', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({query: 'test', language: 'en-IN'})
}).then(r => r.json()).then(console.log)
```

## 🎯 Feature Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 8000  
- [ ] Disease detection working
- [ ] Weather data loading
- [ ] Chatbot responding
- [ ] Voice recognition working
- [ ] All pages accessible

## 🐛 Troubleshooting

**Backend not starting?**
```bash
pip install flask flask-cors requests pillow numpy
```

**CORS errors?**
- Make sure backend is running first
- Check console for error messages

**Voice not working?**
- Use Chrome browser
- Allow microphone permissions
- Check if HTTPS (for production)

## 📱 Mobile Testing
- Open http://localhost:8000 on phone
- Connect to same WiFi network
- Replace localhost with computer IP