import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RideLocation } from '../services/rideSelectionService';
import { searchPlaces, getPlaceDetails } from '../utils/googlePlacesTest';

interface LocationAutocompleteProps {
  visible: boolean;
  onClose: () => void;
  onLocationSelect: (location: RideLocation) => void;
  title: string;
  placeholder: string;
  currentLocation?: RideLocation | null;
}

interface SearchResult {
  id: string;
  displayName: { text: string };
  formattedAddress: string;
  location: { latitude: number; longitude: number };
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    height: 48,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    fontFamily: 'Urbanist',
  },
  searchResults: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchResultText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  searchResultAddress: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    marginTop: 2,
  },
  suggestionsContainer: {
    padding: 16,
    flex: 1,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  currentLocationContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  currentLocationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  currentLocationText: {
    fontSize: 14,
    color: '#666',
  },
  useCurrentLocationButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  useCurrentLocationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noResultsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noResultsText: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'Urbanist',
  },
});

export default function LocationAutocomplete({
  visible,
  onClose,
  onLocationSelect,
  title,
  placeholder,
  currentLocation,
}: LocationAutocompleteProps) {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchText.length >= 2) {
        performSearch(searchText);
      } else if (searchText.length === 0) {
        setSearchResults([]);
        setHasSearched(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const performSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setHasSearched(true);
      
      const results = await searchPlaces(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
      Alert.alert(
        'Search Error',
        'Unable to search for locations. Please check your internet connection and try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = async (result: SearchResult) => {
    try {
      console.log('Location selected:', result);
      
      // If location coordinates are not available (legacy API), get them
      if (result.location.latitude === 0 && result.location.longitude === 0) {
        console.log('Getting place details for coordinates...');
        const details = await getPlaceDetails(result.id);
        if (details && details.location) {
          result.location = details.location;
        }
      }
      
      const location: RideLocation = {
        latitude: result.location.latitude,
        longitude: result.location.longitude,
        address: result.displayName.text || result.formattedAddress,
      };
      
      console.log('Setting location:', location);
      onLocationSelect(location);
    } catch (error) {
      console.error('Error setting location:', error);
      Alert.alert(
        'Location Error',
        'Could not set this location. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleQuickLocationSelect = (name: string, coords: { lat: number; lng: number }) => {
    const location: RideLocation = {
      latitude: coords.lat,
      longitude: coords.lng,
      address: name,
    };
    console.log('Setting quick location:', location);
    onLocationSelect(location);
  };

  const handleUseCurrentLocation = () => {
    if (currentLocation) {
      onLocationSelect(currentLocation);
    } else {
      Alert.alert(
        'Current Location Unavailable',
        'Please enable location services and try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const quickLocations = [
    { name: 'Koramangala', coords: { lat: 12.9716, lng: 77.5946 } },
    { name: 'HSR Layout', coords: { lat: 12.9789, lng: 77.5917 } },
    { name: 'Indiranagar', coords: { lat: 12.9654, lng: 77.5854 } },
    { name: 'Whitefield', coords: { lat: 12.9699, lng: 77.7499 } },
    { name: 'Electronic City', coords: { lat: 12.8458, lng: 77.6659 } },
    { name: 'Marathahalli', coords: { lat: 12.9592, lng: 77.6974 } },
  ];

  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity
      style={styles.searchResultItem}
      onPress={() => handleLocationSelect(item)}
    >
      <Ionicons name="location" size={20} color="#666" />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.searchResultText}>{item.displayName.text}</Text>
        <Text style={styles.searchResultAddress}>{item.formattedAddress}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modal}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={placeholder}
            value={searchText}
            onChangeText={setSearchText}
            autoFocus={true}
            returnKeyType="search"
          />
        </View>

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
          </View>
        )}

        {!isLoading && hasSearched && searchResults.length === 0 && searchText.length >= 2 && (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No locations found</Text>
          </View>
        )}

        {!isLoading && searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            renderItem={renderSearchResult}
            keyExtractor={(item) => item.id}
            style={styles.searchResults}
            showsVerticalScrollIndicator={false}
          />
        )}

        {currentLocation && (
          <View style={styles.currentLocationContainer}>
            <Text style={styles.currentLocationTitle}>Current Location</Text>
            <Text style={styles.currentLocationText}>{currentLocation.address}</Text>
            <TouchableOpacity
              style={styles.useCurrentLocationButton}
              onPress={handleUseCurrentLocation}
            >
              <Text style={styles.useCurrentLocationText}>Use Current Location</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Popular Locations</Text>
          {quickLocations.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionItem}
              onPress={() => handleQuickLocationSelect(item.name, item.coords)}
            >
              <Ionicons name="location" size={20} color="#666" />
              <Text style={styles.suggestionText}>{item.name}</Text>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}
