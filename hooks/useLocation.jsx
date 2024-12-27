import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from 'expo-router';

export default function useLocation() {
  const [currentLoc, setCurrentLoc] = useState(null);
  // get user's current location
  async function getCurrentLocation() {
    // await AsyncStorage.clear()
    let storedLoc;
    try {
      jsonLoc = await AsyncStorage.getItem("currentLoc");
      storedLoc = JSON.parse(jsonLoc);
      console.log("loc " + storedLoc.latitude)
    } catch (err) {
      
    }
    
    if (storedLoc) {
      console.log("coords: " + storedLoc.latitude)
      setCurrentLoc(storedLoc);
      return;
    } else {
      router.replace("/search");
    }
    
  }
  async function setLoc(value) {
    setCurrentLoc(value);
    let jsonLoc = JSON.stringify(value)
    await AsyncStorage.setItem("currentLoc", jsonLoc);
   
  }

  useEffect(() => {
    getCurrentLocation();
  }, [])
  return { currentLoc, setLoc }
}