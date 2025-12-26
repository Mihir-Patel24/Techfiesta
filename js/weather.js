const button = document.getElementById('getWeather');
const weatherCards = document.getElementById('weatherCards');

button.addEventListener('click', () => {
    const city = document.getElementById('city').value.trim();
    if(city === "") {
        alert("Please enter your city!");
        return;
    }

    // Simulated weather data (can be replaced with real API)
    const data = {
        yesterday: {
            icon: "🌤️",
            temp: "26°C",
            desc: "Sunny with light breeze."
        },
        today: {
            icon: "🌱",
            temp: "28°C",
            desc: "Warm and perfect for irrigation."
        },
        dayAfter: {
            icon: "🌦️",
            temp: "27°C",
            desc: "Light rain expected. Protect seedlings."
        }
    };

    weatherCards.innerHTML = `
        <div class="weather-card">
            <div class="weather-icon">${data.yesterday.icon}</div>
            <h3>Yesterday - ${city}</h3>
            <p><strong>Temp:</strong> ${data.yesterday.temp}</p>
            <p>${data.yesterday.desc}</p>
        </div>

        <div class="weather-card">
            <div class="weather-icon">${data.today.icon}</div>
            <h3>Today - ${city}</h3>
            <p><strong>Temp:</strong> ${data.today.temp}</p>
            <p>${data.today.desc}</p>
        </div>

        <div class="weather-card">
            <div class="weather-icon">${data.dayAfter.icon}</div>
            <h3>Day After - ${city}</h3>
            <p><strong>Temp:</strong> ${data.dayAfter.temp}</p>
            <p>${data.dayAfter.desc}</p>
        </div>
    `;
});