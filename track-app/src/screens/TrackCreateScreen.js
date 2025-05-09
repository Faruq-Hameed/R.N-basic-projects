import "../_mockLocation";
import React, { useEffect, useState } from "react";
import { Alert, Linking, StyleSheet } from "react-native";
import { Button, Input, Text } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../components/Map";
import { useLocationContext } from "../contexts/locationContext";

import { useOnWillBlurEvent } from "../hooks/useOnWillBlurEvent";

import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const TrackCreateScreen = () => {
  const { locationState, trackCurrentLocation, createNewTrack } =
    useLocationContext();
  const [err] = useLocation(trackCurrentLocation);
  
  
  return (
    <SafeAreaView>
      <Text h2>Create a Track</Text>
      <Map />
      <TrackForm />
      {err ? <Text>{err}</Text> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Input: {
    borderWidth: 2,
  },
});

export default TrackCreateScreen;
