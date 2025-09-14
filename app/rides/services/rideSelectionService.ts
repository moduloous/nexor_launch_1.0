import { Alert } from 'react-native';

// Types for the ride selection system
export interface RideLocation {
  latitude: number;
  longitude: number;
  address: string;
}

export interface Driver {
  id: string;
  name: string;
  vehicleType: string;
  rating: number;
  currentLocation: RideLocation;
  isAvailable: boolean;
  price: number;
  estimatedPickupTime: number; // in minutes
  distance: number; // in km
}

export interface RideRequest {
  pickupLocation: RideLocation;
  dropLocation: RideLocation;
  rideType: string;
  userId: string;
  timestamp: Date;
}

export interface RideMatch {
  driver: Driver;
  estimatedFare: number;
  estimatedTime: number;
  distance: number;
  surgeMultiplier: number;
}

// Mock data for demonstration
const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    vehicleType: 'bike',
    rating: 4.8,
    currentLocation: { latitude: 12.9716, longitude: 77.5946, address: 'Koramangala' },
    isAvailable: true,
    price: 45,
    estimatedPickupTime: 5,
    distance: 2.1
  },
  {
    id: '2',
    name: 'Amit Singh',
    vehicleType: 'auto',
    rating: 4.6,
    currentLocation: { latitude: 12.9789, longitude: 77.5917, address: 'HSR Layout' },
    isAvailable: true,
    price: 65,
    estimatedPickupTime: 8,
    distance: 3.2
  },
  {
    id: '3',
    name: 'Suresh Patel',
    vehicleType: 'cab',
    rating: 4.9,
    currentLocation: { latitude: 12.9654, longitude: 77.5854, address: 'Indiranagar' },
    isAvailable: true,
    price: 120,
    estimatedPickupTime: 12,
    distance: 4.5
  },
  {
    id: '4',
    name: 'Kumar Das',
    vehicleType: 'bike',
    rating: 4.7,
    currentLocation: { latitude: 12.9721, longitude: 77.5932, address: 'Koramangala' },
    isAvailable: true,
    price: 42,
    estimatedPickupTime: 3,
    distance: 1.8
  },
  {
    id: '5',
    name: 'Priya Sharma',
    vehicleType: 'parcel delivery',
    rating: 4.8,
    currentLocation: { latitude: 12.9730, longitude: 77.5920, address: 'Koramangala' },
    isAvailable: true,
    price: 55,
    estimatedPickupTime: 7,
    distance: 2.5
  }
];

// Base pricing configuration
const PRICING_CONFIG = {
  bike: { baseFare: 30, perKm: 12, perMinute: 2 },
  auto: { baseFare: 40, perKm: 15, perMinute: 2.5 },
  cab: { baseFare: 60, perKm: 20, perMinute: 3 },
  'parcel delivery': { baseFare: 50, perKm: 18, perMinute: 2.5 }
};

// Surge pricing calculation
const calculateSurgeMultiplier = (availableDrivers: number, activeRequests: number): number => {
  if (availableDrivers === 0) return 2.0;
  const ratio = activeRequests / availableDrivers;
  if (ratio > 3) return 2.0;
  if (ratio > 2) return 1.5;
  if (ratio > 1.5) return 1.2;
  return 1.0;
};

// Driver scoring algorithm (Smart Scoring System like Uber/Ola)
const calculateDriverScore = (driver: Driver, rideType: string, userLocation: RideLocation): number => {
  const distanceWeight = 0.4;
  const ratingWeight = 0.3;
  const availabilityWeight = 0.2;
  const priceWeight = 0.1;

  // Normalize values
  const distanceScore = Math.max(0, 1 - (driver.distance / 10)); // Closer is better
  const ratingScore = driver.rating / 5; // Higher rating is better
  const availabilityScore = driver.isAvailable ? 1 : 0;
  const priceScore = Math.max(0, 1 - (driver.price / 200)); // Lower price is better

  // Calculate weighted score
  const score = (
    distanceScore * distanceWeight +
    ratingScore * ratingWeight +
    availabilityScore * availabilityWeight +
    priceScore * priceWeight
  );

  return score;
};

