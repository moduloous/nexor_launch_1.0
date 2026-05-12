import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface Category {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const categories: Category[] = [
  { id: '1', name: 'Groceries', icon: 'leaf' },
  { id: '2', name: 'Bakery & Cakes', icon: 'restaurant' },
  { id: '3', name: 'OTC Medicines', icon: 'medkit' },
  { id: '4', name: 'Personal Care', icon: 'body' },
  { id: '5', name: 'Baby Care', icon: 'heart' },
  { id: '6', name: 'Pet Supplies', icon: 'paw' },
  { id: '7', name: 'Home Essentials', icon: 'home' },
];

export default function QuickCommerceScreen() {
  const router = useRouter();
  const [location, setLocation] = useState('Bengaluru');

  const handleCategoryPress = (categoryId: string) => {
    // For now, just log the category press
    console.log('Category pressed:', categoryId);
    // We'll implement proper navigation once we create the category pages
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Sticky Top Bar */}
      <View style={styles.stickyHeader}>
        {/* Location and Search Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.locationButton}>
            <Ionicons name="location" size={20} color="#000" />
            <Text style={styles.locationText}>{location}</Text>
            <Ionicons name="chevron-down" size={16} color="#000" />
          </TouchableOpacity>
          
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search in Quick Commerce"
              placeholderTextColor="#666"
            />
          </View>
        </View>

        {/* Delivery ETA */}
        <View style={styles.etaContainer}>
          <Ionicons name="time" size={16} color="#4CAF50" />
          <Text style={styles.etaText}>Delivery in 12 mins</Text>
        </View>
      </View>

      {/* Category Carousel */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {categories.map((category) => (
          <TouchableOpacity 
            key={category.id} 
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(category.id)}
          >
            <View style={styles.categoryIcon}>
              <Ionicons name={category.icon} size={24} color="#000" />
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Main Content Area */}
      <ScrollView style={styles.content}>
        {/* Content will be added here */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  stickyHeader: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  locationText: {
    fontSize: 14,
    marginHorizontal: 4,
    fontFamily: 'Urbanist-Medium',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Urbanist-Regular',
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  etaText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#4CAF50',
    fontFamily: 'Urbanist-Medium',
  },
  categoryScroll: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 80,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Urbanist-Medium',
  },
  content: {
    flex: 1,
  },
}); 