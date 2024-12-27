import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { router } from 'expo-router';
import { useContext } from "react";
import { LocationContext } from "../context/locationContext";
import { COLORS } from "../constants/Colors.jsx";

export default function search () {
  const {setLoc} = useContext(LocationContext);

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
            console.log(data.description)
            console.log("place: " + data.description.split(",")[0])
            let loc = details?.geometry?.location;
            console.log(loc)
            console.log(loc.lat + " " + loc.lng)
            let newLoc ={ coords: {latitude: loc.lat, longitude: loc.lng}, place: data.description.split(",")[0]};
            await setLoc(newLoc);
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.background,
    alignItems:"center"
  },
  searchBar: {
    width: "95%",
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 30,
  },
  searchIcon: {
    padding: 10,
  },
})