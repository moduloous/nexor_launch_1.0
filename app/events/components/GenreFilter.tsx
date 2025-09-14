import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { movieGenres, MovieGenre } from '../data/movies';

interface GenreFilterProps {
  selectedGenres: MovieGenre[];
  onGenreSelect: (genre: MovieGenre) => void;
  onClearAll: () => void;
}

export default function GenreFilter({
  selectedGenres,
  onGenreSelect,
  onClearAll,
}: GenreFilterProps) {
  const isGenreSelected = (genre: MovieGenre) => {
    return selectedGenres.includes(genre);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Genres</Text>
        {selectedGenres.length > 0 && (
          <TouchableOpacity onPress={onClearAll} style={styles.clearButton}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {movieGenres.map((genre) => (
          <TouchableOpacity
            key={genre.id}
            style={[
              styles.genreButton,
              {
                backgroundColor: isGenreSelected(genre.id)
                  ? genre.color
                  : '#f5f5f5',
              },
            ]}
            onPress={() => onGenreSelect(genre.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.genreText,
                {
                  color: isGenreSelected(genre.id) ? '#fff' : '#333',
                },
              ]}
            >
              {genre.name}
            </Text>
          </TouchableOpacity>
        ))}
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
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
  },
  clearText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  genreButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  genreText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
