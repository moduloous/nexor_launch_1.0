import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Concert } from '../data/concerts';

interface ConcertCardProps {
  concert: Concert;
  onPress: (concert: Concert) => void;
}

const { width } = Dimensions.get('window');
const cardWidth = width * 0.75;

export default function ConcertCard({ concert, onPress }: ConcertCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatAttendees = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(concert)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: concert.image }} style={styles.image} />
        
        {/* Heart icon overlay */}
        <TouchableOpacity style={styles.heartButton}>
          <Ionicons name="heart-outline" size={20} color="#fff" />
        </TouchableOpacity>
        
        {/* Gradient overlay for better text readability */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradientOverlay}
        />
      </View>

      <View style={styles.contentContainer}>
        {/* Event Title */}
        <Text style={styles.title} numberOfLines={1}>
          {concert.title}
        </Text>

        {/* Date */}
        <Text style={styles.date}>
          {formatDate(concert.date)}
        </Text>

        {/* Location */}
        <Text style={styles.location} numberOfLines={1}>
          {concert.location}
        </Text>

        {/* Price */}
        <Text style={styles.price}>
          {concert.price}
        </Text>

        {/* Attendees */}
        <View style={styles.attendeesContainer}>
          <View style={styles.attendeesImages}>
            {concert.attendeesImages.slice(0, 3).map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={[
                  styles.attendeeImage,
                  { marginLeft: index > 0 ? -8 : 0 }
                ]}
              />
            ))}
            {concert.attendeesImages.length > 3 && (
              <View style={[styles.attendeeImage, styles.moreAttendees]}>
                <Text style={styles.moreAttendeesText}>
                  +{concert.attendeesImages.length - 3}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    zIndex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
    marginBottom: 12,
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeesImages: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  moreAttendees: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreAttendeesText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666',
  },
});
