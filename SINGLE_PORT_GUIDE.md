# 🌱 SoilSync - Single Port Setup

## ✅ ONE COMMAND TO RUN EVERYTHING:

```bash
cd backend
python app.py
```

**Then open:** http://localhost:5000

## 📊 What You'll See:

### Disease Detection Results:
- **Source:** Simulated AI (not real TensorFlow)
- **Display:** Confidence %, disease name, treatment
- **Note:** "This is simulated AI for demo"

### Weather Data:
- **Source:** Hardcoded city data (not real API)
- **Cities:** Mumbai, Delhi, Pune have specific data
- **Others:** Random generated data

### Chatbot Responses:
- **Source:** Rule-based keyword matching
- **Not:** Real NLP or machine learning
- **Shows:** Contextual farming advice

## 🔧 Real vs Simulated:

| Feature | Current | Real Production |
|---------|---------|-----------------|
| Disease AI | Random selection | TensorFlow CNN model |
| Weather | Hardcoded data | OpenWeatherMap API |
| Chatbot | Keyword matching | GPT/BERT NLP model |
| Voice | Browser API | Cloud speech services |

## 🎯 Test Features:
1. Go to http://localhost:5000/pages/disease.html
2. Upload any image → See "simulated AI" result
3. Try symptom quiz → See analysis
4. Test weather with "Mumbai" → See realistic data
5. Use chatbot → See rule-based responses

**Everything runs on PORT 5000 now!** 🚀