import { Stack } from "expo-router";
import { LocationProvider } from "../context/locationContext"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  
  return (
    <LocationProvider>
      <Stack>
        <Stack.Screen name="index" options={{title: "Home"}}/>
        <Stack.Screen name="search" options={{title: "Search"}}/>
      </Stack>
    </LocationProvider>
  );
}
