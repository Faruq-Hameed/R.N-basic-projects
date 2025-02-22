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
    case "set_error_message":
      return { ...state, locationErrorMessage: action.payload };
    default:
      return state;
  }
};
