import { View, StyleSheet, Image } from "react-native";
import MyText from "../UIElements/MyText";
import { getUnit } from "../../utils/Helpers";

export default function WeatherCondItem ({condText, value, iconPath}) {
    let unit = getUnit(condText); // unit of weather condition
    return (
        <View style={styles.container}>
            <Image source={iconPath} style={{width: 32, height: 32}}/>
            <MyText style={styles.condText}>{condText}</MyText>
            <MyText style={styles.value}>{value} <MyText style={styles.unit}>{unit}</MyText></MyText>       
        </View>
    )
}

const styles  = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      width: "33%",
      rowGap:5
    },
    value: {
      fontSize: 20,
      marginTop: 5
    },
    unit: {
      fontSize: 16,
    }
  })