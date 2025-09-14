import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EnhancedSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFilterPress?: () => void;
  onLocationPress?: () => void;
  isDark?: boolean;
}

export default function EnhancedSearchBar({
  value,
  onChangeText,
  placeholder = 'Search...',
  onFilterPress,
  onLocationPress,
  isDark = false,
}: EnhancedSearchBarProps) {
  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={isDark ? '#fff' : '#666'} />
        <TextInput
          style={[styles.searchInput, { color: isDark ? '#fff' : '#333' }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={isDark ? '#aaa' : '#999'}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        {onLocationPress && (
          <TouchableOpacity style={styles.button} onPress={onLocationPress}>
            <Ionicons name="location" size={20} color={isDark ? '#fff' : '#666'} />
          </TouchableOpacity>
        )}
        
        {onFilterPress && (
          <TouchableOpacity style={styles.button} onPress={onFilterPress}>
            <Ionicons name="filter" size={20} color={isDark ? '#fff' : '#666'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
  },
});
