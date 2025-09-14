import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { movieGenres, MovieGenre } from '../data/movies';
import { useDesignSystem, useThemeStyles } from '../../contexts/DesignSystemContext';
import { genres } from '../../constants/designTokens';

interface EnhancedGenreFilterProps {
  selectedGenres: MovieGenre[];
  onGenreSelect: (genre: MovieGenre) => void;
  onClearAll: () => void;
  showClearAll?: boolean;
  showIcons?: boolean;
}

export default function EnhancedGenreFilter({
  selectedGenres,
  onGenreSelect,
  onClearAll,
  showClearAll = true,
  showIcons = true,
}: EnhancedGenreFilterProps) {
  const { colors, spacing, borderRadius, typography, shadows } = useDesignSystem();
  const { text } = useThemeStyles();
  
  const isGenreSelected = (genre: MovieGenre) => {
    return selectedGenres.includes(genre);
  };

  const getGenreInfo = (genre: MovieGenre) => {
    return genres[genre.toLowerCase() as keyof typeof genres] || {
      name: genre,
      color: colors.neutral.textSecondary,
      icon: 'film',
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons name="grid" size={20} color={colors.primary.red} />
          <Text style={[styles.title, text.subheading]}>Genres</Text>
        </View>
        {showClearAll && selectedGenres.length > 0 && (
          <TouchableOpacity onPress={onClearAll} style={styles.clearButton}>
            <Text style={[styles.clearText, text.secondary]}>Clear All</Text>
            <Ionicons name="close" size={16} color={colors.neutral.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {movieGenres.map((genre, index) => {
          const isSelected = isGenreSelected(genre.id);
          const genreInfo = getGenreInfo(genre.id);
          
          return (
            <TouchableOpacity
              key={genre.id}
              style={[
                styles.genreButton,
                {
                  backgroundColor: isSelected ? genreInfo.color : colors.neutral.backgroundSecondary,
                  borderColor: isSelected ? genreInfo.color : colors.neutral.border,
                },
              ]}
              onPress={() => onGenreSelect(genre.id)}
              activeOpacity={0.7}
            >
              {showIcons && (
                <Ionicons
                  name={genreInfo.icon as keyof typeof Ionicons.glyphMap}
                  size={16}
                  color={isSelected ? colors.neutral.textPrimary : colors.neutral.textSecondary}
                  style={styles.genreIcon}
                />
              )}
              <Text
                style={[
                  styles.genreText,
                  {
                    color: isSelected ? colors.neutral.textPrimary : colors.neutral.textSecondary,
                  },
                ]}
              >
                {genre.name}
              </Text>
              {isSelected && (
                <Ionicons
                  name="checkmark"
                  size={14}
                  color={colors.neutral.textPrimary}
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#2D2D2D',
    borderRadius: 16,
  },
  clearText: {
    fontSize: 12,
    fontWeight: '500',
    marginRight: 4,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  genreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  genreIcon: {
    marginRight: 6,
  },
  genreText: {
    fontSize: 14,
    fontWeight: '500',
  },
  checkIcon: {
    marginLeft: 6,
  },
});
