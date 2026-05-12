import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Movie } from '../data/movies';

interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
  onBookmark?: (movieId: string) => void;
  isBookmarked?: boolean;
  variant?: 'default' | 'featured' | 'trending';
}

const { width } = Dimensions.get('window');
const cardWidth = width * 0.45;

export default function MovieCard({
  movie,
  onPress,
  onBookmark,
  isBookmarked = false,
  variant = 'default',
}: MovieCardProps) {
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

  const getFormatIcon = (format: string): keyof typeof Ionicons.glyphMap => {
    switch (format) {
      case 'IMAX':
        return 'videocam';
      case '4DX':
        return 'flash';
      case '3D':
        return 'cube';
      default:
        return 'film';
    }
  };

  const renderFeaturedCard = () => (
    <TouchableOpacity
      style={[styles.card, styles.featuredCard]}
      onPress={() => onPress(movie)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: movie.poster }} style={styles.featuredImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.featuredGradient}
      />
      
      <View style={styles.featuredContent}>
        <View style={styles.featuredHeader}>
          <View style={[styles.ratingBadge, { backgroundColor: getRatingColor(movie.rating) }]}>
            <Text style={styles.ratingText}>{movie.rating}</Text>
          </View>
          {onBookmark && (
            <TouchableOpacity
              style={styles.bookmarkButton}
              onPress={() => onBookmark(movie.id)}
            >
              <Ionicons
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.featuredInfo}>
          <Text style={styles.featuredTitle} numberOfLines={2}>
            {movie.title}
          </Text>
          <Text style={styles.featuredGenres} numberOfLines={1}>
            {movie.genres.join(', ')}
          </Text>
          <View style={styles.featuredMeta}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingValue}>{movie.userRating}</Text>
              <Text style={styles.reviewCount}>({movie.totalReviews})</Text>
            </View>
            <Text style={styles.duration}>{movie.duration}m</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDefaultCard = () => (
    <TouchableOpacity
      style={[styles.card, styles.defaultCard]}
      onPress={() => onPress(movie)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: movie.poster }} style={styles.posterImage} />
        <View style={[styles.ratingBadge, { backgroundColor: getRatingColor(movie.rating) }]}>
          <Text style={styles.ratingText}>{movie.rating}</Text>
        </View>
        {onBookmark && (
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={() => onBookmark(movie.id)}
          >
            <Ionicons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={16}
              color="#fff"
            />
          </TouchableOpacity>
        )}
        {movie.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{movie.discount}% OFF</Text>
          </View>
        )}
      </View>
      
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
            <Text style={styles.reviewCount}>({movie.totalReviews})</Text>
          </View>
          <Text style={styles.duration}>{movie.duration}m</Text>
        </View>
        
        <View style={styles.formatContainer}>
          {movie.format.slice(0, 2).map((format, index) => (
            <View key={index} style={styles.formatBadge}>
              <Ionicons name={getFormatIcon(format)} size={10} color="#666" />
              <Text style={styles.formatText}>{format}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            ₹{movie.price.min} - ₹{movie.price.max}
          </Text>
          {movie.discount && (
            <Text style={styles.originalPrice}>
              ₹{Math.round(movie.price.max / (1 - movie.discount / 100))}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (variant === 'featured') {
    return renderFeaturedCard();
  }

  return renderDefaultCard();
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  defaultCard: {
    width: cardWidth,
    marginBottom: 16,
  },
  featuredCard: {
    width: width * 0.9,
    height: 200,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  posterImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  bookmarkButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 12,
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  featuredGenres: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  featuredInfo: {
    flex: 1,
  },
  featuredMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  reviewCount: {
    fontSize: 10,
    color: '#666',
    marginLeft: 2,
  },
  duration: {
    fontSize: 12,
    color: '#666',
  },
  formatContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  formatBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
  },
  formatText: {
    fontSize: 10,
    color: '#666',
    marginLeft: 2,
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
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
});
