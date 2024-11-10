import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_PLACES_API_KEY} from '@env'
import 'react-native-get-random-values'
import WeatherMain from "@/components/WeatherMain";

export default function Index() {
  const [place, onChangePlace] = React.useState('');
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather name="search" size={24} color="black" style={styles.searchIcon}/>
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          fetchDetails={true}
          placeholder="Search the place"
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: 'en',
          }}
          onPress={(data, details) => {
            console.log(data.description)
            onChangePlace(data.description.split(",")[0]);
            console.log(details?.geometry?.location);
          }}
          onFail={(error) => console.error(error)}
        />
      </View>
      <Text style={styles.placeTitle}>{place}</Text>
      <WeatherMain iconCode="02d" temperature="16"/>
    </View>
  );
}

const styles  = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#19181b',
    alignItems:"center",
  },
  placeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color:"#fbfbfb",
    marginTop: 40
  },
  searchBar: {
    width: "90%",
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    marginTop: 30
  },
  searchIcon: {
    padding: 10,
  },
 
})
