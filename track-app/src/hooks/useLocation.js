import "../_mockLocation";
import {
  Accuracy,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";
import { useLocationContext } from "../contexts/locationContext";
import { Alert, Linking } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";

export default (callback) => {
  //IMPLEMENTATION NOT YET PERFECT
  const [err, setErr] = useState("");
  const { startLocationReading } = useLocationContext();
  let subscriber;
  const startTracking = async () => {
    try {
      //Asks the user to grant permissions for location while the app is in the foreground.
      const { status } = await requestForegroundPermissionsAsync();

      if (status === "granted") {
        startLocationReading(true); // This will determine if location should be tracked. Not yet implemented
        subscriber = await watchPositionAsync(
          {
            //watch for position changes either per time or meter change
            accuracy: Accuracy.BestForNavigation,
            distanceInterval: 5, // 5m

            timeInterval: 10000, //5s
          },
          (location) => {
            callback({
              //use the location as parameter to the callback
              coords: location.coords,
              timestamp: location.timestamp,
            });
          }
        );
      }
    } catch (err) {
      setErr(err.message);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      async function tracking() {
        const response = await startTracking()
      }
  
      tracking();
    }, [])
  );

 
  // useEffect(() => {
  //   requestAccessForUserLocation();
  // }, []);

  return [err];
};
