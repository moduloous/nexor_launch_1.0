import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Categories for the grocery app
const categories = [
  { id: 'fruits', name: 'Fresh Fruits', icon: 'nutrition-outline' as keyof typeof Ionicons.glyphMap, color: '#FF6B6B' },
  { id: 'vegetables', name: 'Fresh Vegetables', icon: 'leaf-outline' as keyof typeof Ionicons.glyphMap, color: '#4ECDC4' },
  { id: 'dairy', name: 'Dairy & Eggs', icon: 'water-outline' as keyof typeof Ionicons.glyphMap, color: '#FFE66D' },
  { id: 'bakery', name: 'Bakery Items', icon: 'pizza-outline' as keyof typeof Ionicons.glyphMap, color: '#C38D9E' },
  { id: 'meat', name: 'Meat & Seafood', icon: 'fish-outline' as keyof typeof Ionicons.glyphMap, color: '#E27D60' },
  { id: 'snacks', name: 'Snacks', icon: 'fast-food-outline' as keyof typeof Ionicons.glyphMap, color: '#41B3A3' },
  { id: 'beverages', name: 'Beverages', icon: 'wine-outline' as keyof typeof Ionicons.glyphMap, color: '#85CDCA' },
  { id: 'household', name: 'Household', icon: 'home-outline' as keyof typeof Ionicons.glyphMap, color: '#E8A87C' },
];

export default function GroceryScreen() {
  const router = useRouter();
  const searchIcon = 'search-outline' as keyof typeof Ionicons.glyphMap;
  const nutritionIcon = 'nutrition-outline' as keyof typeof Ionicons.glyphMap;
  const nutritionFilledIcon = 'nutrition' as keyof typeof Ionicons.glyphMap;

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Grocery',
          headerShadowVisible: false,
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
        }} 
      />
      <SafeAreaView style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name={searchIcon} size={20} color="gray" />
          <Text style={styles.searchPlaceholder}>Search for groceries</Text>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView style={styles.categoryContainer}>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                style={styles.categoryCard}
                onPress={() => {
                  if (category.id === 'fruits') {
                    router.push('/grocery/fruits');
                  } else if (category.id === 'vegetables') {
                    router.push('/grocery/fresh-produce');
                  } else {
                    // Default handling for other categories
                    router.push('/grocery/fresh-fruits');
                  }
                }}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <Ionicons name={category.icon} size={24} color="white" />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Popular Items */}
        <Text style={styles.sectionTitle}>Popular Items</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.popularContainer}
        >
          {[1, 2, 3, 4].map((item) => (
            <TouchableOpacity key={item} style={styles.popularCard} onPress={() => router.push('/grocery/fresh-fruits')}>
              <View style={styles.popularImageContainer}>
                <Ionicons name={nutritionIcon} size={40} color="#FF6B6B" />
              </View>
              <Text style={styles.popularName}>Fresh Apples</Text>
              <Text style={styles.popularPrice}>₹120 per kg</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Banner */}
        <TouchableOpacity 
          style={styles.banner}
          onPress={() => router.push('/grocery/fresh-fruits')}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Fresh Fruits</Text>
            <Text style={styles.bannerSubtitle}>Up to 30% off on select fruits</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bannerImageContainer}>
            <Ionicons name={nutritionFilledIcon} size={60} color="#FF6B6B" />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  searchPlaceholder: {
    color: 'gray',
    marginLeft: 8,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  categoryContainer: {
    marginBottom: 16,
    maxHeight: 220,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    textAlign: 'center',
  },
  popularContainer: {
    marginBottom: 16,
  },
  popularCard: {
    width: 140,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
  },
  popularImageContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  popularName: {
    fontSize: 14,
    fontWeight: '500',
  },
  popularPrice: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingVertical: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  banner: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  bannerButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  bannerImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 