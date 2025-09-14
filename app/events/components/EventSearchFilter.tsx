import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { EventCategory, eventCategories } from '../data';

const { width } = Dimensions.get('window');

interface EventSearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: EventCategory | 'All';
  onCategoryChange: (category: EventCategory | 'All') => void;
  onFilterPress: () => void;
  showFilters?: boolean;
}

export default function EventSearchFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onFilterPress,
  showFilters = true,
}: EventSearchFilterProps) {
  const { isDarkMode } = useTheme();
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const renderSearchBar = () => (
    <View style={[styles.searchContainer, { backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5' }]}>
      <Ionicons 
        name="search" 
        size={20} 
        color={isDarkMode ? '#888' : '#666'} 
        style={styles.searchIcon}
      />
      <TextInput
        style={[styles.searchInput, { color: isDarkMode ? '#fff' : '#000' }]}
        placeholder="Search events, venues, or locations..."
        placeholderTextColor={isDarkMode ? '#888' : '#666'}
        value={searchQuery}
        onChangeText={onSearchChange}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={() => onSearchChange('')}>
          <Ionicons 
            name="close-circle" 
            size={20} 
            color={isDarkMode ? '#888' : '#666'} 
          />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderCategorySelector = () => (
    <View style={styles.categorySelectorContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {[{ id: 'All', name: 'All', icon: '🎉', color: '#FF6B6B' }, ...eventCategories].map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && { backgroundColor: category.color }
            ]}
            onPress={() => onCategoryChange(category.id)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={[
              styles.categoryChipText,
              { color: selectedCategory === category.id ? '#fff' : (isDarkMode ? '#fff' : '#000') }
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderFilterButton = () => (
    <TouchableOpacity 
      style={[styles.filterButton, { backgroundColor: isDarkMode ? '#2a2a2a' : '#fff' }]}
      onPress={onFilterPress}
    >
      <Ionicons 
        name="filter-outline" 
        size={20} 
        color={isDarkMode ? '#fff' : '#000'} 
      />
      <Text style={[styles.filterButtonText, { color: isDarkMode ? '#fff' : '#000' }]}>
        Filters
      </Text>
    </TouchableOpacity>
  );

  const renderCategoryModal = () => (
    <Modal
      visible={showCategoryModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowCategoryModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#2a2a2a' : '#fff' }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
              Select Category
            </Text>
            <TouchableOpacity onPress={() => setShowCategoryModal(false)}>
              <Ionicons 
                name="close" 
                size={24} 
                color={isDarkMode ? '#fff' : '#000'} 
              />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            {[{ id: 'All', name: 'All', icon: '🎉', color: '#FF6B6B' }, ...eventCategories].map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.modalCategoryItem,
                  selectedCategory === category.id && { backgroundColor: category.color }
                ]}
                onPress={() => {
                  onCategoryChange(category.id);
                  setShowCategoryModal(false);
                }}
              >
                <Text style={styles.modalCategoryIcon}>{category.icon}</Text>
                <Text style={[
                  styles.modalCategoryText,
                  { color: selectedCategory === category.id ? '#fff' : (isDarkMode ? '#fff' : '#000') }
                ]}>
                  {category.name}
                </Text>
                {selectedCategory === category.id && (
                  <Ionicons name="checkmark" size={20} color="#fff" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {renderSearchBar()}
      
      {showFilters && (
        <View style={styles.filtersContainer}>
          {renderCategorySelector()}
          {renderFilterButton()}
        </View>
      )}
      
      {renderCategoryModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categorySelectorContainer: {
    flex: 1,
    marginRight: 12,
  },
  categoryScroll: {
    paddingRight: 20,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: height * 0.7,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBody: {
    padding: 20,
  },
  modalCategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  modalCategoryIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  modalCategoryText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
}); 