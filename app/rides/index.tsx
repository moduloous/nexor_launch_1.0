import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Dimensions, Platform, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, MapViewProps } from 'react-native-maps';
import { MapPin, Search, Navigation, Clock, Car, ChevronRight, X } from 'lucide-react-native';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';

// Add crypto polyfill
import 'react-native-get-random-values';

const { width, height } = Dimensions.get('window');

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
});

export default function RidesScreen() {
  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        provider={PROVIDER_GOOGLE}
      >
        <Marker coordinate={region} />
      </MapView>
      <Pressable 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <X size={24} color="#333" />
      </Pressable>
      <View style={styles.searchContainer}>
        <View style={styles.locationInputs}>
          <View style={styles.inputContainer}>
            <MapPin size={20} color="#333" />
            <TextInput
              style={styles.input}
              placeholder="Where from?"
              placeholderTextColor="#666"
            />
          </View>
          <View style={styles.inputDivider} />
          <View style={styles.inputContainer}>
            <Navigation size={20} color="#333" />
            <TextInput
              style={styles.input}
              placeholder="Where to?"
              placeholderTextColor="#666"
            />
          </View>
        </View>
      </View>
    </View>
  );
} 