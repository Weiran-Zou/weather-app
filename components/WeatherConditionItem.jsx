import { View, StyleSheet, Image } from "react-native";
import MyText from "./UIElements/MyText";

const getUnit = (weather) => {
    switch(weather) {
        case "clouds":
            return '%';
        case "dew_point":
            return '\u00b0C';
        case "humidity":
            return "%";
        case "pressure":
            return "hPa";
        case "uvi":
            return "";
        case "visibility":
            return "m"
        case "wind_speed":
            return "m/s"
    }
}

export default function WeatherCondItem ({condText, value, iconPath}) {
    // mapping icon to condition based on condText
    let unit = getUnit(condText);
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