import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Dimensions, Platform, Alert, Image, Modal, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { selectRide, RideLocation } from './services/rideSelectionService';
import LocationAutocomplete from './components/LocationAutocomplete';
import { testGooglePlacesAPI } from './utils/googlePlacesTest';



const { width, height } = Dimensions.get('window');

// Google Places API Key
const GOOGLE_PLACES_API_KEY = 'AIzaSyDFG5Gp5LPJTGNLvtoNxwAqsZ5r2aTxhOw';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: width,
    height: height,
  },
  searchContainer: {
    position: 'absolute',
    top: 48,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  locationInputs: {
    marginLeft: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  inputDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 4,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '50%',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  savedPlace: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  placeIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  placeAddress: {
    fontSize: 14,
    color: '#666',
  },
  rideOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rideIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  rideInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rideName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  rideDescription: {
    fontSize: 14,
    color: '#666',
  },
  rideDetails: {
    alignItems: 'flex-end',
  },
  ridePrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  rideTime: {
    fontSize: 14,
    color: '#666',
  },
  autocompleteContainer: {
    position: 'absolute',
    top: 120,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1000,
  },
  closeAutocomplete: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 1001,
  },
  transportTypes: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  transportType: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 100,
  },
  transportTypeActive: {
    backgroundColor: '#e6f7ff',
    borderColor: '#1890ff',
    borderWidth: 1,
  },
  transportTypeIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  transportTypeName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
  },
  transportIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  transportInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transportName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  transportDescription: {
    fontSize: 14,
    color: '#666',
  },
  transportDetails: {
    alignItems: 'flex-end',
  },
  transportPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  transportTime: {
    fontSize: 14,
    color: '#666',
  },
  routeOption: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  routeFare: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1890ff',
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  routeStops: {
    flex: 1,
  },
  routeFrom: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  routeStopsDots: {
    fontSize: 16,
    color: '#666',
    marginVertical: 2,
  },
  routeTo: {
    fontSize: 14,
    color: '#333',
  },
  routeInfo: {
    alignItems: 'flex-end',
  },
  routeDuration: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  routeNextDeparture: {
    fontSize: 14,
    color: '#666',
  },
  ticketDetails: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
  },
  ticketRoute: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  ticketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  ticketLabel: {
    fontSize: 16,
    color: '#666',
  },
  ticketValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  bookButton: {
    backgroundColor: '#1890ff',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#1890ff',
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 44,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Urbanist',
  },
  locationPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#666',
    fontFamily: 'Urbanist',
  },
  locationModal: {
    flex: 1,
    backgroundColor: '#fff',
  },
  locationModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  locationModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  locationModalClose: {
    padding: 4,
  },
  locationSearchContainer: {
    padding: 16,
  },
  locationSuggestions: {
    padding: 16,
  },
  locationSuggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  locationSuggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  locationSuggestionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  requestRideButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 20,
    marginTop: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  requestRideButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Urbanist',
  },
  requestRideButtonDisabled: {
    backgroundColor: '#ccc',
  },
});

