import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";
import { useLocationContext } from "../contexts/locationContext";
import { Linking } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

export default ({ onLocationUpdate, onError }) => { //IMPLEMENTATION NOT YET PERFECT
  
  const {
    locationState,
    trackCurrentLocation,
    startLocationReading,
    createNewTrack,
    clearErrorMessage,
  } = useLocationContext();
  const [errorMsg, setErrorMsg] = useState("");
  const requestAccessForUserLocation = async () => {
    try {
      //Asks the user to grant permissions for location while the app is in the foreground.
      const { status } = await requestForegroundPermissionsAsync();
      console.log({ status });
      if (status === "granted") {
        startLocationReading(true); // This will determine if location should be tracked. Not yet implemented
        await watchPositionAsync(
          {
            //watch for position changes either per time or meter change
            accuracy: Accuracy.BestForNavigation,
            distanceInterval: 5, // 5m

            timeInterval: 5000, //5s
          },
          (location) => {
            // console.log(location);
            trackCurrentLocation({
              coords: location.coords,
              timestamp: location.timestamp,
            });
          }
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
      // console.log({locationAccess})

      // let location = await Location.getLastKnownPositionAsync({});

      // console.log({location})
      // let currentLocation = await Location.getCurrentPositionAsync({});
      // console.log({currentLocation})
    } catch (err) {
      setErrorMsg("Something went wrong internally, please try again.");
      onError && onError(err);    }
  };
  //request access to user location
  useFocusEffect(() => {
    useCallback(() => {
      requestAccessForUserLocation();
    });
  }, []);

  return [requestAccessForUserLocation, errorMsg ];
};
