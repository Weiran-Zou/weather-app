import { View, FlatList, StyleSheet } from "react-native"
import WeatherHourlyItem from "./WeatherHourlyItem"
import MyText from "../UIElements/MyText"

export default function WeatherHourlyList({data}) {

  return (
    <View style={styles.container}>
      <MyText type="title">Hourly</MyText>
      <FlatList 
          data={data}
          renderItem={({item}) => {return <WeatherHourlyItem item={item}/>}}
          horizontal={true}
      />
     </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems:"center",
    width:"95%",
  }
})