export default function RidesScreen() {
  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const nav = useRouter();
  
  // Add state for ride selection and location
  const [pickupLocation, setPickupLocation] = useState<RideLocation | null>(null);
  const [dropLocation, setDropLocation] = useState<RideLocation | null>(null);
  const [selectedRideType, setSelectedRideType] = useState<string | null>(null);
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [showDropModal, setShowDropModal] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Request location permission and get current location
  useEffect(() => {
    requestLocationPermission();
    // Test Google Places API
    testGooglePlacesAPI();
  }, []);

  // Animate ride options when both locations are set
  useEffect(() => {
    if (pickupLocation && dropLocation) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
    }
  }, [pickupLocation, dropLocation]);



  const requestLocationPermission = async () => {
    try {
      console.log('Requesting location permission...');
      
      // Check if permission is already granted
      let { status } = await Location.getForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        console.log('Permission not granted, requesting...');
        const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
        status = newStatus;
      }
      
      if (status === 'granted') {
        console.log('Location permission granted');
        setLocationPermission(true);
        await getCurrentLocation();
      } else {
        console.log('Location permission denied');
        setLocationPermission(false);
        Alert.alert(
          'Location Permission Required',
          'Please enable location access in your device settings to use the rides feature.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setLocationPermission(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      console.log('Getting current location...');
      
      // Check if location services are enabled
      const isEnabled = await Location.hasServicesEnabledAsync();
      if (!isEnabled) {
        Alert.alert(
          'Location Services Disabled',
          'Please enable location services in your device settings.',
          [{ text: 'OK' }]
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      console.log('Location obtained:', location.coords);
      
      const currentLocation: RideLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: 'Current Location',
      };
      
             setPickupLocation(currentLocation);
       // Update map region will be called automatically by setPickup
      
      console.log('Current location set successfully');
    } catch (error) {
      console.error('Error getting current location:', error);
      
      // Set a default location if current location fails
      const defaultLocation: RideLocation = {
        latitude: 12.9716,
        longitude: 77.5946,
        address: 'Default Location (Bangalore)',
      };
      
      setPickupLocation(defaultLocation);
      setRegion({
        latitude: defaultLocation.latitude,
        longitude: defaultLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      
      Alert.alert(
        'Location Error',
        'Could not get your current location. Using default location instead.',
        [{ text: 'OK' }]
      );
    }
  };

  // Function to handle ride type selection
  const handleRideTypeClick = async (rideType: string) => {
    try {
      console.log('=== RIDE TYPE CLICK DEBUG ===');
      console.log('Ride type clicked:', rideType);
      console.log('Current locations:', { pickupLocation, dropLocation });
      console.log('selectRide function:', typeof selectRide);
      
      // Check if both locations are set
      if (!pickupLocation || !dropLocation) {
        Alert.alert(
          'Location Required',
          'Please set both pickup and drop locations first.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Set the selected ride type
      setSelectedRideType(rideType);
      console.log('Selected ride type set to:', rideType);

      // Call the ride selection algorithm
      console.log('Calling selectRide with:', { rideType, pickupLocation, dropLocation });
      const result = await selectRide(rideType, pickupLocation, dropLocation);
      console.log('selectRide result:', result);
    } catch (error) {
      console.error('Error selecting ride:', error);
      if (error instanceof Error) {
        console.error('Error stack:', error.stack);
      }
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  // Function to get ride display name
  const getRideDisplayName = (rideId: string) => {
    const rideNames: { [key: string]: string } = {
      'bike': 'Bike Direct',
      'auto': 'Auto',
      'cab-non-ac': 'Cab Non AC',
      'cab-ac': 'Cab AC',
      'cab-premium': 'Cab Premium'
    };
    return rideNames[rideId] || rideId;
  };

  // Function to set pickup location
  const setPickup = (location: RideLocation) => {
    console.log('Setting pickup location:', location);
    setPickupLocation(location);
    setShowPickupModal(false);
    
    // Update map region to show the new location
    updateMapRegion();
  };

  // Function to set drop location
  const setDrop = (location: RideLocation) => {
    console.log('Setting drop location:', location);
    setDropLocation(location);
    setShowDropModal(false);
    
    // Update map region to show the new location
    updateMapRegion();
  };

  // Function to update map region to show both locations
  const updateMapRegion = () => {
    if (pickupLocation && dropLocation) {
      // Calculate center point between pickup and drop
      const centerLat = (pickupLocation.latitude + dropLocation.latitude) / 2;
      const centerLng = (pickupLocation.longitude + dropLocation.longitude) / 2;
      
      // Calculate appropriate delta to show both locations
      const latDiff = Math.abs(pickupLocation.latitude - dropLocation.latitude);
      const lngDiff = Math.abs(pickupLocation.longitude - dropLocation.longitude);
      const maxDiff = Math.max(latDiff, lngDiff);
      
      setRegion({
        latitude: centerLat,
        longitude: centerLng,
        latitudeDelta: Math.max(maxDiff * 1.5, 0.01), // Add some padding
        longitudeDelta: Math.max(maxDiff * 1.5, 0.01),
      });
    } else if (pickupLocation) {
      // If only pickup is set, center on it
      setRegion({
        latitude: pickupLocation.latitude,
        longitude: pickupLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  // Check if ride is ready to be requested
  const isRideReady = () => {
    return pickupLocation && dropLocation && selectedRideType;
  };

  // Handle ride request
  const handleRequestRide = async () => {
    if (!isRideReady()) {
      Alert.alert('Complete Setup', 'Please select pickup, drop location and ride type first.');
      return;
    }

    try {
      await selectRide(selectedRideType!, pickupLocation!, dropLocation!);
    } catch (error) {
      console.error('Error requesting ride:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  let MapView, Marker, PROVIDER_GOOGLE;
  if (Platform.OS !== 'web') {
    const maps = require('react-native-maps');
    MapView = maps.default;
    Marker = maps.Marker;
    PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE;
  }

  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
        {/* Header - Fixed */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 16,
          paddingHorizontal: 16,
          paddingBottom: 8,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
          zIndex: 10,
        }}>
          <Pressable onPress={() => nav.back()}>
            <Ionicons name="arrow-back-outline" size={24} color="#000" />
          </Pressable>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 8, fontFamily: 'Urbanist' }}>Rides</Text>
        </View>

        {/* Full Scrollable Content */}
        <ScrollView 
          style={{ flex: 1 }} 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{ paddingBottom: 56 }}
        >
          {/* Location Inputs Section */}
          <View style={{ paddingHorizontal: 16, paddingTop: 16, backgroundColor: '#fff' }}>
            {/* Location Status Display */}
            <View style={{
              backgroundColor: '#f0f8ff',
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              borderLeftWidth: 4,
              borderLeftColor: locationPermission ? '#4CAF50' : '#FF9800',
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>
                  Location Status
                </Text>
                <Pressable
                  onPress={getCurrentLocation}
                  style={{
                    backgroundColor: '#4CAF50',
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>Refresh</Text>
                </Pressable>
              </View>
              <Text style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>
                Permission: {locationPermission ? '✅ Granted' : '❌ Denied'}
              </Text>
              <Text style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>
                Google Places API: ✅ Active
              </Text>
              {pickupLocation && (
                <Text style={{ fontSize: 14, color: '#666' }}>
                  Current Location: {pickupLocation.address}
                </Text>
              )}
            </View>
            
            {/* Pickup Location */}
            <TouchableOpacity
              style={styles.locationInput}
              onPress={() => setShowPickupModal(true)}
            >
              <Ionicons name="location" size={20} color="#4CAF50" style={{ marginRight: 8 }} />
              {pickupLocation ? (
                <Text style={styles.locationText}>{pickupLocation.address}</Text>
              ) : (
                <Text style={styles.locationPlaceholder}>Set pickup location</Text>
              )}
            </TouchableOpacity>

            {/* Drop Location */}
            <TouchableOpacity
              style={styles.locationInput}
              onPress={() => setShowDropModal(true)}
            >
              <Ionicons name="location-outline" size={20} color="#FF6B6B" style={{ marginRight: 8 }} />
              {dropLocation ? (
                <Text style={styles.locationText}>{dropLocation.address}</Text>
              ) : (
                <Text style={styles.locationPlaceholder}>Set drop location</Text>
              )}
            </TouchableOpacity>

            {/* Request Ride Button */}
            {isRideReady() && (
              <TouchableOpacity
                style={[styles.requestRideButton, !isRideReady() && styles.requestRideButtonDisabled]}
                onPress={handleRequestRide}
                disabled={!isRideReady()}
              >
                <Text style={styles.requestRideButtonText}>
                  Request Ride
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Map Section */}
          <View style={{
            height: height * 0.35,
            marginHorizontal: 16,
            marginTop: 16,
            borderRadius: 20,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.10,
            shadowRadius: 12,
            elevation: 4,
          }}>
            {Platform.OS === 'web' ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee' }}>
                <Text style={{ color: '#888', fontSize: 18, padding: 20 }}>Map is unavailable on web</Text>
              </View>
            ) : (
              <>
                {/* Map Status Overlay */}
                <View style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  zIndex: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 8,
                  padding: 8,
                }}>
                  <Text style={{ fontSize: 12, color: '#333', textAlign: 'center' }}>
                    {mapLoading ? 'Loading Map...' : mapError ? 'Map Error' : 'Places & POIs Enabled'}
                  </Text>
                </View>
                
                {/* Map Loading Indicator */}
                {mapLoading && (
                  <View style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: [{ translateX: -25 }, { translateY: -25 }],
                    zIndex: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 8,
                    padding: 16,
                    alignItems: 'center',
                  }}>
                    <Text style={{ fontSize: 14, color: '#333', marginBottom: 8 }}>Loading Map...</Text>
                  </View>
                )}
                
                {/* Map Error Display */}
                {mapError && (
                  <View style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: [{ translateX: -50 }, { translateY: -25 }],
                    zIndex: 2,
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    borderRadius: 8,
                    padding: 16,
                    alignItems: 'center',
                  }}>
                    <Text style={{ fontSize: 14, color: '#d32f2f', marginBottom: 8 }}>Map Error</Text>
                    <Text style={{ fontSize: 12, color: '#666', textAlign: 'center' }}>{mapError}</Text>
                  </View>
                )}
                
                <MapView
                  style={{ flex: 1 }}
                  initialRegion={region}
                  provider={PROVIDER_GOOGLE}
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                  showsCompass={true}
                  showsScale={true}
                  showsTraffic={false}
                  showsBuildings={true}
                  showsPointsOfInterest={true}
                  showsBusinesses={true}
                  showsTransit={true}
                  mapType="standard"
                  onRegionChangeComplete={updateMapRegion}
                  onMapReady={() => {
                    console.log('Map is ready and showing places');
                    setMapLoading(false);
                    setMapError(null);
                  }}
                  onLoadStart={() => setMapLoading(true)}
                  onLoadEnd={() => setMapLoading(false)}
                >
                  {pickupLocation && (
                    <Marker 
                      coordinate={{ latitude: pickupLocation.latitude, longitude: pickupLocation.longitude }}
                      title="Pickup Location"
                      description={pickupLocation.address}
                      pinColor="green"
                      tracksViewChanges={false}
                      opacity={0.9}
                    />
                  )}
                  {dropLocation && (
                    <Marker 
                      coordinate={{ latitude: dropLocation.latitude, longitude: dropLocation.longitude }}
                      title="Drop Location"
                      description={dropLocation.address}
                      pinColor="red"
                      tracksViewChanges={false}
                      opacity={0.9}
                    />
                  )}
                </MapView>
              </>
            )}
          </View>

          {/* Ride Options Section - Only show when both locations are set */}
           {pickupLocation && dropLocation && (
             <Animated.View 
               style={{ 
                 paddingHorizontal: 16, 
                 paddingTop: 16,
                 opacity: fadeAnim,
                 transform: [{ translateY: slideAnim }]
               }}
             >
               {/* Ride Options Header */}
               <View style={{ 
                 backgroundColor: '#fff', 
                 borderRadius: 16, 
                 padding: 20, 
                 marginBottom: 16,
                 shadowColor: '#000',
                 shadowOffset: { width: 0, height: 2 },
                 shadowOpacity: 0.1,
                 shadowRadius: 8,
                 elevation: 4,
               }}>
                 <Text style={{ 
                   fontSize: 20, 
                   fontWeight: 'bold', 
                   color: '#333', 
                   marginBottom: 8,
                   fontFamily: 'Urbanist',
                   textAlign: 'center'
                 }}>
                   Choose Your Ride
                 </Text>
                 <Text style={{ 
                   fontSize: 14, 
                   color: '#666', 
                   textAlign: 'center',
                   fontFamily: 'Urbanist'
                 }}>
                   {pickupLocation.address} → {dropLocation.address}
                 </Text>
               </View>

               {/* Ride Options List */}
               {[
                 {
                   id: 'bike',
                   name: 'Bike Direct',
                   icon: '🚲',
                   description: 'Quick Bike rides',
                   capacity: '1',
                   estimatedTime: '1 min away',
                   dropTime: 'Drop 1:22 pm',
                   price: '₹119',
                   isSelected: selectedRideType === 'bike',
                   color: '#FFD700'
                 },
                 {
                   id: 'auto',
                   name: 'Auto',
                   icon: '🛺',
                   description: 'Auto Rickshaw',
                   capacity: '3',
                   estimatedTime: '4 mins',
                   dropTime: 'Drop 1:28 pm',
                   price: '₹232',
                   isSelected: selectedRideType === 'auto',
                   color: '#4CAF50'
                 },
                 {
                   id: 'cab-non-ac',
                   name: 'Cab Non AC',
                   icon: '🚗',
                   description: 'Economy Car',
                   capacity: '4',
                   estimatedTime: '1 min',
                   dropTime: 'Drop 1:25 pm',
                   price: '₹241',
                   isSelected: selectedRideType === 'cab-non-ac',
                   color: '#FF9800'
                 },
                 {
                   id: 'cab-ac',
                   name: 'Cab AC',
                   icon: '🚙',
                   description: 'Comfort Car',
                   capacity: '4',
                   estimatedTime: '4 mins',
                   dropTime: 'Drop 1:28 pm',
                   price: '₹270',
                   isSelected: selectedRideType === 'cab-ac',
                   color: '#2196F3'
                 },
                 {
                   id: 'cab-premium',
                   name: 'Cab Premium',
                   icon: '⭐',
                   description: 'Premium Vehicle',
                   capacity: '4',
                   estimatedTime: '6 mins',
                   dropTime: 'Drop 1:30 pm',
                   price: '₹350',
                   isSelected: selectedRideType === 'cab-premium',
                   color: '#9C27B0'
                 }
               ].map((ride, index) => (
                 <View key={ride.id} style={{
                   backgroundColor: ride.isSelected ? '#e8f5e8' : '#fff',
                   borderRadius: 16,
                   padding: 16,
                   marginBottom: 12,
                   borderWidth: ride.isSelected ? 2 : 1,
                   borderColor: ride.isSelected ? '#4CAF50' : '#eee',
                   shadowColor: '#000',
                   shadowOffset: { width: 0, height: 2 },
                   shadowOpacity: 0.1,
                   shadowRadius: 4,
                   elevation: 2,
                 }}>
                   <Pressable
                     onPress={() => handleRideTypeClick(ride.id)}
                     style={{ flexDirection: 'row', alignItems: 'center' }}
                   >
                     {/* Ride Icon */}
                     <View style={{
                       width: 50,
                       height: 50,
                       borderRadius: 25,
                       backgroundColor: ride.color,
                       justifyContent: 'center',
                       alignItems: 'center',
                       marginRight: 16,
                     }}>
                       <Text style={{ fontSize: 24 }}>{ride.icon}</Text>
                     </View>

                     {/* Ride Info */}
                     <View style={{ flex: 1 }}>
                       <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                         <Text style={{
                           fontSize: 18,
                           fontWeight: '600',
                           color: '#333',
                           fontFamily: 'Urbanist'
                         }}>
                           {ride.name}
                         </Text>
                         <View style={{
                           backgroundColor: ride.isSelected ? '#4CAF50' : '#f0f0f0',
                           paddingHorizontal: 8,
                           paddingVertical: 4,
                           borderRadius: 12,
                         }}>
                           <Text style={{
                             fontSize: 12,
                             color: ride.isSelected ? '#fff' : '#666',
                             fontWeight: '500'
                           }}>
                             {ride.capacity} person
                           </Text>
                         </View>
                       </View>
                       
                       <Text style={{
                         fontSize: 14,
                         color: '#666',
                         marginBottom: 8,
                         fontFamily: 'Urbanist'
                       }}>
                         {ride.description}
                       </Text>

                       <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                         <View>
                           <Text style={{
                             fontSize: 12,
                             color: '#4CAF50',
                             fontWeight: '500',
                             marginBottom: 2
                           }}>
                             {ride.estimatedTime}
                           </Text>
                           <Text style={{
                             fontSize: 12,
                             color: '#666'
                           }}>
                             {ride.dropTime}
                           </Text>
                         </View>
                         
                         <Text style={{
                           fontSize: 20,
                           fontWeight: 'bold',
                           color: '#333',
                           fontFamily: 'Urbanist'
                         }}>
                           {ride.price}
                         </Text>
                       </View>
                     </View>
                   </Pressable>
                 </View>
               ))}

               {/* Book Ride Button */}
               {selectedRideType && (
                 <View style={{
                   backgroundColor: '#fff',
                   borderRadius: 16,
                   padding: 20,
                   marginTop: 16,
                   shadowColor: '#000',
                   shadowOffset: { width: 0, height: 2 },
                   shadowOpacity: 0.1,
                   shadowRadius: 8,
                   elevation: 4,
                 }}>
                   <TouchableOpacity
                     style={{
                       backgroundColor: '#4CAF50',
                       paddingVertical: 16,
                       borderRadius: 12,
                       alignItems: 'center',
                       shadowColor: '#000',
                       shadowOffset: { width: 0, height: 4 },
                       shadowOpacity: 0.2,
                       shadowRadius: 8,
                       elevation: 4,
                     }}
                     onPress={handleRequestRide}
                   >
                     <Text style={{
                       color: '#fff',
                       fontSize: 18,
                       fontWeight: '600',
                       fontFamily: 'Urbanist'
                     }}>
                       Book {getRideDisplayName(selectedRideType)}
                     </Text>
                   </TouchableOpacity>
                 </View>
               )}
             </Animated.View>
           )}

          {/* Ride Types Section */}
          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
              {[
                { label: 'parcel delivery', iconType: 'image', iconUrl: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/rides/parcel_image-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyaWRlcy9wYXJjZWxfaW1hZ2UtcmVtb3ZlYmctcHJldmlldy5wbmciLCJpYXQiOjE3NTEwMjA0OTMsImV4cCI6MTc4MjU1NjQ5M30.KozoVc3YkEfwpUa-O_QTFQDTbtPUcFBrm7RlzdRAr6k' },
                { label: 'auto', iconType: 'image', iconUrl: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/rides/Auto%20Rickshaw.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyaWRlcy9BdXRvIFJpY2tzaGF3LnBuZyIsImlhdCI6MTc1MTAyMDU0NywiZXhwIjoxNzgyNTU2NTQ3fQ.P-teqVMIh5XcS8wrmtbJlLIwkKQi8GLfhGlE942GRz8' },
                { label: 'cab', iconType: 'image', iconUrl: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/rides/cab.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyaWRlcy9jYWIucG5nIiwiaWF0IjoxNzUxMDIwNjAxLCJleHAiOjE3ODI1NTY2MDF9._cS0oq0QELTQqYDj-fqjoJtrOmEl_wU_knPlMqjU2BY' },
                { label: 'bike', iconType: 'image', iconUrl: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/rides/bike.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyaWRlcy9iaWtlLnBuZyIsImlhdCI6MTc1MTAyMDYzMCwiZXhwIjoxNzgyNTU2NjMwfQ.KX3AzAgOCPsh4--cjPJmPm-p54IILnh1vokvfWbfaMI' }
              ].map((item, i) => (
                <View key={i} style={{ alignItems: 'center', flex: 1 }}>
                  <Pressable
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 16,
                      backgroundColor: selectedRideType === item.label ? '#e8f5e8' : '#f5f5f5',
                      borderWidth: selectedRideType === item.label ? 2 : 0,
                      borderColor: selectedRideType === item.label ? '#4CAF50' : 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.06,
                      shadowRadius: 4,
                      elevation: 2,
                    }}
                    onPress={() => handleRideTypeClick(item.label)}
                  >
                    <Image
                      source={{ uri: item.iconUrl }}
                      style={{ width: item.label === 'bike' ? 40 : 54, height: item.label === 'bike' ? 40 : 54, resizeMode: 'contain', borderRadius: 12, alignSelf: 'center' }}
                    />
                  </Pressable>
                  <Text style={{ 
                    marginTop: 8, 
                    fontSize: 18, 
                    color: selectedRideType === item.label ? '#4CAF50' : '#333', 
                    textAlign: 'center', 
                    fontFamily: 'Urbanist',
                    fontWeight: selectedRideType === item.label ? '600' : '400',
                  }}>
                    {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                  </Text>
                </View>
              ))}
            </View>
            
            <Text style={{ fontWeight: 'bold', fontSize: 28, marginTop: 32, marginBottom: 16, color: '#222', fontFamily: 'Urbanist', letterSpacing: 2, textAlign: 'center' }}>
              BOOK PREMIUM RIDES WITH
            </Text>
            
            {/* Premium Rides Cards - stacked vertically, no inner scroll */}
            <View style={{ marginBottom: 20 }}>
              <View style={{ backgroundColor: '#fff', borderRadius: 18, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 8, marginBottom: 20, padding: 20, alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Urbanist', fontWeight: 'bold', fontSize: 20, color: '#1a1a1a', marginBottom: 8, letterSpacing: 1 }}>Nexor Black</Text>
                <Text style={{ fontFamily: 'Urbanist', fontSize: 15, color: '#444', textAlign: 'center' }}>Experience luxury rides with top-rated drivers and premium vehicles for your special occasions.</Text>
              </View>
              <View style={{ backgroundColor: '#fff', borderRadius: 18, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 8, marginBottom: 20, padding: 0, alignItems: 'center', overflow: 'hidden' }}>
                <Image
                  source={{ uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/rides/Daichikotsu.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJyaWRlcy9EYWljaGlrb3RzdS5wbmciLCJpYXQiOjE3NDgwOTcxMTUsImV4cCI6MTc3OTYzMzExNX0.G2zza6p3Lvfxgnd5gHzico8Wmv_ECJkQRM8BIBUbvxY' }}
                  style={{ width: '100%', height: 140, resizeMode: 'cover' }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Pickup Location Modal */}
      <LocationAutocomplete
        visible={showPickupModal}
        onClose={() => setShowPickupModal(false)}
        onLocationSelect={setPickup}
        title="Select Pickup Location"
        placeholder="Search for pickup location..."
        currentLocation={pickupLocation}
      />

      {/* Drop Location Modal */}
      <LocationAutocomplete
        visible={showDropModal}
        onClose={() => setShowDropModal(false)}
        onLocationSelect={setDrop}
        title="Select Drop Location"
        placeholder="Search for drop location..."
        currentLocation={pickupLocation}
      />
    </>
  );
} 