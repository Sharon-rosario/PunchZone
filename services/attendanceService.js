// services/attendanceService.js
import Geolocation from 'react-native-geolocation-service';

let watchId = null;

// Radius in meters
const GEOFENCE_RADIUS = 50;

export const startMonitoring = (officeLocation, onPunchIn, onPunchOut) => {
  if (!officeLocation) return;

  const { latitude: officeLat, longitude: officeLng } = officeLocation;

  watchId = Geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const distance = calculateDistance(
        latitude,
        longitude,
        officeLat,
 officeLng
      );

      if (distance <= GEOFENCE_RADIUS) {
        onPunchIn();
      } else {
        onPunchOut();
      }
    },
    (error) => console.log('Location watch error:', error),
    {
      enableHighAccuracy: true,
      distanceFilter: 10, // Check every 10 meters
      interval: 10000, // 10 seconds
      fastestInterval: 5000,
    }
  );
};

export const stopMonitoring = () => {
  if (watchId !== null) {
    Geolocation.clearWatch(watchId);
    watchId = null;
  }
};

// Haversine formula to calculate distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}