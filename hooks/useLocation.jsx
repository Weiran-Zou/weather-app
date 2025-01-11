import { useEffect, useState } from "react";
import { router } from 'expo-router';
import { openDB, saveLocItem, initDB } from "../utils/Database";
import { getCurrentLoc, getLatestSavedLoc} from "../utils/Location"

export default function useLocation() {
  const [loc, setLoc] = useState(null);

  // get location
  async function getLoc() {
    let currentLoc = await getCurrentLoc();
    if (currentLoc) {
      setLoc(currentLoc);
      router.replace('/');
    } else { // fail to get current location
      let savedLoc = await getLatestSavedLoc();
      if (savedLoc) {
        setLoc(savedLoc);
      } else {
        router.replace("/search");
      }
    } 
  }

  async function saveLoc(value) {
    setLoc(value);
    const db = await openDB();
    await saveLocItem(db, value);
  }

  useEffect(() => {
    initDB();
    getLoc();
  }, [])
  return { loc, setLoc, saveLoc }
}