import { Text, View, StyleSheet, Image } from "react-native";

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
            <Text style={styles.condText}>{condText}</Text>
            <Text style={styles.value}>{value} <Text style={styles.unit}>{unit}</Text></Text>       
        </View>
    )
}

const styles  = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      width: "33%"
    },
    condText: {
      color: "#fbfbfb"
    },
    value: {
      color:  "#fbfbfb",
      fontSize: 20,
      marginTop: 10
    },
    unit: {
      fontSize: 16,
      color:  "#fbfbfb",
    
    }
  })