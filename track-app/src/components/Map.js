import React from "react";
import { Text, StyleSheet } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import { requestForegroundPermissionsAsync } from "expo-location";

const Map = () => {
  let points = []; //temporary demo points
  for (let i = 0; i < 20; i++) {
    if (i % 2 === 0) {
      points.push({
        latitude: 37.33233 + i * 0.001,
        longitude: -122.03121 + i * 0.001,
      });
    } else {
      points.push({
        latitude: 37.33233 - i * 0.002,
        longitude: -122.03121 + i * 0.001,
      });
    }
  }
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 7.3397242770465425,
        longitude: 3.836535957197408,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {/* Draw line across all the coordinates as index in the array */}
      <Polyline coordinates={points} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default Map;
