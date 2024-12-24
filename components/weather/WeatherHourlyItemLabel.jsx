import { View, StyleSheet } from "react-native"
import MyText from "../UIElements/MyText.jsx"
import WeatherIcon from "./WeatherIcon.jsx"
import { getTime } from "../../utils/Time.jsx"

export default function WeatherHourlyItemLabel({item}) {
  let time = getTime(item.dt);
  // let temp = Math.round(item.temp);
  return (
    <View style={styles.container}>
      <WeatherIcon iconCode={item.weather[0].icon} width={50} height={50}/>
      <MyText>{ time }</MyText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    rowGap: 5,
    height: "100%"
  }
})