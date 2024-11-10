import React from "react";
import { View, StyleSheet } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_PLACES_API_KEY} from '@env'
import 'react-native-get-random-values'

export default function Index() {

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
            console.log(details?.geometry?.location);
          }}
          onFail={(error) => console.error(error)}
        />
      </View>
    </View>
  );
}

const styles  = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#efeff1',
    alignItems:"center"
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
