import React, { useContext } from "react";
import { Input, Button } from "@rneui/base";
import Spacer from "./Spacer";
import { useLocationContext } from "../contexts/locationContext";


const TrackForm = () => {
  const {
    locationState: { name, readingLocation, trackedLocations },
    startLocationReading,
    changeName,
    createNewTrack
  } = useLocationContext()

  return (
    <>
      <Spacer>
        <Input
          value={name}
          onChangeText={changeName}
          placeholder="Enter name"
        />
      </Spacer>
      {readingLocation ? (
        <Button title="Stop" onPress={startLocationReading(false)} />
      ) : (
        <Button title="Start Recording" onPress={startLocationReading(true)} />
      )}

      <Spacer>
        {!readingLocation && trackedLocations.length ? (
          <Button title="Save Recording" onPress={createNewTrack(name)} />
        ) : null}
      </Spacer>
    </>
  );
};

export default TrackForm;
