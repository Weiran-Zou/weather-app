import { useState, useContext, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator, Pressable, Linking, RefreshControl } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import 'react-native-get-random-values'
import WeatherMain from "../components/weather/WeatherMain";
import WeatherConditionList from "../components/weather/WeatherConditionList.jsx";
import { fetchWeather } from "../utils/Api.jsx";
import MyText from "../components/UIElements/MyText.jsx";
import WeatherHourlyList from "../components/weather/WeatherHourlyList.jsx";
import WeatherDailyList from "../components/weather/WeatherDailyList.jsx";
import { COLORS } from "../constants/Colors.jsx";
import { LocationContext } from "../context/locationContext.jsx";
import { Stack, router } from "expo-router";
import { getCurrentLoc } from "../utils/Location"

export default function Index() {
  const [place, setPlace] = useState(''); // searched place
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { loc, setLoc } = useContext(LocationContext);
  const [refreshing, setRefreshing] = useState(false);
  
  onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData()
    setRefreshing(false);
  }, [loc])

  async function getCurrentLocation() {
    setIsLoading(true)
    let currentLoc = await getCurrentLoc();
    if (currentLoc) {
      setLoc(currentLoc);
    } else { 
      // redirect to app's settings if location permission was rejected
      Linking.openSettings();
    }
  }
  
  // fetch weather data
  async function fetchData() {
    setIsLoading(true);
    let {lat, lng, place} = loc;
    const response = await fetchWeather(lat, lng)
    setWeatherData(response);
    setPlace(place);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, [loc])
 
  return (
    <View style={styles.container} >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.fontColor,
          headerTitle: props => <MyText type="title">{!isLoading && place}</MyText>,
          headerRight: () => (
            <View style={styles.headerBtns}>
              <Pressable onPressIn={() => router.push("/search")}>
                <Feather name="search" size={24} color={COLORS.fontColor} style={styles.searchIcon} />
              </Pressable>
              <Pressable onPressIn={getCurrentLocation}>
                <MaterialIcons name="gps-fixed" size={24} color={COLORS.fontColor} style={styles.searchIcon}/>
              </Pressable>
            </View>
          )
          
        }}
      />
      {isLoading && (
        <View style={styles.loadingContainer}> 
          <ActivityIndicator size="large" color="white"/>
        </View>
        
      )}
      {weatherData && !isLoading && (
        <ScrollView 
          contentContainerStyle={{alignItems:"center", rowGap:30}}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >  
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
  headerBtns: {
    flexDirection: "row"
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
