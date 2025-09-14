import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { Location as LocationType } from '../api/rideService';

const { width, height } = Dimensions.get('window');

interface LocationPickerProps {
  onPickupLocationSelect: (location: LocationType) => void;
  onDropLocationSelect: (location: LocationType) => void;
  onClose: () => void;
  pickupLocation?: LocationType | null;
  dropLocation?: LocationType | null;
}

export default function LocationPicker({
  onPickupLocationSelect,
  onDropLocationSelect,
  onClose,
  pickupLocation,
  dropLocation,
}: LocationPickerProps) {
  const [currentLocation, setCurrentLocation] = useState<LocationType | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const pickupRef = useRef<GooglePlacesAutocompleteRef>(null);
  const dropRef = useRef<GooglePlacesAutocompleteRef>(null);

  // Get current location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      setIsLoadingLocation(true);
      
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required to get your current location');
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const currentLoc: LocationType = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: 'Current Location',
      };

      setCurrentLocation(currentLoc);
      
      // Auto-fill pickup location if not set
      if (!pickupLocation) {
        onPickupLocationSelect(currentLoc);
      }
      
    } catch (error) {
      Alert.alert('Error', 'Failed to get current location');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleLocationSelect = (
    data: any,
    details: any,
    type: 'pickup' | 'drop'
  ) => {
    const location: LocationType = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      address: data.description,
    };

    if (type === 'pickup') {
      onPickupLocationSelect(location);
    } else {
      onDropLocationSelect(location);
    }
  };

  const useCurrentLocation = (type: 'pickup' | 'drop') => {
    if (!currentLocation) {
      Alert.alert('Error', 'Current location not available');
      return;
    }

    if (type === 'pickup') {
      onPickupLocationSelect(currentLocation);
    } else {
      onDropLocationSelect(currentLocation);
    }
  };

  const swapLocations = () => {
    if (pickupLocation && dropLocation) {
      onPickupLocationSelect(dropLocation);
      onDropLocationSelect(pickupLocation);
    }
  };

  const isFormValid = pickupLocation && dropLocation;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Set Pickup & Drop</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Pickup Location */}
        <View style={styles.locationSection}>
          <View style={styles.locationHeader}>
            <View style={styles.locationIcon}>
              <Ionicons name="location" size={20} color="#4CAF50" />
            </View>
            <Text style={styles.locationLabel}>Pickup Location</Text>
            <TouchableOpacity
              onPress={() => useCurrentLocation('pickup')}
              style={styles.currentLocationButton}
            >
              <Ionicons name="navigate" size={16} color="#2196F3" />
              <Text style={styles.currentLocationText}>Current</Text>
            </TouchableOpacity>
          </View>

          <GooglePlacesAutocomplete
            ref={pickupRef}
            placeholder={pickupLocation?.address || "Enter pickup location"}
            onPress={(data, details) => handleLocationSelect(data, details, 'pickup')}
            query={{
              key: 'YOUR_GOOGLE_PLACES_API_KEY', // Replace with your API key
              language: 'en',
              components: 'country:in', // Restrict to India
            }}
            styles={{
              container: styles.autocompleteContainer,
              textInput: styles.autocompleteInput,
              listView: styles.autocompleteListView,
            }}
            enablePoweredByContainer={false}
            fetchDetails={true}
            returnKeyType="next"
            onSubmitEditing={() => dropRef.current?.focus()}
          />

          {pickupLocation && (
            <View style={styles.selectedLocation}>
              <Text style={styles.selectedLocationText} numberOfLines={2}>
                {pickupLocation.address}
              </Text>
              <TouchableOpacity
                onPress={() => onPickupLocationSelect(null as any)}
                style={styles.clearButton}
              >
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Swap Button */}
        {pickupLocation && dropLocation && (
          <TouchableOpacity onPress={swapLocations} style={styles.swapButton}>
            <Ionicons name="swap-vertical" size={20} color="#666" />
          </TouchableOpacity>
        )}

        {/* Drop Location */}
        <View style={styles.locationSection}>
          <View style={styles.locationHeader}>
            <View style={styles.locationIcon}>
              <Ionicons name="location-outline" size={20} color="#FF6B6B" />
            </View>
            <Text style={styles.locationLabel}>Drop Location</Text>
            <TouchableOpacity
              onPress={() => useCurrentLocation('drop')}
              style={styles.currentLocationButton}
            >
              <Ionicons name="navigate" size={16} color="#2196F3" />
              <Text style={styles.currentLocationText}>Current</Text>
            </TouchableOpacity>
          </View>

          <GooglePlacesAutocomplete
            ref={dropRef}
            placeholder={dropLocation?.address || "Enter drop location"}
            onPress={(data, details) => handleLocationSelect(data, details, 'drop')}
            query={{
              key: 'YOUR_GOOGLE_PLACES_API_KEY', // Replace with your API key
              language: 'en',
              components: 'country:in', // Restrict to India
            }}
            styles={{
              container: styles.autocompleteContainer,
              textInput: styles.autocompleteInput,
              listView: styles.autocompleteListView,
            }}
            enablePoweredByContainer={false}
            fetchDetails={true}
            returnKeyType="done"
          />

          {dropLocation && (
            <View style={styles.selectedLocation}>
              <Text style={styles.selectedLocationText} numberOfLines={2}>
                {dropLocation.address}
              </Text>
              <TouchableOpacity
                onPress={() => onDropLocationSelect(null as any)}
                style={styles.clearButton}
              >
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Quick Locations */}
        <View style={styles.quickLocations}>
          <Text style={styles.quickLocationsTitle}>Quick Locations</Text>
          <View style={styles.quickLocationsGrid}>
            {[
              { name: 'Airport', icon: 'airplane' },
              { name: 'Railway Station', icon: 'train' },
              { name: 'Bus Stand', icon: 'bus' },
              { name: 'Mall', icon: 'business' },
              { name: 'Hospital', icon: 'medical' },
              { name: 'University', icon: 'school' },
            ].map((location, index) => (
              <TouchableOpacity key={index} style={styles.quickLocationItem}>
                <Ionicons name={location.icon as any} size={20} color="#666" />
                <Text style={styles.quickLocationText}>{location.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmButton, !isFormValid && styles.confirmButtonDisabled]}
          disabled={!isFormValid}
          onPress={onClose}
        >
          <Text style={styles.confirmButtonText}>Confirm Locations</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  locationSection: {
    marginBottom: 24,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#e3f2fd',
    borderRadius: 16,
  },
  currentLocationText: {
    fontSize: 12,
    color: '#2196F3',
    marginLeft: 4,
  },
  autocompleteContainer: {
    flex: 0,
    marginBottom: 8,
  },
  autocompleteInput: {
    height: 48,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  autocompleteListView: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectedLocationText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  swapButton: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  quickLocations: {
    marginBottom: 24,
  },
  quickLocationsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  quickLocationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickLocationItem: {
    width: (width - 64) / 3,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  quickLocationText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#ccc',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
