import { View, StyleSheet, Image } from "react-native"
import MyText from "../UIElements/MyText"
import WeatherIcon from "./WeatherIcon"
import { getDay, getDate } from "../../utils/Time"

export default function WeatherDailyItem({item}) {
  let day = getDay(item.dt);
  let date = getDate(item.dt);
  let tempMax = Math.round(item.temp.max)
  let tempMin = Math.round(item.temp.min)
  return (
  <View style={styles.container}>
    <View style={styles.dayContainer}> 
      <MyText style={styles.day}>{day}</MyText>
      <MyText style={styles.date}>{date}</MyText>
    </View>
    <WeatherIcon style={styles.weatherIcon} iconCode={item.weather[0].icon} width={60} height={60}/>
    <View style={styles.humidityIconContainer}>
      <Image source={require("../../assets/icons/humidity-icon.png")} style={{ width: 15, height: 15}}/>
      <MyText style={styles.date}>{item.humidity} %</MyText>
    </View>
    
    <MyText style={styles.temp}>{tempMax}&deg; / {tempMin}&deg;</MyText> 
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    
  },
  weatherIcon: {
    flex:1,
    alignItems:"center",
    justifyContent:"center"

  },
  humidityIconContainer: {
    flex:1,
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"center",
    columnGap: 5
  },
  dayContainer: {
    flex:1
  },
  day:{
    fontWeight: "bold"
  },
  temp: {
    flex:1,
    fontWeight: "bold",
    textAlign:"right" 
  }
})