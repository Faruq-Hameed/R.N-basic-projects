import "../_mockLocation";
import React, { useEffect, useState } from "react";
import { Alert, Linking, StyleSheet } from "react-native";
import { Button, Input, Text } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../components/Map";
import { useLocationContext } from "../contexts/locationContext";

import { useOnWillBlurEvent } from "../hooks/useOnWillBlurEvent";

import useLocation from "../hooks/useLocation";

const TrackCreateScreen = () => {
  const [trackName, setTrackName] = useState("");
  const {
    locationState,
    trackCurrentLocation,
    startLocationReading,
    createNewTrack,
    clearErrorMessage,
  } = useLocationContext();
  // useOnWillBlurEvent(clearErrorMessage);
  useOnWillBlurEvent(startLocationReading(false)); //to stop location reading when we navigated from this screen
  const [err] = useLocation(trackCurrentLocation);

  // console.log({current: locationState.currentLocation})
  return (
    <SafeAreaView>
      <Text h2>Create a Track</Text>
      <Map />
      <Input
        label="Track Name"
        style={[styles.Input]}
        autoCapitalize="none"
        autoCorrect={false}
        value={trackName}
        onChangeText={setTrackName}
      />
      <Button
        title="Save Tracks"
        onPress={() => createNewTrack({ name: trackName })}
      />

      {/* {err ? <ErrorBanner message={err} onClear={setErr(null)}/>: null}  */}
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
