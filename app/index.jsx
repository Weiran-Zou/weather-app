import { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator, Pressable, Button, TouchableOpacity, Text } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import {GOOGLE_PLACES_API_KEY} from '@env'
import 'react-native-get-random-values'
import WeatherMain from "../components/weather/WeatherMain";
import WeatherConditionList from "../components/weather/WeatherConditionList.jsx";
import fetchWeather from "../utils/Api.jsx";
import MyText from "../components/UIElements/MyText.jsx";
import WeatherHourlyList from "../components/weather/WeatherHourlyList.jsx";
import WeatherDailyList from "../components/weather/WeatherDailyList.jsx";
import { COLORS } from "../constants/Colors.jsx";
import { LocationContext } from "../context/locationContext.jsx";
import { Stack, router } from "expo-router";

export default function Index() {
  const [place, setPlace] = useState(''); // searched place
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { loc } = useContext(LocationContext);

  async function fetchData() {
    setIsLoading(true);
    let {coords, place} = loc;
    console.log(coords)
    const response = await fetchWeather(coords.latitude, coords.longitude)
    // console.log(response);
    setWeatherData(response);
    setPlace(place);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, [loc])
  const handleSearch = () => {
    console.log("search");
    // router.replace('/search')
  }
  return (
    <View style={styles.container} >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.fontColor,
          headerTitle: props => <MyText type="title">{place}</MyText>,
          headerRight: () => (
            <Pressable onPressIn={() => router.push("/search")}>
              <Feather name="search" size={24} color={COLORS.fontColor} style={styles.searchIcon} />
            </Pressable>
          )
          
        }}
      />
      {/* <View style={styles.searchBar}>
        <Feather name="search" size={24} color="black" style={styles.searchIcon}/>
      </View> */}
      {isLoading && (
        <View style={styles.loadingContainer}> 
          <ActivityIndicator size="large" color="white"/>
        </View>
        
      )}
      {/* Displaying text when no place is searched */}
      {!weatherData && !isLoading && (
        <View style={styles.noPlaceContainer}>  
          <MyText title style={styles.noPlaceText}>Please search a place to view the weather.</MyText>
        </View>
      )} 
      {weatherData && !isLoading && (
        <ScrollView contentContainerStyle={{alignItems:"center", rowGap:30}}>  
          <WeatherMain iconCode={weatherData.current.weather[0].icon} temperature={weatherData.current.temp}/>
          <WeatherHourlyList data={weatherData.hourly}/>
          <WeatherDailyList data={weatherData.daily} />
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
