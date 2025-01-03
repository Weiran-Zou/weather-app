import * as Location from 'expo-location';
import { openDB, closeDB, createTable, getLatestLocItem } from "../utils/Database";

// get user's current location
export async function getCurrentLoc() {
  let currentLoc = null;
  let {status, canAskAgain} = await Location.getForegroundPermissionsAsync();
  let locStatus = status;
  // the permission is undetermined or only this time
  if (status === "undetermined" || (canAskAgain && status === "denied")) { 
    //console.log("to ask")
    let { status } = await Location.requestForegroundPermissionsAsync();
    locStatus = status;
  }
  if (locStatus === "granted") { // granted
    let location = await Location.getCurrentPositionAsync({});
    currentLoc = { lat:  location.coords.latitude, lng: location.coords.longitude, place: "City" }
  } 
  return currentLoc;
}

// get user's latest saved location
export async function getLatestSavedLoc() {
  let savedLoc = null;
  try {
    const db = await openDB();
    await createTable(db);
    savedLoc = await getLatestLocItem(db);
    await closeDB();
  } catch (err) {
    
  }
  return savedLoc;
}