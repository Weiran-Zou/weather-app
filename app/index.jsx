import { useState } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_PLACES_API_KEY} from '@env'
import 'react-native-get-random-values'
import WeatherMain from "../components/weather/WeatherMain";
import WeatherConditionList from "../components/weather/WeatherConditionList.jsx";
import fetchWeather from "../utils/Api.jsx";
import MyText from "../components/UIElements/MyText.jsx";
import WeatherHourlyList from "../components/weather/WeatherHourlyList.jsx";

export default function Index() {
  const [place, setPlace] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
            setPlace(data.description.split(",")[0]);
            // console.log(details?.geometry?.location);
            let loc = details?.geometry?.location;
            console.log(loc)
            console.log(loc.lat + " " + loc.lng)
            setIsLoading(true);
            const response = await fetchWeather(loc.lat, loc.lng)
            // console.log(response);
            setWeatherData(response);
            setIsLoading(false);
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
          <MyText title style={styles.noPlaceText}>Please search a place to view the weather.</MyText>
        </View>
      )} 
      {weatherData && !isLoading && (
        <ScrollView contentContainerStyle={{alignItems:"center", rowGap:20}}>  
          <WeatherMain place={place} iconCode={weatherData.current.weather[0].icon} temperature={weatherData.current.temp}/>
          <WeatherHourlyList data={weatherData.hourly}/>
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
  noPlaceContainer: {
    flex:1,
    justifyContent:"center",
  },
  noPlaceText:{
    fontSize: 20,
  },
  loadingContainer: {
    flex:1,
    justifyContent:"center",
    margin:10
  }

})
