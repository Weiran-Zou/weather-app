import { useContext } from "react"
import { View, StyleSheet, Pressable } from "react-native"
import { LocationContext } from "../../context/locationContext"
import { router } from "expo-router";
import MyText from "../UIElements/MyText";
import { COLORS } from "../../constants/Colors";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function LocationItem ({item, onDelete}) {
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
      <Pressable onPress={onDelete}>
        <MaterialIcons name="delete" size={24} color={COLORS.fontColor}/>
      </Pressable>
    </Pressable>
   
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    borderColor: COLORS.border,
    borderWidth: 1,
    backgroundColor: COLORS.foreground,
    paddingHorizontal: 10
  }
}) 