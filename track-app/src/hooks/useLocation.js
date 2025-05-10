import "../_mockLocation";
import {
  Accuracy,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";
import { useLocationContext } from "../contexts/locationContext";
import { Alert, Linking } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";

export default (callback) => {
  //IMPLEMENTATION NOT YET PERFECT
  const [err, setErr] = useState("");
  const {
    startLocationReading,
    locationState: { readingLocation },
  } = useLocationContext();
  const subscriber = useRef(null); //useRef to store the subscription object
  const startTracking = async () => {
    try {
      //Asks the user to grant permissions for location while the app is in the foreground.
      const { status } = await requestForegroundPermissionsAsync();

      if (status === "granted") {
        subscriber.current = await watchPositionAsync(
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
        console.log("subscribing to location tracking");
        await startTracking();
      }
      if (readingLocation) {
        tracking();
      } else {
        subscriber.current?.remove();
      } //remove the subscription object i.e stop location reading
      return () => {
        console.log("unsubscribing from location tracking");
        //to stop tracking on blur
        subscriber.current?.remove(); //remove the subscription object i.e stop location reading
        subscriber.current = null; //set it to null because it is no longer needed
        // startLocationReading(false); //This will determine if location should be tracked. Not yet implemented
      };
    }, [readingLocation])
  );

  // useEffect(() => {
  //   requestAccessForUserLocation();
  // }, []);

  return [err];
};
