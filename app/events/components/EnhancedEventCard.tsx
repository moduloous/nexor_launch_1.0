import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Event } from '../data';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;
const CARD_HEIGHT = 280;

interface EnhancedEventCardProps {
  event: Event;
  onPress: (event: Event) => void;
  onBookmark: (eventId: string) => void;
  isBookmarked?: boolean;
  index?: number;
}

export default function EnhancedEventCard({
  event,
  onPress,
  onBookmark,
  isBookmarked = false,
  index = 0,
}: EnhancedEventCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 100),
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      tension: 100,
      friction: 5,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 100,
      friction: 5,
      useNativeDriver: false,
    }).start();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getTimeFromString = (timeString: string) => {
    return timeString.split(' - ')[0];
  };

  const getCategoryColor = (category: string) => {
    // Simple color mapping to avoid dependency issues
    const colorMap: { [key: string]: string } = {
      'Movies': '#FF6B6B',
      'Concerts': '#4ECDC4',
      'Sports': '#45B7D1',
      'Roots': '#96CEB4'
    };
    return colorMap[category] || '#FF6B6B';
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={() => onPress(event)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        {/* Image Container */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: event.image }}
            style={styles.image}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Gradient Overlay */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.gradientOverlay}
          />
          
          {/* Bookmark Button */}
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={() => onBookmark(event.id)}
          >
            <BlurView intensity={20} style={styles.bookmarkBlur}>
              <Ionicons
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={20}
                color={isBookmarked ? '#FF6B6B' : '#fff'}
              />
            </BlurView>
          </TouchableOpacity>

          {/* Category Badge */}
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(event.category) }]}>
            <Text style={styles.categoryText}>{event.category}</Text>
          </View>

          {/* Featured Badge */}
          {event.featured && (
            <View style={styles.featuredBadge}>
              <BlurView intensity={20} style={styles.featuredBlur}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.featuredText}>Featured</Text>
              </BlurView>
            </View>
          )}

          {/* Discount Badge */}
          {event.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{event.discount}% OFF</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title and Rating */}
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={2}>
              {event.title}
            </Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{event.rating}</Text>
              <Text style={styles.reviewsText}>({event.reviews})</Text>
            </View>
          </View>

          {/* Date and Time */}
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeItem}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.dateTimeText}>{formatDate(event.date)}</Text>
            </View>
            <View style={styles.dateTimeItem}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.dateTimeText}>{getTimeFromString(event.time)}</Text>
            </View>
          </View>

          {/* Location */}
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.locationText} numberOfLines={1}>
              {event.venue}, {event.location}
            </Text>
          </View>

          {/* Price and CTA */}
          <View style={styles.priceRow}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{event.price}</Text>
              {event.originalPrice && (
                <Text style={styles.originalPrice}>{event.originalPrice}</Text>
              )}
            </View>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>

          {/* Organizer */}
          <View style={styles.organizerContainer}>
            {event.organizerImage && (
              <Image source={{ uri: event.organizerImage }} style={styles.organizerImage} />
            )}
            <Text style={styles.organizerText}>by {event.organizer}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  imageContainer: {
    height: 140,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 2,
  },
  bookmarkBlur: {
    padding: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 80,
  },
  featuredBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  featuredText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  discountBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Urbanist',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    flex: 1,
    marginRight: 8,
    fontFamily: 'Urbanist',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginLeft: 2,
    fontFamily: 'Urbanist',
  },
  reviewsText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
    fontFamily: 'Urbanist',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dateTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  dateTimeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    fontFamily: 'Urbanist',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    flex: 1,
    fontFamily: 'Urbanist',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexShrink: 1,
    marginRight: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    fontFamily: 'Urbanist',
    flexShrink: 1,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 8,
    fontFamily: 'Urbanist',
    flexShrink: 1,
  },
  bookButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexShrink: 0,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Urbanist',
  },
  organizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  organizerImage: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 6,
  },
  organizerText: {
    fontSize: 11,
    color: '#999',
    fontFamily: 'Urbanist',
  },
});
