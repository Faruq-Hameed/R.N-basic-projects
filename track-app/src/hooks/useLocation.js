import "../_mockLocation";
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";
import { useLocationContext } from "../contexts/locationContext";
import { Linking } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";

export default (callback) => { //IMPLEMENTATION NOT YET PERFECT
    const [err, setErr] = useState("");
  const {
    startLocationReading,
  } = useLocationContext();
  const requestAccessForUserLocation = async () => {
    try {
      //Asks the user to grant permissions for location while the app is in the foreground.
      const { status } = await requestForegroundPermissionsAsync();
      if (status === "granted") {
        startLocationReading(true); // This will determine if location should be tracked. Not yet implemented
        await watchPositionAsync(
          {
            //watch for position changes either per time or meter change
            accuracy: Accuracy.BestForNavigation,
            distanceInterval: 5, // 5m

            timeInterval: 5000, //5s
          },
          callback //invoke the callback 
          // (location) => {
          //   // console.log(location);
          //   trackCurrentLocation({
          //     coords: location.coords,
          //     timestamp: location.timestamp,
          //   });
          // }
        );
      } else {
        //if permission not granted redirect the user to app settings
        Alert.alert(
          "Permission Required",
          "Location access is needed to track your movement. Please enable it in settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ]
        );
      }
    } catch (err) {
      setErr("Something went wrong internally, please try again.");
      onError && onError(err);    }
  };
  //request access to user location
  // useFocusEffect(() => {
  //   useCallback(() => {
  //     requestAccessForUserLocation();
  //   });
  // }, []);
  useEffect(() => {
      requestAccessForUserLocation();
  }, []);

  return [err ];
};
