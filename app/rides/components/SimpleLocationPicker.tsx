import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import { Location } from '../services/rideSelectionService';

interface SimpleLocationPickerProps {
  isVisible: boolean;
  onClose: () => void;
  onLocationSelect: (location: Location) => void;
  title: string;
}

const SimpleLocationPicker: React.FC<SimpleLocationPickerProps> = ({
  isVisible,
  onClose,
  onLocationSelect,
  title,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleLocationSelect = (data: any, details: any = null) => {
    if (details && details.geometry && details.geometry.location) {
      const location: Location = {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        address: data.description || data.formatted_address || data.name,
      };
      
      onLocationSelect(location);
      onClose();
      setSearchQuery('');
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            placeholder="Search for a location..."
            onPress={handleLocationSelect}
            query={{
              key: 'YOUR_GOOGLE_PLACES_API_KEY', // Replace with your actual API key
              language: 'en',
              types: 'geocode',
            }}
            styles={{
              container: styles.autocompleteContainer,
              textInput: styles.searchInput,
              listView: styles.listView,
            }}
            enablePoweredByContainer={false}
            fetchDetails={true}
            returnKeyType="search"
            keyboardType="default"
            listViewDisplayed="auto"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={300}
          />
        </View>

        {/* Quick Location Suggestions */}
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Quick Locations</Text>
          {[
            { name: 'Current Location', icon: 'location' },
            { name: 'Home', icon: 'home' },
            { name: 'Work', icon: 'briefcase' },
            { name: 'Airport', icon: 'airplane' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionItem}
              onPress={() => {
                // For demo purposes, use mock coordinates
                const mockLocation: Location = {
                  latitude: 12.9716 + (Math.random() - 0.5) * 0.01,
                  longitude: 77.5946 + (Math.random() - 0.5) * 0.01,
                  address: item.name,
                };
                onLocationSelect(mockLocation);
                onClose();
              }}
            >
              <Ionicons name={item.icon as any} size={20} color="#666" />
              <Text style={styles.suggestionText}>{item.name}</Text>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
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
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  searchContainer: {
    padding: 16,
  },
  autocompleteContainer: {
    flex: 0,
  },
  searchInput: {
    height: 48,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#333',
  },
  listView: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  suggestionsContainer: {
    padding: 16,
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
});

export default SimpleLocationPicker;
