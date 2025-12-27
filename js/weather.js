// ==================== SOILSYNC WEATHER ADVISORY SYSTEM ====================

class WeatherAdvisory {
    constructor() {
        this.apiKey = 'demo_key'; // Replace with actual OpenWeatherMap API key
        this.baseURL = 'https://api.openweathermap.org/data/2.5';
        this.currentLocation = null;
        this.currentWeatherData = null;
        this.recognition = null;
        this.isListening = false;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.initVoiceRecognition();
    }

    bindEvents() {
        // Weather fetch button
        document.getElementById('getWeatherBtn').addEventListener('click', () => {
            const city = document.getElementById('cityInput').value.trim();
            if (city) {
                this.getWeatherByCity(city);
            } else {
                this.showError('Please enter a city name');
            }
        });

        // Enter key support
        document.getElementById('cityInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('getWeatherBtn').click();
            }
        });

        // Current location button
        document.getElementById('getCurrentLocation').addEventListener('click', () => {
            this.getCurrentLocation();
        });

        // Voice weather button
        document.getElementById('voiceWeatherBtn').addEventListener('click', () => {
            this.toggleVoiceRecognition();
        });

        // Language change
        document.getElementById('languageSelect').addEventListener('change', () => {
            if (this.currentWeatherData) {
                this.updateFarmingAdvice(this.currentWeatherData);
            }
        });
    }

    // ==================== WEATHER API INTEGRATION ====================

    async getWeatherByCity(city) {
        this.showLoading();
        
        try {
            // Use real backend API
            const weatherResponse = await fetch('/api/weather/current', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ city: city })
            });
            
            const forecastResponse = await fetch('/api/weather/forecast', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ city: city })
            });
            
            const weatherData = await weatherResponse.json();
            const forecastData = await forecastResponse.json();
            
            if (weatherData.status === 'success' && forecastData.status === 'success') {
                this.currentWeatherData = weatherData.weather;
                this.displayCurrentWeather(weatherData.weather);
                this.displayWeatherMetrics(weatherData.weather);
                this.displayForecast(forecastData.forecast);
                this.updateFarmingAdvice(weatherData.weather);
            } else {
                throw new Error('API Error');
            }
            
            this.hideLoading();
        } catch (error) {
            this.hideLoading();
            this.showError('Failed to fetch weather data. Please try again.');
            console.error('Weather API Error:', error);
        }
    }

    async getCurrentLocation() {
        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by this browser');
            return;
        }

        this.showLoading();
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const weatherData = await this.simulateWeatherAPIByCoords(latitude, longitude);
                    const forecastData = await this.simulateForecastAPI(weatherData.name);
                    
                    this.currentWeatherData = weatherData;
                    this.displayCurrentWeather(weatherData);
                    this.displayWeatherMetrics(weatherData);
                    this.displayForecast(forecastData);
                    this.updateFarmingAdvice(weatherData);
                    
                    document.getElementById('cityInput').value = weatherData.name;
                    this.hideLoading();
                } catch (error) {
                    this.hideLoading();
                    this.showError('Failed to get weather for your location');
                }
            },
            (error) => {
                this.hideLoading();
                this.showError('Unable to get your location. Please enter city manually.');
            }
        );
    }

    // ==================== API SIMULATION (Replace with real APIs) ====================

    async simulateWeatherAPI(city) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const weatherConditions = [
                    {
                        name: city,
                        main: { temp: 28, feels_like: 32, humidity: 65, pressure: 1013 },
                        weather: [{ main: 'Clear', description: 'Clear sky', icon: '01d' }],
                        wind: { speed: 3.5 },
                        visibility: 10,
                        clouds: { all: 20 },
                        rain: null
                    },
                    {
                        name: city,
                        main: { temp: 24, feels_like: 26, humidity: 80, pressure: 1008 },
                        weather: [{ main: 'Rain', description: 'Light rain', icon: '10d' }],
                        wind: { speed: 5.2 },
                        visibility: 8,
                        clouds: { all: 75 },
                        rain: { '1h': 2.5 }
                    },
                    {
                        name: city,
                        main: { temp: 35, feels_like: 40, humidity: 45, pressure: 1015 },
                        weather: [{ main: 'Clear', description: 'Hot and sunny', icon: '01d' }],
                        wind: { speed: 2.1 },
                        visibility: 12,
                        clouds: { all: 5 },
                        rain: null
                    }
                ];
                
                const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
                resolve(randomWeather);
            }, 1500);
        });
    }

    async simulateWeatherAPIByCoords(lat, lon) {
        // Simulate reverse geocoding and weather fetch
        const cities = ['Mumbai', 'Pune', 'Nashik', 'Aurangabad', 'Nagpur'];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        return this.simulateWeatherAPI(randomCity);
    }

    async simulateForecastAPI(city) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const forecast = [];
                const today = new Date();
                
                for (let i = 1; i <= 5; i++) {
                    const date = new Date(today);
                    date.setDate(today.getDate() + i);
                    
                    const temps = [22, 28, 32, 26, 30];
                    const conditions = ['Clear', 'Clouds', 'Rain', 'Clear', 'Clouds'];
                    const icons = ['01d', '02d', '10d', '01d', '03d'];
                    
                    forecast.push({
                        dt: date.getTime() / 1000,
                        main: { 
                            temp_max: temps[i-1] + Math.floor(Math.random() * 5),
                            temp_min: temps[i-1] - Math.floor(Math.random() * 8)
                        },
                        weather: [{ 
                            main: conditions[i-1], 
                            icon: icons[i-1],
                            description: conditions[i-1].toLowerCase()
                        }]
                    });
                }
                
                resolve({ list: forecast });
            }, 800);
        });
    }

    // ==================== UI DISPLAY FUNCTIONS ====================

    displayCurrentWeather(data) {
        document.getElementById('currentLocation').textContent = data.name;
        document.getElementById('currentTemp').textContent = Math.round(data.main.temp);
        document.getElementById('weatherDescription').textContent = 
            data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
        document.getElementById('visibility').textContent = data.visibility;
        document.getElementById('windSpeed').textContent = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h
        
        // Update weather icon
        const iconElement = document.getElementById('mainWeatherIcon');
        const iconMap = {
            '01d': 'fas fa-sun',
            '01n': 'fas fa-moon',
            '02d': 'fas fa-cloud-sun',
            '02n': 'fas fa-cloud-moon',
            '03d': 'fas fa-cloud',
            '03n': 'fas fa-cloud',
            '04d': 'fas fa-clouds',
            '04n': 'fas fa-clouds',
            '09d': 'fas fa-cloud-showers-heavy',
            '09n': 'fas fa-cloud-showers-heavy',
            '10d': 'fas fa-cloud-rain',
            '10n': 'fas fa-cloud-rain',
            '11d': 'fas fa-bolt',
            '11n': 'fas fa-bolt',
            '13d': 'fas fa-snowflake',
            '13n': 'fas fa-snowflake',
            '50d': 'fas fa-smog',
            '50n': 'fas fa-smog'
        };
        
        iconElement.className = iconMap[data.weather[0].icon] || 'fas fa-sun';
        
        document.getElementById('currentWeather').style.display = 'block';
    }

    displayWeatherMetrics(data) {
        document.getElementById('humidity').textContent = data.main.humidity + '%';
        document.getElementById('feelsLike').textContent = Math.round(data.main.feels_like) + '°C';
        document.getElementById('pressure').textContent = data.main.pressure + ' hPa';
        
        // Calculate rain chance based on humidity and clouds
        const rainChance = data.rain ? 80 : Math.min(data.main.humidity + data.clouds.all / 2, 100);
        document.getElementById('rainChance').textContent = Math.round(rainChance) + '%';
        
        document.getElementById('weatherMetrics').style.display = 'grid';
    }

    displayForecast(data) {
        const forecastContainer = document.getElementById('forecastCards');
        forecastContainer.innerHTML = '';
        
        data.list.forEach(day => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('en-IN', { weekday: 'short' });
            const dayDate = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
            
            const forecastCard = document.createElement('div');
            forecastCard.className = 'forecast-card';
            forecastCard.innerHTML = `
                <div class=\"forecast-day\">${dayName}</div>
                <div class=\"forecast-date\">${dayDate}</div>
                <i class=\"${this.getWeatherIcon(day.weather[0].icon)}\"></i>
                <div class=\"forecast-temps\">
                    <span class=\"high\">${Math.round(day.main.temp_max)}°</span>
                    <span class=\"low\">${Math.round(day.main.temp_min)}°</span>
                </div>
                <div class=\"forecast-desc\">${day.weather[0].main}</div>
            `;
            
            forecastContainer.appendChild(forecastCard);
        });
        
        document.getElementById('forecastSection').style.display = 'block';
    }

    getWeatherIcon(iconCode) {
        const iconMap = {
            '01d': 'fas fa-sun', '01n': 'fas fa-moon',
            '02d': 'fas fa-cloud-sun', '02n': 'fas fa-cloud-moon',
            '03d': 'fas fa-cloud', '03n': 'fas fa-cloud',
            '04d': 'fas fa-clouds', '04n': 'fas fa-clouds',
            '09d': 'fas fa-cloud-showers-heavy', '09n': 'fas fa-cloud-showers-heavy',
            '10d': 'fas fa-cloud-rain', '10n': 'fas fa-cloud-rain',
            '11d': 'fas fa-bolt', '11n': 'fas fa-bolt',
            '13d': 'fas fa-snowflake', '13n': 'fas fa-snowflake',
            '50d': 'fas fa-smog', '50n': 'fas fa-smog'
        };
        return iconMap[iconCode] || 'fas fa-sun';
    }

    // ==================== AI FARMING RECOMMENDATIONS ====================

    updateFarmingAdvice(weatherData) {
        const lang = document.getElementById('languageSelect').value;
        const advice = this.generateFarmingAdvice(weatherData, lang);
        
        document.getElementById('irrigationAdvice').textContent = advice.irrigation;
        document.getElementById('sprayingAdvice').textContent = advice.spraying;
        document.getElementById('fieldWorkAdvice').textContent = advice.fieldWork;
        document.getElementById('weatherAlerts').textContent = advice.alerts;
        
        document.getElementById('farmingAdvice').style.display = 'block';
    }

    generateFarmingAdvice(data, lang) {
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed * 3.6; // km/h
        const isRaining = data.rain !== null;
        const condition = data.weather[0].main.toLowerCase();
        
        const advice = {
            'en-IN': {
                irrigation: this.getIrrigationAdvice(temp, humidity, isRaining),
                spraying: this.getSprayingAdvice(windSpeed, isRaining, humidity),
                fieldWork: this.getFieldWorkAdvice(condition, temp, isRaining),
                alerts: this.getWeatherAlerts(data)
            },
            'hi-IN': {
                irrigation: this.getIrrigationAdviceHindi(temp, humidity, isRaining),
                spraying: this.getSprayingAdviceHindi(windSpeed, isRaining, humidity),
                fieldWork: this.getFieldWorkAdviceHindi(condition, temp, isRaining),
                alerts: this.getWeatherAlertsHindi(data)
            },
            'mr-IN': {
                irrigation: this.getIrrigationAdviceMarathi(temp, humidity, isRaining),
                spraying: this.getSprayingAdviceMarathi(windSpeed, isRaining, humidity),
                fieldWork: this.getFieldWorkAdviceMarathi(condition, temp, isRaining),
                alerts: this.getWeatherAlertsMarathi(data)
            }
        };
        
        return advice[lang] || advice['en-IN'];
    }

    getIrrigationAdvice(temp, humidity, isRaining) {
        if (isRaining) return \"Skip irrigation today. Natural rainfall is sufficient.\";
        if (temp > 35) return \"Increase irrigation frequency. High temperature detected.\";
        if (humidity < 40) return \"Moderate irrigation needed. Low humidity conditions.\";
        return \"Normal irrigation schedule. Monitor soil moisture.\";
    }

    getSprayingAdvice(windSpeed, isRaining, humidity) {
        if (isRaining) return \"Avoid spraying during rain. Wait for dry conditions.\";
        if (windSpeed > 15) return \"High wind conditions. Postpone spraying to avoid drift.\";
        if (humidity > 80) return \"High humidity may reduce spray effectiveness.\";
        return \"Good conditions for spraying. Early morning or evening preferred.\";
    }

    getFieldWorkAdvice(condition, temp, isRaining) {
        if (isRaining) return \"Indoor activities recommended. Avoid field operations.\";
        if (temp > 40) return \"Extreme heat. Limit outdoor work to early morning/evening.\";
        if (condition === 'clear' && temp < 35) return \"Excellent conditions for all field activities.\";
        return \"Moderate conditions. Plan activities accordingly.\";
    }

    getWeatherAlerts(data) {
        const alerts = [];
        if (data.main.temp > 40) alerts.push(\"Heat wave warning\");
        if (data.rain && data.rain['1h'] > 10) alerts.push(\"Heavy rain alert\");
        if (data.wind.speed > 10) alerts.push(\"Strong wind advisory\");
        if (data.main.humidity > 90) alerts.push(\"Very high humidity\");
        return alerts.length > 0 ? alerts.join(\", \") : \"No weather alerts\";
    }

    // Hindi translations
    getIrrigationAdviceHindi(temp, humidity, isRaining) {
        if (isRaining) return \"आज सिंचाई छोड़ें। प्राकृतिक बारिश पर्याप्त है।\";
        if (temp > 35) return \"सिंचाई की आवृत्ति बढ़ाएं। उच्च तापमान का पता चला।\";
        if (humidity < 40) return \"मध्यम सिंचाई की आवश्यकता। कम आर्द्रता की स्थिति।\";
        return \"सामान्य सिंचाई कार्यक्रम। मिट्टी की नमी की निगरानी करें।\";
    }

    getSprayingAdviceHindi(windSpeed, isRaining, humidity) {
        if (isRaining) return \"बारिश के दौरान छिड़काव से बचें। सूखी स्थिति का इंतजार करें।\";
        if (windSpeed > 15) return \"तेज हवा की स्थिति। बहाव से बचने के लिए छिड़काव स्थगित करें।\";
        if (humidity > 80) return \"उच्च आर्द्रता छिड़काव की प्रभावशीलता कम कर सकती है।\";
        return \"छिड़काव के लिए अच्छी स्थिति। सुबह या शाम को प्राथमिकता।\";
    }

    getFieldWorkAdviceHindi(condition, temp, isRaining) {
        if (isRaining) return \"इनडोर गतिविधियों की सिफारिश। खेत के काम से बचें।\";
        if (temp > 40) return \"अत्यधिक गर्मी। बाहरी काम सुबह/शाम तक सीमित करें।\";
        if (condition === 'clear' && temp < 35) return \"सभी खेत गतिविधियों के लिए उत्कृष्ट स्थिति।\";
        return \"मध्यम स्थिति। तदनुसार गतिविधियों की योजना बनाएं।\";
    }

    getWeatherAlertsHindi(data) {
        const alerts = [];
        if (data.main.temp > 40) alerts.push(\"लू की चेतावनी\");
        if (data.rain && data.rain['1h'] > 10) alerts.push(\"भारी बारिश अलर्ट\");
        if (data.wind.speed > 10) alerts.push(\"तेज हवा सलाह\");
        if (data.main.humidity > 90) alerts.push(\"बहुत उच्च आर्द्रता\");
        return alerts.length > 0 ? alerts.join(\", \") : \"कोई मौसम अलर्ट नहीं\";
    }

    // Marathi translations
    getIrrigationAdviceMarathi(temp, humidity, isRaining) {
        if (isRaining) return \"आज पाणी देणे टाळा। नैसर्गिक पाऊस पुरेसा आहे।\";
        if (temp > 35) return \"पाणी देण्याची वारंवारता वाढवा। उच्च तापमान आढळले।\";
        if (humidity < 40) return \"मध्यम पाणी देणे आवश्यक। कमी आर्द्रता परिस्थिती।\";
        return \"सामान्य पाणी देण्याचे वेळापत्रक। मातीतील ओलावा तपासा।\";
    }

    getSprayingAdviceMarathi(windSpeed, isRaining, humidity) {
        if (isRaining) return \"पावसात फवारणी टाळा। कोरड्या परिस्थितीची प्रतीक्षा करा।\";
        if (windSpeed > 15) return \"जोरदार वारा परिस्थिती। वाहून जाणे टाळण्यासाठी फवारणी पुढे ढकला।\";
        if (humidity > 80) return \"उच्च आर्द्रता फवारणीची प्रभावीता कमी करू शकते।\";
        return \"फवारणीसाठी चांगली परिस्थिती। सकाळ किंवा संध्याकाळ प्राधान्य।\";
    }

    getFieldWorkAdviceMarathi(condition, temp, isRaining) {
        if (isRaining) return \"घरातील कामांची शिफारस। शेतातील कामे टाळा।\";
        if (temp > 40) return \"अति उष्णता। बाहेरील काम सकाळ/संध्याकाळपुरते मर्यादित करा।\";
        if (condition === 'clear' && temp < 35) return \"सर्व शेती कामांसाठी उत्कृष्ट परिस्थिती।\";
        return \"मध्यम परिस्थिती। त्यानुसार कामांचे नियोजन करा।\";
    }

    getWeatherAlertsMarathi(data) {
        const alerts = [];
        if (data.main.temp > 40) alerts.push(\"उष्णलहरीचा इशारा\");
        if (data.rain && data.rain['1h'] > 10) alerts.push(\"मुसळधार पावसाचा इशारा\");
        if (data.wind.speed > 10) alerts.push(\"जोरदार वाऱ्याचा सल्ला\");
        if (data.main.humidity > 90) alerts.push(\"खूप जास्त आर्द्रता\");
        return alerts.length > 0 ? alerts.join(\", \") : \"कोणतेही हवामान इशारे नाहीत\";
    }

    // ==================== VOICE RECOGNITION ====================

    initVoiceRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-IN';

            this.recognition.onstart = () => {
                this.isListening = true;
                document.getElementById('voiceWeatherBtn').innerHTML = '<i class=\"fas fa-stop\"></i>';
                this.speak('Tell me the city name for weather information');
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('cityInput').value = transcript;
                this.getWeatherByCity(transcript);
            };

            this.recognition.onend = () => {
                this.isListening = false;
                document.getElementById('voiceWeatherBtn').innerHTML = '<i class=\"fas fa-microphone\"></i>';
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.isListening = false;
                document.getElementById('voiceWeatherBtn').innerHTML = '<i class=\"fas fa-microphone\"></i>';
            };
        }
    }

    toggleVoiceRecognition() {
        if (!this.recognition) {
            this.showError('Voice recognition not supported in this browser');
            return;
        }

        if (this.isListening) {
            this.recognition.stop();
        } else {
            const lang = document.getElementById('languageSelect').value;
            this.recognition.lang = lang;
            this.recognition.start();
        }
    }

    speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            const lang = document.getElementById('languageSelect').value;
            utterance.lang = lang;
            utterance.rate = 0.9;
            speechSynthesis.speak(utterance);
        }
    }

    // ==================== UTILITY FUNCTIONS ====================

    showLoading() {
        document.getElementById('loadingIndicator').style.display = 'block';
        document.getElementById('currentWeather').style.display = 'none';
        document.getElementById('weatherMetrics').style.display = 'none';
        document.getElementById('farmingAdvice').style.display = 'none';
        document.getElementById('forecastSection').style.display = 'none';
    }

    hideLoading() {
        document.getElementById('loadingIndicator').style.display = 'none';
    }

    showError(message) {
        // Create and show error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.innerHTML = `
            <i class=\"fas fa-exclamation-circle\"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    new WeatherAdvisory();
});

// ==================== BACKEND INTEGRATION READY ====================
/*
To integrate with Flask backend:

1. Replace simulateWeatherAPI with:
   fetch('/api/weather/current', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ city: city })
   })

2. Replace simulateForecastAPI with:
   fetch('/api/weather/forecast', {
       method: 'POST', 
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ city: city })
   })

3. Add error handling for real API responses
4. Implement authentication if required
5. Add offline caching for better UX
*/