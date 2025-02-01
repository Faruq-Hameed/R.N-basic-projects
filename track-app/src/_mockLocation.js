import * as Location from 'expo-location';

// Define the equivalent of 10 meters in degree units
const tenMetersWithDegrees = 0.0001;

/**
 * Generates a mock location object with incremental changes.
 * @param {number} increment - The step count to modify the latitude and longitude.
 * @returns {object} - A simulated location object.
 */
const getLocation = (increment) => {
  return {
    timestamp: 10000000, // Static timestamp (not dynamic for testing)
    coords: {
      speed: 0, // Static speed (no movement in this mock)
      heading: 0, // Static heading (no direction change)
      accuracy: 5, // Simulated GPS accuracy in meters
      altitudeAccuracy: 5, // Simulated altitude accuracy in meters
      altitude: 5, // Fixed altitude value
      longitude: -122.0312186 + increment * tenMetersWithDegrees, // Increment longitude slightly
      latitude: 37.33233141 + increment * tenMetersWithDegrees // Increment latitude slightly
    }
  };
};

let counter = 0;

// Emit a fake location event every 10 seconds to simulate movement
setInterval(() => {
  Location.EventEmitter.emit('Expo.locationChanged', {
    watchId: Location._getCurrentWatchId(), // Get the current location watch ID
    location: getLocation(counter) // Pass the incremented location
  });
  counter++; // Increment counter to simulate movement
}, 10000); // Runs every 10 seconds
