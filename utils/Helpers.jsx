// get the unit based on the weather condition
export const getUnit = (weather) => {
    switch(weather) {
        case "clouds":
            return '%';
        case "dew_point":
            return '\u00b0C';
        case "humidity":
            return "%";
        case "pressure":
            return "hPa";
        case "uvi":
            return "";
        case "visibility":
            return "m"
        case "wind_speed":
            return "m/s"
    }
}
