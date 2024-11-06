const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');  // Fixed: no '.' with getElementById
const wind_speed = document.getElementById('q');  // Fixed: no '.' with getElementById
// const location_not_found = document.querySelector('.location-not-found');
// const weather_body = document.querySelector('.weather-body');  // Fixed: added the correct selector

async function checkweather(city) {
    const api_key = "5a64a32113ae738c384c271a83efcb69";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const weather_data = await fetch(url).then(response => response.json());
        console.log(weather_data)
        if (weather_data.cod === "404") {
            // Show error if city not found
            // location_not_found.style.display = "flex";
            // weather_body.style.display = "none";
            console.log("City not found");
            return;
        }

        // location_not_found.style.display = "none";
        // weather_body.style.display = "flex";

        // Display weather data
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

        // Update weather icon based on weather condition
        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "/Weather/assets/cloud.png";
                break;
            case 'Clear':
                weather_img.src = "/Weather/assets/clear.png";
                break;
            case 'Rain':
                weather_img.src = "/Weather/assets/rain.png";
                break;
            case 'Mist':
                weather_img.src = "/Weather/assets/mist.png";
                break;
            case 'Snow':
                weather_img.src = "/Weather/assets/snow.png";
                break;
            default:
                weather_img.src = "/Weather/assets/default.png"; // A default case for safety
        }

        console.log(weather_data);  // Log the data for debugging

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Add event listener for search button
searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();  // Trim input to remove unnecessary spaces
    if (city) {
        checkweather(city);  // Call the function only if a valid city is entered
    } else {
        console.log("Please enter a city");
    }
});
