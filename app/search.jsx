import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { router } from 'expo-router';
import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../context/locationContext";
import { COLORS } from "../constants/Colors.jsx";
import { openDB, getAllLocItems, closeDB } from "../utils/Database.jsx"
import MyText from "../components/UIElements/MyText.jsx";
import LocationItem from "../components/location/LocationItem.jsx";

export default function search () {
  const { saveLoc } = useContext(LocationContext);
  const [savedLocs, setSavedLocs] = useState([]);

  async function getSavedLocs() {
    const db = await openDB();
    let locs = await getAllLocItems(db);
    setSavedLocs(locs);
    await closeDB(db);
  }

  useEffect(() => {
    getSavedLocs();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather name="search" size={24} color="black" style={styles.searchIcon}/>
        {/* Google Places autocomplete field for searching places */}
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          fetchDetails={true}
          placeholder="Search the place"
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
            language: 'en',
          }}
          onPress={async (data, details) => {
            let loc = details?.geometry?.location;
            let newLoc ={ lat: loc.lat, lng: loc.lng, place: data.description.split(",")[0]};
            await saveLoc(newLoc);
            router.dismissTo("/");
          }}
          onFail={(error) => console.error(error)}
          styles={{
            textInput: {
            borderRadius:30
            }
          }}
        />
      </View>
      <View style={styles.locsContainer}>
        <MyText type="title">Saved Locations</MyText>
        {saveLoc.length > 0 && (
          <FlatList
            data={savedLocs}
            renderItem={({item}) => <LocationItem key={item.rowid} item={item}/>} 
            keyExtractor={item => item.rowid}
          />
        )}
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
    rowGap: 30
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 30,
    justifyContent: "center"
  },
  searchIcon: {
    padding: 10,
  },
  locsContainer: {
    flex: 1,
    rowGap: 20,
  }
})