// Main ride selection algorithm
export const selectRide = async (
  rideType: string,
  pickupLocation?: RideLocation,
  dropLocation?: RideLocation
): Promise<void> => {
  try {
    console.log('=== SELECT RIDE SERVICE DEBUG ===');
    console.log('selectRide called with:', { rideType, pickupLocation, dropLocation });
    console.log('mockDrivers:', mockDrivers);
    console.log('mockDrivers type:', typeof mockDrivers);
    console.log('mockDrivers is array:', Array.isArray(mockDrivers));
    
    // Step 1: Validate ride request
    if (!pickupLocation || !dropLocation) {
      Alert.alert(
        'Location Required',
        'Please set both pickup and drop locations first.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Step 2: Find nearby drivers
    console.log('Step 2: Finding nearby drivers...');
    if (!mockDrivers || !Array.isArray(mockDrivers)) {
      console.error('Mock drivers data is invalid:', mockDrivers);
      Alert.alert('Error', 'Driver data is unavailable. Please try again.');
      return;
    }

    console.log('About to filter drivers for ride type:', rideType);
    const availableDrivers = mockDrivers.filter(driver => {
      console.log('Checking driver:', driver);
      const isMatch = driver && driver.vehicleType === rideType && driver.isAvailable;
      console.log('Driver match result:', isMatch);
      return isMatch;
    });
    console.log('Available drivers found:', availableDrivers.length);

    if (availableDrivers.length === 0) {
      Alert.alert(
        'No Drivers Available',
        `No ${rideType} drivers are currently available in your area. Please try again later.`,
        [{ text: 'OK' }]
      );
      return;
    }

    // Step 3: Calculate surge pricing
    const activeRequests = Math.floor(Math.random() * 20) + 5; // Mock data
    const surgeMultiplier = calculateSurgeMultiplier(availableDrivers.length, activeRequests);

    // Step 4: Score and rank drivers
    const scoredDrivers = availableDrivers
      .map(driver => ({
        ...driver,
        score: calculateDriverScore(driver, rideType, pickupLocation)
      }))
      .sort((a, b) => b.score - a.score);

    // Step 5: Select best driver
    const bestDriver = scoredDrivers[0];
    
    // Step 6: Calculate final pricing
    const baseConfig = PRICING_CONFIG[rideType as keyof typeof PRICING_CONFIG];
    
    if (!baseConfig) {
      console.error('No pricing config found for ride type:', rideType);
      Alert.alert('Error', `Pricing not available for ${rideType}. Please try a different ride type.`);
      return;
    }
    
    const estimatedDistance = Math.sqrt(
      Math.pow(dropLocation.latitude - pickupLocation.latitude, 2) +
      Math.pow(dropLocation.longitude - pickupLocation.longitude, 2)
    ) * 111; // Rough conversion to km
    
    const estimatedTime = bestDriver.estimatedPickupTime + (estimatedDistance * 2); // Rough time calculation
    
    const baseFare = baseConfig.baseFare;
    const distanceFare = estimatedDistance * baseConfig.perKm;
    const timeFare = estimatedTime * baseConfig.perMinute;
    const surgeFare = (baseFare + distanceFare + timeFare) * (surgeMultiplier - 1);
    
    const totalFare = Math.round(baseFare + distanceFare + timeFare + surgeFare);

    // Step 7: Show ride confirmation
    Alert.alert(
      'Ride Confirmed! 🚗',
      `Driver: ${bestDriver.name}\nVehicle: ${rideType.toUpperCase()}\nRating: ⭐ ${bestDriver.rating}\nPickup Time: ${bestDriver.estimatedPickupTime} mins\nDistance: ${estimatedDistance.toFixed(1)} km\nFare: ₹${totalFare}${surgeMultiplier > 1 ? ` (${surgeMultiplier}x surge)` : ''}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm Ride', 
          onPress: () => confirmRide(bestDriver, totalFare, estimatedTime, estimatedDistance)
        }
      ]
    );

  } catch (error) {
    console.error('Error in ride selection:', error);
    Alert.alert('Error', 'Something went wrong. Please try again.');
  }
};

// Confirm ride function
const confirmRide = (driver: Driver, fare: number, time: number, distance: number): void => {
  Alert.alert(
    'Ride Booked Successfully! 🎉',
    `Your ${driver.vehicleType} is on the way!\n\nDriver: ${driver.name}\nFare: ₹${fare}\nETA: ${time} minutes\nDistance: ${distance.toFixed(1)} km\n\nTrack your ride in real-time!`,
    [
      { 
        text: 'Track Ride', 
        onPress: () => {
          // Here you would typically navigate to ride tracking screen
          console.log('Navigating to ride tracking...');
        }
      }
    ]
  );
};

// Export the main function for use in components
export default selectRide;
