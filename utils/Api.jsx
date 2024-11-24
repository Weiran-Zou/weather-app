// import {OPEN_WEATHER_API_KEY} from '@env'

// fetch current and forecasts weather data from OpenWeather API
const fetchWeather = async (lat, lon) => {
  let responseData;
    try {
      const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY}`);
      responseData = await response.json();
      if (!response.ok) {
        throw new Error(response.message);
      }
      //console.log(responseData)
    
      return responseData;
    } catch (err) {
      console.log(err);
      throw err;
    }

}

export default fetchWeather;