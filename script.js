const apiKey = '11b4b651cd444aaaa05174532242510'; // Replace with your actual API key

document.getElementById('searchButton').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetchWeatherData(location);
    }
});

async function fetchWeatherData(location) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`);
        
        if (!response.ok) {
            throw new Error('Location not found');
        }
        
        const data = await response.json();
        displayWeatherData(data);
        
    } catch (error) {
        alert(error.message);
        console.error('Error fetching weather data:', error);
    }
}

function displayWeatherData(data) {
    document.getElementById('location').textContent = `Weather in ${data.location.name}, ${data.location.region}`;
    
    // Current precipitation
    const currentPrecipitation = data.current.precip_mm; // Current precipitation in mm
    document.getElementById('rainfall').textContent = `${currentPrecipitation ? currentPrecipitation + ' mm' : 'No rainfall detected'}`;

    // Current temperature
    const currentTemperature = data.current.temp_c; // Current temperature in Celsius
    document.getElementById('temperature').textContent = `${currentTemperature} °C`;

    // Current humidity
    const currentHumidity = data.current.humidity; // Current humidity in percentage
    document.getElementById('humidity').textContent = `${currentHumidity} %`;

    // Current wind speed
    const currentWindSpeed = data.current.wind_kph; // Current wind speed in kph
    document.getElementById('windspeed').textContent = `${currentWindSpeed} kph`;
}