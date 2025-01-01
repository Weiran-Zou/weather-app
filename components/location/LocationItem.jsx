import { useContext } from "react"
import { View, StyleSheet, Pressable } from "react-native"
import { LocationContext } from "../../context/locationContext"
import { router } from "expo-router";
import MyText from "../UIElements/MyText";
import { COLORS } from "../../constants/Colors";

export default function LocationItem ({item}) {
  const { setLoc } = useContext(LocationContext);
  const onPress = async () => {
    await setLoc(item);
    router.dismissTo("/");
  }
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <MyText>
        {item.place}
      </MyText>
    </Pressable>
   
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: 50,
    borderColor: COLORS.border,
    borderWidth: 1,
    backgroundColor: COLORS.foreground,
    paddingLeft: 10
  }
}) 