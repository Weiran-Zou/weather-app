import { useEffect, useState } from "react";
import { router } from 'expo-router';
import { openDB, closeDB, createTable, getLatestLocItem, saveLocItem } from "../utils/Database";

export default function useLocation() {
  const [loc, setLoc] = useState(null);

  // get user's latest saved location from db
  async function getLatestSavedLoc() {
    let savedLoc;
    try {
      const db = await openDB();
      await createTable(db);
      savedLoc = await getLatestLocItem(db);
      await closeDB();
    } catch (err) {
      
    }
    if (savedLoc) {
      setLoc(savedLoc);
      return;
    } else {
      router.replace("/search");
    }
  }

  async function saveLoc(value) {
    setLoc(value);
    const db = await openDB();
    await saveLocItem(db, value);
    await closeDB();
  }

  useEffect(() => {
    getLatestSavedLoc();
  }, [])
  return { loc, setLoc, saveLoc }
}