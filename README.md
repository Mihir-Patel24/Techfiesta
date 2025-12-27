# SoilSync - AI-Powered Farmer Advisory System

## 🌱 Overview
SoilSync is a comprehensive AI-powered platform that provides farmers with intelligent advisory services including weather forecasting, disease detection, crop recommendations, fertilizer advice, and government subsidy information.

## ✨ Features
- **Weather Advisory**: Real-time weather data with farming recommendations
- **Disease Detection**: AI-powered crop disease identification
- **Crop Recommendations**: Smart crop suggestions based on soil and climate
- **Fertilizer Advisory**: Personalized fertilizer recommendations
- **Subsidy Finder**: Government scheme eligibility checker
- **Multilingual Chatbot**: AI assistant in English, Hindi, and Marathi
- **Voice Interaction**: Speech-to-text and text-to-speech capabilities

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Techfiesta
```

### 2. Install Dependencies
```bash
pip install flask flask-cors requests python-dotenv pillow numpy
```

### 3. Environment Setup
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   ```

2. Get API Keys:
   - **OpenWeather API**: Sign up at https://openweathermap.org/api
   - **Groq AI API**: Sign up at https://console.groq.com/

3. Update `.env` files with your actual API keys:
   ```
   OPENWEATHER_API_KEY=your_actual_key_here
   GROQ_API_KEY=your_actual_key_here
   ```

### 4. Run the Application
```bash
cd backend
python app.py
```

Visit `http://localhost:5000` to access the application.

## 🛠️ Technology Stack
- **Backend**: Python Flask
- **Frontend**: HTML5, CSS3, JavaScript
- **APIs**: OpenWeather API, Groq AI
- **Features**: Voice Recognition, Multilingual Support

## 📁 Project Structure
```
Techfiesta/
├── backend/
│   ├── app.py              # Flask backend
│   ├── .env.example        # Environment template
│   └── .env               # Your API keys (not in Git)
├── pages/                 # HTML pages
├── css/                   # Stylesheets
├── js/                    # JavaScript files
├── .env.example          # Environment template
├── .gitignore           # Git ignore rules
└── README.md           # This file
```

## 🔒 Security Notes
- Never commit `.env` files to Git
- API keys are automatically excluded via `.gitignore`
- Use environment variables for all sensitive data

## 🌟 Key Components
1. **Weather Service**: Real-time weather with farming advice
2. **Disease Detection**: Image-based crop disease identification
3. **Crop Recommender**: AI-powered crop suggestions
4. **Fertilizer Advisor**: Personalized fertilizer recommendations
5. **Subsidy Finder**: Government scheme eligibility
6. **Multilingual Chatbot**: AI assistant in 3 languages

## 📱 Features
- Responsive design for mobile and desktop
- Voice interaction capabilities
- Multilingual support (English, Hindi, Marathi)
- Real-time weather data
- AI-powered recommendations
- Professional UI/UX design

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License
This project is licensed under the MIT License.

## 🆘 Support
For support and questions, please create an issue in the repository.