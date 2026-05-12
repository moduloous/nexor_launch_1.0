import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

// Import data and types
import { movies, cinemas, showtimes, Movie, Cinema, Showtime } from '../data/movies';
import { useTheme } from '../../contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function MovieBookingScreen() {
  const router = useRouter();
  const { movieId, cinemaId, showtimeId } = useLocalSearchParams();
  const { isDark, theme } = useTheme();
  
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedSnacks, setSelectedSnacks] = useState<{[key: string]: number}>({});

  // Get movie, cinema, and showtime data
  const movie = useMemo(() => {
    return movies.find(m => m.id === movieId) || movies[0];
  }, [movieId]);

  const cinema = useMemo(() => {
    return cinemas.find(c => c.id === cinemaId) || cinemas[0];
  }, [cinemaId]);

  const showtime = useMemo(() => {
    return showtimes.find(s => s.id === showtimeId) || showtimes[0];
  }, [showtimeId]);

  // Calculate total price
  const totalPrice = useMemo(() => {
    let total = selectedSeats.length * showtime.price;
    
    // Add snack prices (simplified pricing)
    Object.values(selectedSnacks).forEach(quantity => {
      total += quantity * 150; // ₹150 per snack item
    });
    
    return total;
  }, [selectedSeats, selectedSnacks, showtime.price]);

  // Handle seat selection
  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  // Handle snack selection
  const handleSnackSelect = (snackId: string, quantity: number) => {
    setSelectedSnacks(prev => ({
      ...prev,
      [snackId]: quantity,
    }));
  };

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      Alert.alert('No Seats Selected', 'Please select at least one seat');
      return;
    }

    Alert.alert(
      'Booking Confirmed!',
      `Your booking for ${movie.title} at ${cinema.name} has been confirmed.`,
      [
        {
          text: 'OK',
          onPress: () => router.push('/events'),
        },
      ]
    );
  };

  // Generate seat layout (simplified)
  const generateSeatLayout = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 10;
    const seats = [];

    for (let i = 0; i < rows.length; i++) {
      for (let j = 1; j <= seatsPerRow; j++) {
        const seatId = `${rows[i]}${j}`;
        const isOccupied = Math.random() < 0.3; // 30% chance of being occupied
        seats.push({
          id: seatId,
          row: rows[i],
          number: j,
          isOccupied,
          isSelected: selectedSeats.includes(seatId),
        });
      }
    }

    return seats;
  };

  const seatLayout = generateSeatLayout();

  // Render seat
  const renderSeat = (seat: any) => (
    <TouchableOpacity
      key={seat.id}
      style={[
        styles.seat,
        {
          backgroundColor: seat.isOccupied
            ? '#ccc'
            : seat.isSelected
            ? '#FF6B6B'
            : '#f0f0f0',
        },
      ]}
      onPress={() => !seat.isOccupied && handleSeatSelect(seat.id)}
      disabled={seat.isOccupied}
    >
      <Text
        style={[
          styles.seatText,
          {
            color: seat.isOccupied
              ? '#999'
              : seat.isSelected
              ? '#fff'
              : '#333',
          },
        ]}
      >
        {seat.number}
      </Text>
    </TouchableOpacity>
  );

  // Render snack item
  const renderSnackItem = (snack: any) => (
    <View key={snack.id} style={styles.snackItem}>
      <Image source={{ uri: snack.image }} style={styles.snackImage} />
      <View style={styles.snackInfo}>
        <Text style={[styles.snackName, { color: isDark ? '#fff' : '#333' }]}>
          {snack.name}
        </Text>
        <Text style={[styles.snackPrice, { color: isDark ? '#ccc' : '#666' }]}>
          ₹{snack.price}
        </Text>
      </View>
      <View style={styles.snackControls}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleSnackSelect(snack.id, Math.max(0, (selectedSnacks[snack.id] || 0) - 1))}
        >
          <Ionicons name="remove" size={16} color="#666" />
        </TouchableOpacity>
        <Text style={[styles.quantityText, { color: isDark ? '#fff' : '#333' }]}>
          {selectedSnacks[snack.id] || 0}
        </Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleSnackSelect(snack.id, (selectedSnacks[snack.id] || 0) + 1)}
        >
          <Ionicons name="add" size={16} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={isDark ? '#fff' : '#333'} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#333' }]}>
            Book Tickets
          </Text>
          <View style={styles.placeholder} />
        </View>

        {/* Movie Info */}
        <View style={styles.movieInfo}>
          <Image source={{ uri: movie.poster }} style={styles.moviePoster} />
          <View style={styles.movieDetails}>
            <Text style={[styles.movieTitle, { color: isDark ? '#fff' : '#333' }]}>
              {movie.title}
            </Text>
            <Text style={[styles.movieGenre, { color: isDark ? '#ccc' : '#666' }]}>
              {movie.genres.join(', ')} • {movie.duration}m
            </Text>
            <Text style={[styles.cinemaName, { color: isDark ? '#ccc' : '#666' }]}>
              {cinema.name} • {cinema.location}
            </Text>
            <Text style={[styles.showtimeInfo, { color: isDark ? '#ccc' : '#666' }]}>
              {showtime.time} • {showtime.format} • {new Date(showtime.date).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Seat Selection */}
        <View style={styles.seatSection}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#333' }]}>
            Select Seats
          </Text>
          
          <View style={styles.screenContainer}>
            <Text style={[styles.screenText, { color: isDark ? '#ccc' : '#666' }]}>
              SCREEN
            </Text>
            <View style={styles.screen} />
          </View>

          <View style={styles.seatLayout}>
            {seatLayout.map(renderSeat)}
          </View>

          <View style={styles.seatLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendSeat, { backgroundColor: '#f0f0f0' }]} />
              <Text style={[styles.legendText, { color: isDark ? '#ccc' : '#666' }]}>
                Available
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendSeat, { backgroundColor: '#FF6B6B' }]} />
              <Text style={[styles.legendText, { color: isDark ? '#ccc' : '#666' }]}>
                Selected
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendSeat, { backgroundColor: '#ccc' }]} />
              <Text style={[styles.legendText, { color: isDark ? '#ccc' : '#666' }]}>
                Occupied
              </Text>
            </View>
          </View>
        </View>

        {/* Snacks Section */}
        <View style={styles.snacksSection}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#333' }]}>
            Add Snacks (Optional)
          </Text>
          
          {[
            { id: '1', name: 'Popcorn Large', price: 150, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=100&q=80' },
            { id: '2', name: 'Coca Cola', price: 80, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=100&q=80' },
            { id: '3', name: 'Nachos', price: 120, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=100&q=80' },
          ].map(renderSnackItem)}
        </View>

        {/* Price Summary */}
        <View style={styles.priceSection}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#333' }]}>
            Price Summary
          </Text>
          
          <View style={styles.priceItem}>
            <Text style={[styles.priceLabel, { color: isDark ? '#ccc' : '#666' }]}>
              Tickets ({selectedSeats.length} x ₹{showtime.price})
            </Text>
            <Text style={[styles.priceValue, { color: isDark ? '#fff' : '#333' }]}>
              ₹{selectedSeats.length * showtime.price}
            </Text>
          </View>
          
          {Object.entries(selectedSnacks).map(([snackId, quantity]) => (
            <View key={snackId} style={styles.priceItem}>
              <Text style={[styles.priceLabel, { color: isDark ? '#ccc' : '#666' }]}>
                Snacks
              </Text>
              <Text style={[styles.priceValue, { color: isDark ? '#fff' : '#333' }]}>
                ₹{quantity * 150}
              </Text>
            </View>
          ))}
          
          <View style={styles.totalPrice}>
            <Text style={[styles.totalLabel, { color: isDark ? '#fff' : '#333' }]}>
              Total
            </Text>
            <Text style={[styles.totalValue, { color: isDark ? '#fff' : '#333' }]}>
              ₹{totalPrice}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Booking Button */}
      <View style={styles.bookingFooter}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleConfirmBooking}
          disabled={selectedSeats.length === 0}
        >
          <LinearGradient
            colors={selectedSeats.length > 0 ? ['#FF6B6B', '#FF8E8E'] : ['#ccc', '#ccc']}
            style={styles.bookButtonGradient}
          >
            <Text style={styles.bookButtonText}>
              {selectedSeats.length > 0 ? `Book Now - ₹${totalPrice}` : 'Select Seats'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  movieInfo: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  moviePoster: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 16,
  },
  movieDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  movieGenre: {
    fontSize: 14,
    marginBottom: 4,
  },
  cinemaName: {
    fontSize: 14,
    marginBottom: 4,
  },
  showtimeInfo: {
    fontSize: 14,
  },
  seatSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  screenContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  screenText: {
    fontSize: 12,
    marginBottom: 8,
  },
  screen: {
    width: width * 0.8,
    height: 20,
    backgroundColor: '#333',
    borderRadius: 4,
  },
  seatLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 24,
  },
  seat: {
    width: 30,
    height: 30,
    borderRadius: 4,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatText: {
    fontSize: 10,
    fontWeight: '600',
  },
  seatLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  legendSeat: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
  },
  snacksSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  snackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  snackImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  snackInfo: {
    flex: 1,
  },
  snackName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  snackPrice: {
    fontSize: 14,
  },
  snackControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
  },
  priceSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 14,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  totalPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  bookingFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  bookButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  bookButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
