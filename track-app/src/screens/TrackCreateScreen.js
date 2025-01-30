import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import { requestForegroundPermissionsAsync } from "expo-location";

import Map from "../components/Map";

const TrackCreateScreen = () => {
  const [err, setErr] = useState(null);

  const startTracking = async () => {
    try {
      //Asks the user to grant permissions for location while the app is in the foreground.
      await requestForegroundPermissionsAsync();
    } catch (err) {
      setErr(err.message);
    }
  };
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
