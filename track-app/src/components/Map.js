import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Polyline, Marker, Circle } from "react-native-maps";
import { useLocationContext } from "../contexts/locationContext";

import { Text } from "@rneui/base";

const Map = () => {
  const { locationState } = useLocationContext();
  console.log(
    "locationState.currentLocation is ==",
    locationState.currentLocation
  );
  // const { latitude = "9", longitude = 10 } = locationState.currentLocation.coords;

  // if (!latitude || !longitude) {
  //   return (
  //     <ActivityIndicator
  //       size="large"
  //       color="#0000ff"
  //       style={{ margin: "auto" }}
  //     />
  //   );
  //   // return <Text h2>Current Location is not available</Text>; // INSTEAD RETURN A DEFAULT LOCATION OR A MAP LIKE COMPONENT
  // }
  return (
    <MapView
    // style={styles.map}
    // region={{
    //   latitude,
    //   longitude,
    //   latitudeDelta: 0.01,
    //   longitudeDelta: 0.01,
    // }}
    >
      {/* <Marker
        coordinate={{ latitude, longitude }}
        title="You are here"
        description="Your current location"
      />
      <Circle
        center={locationState.currentLocation.coords}
        radius={15}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor="rgba(158, 158, 255, 0.3)"
      /> */}
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
