import "../_mockLocation";
import React, { useEffect, useState } from "react";
import { Alert, Linking, StyleSheet } from "react-native";
import { Button, Text } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  requestForegroundPermissionsAsync,
  Accuracy,
  watchPositionAsync,
  startLocationUpdatesAsync,
} from "expo-location";
import * as Location from "expo-location";
import Map from "../components/Map";
import { useLocationContext } from "../hooks/contextHooks";
import { useOnWillBlurEvent } from "../hooks/useOnWillBlurEvent";

const TrackCreateScreen = () => {
  const [err, setErr] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const {  locationState, trackCurrentLocation, startLocationReading, createNewTrack, clearErrorMessage } = useLocationContext();
  useOnWillBlurEvent(clearErrorMessage);

  const requestAccessForUserLocation = async () => {
    try {
      //Asks the user to grant permissions for location while the app is in the foreground.
      const { status } = await requestForegroundPermissionsAsync();
      if (status === "granted") {
        startLocationReading(true);// This will determine if location should be tracked. Not yet implemented
        await watchPositionAsync(
          {
            //watch for position changes either per time or meter change
            accuracy: Accuracy.BestForNavigation,
            distanceInterval: 5, // 5m

            timeInterval: 5000, //5s
          },
          (location) => {
            // console.log(location);
            trackCurrentLocation({coordinates: location.coords,timestamp: location.timestamp });
          }
        );
      } else { //if permission not granted redirect the user to app settings
        Alert.alert(
          "Permission Required",
          "Location access is needed to track your movement. Please enable it in settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ]
        );
      }
      // console.log({locationAccess})

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
    requestAccessForUserLocation();
  }, []);
  return (
    <SafeAreaView>
      <Text h2>Create a Track</Text>
      <Map />
      <Button title="Save Tracks" onPress={() => createNewTrack()}/>
      {locationState.locationErrorMessage?<Text h2>{locationState.locationErrorMessage}</Text>: null }
      {err ? <Text h2>Location access not granted</Text> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;
