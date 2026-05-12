import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Movie } from '../data/movies';
import { useDesignSystem, useThemeStyles } from '../../contexts/DesignSystemContext';
import { genres, formats, ratings } from '../../constants/designTokens';

interface EnhancedMovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
  onBookmark?: (movieId: string) => void;
  isBookmarked?: boolean;
  variant?: 'default' | 'featured' | 'trending' | 'compact';
  size?: 'small' | 'medium' | 'large';
}

const { width } = Dimensions.get('window');

export default function EnhancedMovieCard({
  movie,
  onPress,
  onBookmark,
  isBookmarked = false,
  variant = 'default',
  size = 'medium',
}: EnhancedMovieCardProps) {
  const { colors, spacing, borderRadius, shadows, typography } = useDesignSystem();
  const { text } = useThemeStyles();
  
  // Animation values
  const scaleValue = new Animated.Value(1);
  const opacityValue = new Animated.Value(1);

  // Get card dimensions based on size
  const getCardDimensions = () => {
    switch (size) {
      case 'small':
        return { width: 120, height: 180 };
      case 'medium':
        return { width: 150, height: 225 };
      case 'large':
        return { width: 180, height: 270 };
      default:
        return { width: 150, height: 225 };
    }
  };

  const cardDimensions = getCardDimensions();

  // Get rating color
  const getRatingColor = (rating: string) => {
    return ratings[rating as keyof typeof ratings]?.color || colors.neutral.textMuted;
  };

  // Get genre color
  const getGenreColor = (genre: string) => {
    return genres[genre.toLowerCase() as keyof typeof genres]?.color || colors.neutral.textSecondary;
  };

  // Get format icon
  const getFormatIcon = (format: string): keyof typeof Ionicons.glyphMap => {
    return formats[format as keyof typeof formats]?.icon || 'film';
  };

  // Handle press animations
  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderFeaturedCard = () => (
    <Animated.View
      style={[
        styles.featuredCard,
        {
          width: width * 0.9,
          height: 200,
          transform: [{ scale: scaleValue }],
          opacity: opacityValue,
        },
      ]}
    >
      <BlurView intensity={40} tint="light" style={styles.glassCard}>
        <TouchableOpacity
          style={styles.cardTouchable}
          onPress={() => onPress(movie)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
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
                  color={colors.neutral.textPrimary}
                />
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.featuredInfo}>
            <Text style={[styles.featuredTitle, text.heading]} numberOfLines={2}>
              {movie.title}
            </Text>
            <Text style={[styles.featuredGenres, text.secondary]} numberOfLines={1}>
              {movie.genres.join(' • ')}
            </Text>
            <View style={styles.featuredMeta}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color={colors.primary.gold} />
                <Text style={[styles.ratingValue, text.primary]}>{movie.userRating}</Text>
                <Text style={[styles.reviewCount, text.secondary]}>({movie.totalReviews})</Text>
              </View>
              <Text style={[styles.duration, text.secondary]}>{movie.duration}m</Text>
            </View>
          </View>
        </View>
        </TouchableOpacity>
      </BlurView>
    </Animated.View>
  );

  const renderDefaultCard = () => (
    <Animated.View
      style={[
        styles.defaultCard,
        {
          width: cardDimensions.width,
          height: cardDimensions.height,
          transform: [{ scale: scaleValue }],
          opacity: opacityValue,
        },
      ]}
    >
      <BlurView intensity={40} tint="light" style={styles.glassCard}>
        <TouchableOpacity
          style={styles.cardTouchable}
          onPress={() => onPress(movie)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
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
                color={colors.neutral.textPrimary}
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
          <Text style={[styles.movieTitle, text.primary]} numberOfLines={2}>
            {movie.title}
          </Text>
          <Text style={[styles.movieGenres, text.secondary]} numberOfLines={1}>
            {movie.genres.join(', ')}
          </Text>
          
          <View style={styles.movieMeta}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color={colors.primary.gold} />
              <Text style={[styles.ratingValue, text.primary]}>{movie.userRating}</Text>
              <Text style={[styles.reviewCount, text.secondary]}>({movie.totalReviews})</Text>
            </View>
            <Text style={[styles.duration, text.secondary]}>{movie.duration}m</Text>
          </View>
          
          <View style={styles.formatContainer}>
            {movie.format.slice(0, 2).map((format, index) => (
              <View key={index} style={[styles.formatBadge, { backgroundColor: colors.neutral.backgroundSecondary }]}>
                <Ionicons name={getFormatIcon(format)} size={10} color={colors.neutral.textSecondary} />
                <Text style={[styles.formatText, text.secondary]}>{format}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.priceContainer}>
            <Text style={[styles.priceText, text.primary]}>
              ₹{movie.price.min} - ₹{movie.price.max}
            </Text>
            {movie.discount && (
              <Text style={[styles.originalPrice, text.muted]}>
                ₹{Math.round(movie.price.max / (1 - movie.discount / 100))}
              </Text>
            )}
          </View>
        </View>
        </TouchableOpacity>
      </BlurView>
    </Animated.View>
  );

  if (variant === 'featured') {
    return renderFeaturedCard();
  }

  return renderDefaultCard();
}

const styles = StyleSheet.create({
  cardTouchable: {
    flex: 1,
  },
  defaultCard: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  featuredCard: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  glassCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  imageContainer: {
    position: 'relative',
    height: '70%',
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
    color: '#FFFFFF',
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
    backgroundColor: '#E50914',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 12,
    height: '30%',
    justifyContent: 'space-between',
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
    color: '#FFFFFF',
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
    marginBottom: 4,
  },
  movieGenres: {
    fontSize: 12,
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
    marginLeft: 2,
  },
  reviewCount: {
    fontSize: 10,
    marginLeft: 2,
  },
  duration: {
    fontSize: 12,
  },
  formatContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  formatBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
  },
  formatText: {
    fontSize: 10,
    marginLeft: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
});
