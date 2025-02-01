import "../_mockLocation";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import { requestForegroundPermissionsAsync, Accuracy, watchPositionAsync,startLocationUpdatesAsync } from "expo-location";
import* as Location from 'expo-location'
import Map from "../components/Map";

const TrackCreateScreen = () => {
  const [err, setErr] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const requestAccessForUserLocation = async () => {
    try {
      //Asks the user to grant permissions for location while the app is in the foreground.
      const locationAccess = await requestForegroundPermissionsAsync();
      // console.log({locationAccess})
await watchPositionAsync({ //watch for position changes either per time or meter change
accuracy: Accuracy.BestForNavigation,
distanceInterval: 5, // 5m 

timeInterval: 5000, //5s
},(location)=> {
  console.log({location})
})
      // let location = await Location.getLastKnownPositionAsync({});     

      // console.log({location})
      // let currentLocation = await Location.getCurrentPositionAsync({});
      // console.log({currentLocation})
    } catch (err) {
      setErr(err.message);
    }
  };
  //request access to user location 
  useEffect(() => {
    requestAccessForUserLocation()
  }, [])
  return (
    <SafeAreaView>
      <Text h2>Create a Track</Text>
      <Map />
      {err ? <Text h2>Location access not granted</Text> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;
