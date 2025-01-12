import * as SQLite from 'expo-sqlite';


// initialise database
export async function initDB() {
  try {
    const db = await openDB();
    await createTable(db);
  } catch (err) {
    console.log("initDB err")
    console.log(err)
  }
}

export async function openDB() {
  let db;
  try {
    db = await SQLite.openDatabaseAsync("weather", {
      useNewConnection: true
  });
  } catch (err) {
    console.log(err)
  }
  return db;
}

// create a locations table
async function createTable(db) {
  try {
    await db.execAsync('CREATE TABLE IF NOT EXISTS locations (lat REAL NOT NULL, lng REAL NOT NULL, place TEXT NOT NULL)')
  } catch (err) {
    console.log("createTable err")
    console.log(err)
  }
}

// get the latest saved location item from locations table
export async function getLatestLocItem(db) {
  let item;
  try {
    item = await db.getFirstAsync('SELECT * FROM locations ORDER BY rowid DESC');
  } catch (err) {
    console.log("getLatestLocItem err")
    console.log(err)
  }
  return item;
}

// save a location item to locations table
export async function saveLocItem(db, item) {
  console.log(item.lat + " " + item.lng + " " + item.place)
  try {
    // check if the location item to be saved already exists in db
    let loc = await db.getFirstAsync('SELECT * FROM locations WHERE lat = ? AND lng = ?', item.lat, item.lng);
    if (loc) {
      return
    }
    await db.execAsync(`INSERT INTO locations (lat, lng, place) VALUES (${item.lat}, ${item.lng}, '${item.place}')`);
  } catch (err) {
    console.log("saveLocItem err")
    console.log(err)
  }
}

export async function getAllLocItems(db) {
  let locItems;
  try {
    locItems = await db.getAllAsync('SELECT rowid, lat, lng, place FROM locations ORDER BY rowid DESC');
  } catch (err) {
    console.log("getAllLocItems err");
    console.log(err);
  }
  return locItems;
}

export async function deleteLocItem(db, item) {
  try {
    await db.runAsync('DELETE from locations WHERE rowid = $rowid', {$rowid: item.rowid});
  } catch (err) {
    console.log("deleteLocItem err");
    console.log(err);
  }
}


