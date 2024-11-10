import { StyleSheet, Image } from "react-native";

export default function WeatherIcon({iconCode, width, height}) {
    return (
        <Image src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`} style={styles.image}/>
    )
}

const styles  = StyleSheet.create({
    image: {
      width: {width},
      height: {height}
    }
  })