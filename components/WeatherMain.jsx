import { Text, View, StyleSheet } from "react-native";
import WeatherIcon from "./WeatherIcon";

export default function weatherMain({iconCode, temperature}) {
  return (
    <View style={styles.weatherMain}>
        <WeatherIcon iconCode={iconCode} width={120} height={120}/>
        <View style={styles.weatherText}>
            <Text style={styles.weatherMainTemp}>{temperature} </Text>
            <Text style={styles.weatherMainDeg}>&deg;C</Text>
        </View>
    </View>
  )   
}

const styles  = StyleSheet.create({
  weatherMain: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10
  },
  weatherText: {
    flexDirection: "row",
  },
  weatherMainTemp: {
    fontSize: 70,
    fontWeight: "bold",
    color:"#fbfbfb"
  },
  weatherMainDeg: {
    paddingTop:15,
    fontSize: 30,
    fontWeight: "bold",
    color:"#fbfbfb"
  }
})