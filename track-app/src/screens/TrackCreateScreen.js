import "../_mockLocation";
import React from "react";
import { Text } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../components/Map";
import { useLocationContext } from "../contexts/locationContext";


import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";

const TrackCreateScreen = () => {
  const { trackCurrentLocation } = useLocationContext();
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



export default TrackCreateScreen;
