const WEATHER_API_KEY = "0e70135fd383bb4696339a138207e19d";
const API_STEM = "https://api.openweathermap.org/data/2.5/weather?";

function zipUrl(zip) {
    return `${API_STEM}q=${zip}&appid=${WEATHER_API_KEY}`;
}

async function fetchForecast(zip) {
    try {
        const response = await fetch(zipUrl(zip));
        const responseJSON = await response.json();
        return {
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: responseJSON.main.temp
        };
    } catch (error) {
        console.log(error);
    }
}

export default { fetchForecast: fetchForecast };