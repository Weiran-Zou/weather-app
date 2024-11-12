import { View, StyleSheet } from "react-native"
import WeatherDailyItem from "./WeatherDailyItem"
import MyText from "../UIElements/MyText"

export default function WeatherDailyList({data}) {
  return (
    <View style={styles.container}>
      <MyText type="title">Daily</MyText>
      {/* map daily forecast weather data*/}
      {data.map((item, index) => {
        return <WeatherDailyItem key={index} item={item}/>
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems:"center",
    width:"95%",
    rowGap:5
  }
})