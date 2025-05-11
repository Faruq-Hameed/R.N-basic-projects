/**Location reducer */
export const locationReducer = (state, action) => {
  switch (action.type) {
    case "start_location_reading":
      return { ...state, readingLocation: action.payload };
    case "track_current_location":
      const location = action.payload;
      return {
        ...state,
        currentLocation: location,
        trackedLocations: [...state.trackedLocations, location],
      };
    case "change_name":
      return { ...state, name: action.payload };
    case "set_error_message":
      return { ...state, locationErrorMessage: action.payload };
    case "reset_state":
      return {
        ...state,
        trackedLocations: [],
        readingLocation: false,
        name: "",
        locationErrorMessage: "",
      };
    default:
      return state;
  }
};
