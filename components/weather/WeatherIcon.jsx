import { Image } from "react-native";

export default function WeatherIcon({iconCode, width, height}) {
    return (
        <Image src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`} style={{width: width, height: height}}/>
    )
}
