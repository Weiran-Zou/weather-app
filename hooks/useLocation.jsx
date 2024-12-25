import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';

export default function useLocation() {
  const [currentLoc, setCurrentLoc] = useState();
  // get user's current location
  async function getCurrentLocation() {
    let storedLoc = AsyncStorage.getItem("currentLoc");
    if (storedLoc) {
      setCurrentLoc(storedLoc);
      return;
    } 
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert("permission denied");
      // navigate to search screen

      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setCurrentLoc(location);
    AsyncStorage.setItem("currentLoc", location);
  }
  function setLoc(value) {
    setCurrentLoc(value);
    AsyncStorage.setItem("currentLoc", value);
  }
  useEffect(() => {
    getCurrentLocation();
  }, [])

  return { currentLoc, setLoc }
}