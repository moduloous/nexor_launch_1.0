import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

// Import components
import EnhancedMovieSearchBar from '../components/EnhancedMovieSearchBar';
import EnhancedGenreFilter from '../components/EnhancedGenreFilter';
import LanguageFilter from '../components/LanguageFilter';
import FormatFilter from '../components/FormatFilter';
import FeaturedMoviesCarousel from '../components/FeaturedMoviesCarousel';
import EnhancedMovieCard from '../components/EnhancedMovieCard';
import SimpleMovieCard from '../components/SimpleMovieCard';

// Import data and types
import { movies, Movie, MovieGenre, MovieLanguage } from '../data/movies';
import { useTheme } from '../../contexts/ThemeContext';
import { useDesignSystem, useThemeStyles } from '../../contexts/DesignSystemContext';

const { width } = Dimensions.get('window');

export default function MoviesScreen() {
  const router = useRouter();
  const { isDark, theme } = useTheme();
  const { colors, spacing, borderRadius, shadows, typography } = useDesignSystem();
  const { text, container, card } = useThemeStyles();
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<MovieGenre[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<MovieLanguage[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [bookmarkedMovies, setBookmarkedMovies] = useState<string[]>([]);

  // Filter movies based on search and filters
  const filteredMovies = useMemo(() => {
    let filtered = movies;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(query) ||
        movie.originalTitle?.toLowerCase().includes(query) ||
        movie.genres.some(genre => genre.toLowerCase().includes(query)) ||
        movie.cast.some(actor => actor.toLowerCase().includes(query)) ||
        movie.director.toLowerCase().includes(query) ||
        movie.producer?.toLowerCase().includes(query) ||
        movie.languages.some(lang => lang.toLowerCase().includes(query))
      );
    }

    // Filter by genres
    if (selectedGenres.length > 0) {
      filtered = filtered.filter(movie =>
        selectedGenres.some(genre => movie.genres.includes(genre))
      );
    }

    // Filter by languages
    if (selectedLanguages.length > 0) {
      filtered = filtered.filter(movie =>
        selectedLanguages.some(language => movie.languages.includes(language))
      );
    }

    // Filter by formats
    if (selectedFormats.length > 0) {
      filtered = filtered.filter(movie =>
        selectedFormats.some(format => movie.format.includes(format))
      );
    }

    return filtered;
  }, [searchQuery, selectedGenres, selectedLanguages, selectedFormats]);

  // Get featured and trending movies
  const featuredMovies = useMemo(() => {
    return movies.filter(movie => movie.isFeatured).slice(0, 5);
  }, []);

  const trendingMovies = useMemo(() => {
    return movies.filter(movie => movie.isTrending).slice(0, 10);
  }, []);

  const nowShowingMovies = useMemo(() => {
    return movies.filter(movie => movie.isNowShowing);
  }, []);

  // Handle movie press
  const handleMoviePress = (movie: Movie) => {
    router.push(`/events/movies/${movie.id}`);
  };

  // Handle bookmark
  const handleBookmark = (movieId: string) => {
    setBookmarkedMovies(prev =>
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  // Handle genre selection
  const handleGenreSelect = (genre: MovieGenre) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  // Handle language selection
  const handleLanguageSelect = (language: MovieLanguage) => {
    setSelectedLanguages(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  // Handle format selection
  const handleFormatSelect = (format: string) => {
    setSelectedFormats(prev =>
      prev.includes(format)
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedGenres([]);
    setSelectedLanguages([]);
    setSelectedFormats([]);
  };

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  // Render movie item
  const renderMovieItem = ({ item }: { item: Movie }) => (
    <EnhancedMovieCard
      movie={item}
      onPress={handleMoviePress}
      onBookmark={handleBookmark}
      isBookmarked={bookmarkedMovies.includes(item.id)}
      variant="default"
      size="medium"
    />
  );

  // Render section header
  const renderSectionHeader = (title: string, showSeeAll: boolean = true) => (
    <View style={[styles.sectionHeader, { marginBottom: spacing.md }]}>
      <Text style={[text.heading, { fontSize: typography.fontSize['2xl'] }]}>
        {title}
      </Text>
      {showSeeAll && (
        <TouchableOpacity style={[styles.seeAllButton, { backgroundColor: colors.neutral.backgroundSecondary }]}>
          <Text style={[styles.seeAllText, { color: colors.primary.red }]}>See All</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.primary.red} />
        </TouchableOpacity>
      )}
    </View>
  );

  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="film-outline" size={64} color="#ccc" />
      <Text style={[styles.emptyTitle, { color: isDark ? '#fff' : '#333' }]}>
        No movies found
      </Text>
      <Text style={[styles.emptySubtitle, { color: isDark ? '#ccc' : '#666' }]}>
        Try adjusting your search or filters
      </Text>
      <TouchableOpacity style={styles.clearFiltersButton} onPress={clearAllFilters}>
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

    // Featured movies section
    if (featuredMovies.length > 0) {
      sectionsData.push({
        type: 'featuredMovies',
        id: 'featuredMovies',
        data: featuredMovies,
      });
    }

    // Quick actions section
    sectionsData.push({
      type: 'quickActions',
      id: 'quickActions',
    });

    // Filters section
    sectionsData.push({
      type: 'filters',
      id: 'filters',
    });

    // Now showing section
    if (nowShowingMovies.length > 0) {
      sectionsData.push({
        type: 'nowShowing',
        id: 'nowShowing',
        data: nowShowingMovies,
      });
    }

    // Trending movies section
    if (trendingMovies.length > 0) {
      sectionsData.push({
        type: 'trendingMovies',
        id: 'trendingMovies',
        data: trendingMovies,
      });
    }

    // Upcoming movies section
    const upcomingMovies = movies.filter(movie => movie.isUpcoming);
    if (upcomingMovies.length > 0) {
      sectionsData.push({
        type: 'upcomingMovies',
        id: 'upcomingMovies',
        data: upcomingMovies,
      });
    }

    // All movies section (fallback if no specific categories)
    if (filteredMovies.length > 0) {
      sectionsData.push({
        type: 'allMovies',
        id: 'allMovies',
        data: filteredMovies,
      });
    }

    return sectionsData;
  }, [featuredMovies, nowShowingMovies, trendingMovies, filteredMovies]);

  // Render section item
  const renderSectionItem = ({ item }: { item: any }) => {
    switch (item.type) {
      case 'header':
        return (
          <View style={[styles.header, { backgroundColor: colors.neutral.backgroundSecondary }]}>
            <View style={styles.headerContent}>
              <View style={styles.headerLeft}>
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => router.back()}
                >
                  <Ionicons 
                    name="arrow-back" 
                    size={24} 
                    color={colors.neutral.textPrimary} 
                  />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                  <Text style={[text.heading, { fontSize: typography.fontSize['3xl'] }]}>
                    Movies
                  </Text>
                  <Text style={[text.secondary, { fontSize: typography.fontSize.sm }]}>
                    Book your favorite movies
                  </Text>
                </View>
              </View>
              
              <View style={styles.headerRight}>
                <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.neutral.backgroundCard }]}>
                  <Ionicons name="search" size={24} color={colors.neutral.textPrimary} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.neutral.backgroundCard }]}>
                  <Ionicons name="bookmark-outline" size={24} color={colors.neutral.textPrimary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      case 'search':
        return (
          <EnhancedMovieSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFilterPress={() => setShowFilters(true)}
            onLocationPress={() => {}}
            onVoiceSearch={() => {}}
            placeholder="Search movies, actors, directors..."
            showSuggestions={searchQuery.length > 0}
            suggestions={['Baaghi 4', 'The Conjuring', 'Madharaasi']}
            onSuggestionPress={(suggestion) => setSearchQuery(suggestion)}
          />
        );

      case 'featuredMovies':
        return (
          <FeaturedMoviesCarousel
            movies={item.data}
            onMoviePress={handleMoviePress}
            onBookmark={handleBookmark}
            bookmarkedMovies={bookmarkedMovies}
          />
        );

      case 'quickActions':
        return (
          <View style={styles.quickActionsContainer}>
            <Text style={[styles.quickActionsTitle, { color: isDark ? '#fff' : '#333' }]}>
              Quick Actions
            </Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity 
                style={[styles.quickActionButton, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}
                onPress={() => setSelectedFormats(['3D'])}
              >
                <Ionicons name="cube" size={24} color="#FF6B6B" />
                <Text style={[styles.quickActionText, { color: isDark ? '#fff' : '#333' }]}>
                  3D Movies
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.quickActionButton, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}
                onPress={() => setSelectedFormats(['IMAX'])}
              >
                <Ionicons name="videocam" size={24} color="#FF6B6B" />
                <Text style={[styles.quickActionText, { color: isDark ? '#fff' : '#333' }]}>
                  IMAX
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.quickActionButton, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}
                onPress={() => setSelectedGenres(['Action'])}
              >
                <Ionicons name="flash" size={24} color="#FF6B6B" />
                <Text style={[styles.quickActionText, { color: isDark ? '#fff' : '#333' }]}>
                  Action
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.quickActionButton, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}
                onPress={() => setSelectedGenres(['Comedy'])}
              >
                <Ionicons name="happy" size={24} color="#FF6B6B" />
                <Text style={[styles.quickActionText, { color: isDark ? '#fff' : '#333' }]}>
                  Comedy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'filters':
        return (
          <View style={styles.filtersContainer}>
            <EnhancedGenreFilter
              selectedGenres={selectedGenres}
              onGenreSelect={handleGenreSelect}
              onClearAll={() => setSelectedGenres([])}
              showIcons={true}
            />
            <LanguageFilter
              selectedLanguages={selectedLanguages}
              onLanguageSelect={handleLanguageSelect}
              onClearAll={() => setSelectedLanguages([])}
            />
            <FormatFilter
              selectedFormats={selectedFormats}
              onFormatSelect={handleFormatSelect}
              onClearAll={() => setSelectedFormats([])}
            />
          </View>
        );

      case 'nowShowing':
        return (
          <View style={styles.moviesSection}>
            {renderSectionHeader('Now Showing')}
            <FlatList
              data={item.data}
              renderItem={renderMovieItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.row}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
        );

      case 'trendingMovies':
        return (
          <View style={styles.moviesSection}>
            {renderSectionHeader('Trending Movies')}
            <FlatList
              data={item.data}
              renderItem={renderMovieItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.row}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
        );

      case 'upcomingMovies':
        return (
          <View style={styles.moviesSection}>
            {renderSectionHeader('Coming Soon')}
            <FlatList
              data={item.data}
              renderItem={renderMovieItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.row}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
        );

      case 'allMovies':
        return (
          <View style={styles.moviesSection}>
            {renderSectionHeader('All Movies')}
            <FlatList
              data={item.data}
              renderItem={renderMovieItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.row}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[container, { backgroundColor: colors.neutral.backgroundPrimary }]}>
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

      {/* Filter Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowFilters(false)}
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Ionicons name="close" size={24} color={isDark ? '#fff' : '#333'} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: isDark ? '#fff' : '#333' }]}>
              Filters
            </Text>
            <TouchableOpacity onPress={clearAllFilters}>
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalContent}>
            <EnhancedGenreFilter
              selectedGenres={selectedGenres}
              onGenreSelect={handleGenreSelect}
              onClearAll={() => setSelectedGenres([])}
            />
            <LanguageFilter
              selectedLanguages={selectedLanguages}
              onLanguageSelect={handleLanguageSelect}
              onClearAll={() => setSelectedLanguages([])}
            />
            <FormatFilter
              selectedFormats={selectedFormats}
              onFormatSelect={handleFormatSelect}
              onClearAll={() => setSelectedFormats([])}
            />
          </View>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setShowFilters(false)}
            >
              <LinearGradient
                colors={['#FF6B6B', '#FF8E8E']}
                style={styles.applyButtonGradient}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  moviesSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
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
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
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
    borderRadius: 24,
  },
  clearFiltersText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  clearAllText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    paddingTop: 16,
  },
  modalFooter: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  applyButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  applyButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  quickActionsContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    flex: 1,
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
});
