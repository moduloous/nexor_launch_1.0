import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  Modal,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { mockFlights, popularRoutes, Flight } from './data/flights';

export default function FlightsScreen() {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [passengers, setPassengers] = useState('1');
  const [travelClass, setTravelClass] = useState('Economy');
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(mockFlights);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  // Update filtered flights whenever search criteria changes
  useEffect(() => {
    handleSearch();
  }, [fromCity, toCity]);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSearch = () => {
    if (!fromCity && !toCity) {
      setFilteredFlights(mockFlights);
      return;
    }

    const filtered = mockFlights.filter(flight => {
      const matchesFrom = !fromCity || 
        flight.departureCity.toLowerCase().includes(fromCity.toLowerCase());
      const matchesTo = !toCity || 
        flight.arrivalCity.toLowerCase().includes(toCity.toLowerCase());
      return matchesFrom && matchesTo;
    });

    setFilteredFlights(filtered);
  };

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleBookFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    if (!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!selectedFlight) {
      Alert.alert('Error', 'No flight selected');
      return;
    }

    // Here you would typically make an API call to process the booking
    Alert.alert(
      'Booking Confirmed',
      `Your flight ${selectedFlight.flightNumber} has been booked successfully!`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowBookingModal(false);
            setSelectedFlight(null);
            setBookingDetails({
              name: '',
              email: '',
              phone: '',
              specialRequests: '',
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Flights</Text>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Search Form */}
        <View style={styles.searchForm}>
          <View style={styles.formRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>From</Text>
              <TextInput
                style={styles.input}
                placeholder="Departure City"
                value={fromCity}
                onChangeText={setFromCity}
              />
            </View>
            <TouchableOpacity style={styles.swapButton} onPress={handleSwapCities}>
              <Ionicons name="swap-horizontal" size={24} color="#007AFF" />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>To</Text>
              <TextInput
                style={styles.input}
                placeholder="Arrival City"
                value={toCity}
                onChangeText={setToCity}
              />
            </View>
          </View>

          <View style={styles.formRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>{date.toLocaleDateString()}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Passengers</Text>
              <TextInput
                style={styles.input}
                value={passengers}
                onChangeText={setPassengers}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Class</Text>
              <TextInput
                style={styles.input}
                value={travelClass}
                onChangeText={setTravelClass}
              />
            </View>
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}

        {/* Popular Routes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Routes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {popularRoutes.map((route, index) => (
              <TouchableOpacity
                key={index}
                style={styles.routeCard}
                onPress={() => {
                  setFromCity(route.from);
                  setToCity(route.to);
                }}
              >
                <Image source={{ uri: route.image }} style={styles.routeImage} />
                <View style={styles.routeInfo}>
                  <Text style={styles.routeText}>{route.from} → {route.to}</Text>
                  <Text style={styles.routePrice}>{route.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Available Flights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Flights</Text>
          {filteredFlights.length === 0 ? (
            <Text style={styles.noFlightsText}>No flights found</Text>
          ) : (
            filteredFlights.map((flight) => (
              <View key={flight.id} style={styles.flightCard}>
                <View style={styles.flightHeader}>
                  <Image
                    source={{ uri: flight.airlineLogo }}
                    style={styles.airlineLogo}
                  />
                  <View style={styles.flightInfo}>
                    <Text style={styles.airlineName}>{flight.airline}</Text>
                    <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>{flight.price}</Text>
                    <Text style={styles.perPerson}>per person</Text>
                  </View>
                </View>

                <View style={styles.flightDetails}>
                  <View style={styles.timeContainer}>
                    <Text style={styles.time}>{flight.departure}</Text>
                    <Text style={styles.city}>{flight.departureCity}</Text>
                  </View>
                  <View style={styles.durationContainer}>
                    <View style={styles.durationLine} />
                    <Text style={styles.duration}>{flight.duration}</Text>
                    <View style={styles.durationLine} />
                  </View>
                  <View style={styles.timeContainer}>
                    <Text style={styles.time}>{flight.arrival}</Text>
                    <Text style={styles.city}>{flight.arrivalCity}</Text>
                  </View>
                </View>

                <View style={styles.flightFooter}>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.rating}>{flight.rating}</Text>
                    <Text style={styles.reviews}>({flight.reviews} reviews)</Text>
                  </View>
                  <View style={styles.aircraftContainer}>
                    <Ionicons name="airplane" size={16} color="#666" />
                    <Text style={styles.aircraft}>{flight.aircraft}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.bookButton}
                  onPress={() => handleBookFlight(flight)}
                >
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Booking Modal */}
      <Modal
        visible={showBookingModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowBookingModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { height: '80%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Book Flight</Text>
              <TouchableOpacity 
                onPress={() => setShowBookingModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
            >
              <ScrollView 
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 20 }}
                showsVerticalScrollIndicator={true}
                bounces={false}
              >
                {selectedFlight && (
                  <View style={styles.flightSummary}>
                    <Text style={styles.flightSummaryTitle}>Flight Details</Text>
                    <Text style={styles.flightSummaryText}>
                      {selectedFlight.airline} - {selectedFlight.flightNumber}
                    </Text>
                    <Text style={styles.flightSummaryText}>
                      {selectedFlight.departureCity} → {selectedFlight.arrivalCity}
                    </Text>
                    <Text style={styles.flightSummaryText}>
                      {selectedFlight.departure} - {selectedFlight.arrival}
                    </Text>
                    <Text style={styles.flightSummaryText}>
                      {selectedFlight.duration} • {selectedFlight.aircraft}
                    </Text>
                    <Text style={styles.flightSummaryPrice}>{selectedFlight.price}</Text>
                  </View>
                )}

                <View style={styles.bookingForm}>
                  <Text style={styles.formSectionTitle}>Passenger Details</Text>
                  <Text style={styles.formLabel}>Full Name *</Text>
                  <TextInput
                    style={styles.formInput}
                    value={bookingDetails.name}
                    onChangeText={(text) => setBookingDetails({ ...bookingDetails, name: text })}
                    placeholder="Enter your full name"
                  />

                  <Text style={styles.formLabel}>Email *</Text>
                  <TextInput
                    style={styles.formInput}
                    value={bookingDetails.email}
                    onChangeText={(text) => setBookingDetails({ ...bookingDetails, email: text })}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />

                  <Text style={styles.formLabel}>Phone Number *</Text>
                  <TextInput
                    style={styles.formInput}
                    value={bookingDetails.phone}
                    onChangeText={(text) => setBookingDetails({ ...bookingDetails, phone: text })}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                  />

                  <Text style={styles.formLabel}>Special Requests</Text>
                  <TextInput
                    style={[styles.formInput, styles.textArea]}
                    value={bookingDetails.specialRequests}
                    onChangeText={(text) => setBookingDetails({ ...bookingDetails, specialRequests: text })}
                    placeholder="Any special requests?"
                    multiline
                    numberOfLines={4}
                  />

                  <TouchableOpacity 
                    style={styles.confirmButton}
                    onPress={handleConfirmBooking}
                  >
                    <Text style={styles.confirmButtonText}>Confirm Booking</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  searchForm: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#fff',
    height: 44,
  },
  swapButton: {
    padding: 8,
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  section: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  routeCard: {
    width: 200,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  routeImage: {
    width: '100%',
    height: 120,
  },
  routeInfo: {
    padding: 12,
  },
  routeText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  routePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  flightCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  airlineLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
    resizeMode: 'contain',
  },
  flightInfo: {
    flex: 1,
  },
  airlineName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  flightNumber: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  perPerson: {
    fontSize: 12,
    color: '#666',
  },
  flightDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  timeContainer: {
    flex: 1,
  },
  time: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  city: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    paddingHorizontal: 8,
  },
  durationLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  duration: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 8,
  },
  flightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
    color: '#333',
  },
  reviews: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  aircraftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aircraft: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  noFlightsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  bookButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 8,
  },
  flightSummary: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  flightSummaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  flightSummaryText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  flightSummaryPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginTop: 8,
  },
  bookingForm: {
    gap: 12,
  },
  formSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 