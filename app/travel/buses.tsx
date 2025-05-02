import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const busOptions = [
  {
    id: 1,
    operator: 'KSRTC',
    busType: 'AC Sleeper',
    departure: '10:00 PM',
    arrival: '06:00 AM',
    duration: '8h 0m',
    price: '₹800',
    rating: 4.2,
    reviews: 98,
    amenities: ['WiFi', 'USB Port', 'Blanket'],
    seats: '2+1',
  },
  {
    id: 2,
    operator: 'VRL Travels',
    busType: 'AC Semi-Sleeper',
    departure: '11:30 PM',
    arrival: '07:30 AM',
    duration: '8h 0m',
    price: '₹900',
    rating: 4.5,
    reviews: 156,
    amenities: ['WiFi', 'USB Port', 'Blanket', 'Water Bottle'],
    seats: '2+2',
  },
  {
    id: 3,
    operator: 'SRS Travels',
    busType: 'AC Sleeper',
    departure: '09:30 PM',
    arrival: '05:30 AM',
    duration: '8h 0m',
    price: '₹1,000',
    rating: 4.7,
    reviews: 89,
    amenities: ['WiFi', 'USB Port', 'Blanket', 'Water Bottle', 'Snacks'],
    seats: '2+1',
  },
];

export default function BusesScreen() {
  const [fromCity, setFromCity] = useState('Bangalore');
  const [toCity, setToCity] = useState('Chennai');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [passengers, setPassengers] = useState('1');
  const [busType, setBusType] = useState('AC Sleeper');

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleSearch = () => {
    // Implement bus search
  };

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Search Form */}
        <View style={styles.searchForm}>
          <View style={styles.formRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>From</Text>
              <TextInput
                style={styles.input}
                value={fromCity}
                onChangeText={setFromCity}
                placeholder="Departure City"
              />
            </View>
            <TouchableOpacity style={styles.swapButton} onPress={handleSwapCities}>
              <Ionicons name="swap-horizontal" size={24} color="#007AFF" />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>To</Text>
              <TextInput
                style={styles.input}
                value={toCity}
                onChangeText={setToCity}
                placeholder="Arrival City"
              />
            </View>
          </View>

          <View style={styles.formRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>
                  {date.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Passengers</Text>
              <TextInput
                style={styles.input}
                value={passengers}
                onChangeText={setPassengers}
                keyboardType="numeric"
                placeholder="Number of passengers"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Bus Type</Text>
              <TextInput
                style={styles.input}
                value={busType}
                onChangeText={setBusType}
                placeholder="Bus type"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search Buses</Text>
          </TouchableOpacity>
        </View>

        {/* Bus Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Buses</Text>
          {busOptions.map((bus) => (
            <TouchableOpacity key={bus.id} style={styles.busCard}>
              <View style={styles.busHeader}>
                <View style={styles.busInfo}>
                  <Text style={styles.operatorName}>{bus.operator}</Text>
                  <Text style={styles.busType}>{bus.busType}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.rating}>{bus.rating}</Text>
                  <Text style={styles.reviews}>({bus.reviews})</Text>
                </View>
              </View>

              <View style={styles.busDetails}>
                <View style={styles.timeContainer}>
                  <Text style={styles.time}>{bus.departure}</Text>
                  <Text style={styles.duration}>{bus.duration}</Text>
                  <Text style={styles.time}>{bus.arrival}</Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{bus.price}</Text>
                  <Text style={styles.seats}>{bus.seats}</Text>
                </View>
              </View>

              <View style={styles.amenitiesContainer}>
                {bus.amenities.map((amenity, index) => (
                  <View key={index} style={styles.amenityBadge}>
                    <Ionicons name="checkmark-circle" size={12} color="#34C759" />
                    <Text style={styles.amenityText}>{amenity}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    paddingBottom: 16,
  },
  searchForm: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    padding: 8,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  swapButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 8,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  busCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  busHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  busInfo: {
    flex: 1,
  },
  operatorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  busType: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  busDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  duration: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  seats: {
    fontSize: 12,
    color: '#666',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  amenityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 