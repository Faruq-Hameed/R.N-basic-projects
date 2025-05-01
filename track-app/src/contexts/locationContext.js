import { createContext, useContext, useReducer } from "react";
import { Alert } from "react-native";
import { locationReducer } from "../reducers/locationReducer";
import createTrackApi from "../apis/trackApi";
import  {useAuthContext} from './authContext'

export const LocationContext = createContext();
const intialLocationState = {
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
console.log("total state now is tracked now is ... ===....", state.trackedLocations.length)
  /**Callback to start or stop location reading based on the argument */
  const startLocationReading = (action = true) => {
    //Will be false if the the location permission is stopped or the device cannot track location again
    dispatch({
      type: "start_location_reading",
      payload: action,
    });
  };

  /** Add new location to the tracked locations list*/
  const trackCurrentLocation = ({ coords, timestamp }) => {
    // console.log("trackCurrentLocation from context is", {coords, timestamp})
    //Get the location and add it to the list of locations in the current track
    dispatch({
      type: "track_current_location",
      payload: { ...coords, timestamp },
    });
  };
  const createNewTrack = async ({ name }) => {
    // console.log({ locations: state.trackedLocations, name });

    try {
      const response = await trackApi.post("/tracks", {
        locations: state.trackedLocations,
        name,
      }, 
    {
      
    });
      const data = response.data.data;
      Alert.alert("success", data.message);
      return;
    } catch (error) {
      let message = "An unknown error occurred from the server."; // Default message

      if (Array.isArray(error.response.data?.message)) {
        // If message is an array, join all messages into a single string
        message = error.response.data.message.join("\n");
      } else if (typeof error.response.data?.message === "string") {
        // If message is a string, use it directly
        message = error.response.data.message;
      } else {
        //if network from device is not available
        message = "Unable to connect. Please try again later.";
      }
      dispatch({ type: "set_error_message", payload: message });
    }
    return false;
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
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

/** custom hook to access location state*/
export const useLocationContext = () => useContext(LocationContext);