import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { movieLanguages, MovieLanguage } from '../data/movies';

interface LanguageFilterProps {
  selectedLanguages: MovieLanguage[];
  onLanguageSelect: (language: MovieLanguage) => void;
  onClearAll: () => void;
}

export default function LanguageFilter({
  selectedLanguages,
  onLanguageSelect,
  onClearAll,
}: LanguageFilterProps) {
  const isLanguageSelected = (language: MovieLanguage) => {
    return selectedLanguages.includes(language);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Languages</Text>
        {selectedLanguages.length > 0 && (
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
        {movieLanguages.map((language) => (
          <TouchableOpacity
            key={language.id}
            style={[
              styles.languageButton,
              {
                backgroundColor: isLanguageSelected(language.id)
                  ? '#007AFF'
                  : '#f5f5f5',
              },
            ]}
            onPress={() => onLanguageSelect(language.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.flag}>{language.flag}</Text>
            <Text
              style={[
                styles.languageText,
                {
                  color: isLanguageSelected(language.id) ? '#fff' : '#333',
                },
              ]}
            >
              {language.name}
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
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  flag: {
    fontSize: 16,
    marginRight: 6,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
