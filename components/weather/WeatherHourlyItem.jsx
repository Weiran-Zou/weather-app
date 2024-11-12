import { View, StyleSheet } from "react-native"
import MyText from "../UIElements/MyText.jsx"
import WeatherIcon from "./WeatherIcon.jsx"
import { getTime } from "../../utils/Time.jsx"

export default function WeatherHourlyItem({item}) {
    let time = getTime(item.dt);
    let temp = Math.round(item.temp);
    return (
      <View style={styles.container}>
        <MyText>{ time }</MyText>
        <WeatherIcon iconCode={item.weather[0].icon} width={40} height={40}/>
        <MyText style={styles.temp}>{temp}&deg;</MyText>  
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5,
    rowGap: 5
  },
  temp: {
    fontSize: 18
  }
})