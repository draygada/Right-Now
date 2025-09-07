// Distance calculation utilities using Haversine formula

// Calculate distance between two points in miles
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 3959; // Earth radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
};

// Convert degrees to radians
const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

// Format distance for display
export const formatDistance = (distance) => {
  if (distance < 0.1) return "< 0.1 mi";
  if (distance < 1) return `${distance.toFixed(1)} mi`;
  return `${Math.round(distance)} mi`;
};

// Default user location (Stanford, CA) for MVP
export const DEFAULT_USER_LOCATION = {
  lat: 37.4419,
  lng: -122.1430
};
