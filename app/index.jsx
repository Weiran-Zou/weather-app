import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_PLACES_API_KEY} from '@env'
import 'react-native-get-random-values'
import WeatherMain from "@/components/WeatherMain";
import WeatherConditionList from "../components/WeatherConditionList";

const DUMMY_DATA = {
  dt:1684929490,
  sunrise:1684926645,
  sunset:1684977332,
  temp:292.55,
  feels_like:292.87,
  pressure:1014,
  humidity:89,
  dew_point:290.69,
  uvi:0.16,
  clouds:53,
  visibility:10000,
  wind_speed:3.13,
  wind_deg:93,
  wind_gust:6.71,
  weather:[
    {
      id:803,
      main:"Clouds",
      description:"broken clouds",
      icon:"04d"
    }
  ]
}

export default function Index() {
  const [place, onChangePlace] = React.useState('');
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
          onPress={(data, details) => {
            console.log(data.description)
            onChangePlace(data.description.split(",")[0]);
            console.log(details?.geometry?.location);
          }}
          onFail={(error) => console.error(error)}
          styles={{
            textInput: {
             borderRadius:30
            }
          }}
        />
      </View>
      <ScrollView contentContainerStyle={{alignItems:"center"}}>
        <Text style={styles.placeTitle}>{place}</Text>
        <WeatherMain iconCode={DUMMY_DATA.weather[0].icon} temperature={DUMMY_DATA.temp}/>
        <WeatherConditionList data={DUMMY_DATA}/>
        {/* <WeatherConditionList data={DUMMY_DATA}/> */}
      </ScrollView>   
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
 
})
