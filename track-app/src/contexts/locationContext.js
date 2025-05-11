import { createContext, useCallback, useContext, useReducer } from "react";
import { Alert } from "react-native";
import { locationReducer } from "../reducers/locationReducer";
import createTrackApi from "../apis/trackApi";
import { useAuthContext } from "./authContext";

export const LocationContext = createContext();
const intialLocationState = {
  name: "",
  locationErrorMessage: "",
  readingLocation: false,
  currentLocation: {
    //where the pointer will be
    timestamp: 1706500000000,
    coords: {
      latitude: 7.3775,
      longitude: 3.947,
      altitude: 200.5,
      accuracy: 5.0,
      heading: 90.0,
      speed: 2.5,
    },
  },
  trackedLocations: [
    {
      timestamp: 1706500000000,
      coords: {
        latitude: 7.3775,
        longitude: 3.947,
        altitude: 200.5,
        accuracy: 5.0,
        heading: 90.0,
        speed: 2.5,
      },
    },
  ],
};

export const LocationProvider = ({ children }) => {
  const { state: authState } = useAuthContext();
  const trackApi = createTrackApi(authState?.token); //I am passing the auth token
  const [state, dispatch] = useReducer(locationReducer, intialLocationState);
  console.log(
    "total current tracked location is ===",
    state.trackedLocations.length,
    { readingLocation: state.readingLocation }
  );
  /**Callback to start or stop location reading based on the argument */
  const startLocationReading = (action) => {
    console.log("before dispatch", {
      action,
      readingLocation: state.readingLocation,
    });
    //Will be false if the the location permission is stopped or the device cannot track location again
    dispatch({
      type: "start_location_reading",
      payload: action,
    });
    console.log("after dispatch", {
      action,
      readingLocation: state.readingLocation,
    });
  };

  /** Add new location to the tracked locations list*/
  const trackCurrentLocation = useCallback(
    ({ coords, timestamp }) => {
      console.log("are we reading location? ", state.readingLocation);
      dispatch({
        type: "track_current_location",
        payload: { coords, timestamp },
      });
    },
    [state.readingLocation]
  );

  const changeName = (name) => {
    console.log("changeName from context is", name);
    dispatch({ type: "change_name", payload: name });
  };
 /**Reset state */
  const resetState = () => {
    dispatch({ type: "reset_state" });
  };

  const clearErrorMessage = () => {
    dispatch({ type: "set_error_message", payload: "" });
  };

  return (
    <LocationContext.Provider
      value={{
        locationState: state,
        startLocationReading,
        trackCurrentLocation,
        createNewTrack,
        clearErrorMessage,
        changeName,
        resetState,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

/** custom hook to access location state*/
export const useLocationContext = () => useContext(LocationContext);
