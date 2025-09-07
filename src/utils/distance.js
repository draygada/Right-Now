// Distance calculation utilities

// Default user location (San Francisco)
export const DEFAULT_USER_LOCATION = {
  lat: 37.7749,
  lng: -122.4194,
};

// Haversine formula to calculate distance between two points
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
};

// Convert degrees to radians
const toRad = (degrees) => {
  return degrees * (Math.PI / 180);
};

// Format distance for display
export const formatDistance = (distanceInMiles) => {
  if (distanceInMiles < 0.1) {
    return "< 0.1 mi";
  } else if (distanceInMiles < 1) {
    return `${distanceInMiles.toFixed(1)} mi`;
  } else if (distanceInMiles < 10) {
    return `${distanceInMiles.toFixed(1)} mi`;
  } else {
    return `${Math.round(distanceInMiles)} mi`;
  }
};

// Get distance string between two coordinates
export const getDistanceString = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return "—";
  
  const distance = calculateDistance(lat1, lon1, lat2, lon2);
  return formatDistance(distance);
};
