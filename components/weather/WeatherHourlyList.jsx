import { View, StyleSheet, ScrollView } from "react-native"
import WeatherHourlyItemLabel from "./WeatherHourlyItemLabel"
import MyText from "../UIElements/MyText"
import { LineChart } from "react-native-gifted-charts";
import { COLORS } from "../../constants/Colors";

// a list of hourly forecast weather data in a line chart view
export default function WeatherHourlyList({data}) {
  let minTemp = Number.MAX_VALUE;
  const mappedData = data.map((item) => {
    if (item.temp < minTemp) {
      minTemp = Math.round(item.temp);
    }
    return {
      value: item.temp,
      labelComponent: () => (
        <WeatherHourlyItemLabel item={item}/>
      ),
      dataPointLabelComponent: () => (
        <MyText style={styles.temp}>{Math.round(item.temp)}&deg;</MyText>
      ),
      dataPointLabelShiftY: -20,
      dataPointLabelShiftX: 15,
    }
  })
  return (
    <View style={styles.container}>
      <MyText type="title">Hourly</MyText>
      <ScrollView horizontal={true}>
        {/* line chart with hourly forecast weather data */}
        <LineChart 
          data={mappedData}
          
          thickness1={1}
          hideYAxisText
          hideAxesAndRules
          color={'#EB6E4B'}
          textColor={COLORS.fontColor}
          dataPointsColor={COLORS.fontColor}
          yAxisOffset={minTemp - 2}
         
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems:"center",
    width:"95%",
    height: 350,
    rowGap: 30
  },
  temp: {
    fontSize: 16
  }
})