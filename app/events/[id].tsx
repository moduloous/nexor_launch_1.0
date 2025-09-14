import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  FlatList,
  Share,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { events, Event } from './data';

const { width, height } = Dimensions.get('window');

export default function EventDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { isDark } = useTheme();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'highlights' | 'gallery' | 'reviews'>('overview');
  
  const event = events.find(e => e.id === id) as Event;
  
  if (!event) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: isDark ? '#fff' : '#000' }]}>Event not found</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this amazing event: ${event.title} - ${event.venue}, ${event.location}`,
        title: event.title,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share event');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    Alert.alert(
      isBookmarked ? 'Removed from Bookmarks' : 'Added to Bookmarks',
      isBookmarked ? 'Event removed from your bookmarks' : 'Event added to your bookmarks'
    );
  };

  const handleBookTicket = () => {
    Alert.alert(
      'Book Ticket',
      `Book ticket for ${event.title}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Book Now', 
          onPress: () => {
            Alert.alert('Success', 'Ticket booked successfully!');
          }
        },
      ]
    );
  };

  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons 
          name="arrow-back" 
          size={24} 
          color={isDark ? '#fff' : '#000'} 
        />
      </TouchableOpacity>
      
      <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#000' }]}>{event.title}</Text>
      
      <TouchableOpacity 
        style={styles.headerActionButton}
        onPress={handleShare}
      >
        <Ionicons 
          name="share-outline" 
          size={24} 
          color={isDark ? '#fff' : '#000'} 
        />
      </TouchableOpacity>
    </View>
  );

  const renderEventImage = () => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: event.image }} style={styles.eventImage} />
      
      <View style={styles.imageOverlay}>
        <View style={styles.imageContent}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventType}>Concert: {event.location}</Text>
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>{event.price}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderEventInfo = () => (
    <View style={[styles.eventInfoContainer, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
      <View style={styles.dateTimeRow}>
        <Ionicons name="calendar-outline" size={16} color={isDark ? '#ccc' : '#666'} />
        <Text style={[styles.dateTimeText, { color: isDark ? '#ccc' : '#666' }]}>
          {new Date(event.date).getDate()} {new Date(event.date).toLocaleDateString('en-US', { month: 'long' })}
        </Text>
      </View>
      
      <View style={styles.dateTimeRow}>
        <Ionicons name="time-outline" size={16} color={isDark ? '#ccc' : '#666'} />
        <Text style={[styles.dateTimeText, { color: isDark ? '#ccc' : '#666' }]}>
          {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long' })} {event.time}
        </Text>
      </View>
    </View>
  );

  const renderAboutSection = () => (
    <View style={[styles.section, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
      <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>About this events</Text>
      <Text style={[styles.description, { color: isDark ? '#ccc' : '#666' }]}>
        {event.description} The stage time is {event.time.split(' - ')[0]}. 
        Songs to be performed: {event.tags.slice(0, 4).join(', ')} will be sung on the {event.venue} stage.
      </Text>
    </View>
  );

  const renderDescriptionSection = () => (
    <View style={[styles.section, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
      <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>Description</Text>
      
      <View style={styles.ratingRow}>
        <Ionicons name="star" size={16} color="#FFD700" />
        <Text style={[styles.ratingText, { color: isDark ? '#fff' : '#000' }]}>{event.rating}</Text>
      </View>
      
      <View style={styles.bulletPoints}>
        <View style={styles.bulletPoint}>
          <Text style={[styles.bulletText, { color: isDark ? '#ccc' : '#666' }]}>• {event.title} singing is {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {event.time.split(' - ')[0]}</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={[styles.bulletText, { color: isDark ? '#ccc' : '#666' }]}>• Meet and greet with {event.organizer} on {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Text>
        </View>
      </View>
    </View>
  );

  const renderBookingSection = () => (
    <View style={[styles.bookingContainer, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
      <TouchableOpacity style={styles.heartButton}>
        <Ionicons 
          name={isBookmarked ? "heart" : "heart-outline"} 
          size={24} 
          color={isBookmarked ? "#FF6B6B" : (isDark ? "#fff" : "#000")} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.bookTicketButton}
        onPress={handleBookTicket}
      >
        <Text style={styles.bookTicketText}>Get a Ticket</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#1a1a1a' : '#f8f9fa'} />
      
      {renderHeader()}
      {renderEventImage()}
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderEventInfo()}
        {renderAboutSection()}
        {renderDescriptionSection()}
      </ScrollView>
      
      {renderBookingSection()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
  },
  backButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FF6B6B',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerActionButton: {
    padding: 8,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  eventImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  imageContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  eventType: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
  },
  priceTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  priceText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  eventInfoContainer: {
    padding: 20,
    marginBottom: 16,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateTimeText: {
    fontSize: 14,
    marginLeft: 8,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  bulletPoints: {
    marginTop: 8,
  },
  bulletPoint: {
    marginBottom: 8,
  },
  bulletText: {
    fontSize: 14,
    lineHeight: 20,
  },
  bookingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  heartButton: {
    padding: 12,
    marginRight: 16,
  },
  bookTicketButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookTicketText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 