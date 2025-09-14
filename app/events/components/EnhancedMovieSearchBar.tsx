import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useDesignSystem, useThemeStyles } from '../../contexts/DesignSystemContext';

interface EnhancedMovieSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterPress: () => void;
  onLocationPress: () => void;
  onVoiceSearch?: () => void;
  placeholder?: string;
  showSuggestions?: boolean;
  suggestions?: string[];
  onSuggestionPress?: (suggestion: string) => void;
}

const { width } = Dimensions.get('window');

export default function EnhancedMovieSearchBar({
  searchQuery,
  onSearchChange,
  onFilterPress,
  onLocationPress,
  onVoiceSearch,
  placeholder = 'Search movies, actors, directors...',
  showSuggestions = false,
  suggestions = [],
  onSuggestionPress,
}: EnhancedMovieSearchBarProps) {
  const { colors, spacing, borderRadius, typography, shadows } = useDesignSystem();
  const { text, input } = useThemeStyles();
  
  const [isFocused, setIsFocused] = useState(false);
  const [showVoiceButton, setShowVoiceButton] = useState(false);
  
  // Animation for search bar expansion
  const searchBarWidth = new Animated.Value(width - 32);
  const voiceButtonOpacity = new Animated.Value(0);

  const handleFocus = () => {
    setIsFocused(true);
    setShowVoiceButton(true);
    
    Animated.parallel([
      Animated.timing(searchBarWidth, {
        toValue: width - 100, // Make room for voice button
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(voiceButtonOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    setShowVoiceButton(false);
    
    Animated.parallel([
      Animated.timing(searchBarWidth, {
        toValue: width - 32,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(voiceButtonOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleClear = () => {
    onSearchChange('');
  };

  const handleVoiceSearch = () => {
    if (onVoiceSearch) {
      onVoiceSearch();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Animated.View style={[styles.searchInputContainer, { width: searchBarWidth }]}>
          <View style={styles.searchIconContainer}>
            <Ionicons name="search" size={20} color={colors.neutral.textSecondary} />
          </View>
          
          <TextInput
            style={[styles.searchInput, text.primary]}
            placeholder={placeholder}
            placeholderTextColor={colors.neutral.textMuted}
            value={searchQuery}
            onChangeText={onSearchChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
          />
          
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={handleClear}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color={colors.neutral.textSecondary} />
            </TouchableOpacity>
          )}
        </Animated.View>
        
        {showVoiceButton && (
          <Animated.View style={[styles.voiceButton, { opacity: voiceButtonOpacity }]}>
            <TouchableOpacity
              style={[styles.voiceButtonTouchable, { backgroundColor: colors.primary.red }]}
              onPress={handleVoiceSearch}
            >
              <Ionicons name="mic" size={20} color={colors.neutral.textPrimary} />
            </TouchableOpacity>
          </Animated.View>
        )}
        
        <TouchableOpacity 
          style={[styles.filterButton, { backgroundColor: colors.neutral.backgroundSecondary }]} 
          onPress={onFilterPress}
        >
          <Ionicons name="options" size={20} color={colors.primary.red} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={[styles.locationButton, { backgroundColor: colors.neutral.backgroundSecondary }]} 
        onPress={onLocationPress}
      >
        <Ionicons name="location" size={16} color={colors.primary.red} />
        <Text style={[styles.locationText, text.secondary]}>
          Bangalore, India
        </Text>
        <Ionicons name="chevron-down" size={16} color={colors.neutral.textSecondary} />
      </TouchableOpacity>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <View style={[styles.suggestionsContainer, { backgroundColor: colors.neutral.backgroundCard }]}>
          <Text style={[styles.suggestionsTitle, text.secondary]}>Recent Searches</Text>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionItem}
              onPress={() => onSuggestionPress?.(suggestion)}
            >
              <Ionicons name="time" size={16} color={colors.neutral.textMuted} />
              <Text style={[styles.suggestionText, text.primary]}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D2D2D',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#404040',
  },
  searchIconContainer: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
  voiceButton: {
    marginRight: 12,
  },
  voiceButtonTouchable: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    borderRadius: 12,
    padding: 16,
    zIndex: 1000,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  suggestionsTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  suggestionText: {
    fontSize: 14,
    marginLeft: 12,
  },
});
