import { View, StyleSheet } from "react-native";
import WeatherIcon from "./WeatherIcon";
import MyText from "../UIElements/MyText";

export default function weatherMain({iconCode, temperature, place}) {
  let temp = Math.round(temperature);
  return (
    <View style={styles.container}>
      {/* place searched by user */}
      <MyText type="title">{place}</MyText>
      <View style={styles.weatherMain}>
        <WeatherIcon iconCode={iconCode} width={120} height={120}/>
        <View style={styles.weatherText}>
            <MyText style={styles.weatherMainTemp}>{temp} </MyText>
            <MyText style={styles.weatherMainDeg}>&deg;C</MyText>
        </View>
      </View>
    </View>
  )   
}

const styles  = StyleSheet.create({
  container: {
    alignItems:"center",
    marginTop: 40
  },  
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
    fontSize: 45,
    fontWeight: "bold"
  },
  weatherMainDeg: {
    fontSize: 25,
    paddingTop: 8
  }
})