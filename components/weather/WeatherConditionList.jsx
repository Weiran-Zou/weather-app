import { View, StyleSheet } from "react-native";
import WeatherCondItem from "./WeatherConditionItem";
import MyText from "../UIElements/MyText";

const weatherCondIconPaths = {
  clouds: require("../../assets/icons/clouds-icon.png"),
  dew_point: require("../../assets/icons/dew-icon.png"),
  humidity: require("../../assets/icons/humidity-icon.png"),
  pressure: require("../../assets/icons/pressure-icon.png"),
  uvi: require("../../assets/icons/uvi-icon.png"),
  visibility: require("../../assets/icons/visibility-icon.png"),
  wind_speed:  require("../../assets/icons/wind-icon.png")
}

export default function WeatherConditionList({data}) {
  
  return (
    <View style={styles.container}>
      <MyText type="title">Weather Conditions</MyText>
      <View style={styles.weatherCondList}>
        {/* map weather conditions */}
        {Object.entries(data).map(([key, value], index) => {
          if (weatherCondIconPaths[key]) {
            return (
              <WeatherCondItem key={index} condText={key} value={value} iconPath={weatherCondIconPaths[key]}/>
            )
          }
          
        })}

      </View>
    </View>
      
  )
}

const styles  = StyleSheet.create({
  container: {
    flex:1,
    width:"100%",
    marginTop: 20,
    alignItems:"center",
    rowGap: 30
  },
  weatherCondList: {
   
    flexDirection: "row",
    flexWrap: 'wrap',
    rowGap: 20
  }
})