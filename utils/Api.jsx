import {OPEN_WEATHER_API_KEY} from '@env'

// fetch current and forecasts weather data
const fetchWeather = async (lat, lon) => {
  let responseData;
    try {
      const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`);
      responseData = await response.json();
    } catch (err) {
      console.log(err);
    }
    return responseData;
}

export default fetchWeather;