
// fetch current and forecasts weather data from OpenWeather API
const fetchWeather = async (lat, lon) => {
  let responseData;
    try {
      const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY}`);
      responseData = await response.json();
      if (!response.ok) {
        throw new Error(response.message);
      }   
      return responseData;
    } catch (err) {
      console.log(err);
      throw err;
    }

}

// fetch place with Google reverse geocoding API
const fetchPlace = async (lat, lng) => {
  let responseData;
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}2&key=${process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY}`);
    responseData = await response.json();
    if (!response.ok) {
      throw new Error(response.message);
    }
    let place = responseData.results[0].formatted_address;
    return place;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export { fetchWeather, fetchPlace };