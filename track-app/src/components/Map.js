import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import { useLocationContext } from "../hooks/contextHooks";
import { Text } from "@rneui/base";

const Map = () => {
  const { locationState } = useLocationContext();
  const { latitude, longitude } = locationState.currentLocation;
  if (!latitude || !longitude) {
    return <Text h2>Current Location is not available</Text>;
  }
  return (
    <MapView
      style={styles.map}
      region={{
        // latitude: 37.33233,
        // longitude: -122.03121,
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker
        coordinate={{ latitude, longitude }}
        title="You are here"
        description="Your current location"
      />
      {/* <Polyline coordinates={points} /> */}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default Map;
