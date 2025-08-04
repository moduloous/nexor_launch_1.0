import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Dimensions, Platform, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const nav = useRouter();

  let MapView, Marker, PROVIDER_GOOGLE;
  if (Platform.OS !== 'web') {
    const maps = require('react-native-maps');
    MapView = maps.default;
    Marker = maps.Marker;
    PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE;
  }

  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#fff' }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 16,
          paddingHorizontal: 16,
          paddingBottom: 8,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#eee'
        }}>
          <Pressable onPress={() => nav.back()}>
            <Ionicons name="arrow-back-outline" size={24} color="#000" />
          </Pressable>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 8, fontFamily: 'Urbanist' }}>Rides</Text>
        </View>
        <View style={{ paddingHorizontal: 16, paddingTop: 16, backgroundColor: '#fff' }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            borderRadius: 20,
            paddingHorizontal: 16,
            height: 44,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 6,
            elevation: 2,
          }}>
            <Ionicons name="location-outline" size={20} color="#888" style={{ marginRight: 8 }} />
            <TextInput
              style={{ flex: 1, fontSize: 16, color: '#333', backgroundColor: 'transparent', fontFamily: 'Urbanist' }}
              placeholder="drop location"
              placeholderTextColor="#666"
            />
          </View>
        </View>
      </SafeAreaView>
      <ScrollView style={{ paddingHorizontal: 16, paddingTop: 16 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 56 }}>
        <View style={{
          height: height * 0.4, // About half the screen height
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
            <MapView
              style={{ flex: 1 }}
              initialRegion={region}
              provider={PROVIDER_GOOGLE}
            >
              <Marker coordinate={region} />
            </MapView>
          )}
        </View>
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
                  backgroundColor: '#f5f5f5',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.06,
                  shadowRadius: 4,
                  elevation: 2,
                }}
                onPress={() => {}}
              >
                <Image
                  source={{ uri: item.iconUrl }}
                  style={{ width: item.label === 'bike' ? 40 : 54, height: item.label === 'bike' ? 40 : 54, resizeMode: 'contain', borderRadius: 12, alignSelf: 'center' }}
                />
              </Pressable>
              <Text style={{ marginTop: 8, fontSize: 18, color: '#333', textAlign: 'center', fontFamily: 'Urbanist' }}>{item.label.charAt(0).toUpperCase() + item.label.slice(1)}</Text>
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
      </ScrollView>
    </>
  );
} 