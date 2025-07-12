# Weather App

A simple, beautiful weather application that displays current weather information for any city in the world.

## Features

- 🌤️ Real-time weather data
- 📱 Responsive design
- 🎨 Modern UI with gradient backgrounds
- 🌍 Global city search
- 📊 Detailed weather information (temperature, humidity, wind, pressure, visibility)
- ⌨️ Enter key support
- ⚡ Fast and lightweight

## Setup Instructions

### 1. Get Your API Key

To use this weather app, you need a free API key from OpenWeatherMap:

1. Visit [OpenWeatherMap API](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. After signing up, go to your account dashboard
4. Navigate to "API keys" section
5. Copy your API key (it will look something like: `1234567890abcdef1234567890abcdef`)

### 2. Add Your API Key

1. Open `js/script.js`
2. Find the line: `const API_KEY = 'YOUR_API_KEY';`
3. Replace `'YOUR_API_KEY'` with your actual API key:
   ```javascript
   const API_KEY = '1234567890abcdef1234567890abcdef';
   ```

### 3. Run the App

1. Open `index.html` in your web browser
2. Enter a city name (e.g., "London", "New York", "Tokyo")
3. Click "Get Weather" or press Enter
4. Enjoy your weather information!

## API Key Security Note

⚠️ **Important**: Never commit your API key to version control or share it publicly. For production applications, consider:

- Using environment variables
- Implementing a backend proxy
- Using API key restrictions in OpenWeatherMap dashboard

## Weather Information Displayed

- **Location**: City name and country
- **Weather Condition**: Description with emoji icon
- **Temperature**: Current temperature in Celsius
- **Feels Like**: Apparent temperature
- **Humidity**: Relative humidity percentage
- **Wind Speed**: Wind speed in meters per second
- **Pressure**: Atmospheric pressure in hectopascals
- **Visibility**: Visibility in kilometers

## Browser Compatibility

This app works in all modern browsers that support:
- ES6+ JavaScript (async/await)
- Fetch API
- CSS Grid and Flexbox

## Troubleshooting

### "API Key Required" Error
- Make sure you've replaced `'YOUR_API_KEY'` with your actual API key
- Check that the API key is correct and active

### "City not found" Error
- Check the spelling of the city name
- Try using the city's English name
- Some cities may need country specification (e.g., "London, UK")

### Network Error
- Check your internet connection
- Ensure you're not behind a restrictive firewall
- Try refreshing the page

## File Structure

```
weather-app/
├── index.html          # Main HTML file
├── css/
│   └── master.css      # External CSS styles
├── js/
│   └── script.js       # JavaScript functionality
├── images/             # Weather icons (unused in current version)
└── README.md           # This file
```

## License

This project is open source and available under the MIT License.

## Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons and emojis for weather conditions 