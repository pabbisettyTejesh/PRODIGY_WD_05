const form = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');
const weatherOutput = document.getElementById('weather-output');

const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const location = locationInput.value;

    // Fetch weather data
    const weatherData = await getWeather(location);
    if (weatherData) {
        displayWeather(weatherData);
    } else {
        weatherOutput.innerHTML = '<p>Weather data not found. Please try again.</p>';
    }
});

async function getWeather(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const temperature = main.temp;
    const description = weather[0].description;

    weatherOutput.innerHTML = `
        <h3>Current Weather in ${name}</h3>
        <p>Temperature: ${temperature} &deg;C</p>
        <p>Description: ${description}</p>
    `;
}