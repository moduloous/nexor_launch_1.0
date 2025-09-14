import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { concerts } from '../data/concerts';

const { width, height } = Dimensions.get('window');

export default function ConcertDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [isLiked, setIsLiked] = useState(false);

  const concert = concerts.find(c => c.id === id);

  if (!concert) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Concert not found</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatAttendees = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const handleBuyTicket = () => {
    // Navigate to ticket purchase screen
    router.push(`/events/concert/${concert.id}/ticket`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: concert.image }} style={styles.headerImage} />
        
        {/* Gradient Overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradientOverlay}
        />
        
        {/* Header Controls */}
        <View style={styles.headerControls}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.likeButton}
            onPress={() => setIsLiked(!isLiked)}
          >
            <Ionicons 
              name={isLiked ? "heart" : "heart-outline"} 
              size={24} 
              color={isLiked ? "#FF6B35" : "#fff"} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Concert Info Card */}
        <View style={styles.infoCard}>
          {/* Title and Price */}
          <View style={styles.titleRow}>
            <Text style={styles.concertTitle}>{concert.title}</Text>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>{concert.price}</Text>
            </View>
          </View>

          {/* Attendees */}
          <View style={styles.attendeesSection}>
            <Text style={styles.attendeesText}>
              {formatAttendees(concert.attendees)} People are joined:
            </Text>
            <View style={styles.attendeesImages}>
              {concert.attendeesImages.slice(0, 5).map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={[
                    styles.attendeeImage,
                    { marginLeft: index > 0 ? -8 : 0 }
                  ]}
                />
              ))}
              <TouchableOpacity style={styles.viewAllAttendees}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              {concert.description}
            </Text>
            <TouchableOpacity>
              <Text style={styles.readMoreText}>Read more</Text>
            </TouchableOpacity>
          </View>

          {/* Location */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="location-outline" size={20} color="#666" />
              <Text style={styles.sectionTitle}>Location</Text>
            </View>
            <Text style={styles.locationText}>{concert.location}, Jawa Timur</Text>
            <Text style={styles.venueText}>{concert.venue}</Text>
            <TouchableOpacity style={styles.arrowButton}>
              <Ionicons name="chevron-forward" size={16} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Date & Time */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="calendar-outline" size={20} color="#666" />
              <Text style={styles.sectionTitle}>Date & Time</Text>
            </View>
            <Text style={styles.dateText}>{formatDate(concert.date)}</Text>
            <Text style={styles.timeText}>{concert.time}</Text>
            <TouchableOpacity style={styles.arrowButton}>
              <Ionicons name="chevron-forward" size={16} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Maps */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Maps</Text>
            <View style={styles.mapPlaceholder}>
              <Ionicons name="map-outline" size={40} color="#ccc" />
              <Text style={styles.mapText}>Map will be displayed here</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Buy Ticket Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.buyTicketButton} onPress={handleBuyTicket}>
          <Text style={styles.buyTicketText}>Buy Ticket {concert.price}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  imageContainer: {
    height: height * 0.4,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    padding: 24,
    minHeight: height * 0.6,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  concertTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    flex: 1,
    marginRight: 16,
  },
  priceTag: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  attendeesSection: {
    marginBottom: 24,
  },
  attendeesText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  attendeesImages: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  viewAllAttendees: {
    marginLeft: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
  },
  section: {
    marginBottom: 24,
    position: 'relative',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginLeft: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 8,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
  },
  locationText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  venueText: {
    fontSize: 16,
    color: '#666',
  },
  dateText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 16,
    color: '#666',
  },
  arrowButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 8,
  },
  mapPlaceholder: {
    height: 120,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  mapText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  buyTicketButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buyTicketText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
  },
});
