import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        // Request location permission
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Location access is required.");
          setLoading(false);
          return;
        }

        // Fetch current location
        let userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation.coords);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };

    getUserLocation();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: location?.latitude || 37.33233,
        longitude: location?.longitude || -122.03121,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      showsUserLocation={true} // Show user's current location on the map
    />
  );
};


export default MapScreen;
