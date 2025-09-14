import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

// Import components
import EnhancedSearchBar from './components/EnhancedSearchBar';
import EnhancedCategoryFilter from './components/EnhancedCategoryFilter';
import EnhancedEventCard from './components/EnhancedEventCard';
import FeaturedEventsCarousel from './components/FeaturedEventsCarousel';
import ConcertSection from './components/ConcertSection';

// Import context and data
import { EventsProvider, useEvents } from './context/EventsContext';
import { events, Event, EventCategory } from './data';
import { featuredConcerts } from './data/concerts';
import { useTheme } from '../contexts/ThemeContext';

function EventsScreenContent() {
  const router = useRouter();
  const { isDark, theme } = useTheme();
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    bookmarkedEvents,
    toggleBookmark,
    isBookmarked,
    addToRecentlyViewed,
    clearFilters,
  } = useEvents();

  const [refreshing, setRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter events based on search and category
  const filteredEvents = useMemo(() => {
    let filtered = events;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.venue.toLowerCase().includes(query) ||
        event.organizer.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [events, selectedCategory, searchQuery]);

  // Get featured events
  const featuredEvents = useMemo(() => {
    return events.filter(event => event.featured).slice(0, 5);
  }, [events]);

  // Handle event press
  const handleEventPress = (event: Event) => {
    addToRecentlyViewed(event.id);
    router.push(`/events/${event.id}`);
  };

  // Handle bookmark
  const handleBookmark = (eventId: string) => {
    toggleBookmark(eventId);
  };

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  // Handle filter press
  const handleFilterPress = () => {
    setShowFilters(!showFilters);
  };

  // Handle location press
  const handleLocationPress = () => {
    Alert.alert('Location', 'Location services will be implemented here');
  };

  // Handle movies press
  const handleMoviesPress = () => {
    router.push('/events/movies');
  };

  // Render event item
  const renderEventItem = ({ item, index }: { item: Event; index: number }) => (
    <EnhancedEventCard
      event={item}
      onPress={handleEventPress}
      onBookmark={handleBookmark}
      isBookmarked={isBookmarked(item.id)}
      index={index}
    />
  );

  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="calendar-outline" size={64} color="#ccc" />
      <Text style={[styles.emptyTitle, { color: isDark ? '#fff' : '#333' }]}>
        No events found
      </Text>
      <Text style={[styles.emptySubtitle, { color: isDark ? '#aaa' : '#666' }]}>
        Try adjusting your search or filters
      </Text>
      <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
        <Text style={styles.clearFiltersText}>Clear Filters</Text>
      </TouchableOpacity>
    </View>
  );

  // Create sections for the FlatList
  const sections = useMemo(() => {
    const sectionsData = [];

    // Header section
    sectionsData.push({
      type: 'header',
      id: 'header',
    });

    // Search section
    sectionsData.push({
      type: 'search',
      id: 'search',
    });

    // Category filter section
    sectionsData.push({
      type: 'categoryFilter',
      id: 'categoryFilter',
    });

    // Featured events section
    if (featuredEvents.length > 0) {
      sectionsData.push({
        type: 'featuredEvents',
        id: 'featuredEvents',
        data: featuredEvents,
      });
    }

    // Concerts section
    if (featuredConcerts.length > 0) {
      sectionsData.push({
        type: 'concerts',
        id: 'concerts',
        data: featuredConcerts,
      });
    }

    // Movies section
    sectionsData.push({
      type: 'movies',
      id: 'movies',
    });

    // Events header section
    sectionsData.push({
      type: 'eventsHeader',
      id: 'eventsHeader',
    });

    // Events list section
    if (filteredEvents.length > 0) {
      sectionsData.push({
        type: 'eventsList',
        id: 'eventsList',
        data: filteredEvents,
      });
    } else {
      sectionsData.push({
        type: 'emptyState',
        id: 'emptyState',
      });
    }

    return sectionsData;
  }, [featuredEvents, filteredEvents]);

  // Render section item
  const renderSectionItem = ({ item }: { item: any }) => {
    switch (item.type) {
      case 'header':
        return (
          <View style={[styles.header, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
            <View style={styles.headerContent}>
              <View style={styles.headerLeft}>
                <View style={styles.titleRow}>
                  <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => router.back()}
                  >
                    <Ionicons 
                      name="arrow-back" 
                      size={24} 
                      color={isDark ? '#fff' : '#333'} 
                    />
                  </TouchableOpacity>
                  <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#1a1a1a' }]}>
                    Events
                  </Text>
                </View>
                <View style={styles.locationContainer}>
                  <Ionicons name="location" size={16} color="#FF6B6B" />
                  <Text style={[styles.locationText, { color: isDark ? '#fff' : '#666' }]}>
                    Bangalore, India
                  </Text>
                </View>
              </View>
              
              <View style={styles.headerRight}>
                <TouchableOpacity style={styles.headerButton}>
                  <Ionicons name="notifications-outline" size={24} color={isDark ? '#fff' : '#333'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton}>
                  <Ionicons name="person-circle-outline" size={24} color={isDark ? '#fff' : '#333'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      case 'search':
        return (
          <EnhancedSearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search events, venues, organizers..."
            onFilterPress={handleFilterPress}
            onLocationPress={handleLocationPress}
            isDark={isDark}
          />
        );

      case 'categoryFilter':
        return (
          <EnhancedCategoryFilter
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            isDark={isDark}
          />
        );

      case 'featuredEvents':
        return (
          <FeaturedEventsCarousel
            events={item.data}
            onEventPress={handleEventPress}
            onBookmark={handleBookmark}
            bookmarkedEvents={bookmarkedEvents}
          />
        );

      case 'concerts':
        return (
          <ConcertSection
            concerts={item.data}
            title="Popular Concerts"
            showViewAll={true}
          />
        );

      case 'movies':
        return (
          <View style={styles.moviesSection}>
            <View style={styles.moviesHeader}>
              <Text style={[styles.moviesTitle, { color: isDark ? '#fff' : '#1a1a1a' }]}>
                Movies
              </Text>
              <TouchableOpacity 
                style={styles.seeAllButton}
                onPress={handleMoviesPress}
              >
                <Text style={styles.seeAllText}>See All</Text>
                <Ionicons name="chevron-forward" size={16} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.moviesGrid}>
              <TouchableOpacity 
                style={[styles.movieCard, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}
                onPress={handleMoviesPress}
              >
                <View style={styles.movieIcon}>
                  <Ionicons name="film" size={32} color="#FF6B6B" />
                </View>
                <Text style={[styles.movieTitle, { color: isDark ? '#fff' : '#333' }]}>
                  Book Movie Tickets
                </Text>
                <Text style={[styles.movieSubtitle, { color: isDark ? '#ccc' : '#666' }]}>
                  Latest releases & showtimes
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.movieCard, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}
                onPress={handleMoviesPress}
              >
                <View style={styles.movieIcon}>
                  <Ionicons name="star" size={32} color="#FFD700" />
                </View>
                <Text style={[styles.movieTitle, { color: isDark ? '#fff' : '#333' }]}>
                  Trending Movies
                </Text>
                <Text style={[styles.movieSubtitle, { color: isDark ? '#ccc' : '#666' }]}>
                  Popular & highly rated
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'eventsHeader':
        return (
          <View style={styles.eventsHeader}>
            <Text style={[styles.eventsTitle, { color: isDark ? '#fff' : '#1a1a1a' }]}>
              {selectedCategory === 'All' ? 'All Events' : selectedCategory} Events
            </Text>
            <Text style={[styles.eventsCount, { color: isDark ? '#aaa' : '#666' }]}>
              {filteredEvents.length} events
            </Text>
          </View>
        );

      case 'eventsList':
        return (
          <View style={styles.eventsListContainer}>
            {item.data.map((event: Event, index: number) => (
              <EnhancedEventCard
                key={event.id}
                event={event}
                onPress={handleEventPress}
                onBookmark={handleBookmark}
                isBookmarked={isBookmarked(event.id)}
                index={index}
              />
            ))}
          </View>
        );

      case 'emptyState':
        return renderEmptyState();

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <FlatList
        data={sections}
        renderItem={renderSectionItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={isDark ? '#fff' : '#333'}
          />
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <LinearGradient
          colors={['#FF6B6B', '#FF8E8E']}
          style={styles.fabGradient}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Wrap the content with the EventsProvider
export default function EnhancedEventsScreen() {
  return (
    <EventsProvider>
      <EventsScreenContent />
    </EventsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for FAB
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    marginLeft: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  eventsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  eventsCount: {
    fontSize: 14,
  },
  eventsListContainer: {
    paddingHorizontal: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    minHeight: 300,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  clearFiltersButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  clearFiltersText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moviesSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  moviesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  moviesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
    marginRight: 4,
  },
  moviesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  movieCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  movieIcon: {
    marginBottom: 12,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  movieSubtitle: {
    fontSize: 12,
    textAlign: 'center',
  },
});
