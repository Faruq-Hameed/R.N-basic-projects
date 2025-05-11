import { useContext } from "react";
import { Context as TrackContext } from "../contexts/TrackContext";
import useLocation from "./useLocation";
import { useLocationContext } from "../contexts/locationContext";

// This hook is used to save a location track
// It uses the TrackContext to access the createTrack function
// and provides a saveLocation function that can be used in components
const useSaveLocation = () => {
  const { createTrack } = useContext(TrackContext);
  const {
    locationState: { name, trackedLocations },
  } = useLocationContext();
  const saveLocation = async () => {
    try {
      await createTrack(name, trackedLocations);
    } catch (err) {
      console.error("Error saving location:", err);
    }
  };

  return [saveLocation];
};

export default useSaveLocation;
