import { Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/Colors";

export default function MyText(props) {
  if (props.type === "title") {
    return <Text style={[styles.title, props.style]}>{props.children}</Text>
  } else {
    return <Text style={[styles.default, props.style]}>{props.children}</Text>
  }   
 
}

const styles = StyleSheet.create({
    default: {
        color: COLORS.fontColor
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: COLORS.fontColor
    }
})