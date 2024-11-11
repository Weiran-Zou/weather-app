import React from "react";
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_PLACES_API_KEY} from '@env'
import 'react-native-get-random-values'
import WeatherMain from "@/components/WeatherMain";
import WeatherConditionList from "../components/WeatherConditionList";
import fetchWeather from "../utils/Api.jsx";

export default function Index() {
  const [place, onChangePlace] = React.useState('');
  const [weatherData, onChangeWeatherData] = React.useState(null);
  const [isLoading, onChangeIsLoading] = React.useState(false);
  return (
    <View style={styles.container} >
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
          onPress={async (data, details) => {
            console.log(data.description)
            onChangePlace(data.description.split(",")[0]);
            // console.log(details?.geometry?.location);
            let loc = details?.geometry?.location;
            console.log(loc)
            console.log(loc.lat + " " + loc.lng)
            onChangeIsLoading(true);
            const response = await fetchWeather(loc.lat, loc.lng)
            // console.log(response);
            onChangeWeatherData(response);
            onChangeIsLoading(false);
          }}
          onFail={(error) => console.error(error)}
          styles={{
            textInput: {
             borderRadius:30
            }
          }}
        />
      </View>
      {isLoading && (
        <View style={styles.loadingContainer}> 
          <ActivityIndicator size="large" color="white"/>
        </View>
        
      )}
      {!weatherData && !isLoading && (
        <View style={styles.noPlaceContainer}>  
          <Text style={styles.noPlaceText}>Please search a place to view the weather.</Text>
        </View>
      )} 
      {weatherData && !isLoading && (
        <ScrollView contentContainerStyle={{alignItems:"center"}}>  
          <Text style={styles.placeTitle}>{place}</Text>
          <WeatherMain iconCode={weatherData.current.weather[0].icon} temperature={weatherData.current.temp}/>
          <WeatherConditionList data={weatherData.current}/>
        </ScrollView> 
      )}   
    </View>
  );
}

const styles  = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#19181b',
    alignItems:"center"
  },
  placeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color:"#fbfbfb",
    marginTop: 40
  },
  searchBar: {
    width: "95%",
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 30
  },
  searchIcon: {
    padding: 10,
  },
  noPlaceContainer: {
    flex:1,
    justifyContent:"center",
    
    
  },
  noPlaceText:{
    color:"#fbfbfb",
    fontSize: 20,
  },
  loadingContainer: {
    flex:1,
    justifyContent:"center",
    margin:10
  }

})
