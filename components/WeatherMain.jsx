import { View, StyleSheet } from "react-native";
import WeatherIcon from "./WeatherIcon";
import MyText from "./UIElements/MyText";

export default function weatherMain({iconCode, temperature}) {
  return (
    <View style={styles.weatherMain}>
        <WeatherIcon iconCode={iconCode} width={120} height={120}/>
        <View style={styles.weatherText}>
            <MyText style={styles.weatherMainTemp}>{temperature} </MyText>
            <MyText style={styles.weatherMainDeg}>&deg;C</MyText>
        </View>
    </View>
  )   
}

const styles  = StyleSheet.create({
  weatherMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    columnGap: 10
  },
  weatherText: {
    flexDirection: "row",
  },
  weatherMainTemp: {
    fontSize: 40,
    fontWeight: "bold"
  },
  weatherMainDeg: {
    fontSize: 30,
    fontWeight: "bold"
  }
})