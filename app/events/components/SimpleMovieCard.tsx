import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { Movie } from '../data/movies';

interface SimpleMovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
}

const { width } = Dimensions.get('window');
const cardWidth = width * 0.45;

export default function SimpleMovieCard({ movie, onPress }: SimpleMovieCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(movie)}
      activeOpacity={0.8}
    >
      <BlurView intensity={35} tint="light" style={styles.glassCard}>
        <Image source={{ uri: movie.poster }} style={styles.posterImage} />
        <View style={styles.cardContent}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.movieGenres} numberOfLines={1}>
          {movie.genres.join(', ')}
        </Text>
        <View style={styles.movieMeta}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingValue}>{movie.userRating}</Text>
          </View>
          <Text style={styles.duration}>{movie.duration}m</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            ₹{movie.price.min} - ₹{movie.price.max}
          </Text>
        </View>
        </View>
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    borderRadius: 12,
    backgroundColor: 'transparent',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  glassCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  posterImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  movieGenres: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  movieMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginLeft: 2,
  },
  duration: {
    fontSize: 12,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
