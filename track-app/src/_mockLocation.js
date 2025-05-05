import * as Location from "expo-location";

const tenMetersWithDegrees = 0.0001;
let lastTimestamp = Date.now();
let lastCoords = { latitude: 7.3775, longitude: 3.947 };

const getLocation = (increment) => {
  const newTimestamp = Date.now();
  const newCoords = {
    latitude: lastCoords.latitude + increment * tenMetersWithDegrees,
    longitude: lastCoords.longitude + increment * tenMetersWithDegrees,
  };

  // Calculate time difference in seconds
  const timeDiff = (newTimestamp - lastTimestamp) / 1000; // Convert ms to seconds

  // Calculate distance using a simple approximation (not accurate for large distances)
  const distance =
    Math.sqrt(
      Math.pow(newCoords.latitude - lastCoords.latitude, 2) +
        Math.pow(newCoords.longitude - lastCoords.longitude, 2)
    ) * 111139; // Convert degrees to meters (approximation)

  const speed = timeDiff > 0 ? distance / timeDiff : 0; // meters per second

  // Update last known position and time
  lastTimestamp = newTimestamp;
  lastCoords = newCoords;

  return {
    timestamp: newTimestamp,
    coords: {
      speed, // Dynamically calculated speed
      heading: 0, // Static for now
      accuracy: 5, // Simulated GPS accuracy
      altitudeAccuracy: 5,
      altitude: 5,
      longitude: newCoords.longitude,
      latitude: newCoords.latitude,
    },
  };
};

let counter = 0;

// Emit a fake location event every 10 seconds to simulate movement
setInterval(() => {
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter),
    // 
  });
  counter++;
}, 10000); // Runs every 10 seconds
