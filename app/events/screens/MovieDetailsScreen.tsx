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
import { BlurView } from 'expo-blur';

// Import data and types
import { movies, cinemas, showtimes, Movie, Cinema, Showtime } from '../data/movies';
import { useTheme } from '../../contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

export default function MovieDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { isDark, theme } = useTheme();
  
  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Get movie data
  const movie = useMemo(() => {
    return movies.find(m => m.id === id) || movies[0];
  }, [id]);

  // Get available showtimes for selected cinema and date
  const availableShowtimes = useMemo(() => {
    if (!selectedCinema) return [];
    
    return showtimes.filter(showtime => 
      showtime.movieId === movie.id &&
      showtime.cinemaId === selectedCinema.id &&
      showtime.date === selectedDate &&
      !showtime.isBooked
    );
  }, [movie.id, selectedCinema, selectedDate]);

  // Get available cinemas for this movie
  const availableCinemas = useMemo(() => {
    const cinemaIds = showtimes
      .filter(showtime => showtime.movieId === movie.id)
      .map(showtime => showtime.cinemaId);
    
    return cinemas.filter(cinema => cinemaIds.includes(cinema.id));
  }, [movie.id]);

  // Handle cinema selection
  const handleCinemaSelect = (cinema: Cinema) => {
    setSelectedCinema(cinema);
    setSelectedShowtime(null);
  };

  // Handle showtime selection
  const handleShowtimeSelect = (showtime: Showtime) => {
    setSelectedShowtime(showtime);
  };

  // Handle booking
  const handleBookNow = () => {
    if (!selectedCinema || !selectedShowtime) {
      Alert.alert('Selection Required', 'Please select a cinema and showtime');
      return;
    }

    // Navigate to booking screen
    router.push({
      pathname: '/events/movies/booking',
      params: {
        movieId: movie.id,
        cinemaId: selectedCinema.id,
        showtimeId: selectedShowtime.id,
      },
    });
  };

  // Handle bookmark
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Get rating color
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'U':
        return '#4CAF50';
      case 'U/A':
        return '#FF9800';
      case 'A':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  // Render cast member
  const renderCastMember = (actor: string, index: number) => (
    <View key={index} style={styles.castItem}>
      <Text style={[styles.castName, { color: isDark ? '#fff' : '#333' }]}>
        {actor}
      </Text>
    </View>
  );

  // Render genre
  const renderGenre = (genre: string, index: number) => (
    <View key={index} style={[styles.genreTag, { backgroundColor: '#FF6B6B' }]}>
      <Text style={styles.genreText}>{genre}</Text>
    </View>
  );

  // Render cinema
  const renderCinema = (cinema: Cinema) => (
    <TouchableOpacity
      key={cinema.id}
      style={[
        styles.cinemaItem,
        {
          backgroundColor: selectedCinema?.id === cinema.id ? '#FF6B6B' : (isDark ? '#333' : '#f5f5f5'),
        },
      ]}
      onPress={() => handleCinemaSelect(cinema)}
    >
      <View style={styles.cinemaInfo}>
        <Text
          style={[
            styles.cinemaName,
            {
              color: selectedCinema?.id === cinema.id ? '#fff' : (isDark ? '#fff' : '#333'),
            },
          ]}
        >
          {cinema.name}
        </Text>
        <Text
          style={[
            styles.cinemaLocation,
            {
              color: selectedCinema?.id === cinema.id ? 'rgba(255,255,255,0.8)' : (isDark ? '#ccc' : '#666'),
            },
          ]}
        >
          {cinema.location}
        </Text>
        <View style={styles.cinemaMeta}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text
              style={[
                styles.ratingText,
                {
                  color: selectedCinema?.id === cinema.id ? '#fff' : (isDark ? '#fff' : '#333'),
                },
              ]}
            >
              {cinema.rating}
            </Text>
            <Text
              style={[
                styles.reviewCount,
                {
                  color: selectedCinema?.id === cinema.id ? 'rgba(255,255,255,0.8)' : (isDark ? '#ccc' : '#666'),
                },
              ]}
            >
              ({cinema.totalReviews})
            </Text>
          </View>
          {cinema.distance && (
            <Text
              style={[
                styles.distance,
                {
                  color: selectedCinema?.id === cinema.id ? 'rgba(255,255,255,0.8)' : (isDark ? '#ccc' : '#666'),
                },
              ]}
            >
              {cinema.distance} km
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render showtime
  const renderShowtime = (showtime: Showtime) => (
    <TouchableOpacity
      key={showtime.id}
      style={[
        styles.showtimeItem,
        {
          backgroundColor: selectedShowtime?.id === showtime.id ? '#FF6B6B' : (isDark ? '#333' : '#f5f5f5'),
        },
      ]}
      onPress={() => handleShowtimeSelect(showtime)}
    >
      <Text
        style={[
          styles.showtimeText,
          {
            color: selectedShowtime?.id === showtime.id ? '#fff' : (isDark ? '#fff' : '#333'),
          },
        ]}
      >
        {showtime.time}
      </Text>
      <Text
        style={[
          styles.showtimeFormat,
          {
            color: selectedShowtime?.id === showtime.id ? 'rgba(255,255,255,0.8)' : (isDark ? '#ccc' : '#666'),
          },
        ]}
      >
        {showtime.format}
      </Text>
      <Text
        style={[
          styles.showtimePrice,
          {
            color: selectedShowtime?.id === showtime.id ? '#fff' : (isDark ? '#fff' : '#333'),
          },
        ]}
      >
        ₹{showtime.price}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image source={{ uri: movie.backdrop || movie.poster }} style={styles.backdropImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.backdropGradient}
          />
          
          <View style={styles.heroContent}>
            <View style={styles.heroHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.bookmarkButton}
                onPress={handleBookmark}
              >
                <Ionicons
                  name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            
            <View style={styles.movieInfo}>
              <View style={styles.movieHeader}>
                <View style={[styles.ratingBadge, { backgroundColor: getRatingColor(movie.rating) }]}>
                  <Text style={styles.ratingText}>{movie.rating}</Text>
                </View>
                <Text style={styles.movieTitle}>{movie.title}</Text>
              </View>
              
              <Text style={styles.movieGenres}>
                {movie.genres.join(' • ')} • {movie.duration}m
              </Text>
              
              <View style={styles.movieMeta}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingValue}>{movie.userRating}</Text>
                  <Text style={styles.reviewCount}>({movie.totalReviews} reviews)</Text>
                </View>
                <Text style={styles.releaseDate}>
                  Released: {new Date(movie.releaseDate).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Movie Details */}
        <View style={styles.detailsSection}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#333' }]}>
            Synopsis
          </Text>
          <Text style={[styles.synopsis, { color: isDark ? '#ccc' : '#666' }]}>
            {movie.synopsis}
          </Text>

          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#333' }]}>
            Cast & Crew
          </Text>
          <View style={styles.castContainer}>
            <Text style={[styles.crewLabel, { color: isDark ? '#ccc' : '#666' }]}>
              Director: {movie.director}
            </Text>
            {movie.producer && (
              <Text style={[styles.crewLabel, { color: isDark ? '#ccc' : '#666' }]}>
                Producer: {movie.producer}
              </Text>
            )}
            <Text style={[styles.crewLabel, { color: isDark ? '#ccc' : '#666' }]}>
              Cast: {movie.cast.join(', ')}
            </Text>
          </View>

          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#333' }]}>
            Genres
          </Text>
          <View style={styles.genresContainer}>
            {movie.genres.map(renderGenre)}
          </View>
        </View>

        {/* Cinema Selection */}
        <View style={styles.cinemaSection}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#333' }]}>
            Select Cinema
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {availableCinemas.map(renderCinema)}
          </ScrollView>
        </View>

        {/* Showtime Selection */}
        {selectedCinema && (
          <View style={styles.showtimeSection}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#333' }]}>
              Select Showtime
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {availableShowtimes.map(renderShowtime)}
            </ScrollView>
          </View>
        )}

        {/* Booking Button */}
        {selectedCinema && selectedShowtime && (
          <View style={styles.bookingSection}>
            <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
              <LinearGradient
                colors={['#FF6B6B', '#FF8E8E']}
                style={styles.bookButtonGradient}
              >
                <Text style={styles.bookButtonText}>
                  Book Now - ₹{selectedShowtime.price}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    height: height * 0.6,
    position: 'relative',
  },
  backdropImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backdropGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  heroContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieInfo: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  movieHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 12,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  movieGenres: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 12,
  },
  movieMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 4,
    fontWeight: '600',
  },
  reviewCount: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 4,
  },
  releaseDate: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  detailsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  synopsis: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  castContainer: {
    marginBottom: 24,
  },
  crewLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  genreTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  cinemaSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  cinemaItem: {
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 200,
  },
  cinemaInfo: {
    flex: 1,
  },
  cinemaName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cinemaLocation: {
    fontSize: 14,
    marginBottom: 8,
  },
  cinemaMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 2,
  },
  distance: {
    fontSize: 12,
  },
  showtimeSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  showtimeItem: {
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 100,
  },
  showtimeText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  showtimeFormat: {
    fontSize: 12,
    marginBottom: 4,
  },
  showtimePrice: {
    fontSize: 14,
    fontWeight: '600',
  },
  bookingSection: {
    padding: 16,
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
