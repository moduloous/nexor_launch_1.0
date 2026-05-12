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
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

const trainOptions = [
  {
    id: 1,
    trainName: 'Rajdhani Express',
    trainNumber: '12345',
    departure: '06:30 AM',
    arrival: '02:30 PM',
    duration: '8h 0m',
    price: '₹1,200',
    class: 'AC 2 Tier',
    rating: 4.5,
    reviews: 128,
    availability: 'Available',
  },
  {
    id: 2,
    trainName: 'Shatabdi Express',
    trainNumber: '12027',
    departure: '08:15 AM',
    arrival: '03:15 PM',
    duration: '7h 0m',
    price: '₹1,500',
    class: 'AC Chair Car',
    rating: 4.2,
    reviews: 95,
    availability: 'Limited',
  },
  {
    id: 3,
    trainName: 'Duronto Express',
    trainNumber: '12273',
    departure: '10:00 AM',
    arrival: '05:00 PM',
    duration: '7h 0m',
    price: '₹1,800',
    class: 'AC 3 Tier',
    rating: 4.7,
    reviews: 156,
    availability: 'Available',
  },
];

export default function TrainsScreen() {
  const [fromCity, setFromCity] = useState('Bangalore');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [passengers, setPassengers] = useState('1');
  const [classType, setClassType] = useState('Sleeper');

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleSearch = () => {
    // Implement train search
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
                placeholder="Departure Station"
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
                placeholder="Arrival Station"
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
              <Text style={styles.label}>Class</Text>
              <TextInput
                style={styles.input}
                value={classType}
                onChangeText={setClassType}
                placeholder="Travel class"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search Trains</Text>
          </TouchableOpacity>
        </View>

        {/* Train Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Trains</Text>
          {trainOptions.map((train) => (
            <TouchableOpacity key={train.id} style={styles.trainCard}>
              <View style={styles.trainHeader}>
                <View style={styles.trainInfo}>
                  <Text style={styles.trainName}>{train.trainName}</Text>
                  <Text style={styles.trainNumber}>{train.trainNumber}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.rating}>{train.rating}</Text>
                  <Text style={styles.reviews}>({train.reviews})</Text>
                </View>
              </View>

              <View style={styles.trainDetails}>
                <View style={styles.timeContainer}>
                  <Text style={styles.time}>{train.departure}</Text>
                  <Text style={styles.duration}>{train.duration}</Text>
                  <Text style={styles.time}>{train.arrival}</Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{train.price}</Text>
                  <Text style={styles.class}>{train.class}</Text>
                </View>
              </View>

              <View style={styles.trainFooter}>
                <View style={[
                  styles.availabilityBadge,
                  { backgroundColor: train.availability === 'Available' ? '#34C759' : '#FF9500' }
                ]}>
                  <Text style={styles.availabilityText}>{train.availability}</Text>
                </View>
                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
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
  trainCard: {
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
  trainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trainInfo: {
    flex: 1,
  },
  trainName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  trainNumber: {
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
  trainDetails: {
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
  class: {
    fontSize: 12,
    color: '#666',
  },
  trainFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  availabilityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 