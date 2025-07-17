// Weather App JavaScript
// To get your API key, visit: https://openweathermap.org/api
// Sign up for a free account and get your API key

// You can either:
// 1. Replace 'YOUR_API_KEY' below with your actual API key
// 2. Or set it as an environment variable (for production)

const API_KEY = 'insert your own key here'; // Replace with your actual API key

async function getWeather() {
    const cityInput = document.getElementById('city');
    const resultDiv = document.getElementById('result');
    const city = cityInput.value.trim();
    
    // Clear previous results
    resultDiv.innerHTML = '';
    
    // Validate input
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    // Check if API key is set
    if (API_KEY === 'YOUR_API_KEY') {
        showError(`
            <strong>API Key Required!</strong><br>
            To use this weather app, you need to get a free API key from OpenWeatherMap:<br>
            1. Visit <a href="https://openweathermap.org/api" target="_blank">https://openweathermap.org/api</a><br>
            2. Sign up for a free account<br>
            3. Get your API key<br>
            4. Replace 'YOUR_API_KEY' in js/script.js with your actual key
        `);
        return;
    }
    
    // Show loading state
    resultDiv.innerHTML = '<p>Loading weather data...</p>';
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Log the response for debugging
        console.log('API Response:', data);
        
        if (response.ok && data.cod === 200) {
            displayWeather(data);
        } else {
            // Handle specific error cases
            let errorMessage = '';
            
            if (data.cod === 401) {
                errorMessage = `
                    <strong>Invalid API Key!</strong><br>
                    Your API key appears to be invalid. Please check:<br>
                    1. The API key is correct and complete<br>
                    2. You've activated your API key (it may take a few hours after registration)<br>
                    3. You're using the correct API key from your OpenWeatherMap account<br>
                    <br>
                    <small>Error Code: ${data.cod} - ${data.message}</small>
                `;
            } else if (data.cod === 429) {
                errorMessage = `
                    <strong>API Rate Limit Exceeded!</strong><br>
                    You've made too many requests. Please wait a few minutes and try again.<br>
                    <br>
                    <small>Error Code: ${data.cod} - ${data.message}</small>
                `;
            } else if (data.cod === 404) {
                errorMessage = `
                    <strong>City Not Found!</strong><br>
                    "${city}" was not found. Please check the spelling and try again.<br>
                    <br>
                    <small>Error Code: ${data.cod} - ${data.message}</small>
                `;
            } else {
                errorMessage = `
                    <strong>API Error!</strong><br>
                    ${data.message || 'An unexpected error occurred'}<br>
                    <br>
                    <small>Error Code: ${data.cod}</small>
                `;
            }
            
            showError(errorMessage);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError(`
            <strong>Network Error!</strong><br>
            Unable to connect to the weather service. Please check:<br>
            1. Your internet connection<br>
            2. You're not behind a restrictive firewall<br>
            3. Try refreshing the page<br>
            <br>
            <small>Technical Error: ${error.message}</small>
        `);
    }
}

function displayWeather(data) {
    const resultDiv = document.getElementById('result');
    
    // Get weather icon
    const weatherIcon = getWeatherIcon(data.weather[0].main);
    
    const html = `
        <div class="weather-info">
            <div class="weather-item">
                <h3>${data.name}, ${data.sys.country}</h3>
                <div style="font-size: 3em; margin: 10px 0;">${weatherIcon}</div>
                <p style="font-size: 1.2em; margin: 5px 0;">${data.weather[0].description}</p>
            </div>
            <div class="weather-item">
                <h4>🌡️ Temperature</h4>
                <p style="font-size: 1.5em; font-weight: bold; margin: 5px 0;">${Math.round(data.main.temp)}°C</p>
                <p>Feels like: ${Math.round(data.main.feels_like)}°C</p>
            </div>
            <div class="weather-item">
                <h4>💧 Humidity</h4>
                <p style="font-size: 1.5em; font-weight: bold; margin: 5px 0;">${data.main.humidity}%</p>
            </div>
            <div class="weather-item">
                <h4>💨 Wind</h4>
                <p style="font-size: 1.5em; font-weight: bold; margin: 5px 0;">${data.wind.speed} m/s</p>
            </div>
            <div class="weather-item">
                <h4>📊 Pressure</h4>
                <p style="font-size: 1.5em; font-weight: bold; margin: 5px 0;">${data.main.pressure} hPa</p>
            </div>
            <div class="weather-item">
                <h4>👁️ Visibility</h4>
                <p style="font-size: 1.5em; font-weight: bold; margin: 5px 0;">${(data.visibility / 1000).toFixed(1)} km</p>
            </div>
        </div>
    `;
    
    resultDiv.innerHTML = html;
}

function showError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<div class="error">${message}</div>`;
}

function getWeatherIcon(weatherMain) {
    const icons = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Smoke': '🌫️',
        'Haze': '🌫️',
        'Dust': '🌫️',
        'Fog': '🌫️',
        'Sand': '🌫️',
        'Ash': '🌫️',
        'Squall': '💨',
        'Tornado': '🌪️'
    };
    
    return icons[weatherMain] || '🌤️';
}

// Allow Enter key to submit
document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('city');
    cityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            getWeather();
        }
    });
    
    // Add test API key functionality
    addTestButton();
});

// Function to test API key
async function testAPIKey() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<p>Testing API key...</p>';
    
    const testUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`;
    
    try {
        const response = await fetch(testUrl);
        const data = await response.json();
        
        console.log('API Test Response:', data);
        
        if (response.ok && data.cod === 200) {
            resultDiv.innerHTML = `
                <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; color: #155724;">
                    <strong>✅ API Key is Working!</strong><br>
                    Successfully retrieved weather data for London.<br>
                    <small>You can now search for any city.</small>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <div style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 5px; color: #721c24;">
                    <strong>❌ API Key Test Failed!</strong><br>
                    Error Code: ${data.cod}<br>
                    Message: ${data.message}<br>
                    <br>
                    <strong>Common Solutions:</strong><br>
                    1. Check if your API key is correct<br>
                    2. Wait 2-3 hours after registration (API keys need activation time)<br>
                    3. Make sure you're using the correct API key from your account<br>
                    4. Check if you've exceeded the free tier limits
                </div>
            `;
        }
    } catch (error) {
        resultDiv.innerHTML = `
            <div style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 5px; color: #721c24;">
                <strong>❌ Network Error!</strong><br>
                Unable to test API key due to network issues.<br>
                Error: ${error.message}
            </div>
        `;
    }
}

// Function to add test button
function addTestButton() {
    const inputGroup = document.querySelector('.input-group');
    if (inputGroup) {
        const testButton = document.createElement('button');
        testButton.textContent = 'Test API Key';
        testButton.style.marginLeft = '10px';
        testButton.style.background = '#28a745';
        testButton.onclick = testAPIKey;
        inputGroup.appendChild(testButton);
    }
}
  
