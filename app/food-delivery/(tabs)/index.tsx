import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, John</Text>
            <Text style={styles.deliveryText}>What would you like to eat today?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={40} color="#2ecc71" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <Text style={styles.searchText}>Search for food...</Text>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIconContainer}>
                <Ionicons name="cart" size={24} color="#FF6B6B" />
              </View>
              <Text style={styles.categoryText}>Offers</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.categoryItem}
              onPress={() => router.push('/(tabs)/meals')}
            >
              <View style={[styles.categoryIconContainer, { backgroundColor: '#2ecc71' }]}>
                <Ionicons name="restaurant" size={24} color="white" />
              </View>
              <Text style={styles.categoryText}>Meals</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.categoryItem}
              onPress={() => router.push('/(tabs)/burgers')}
            >
              <View style={[styles.categoryIconContainer, { backgroundColor: '#FF9F43' }]}>
                <Ionicons name="fast-food" size={24} color="white" />
              </View>
              <Text style={styles.categoryText}>Burgers</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryItem}>
              <View style={[styles.categoryIconContainer, { backgroundColor: '#54A0FF' }]}>
                <Ionicons name="pizza" size={24} color="white" />
              </View>
              <Text style={styles.categoryText}>Pizza</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryItem}>
              <View style={[styles.categoryIconContainer, { backgroundColor: '#FF6B6B' }]}>
                <Ionicons name="ice-cream" size={24} color="white" />
              </View>
              <Text style={styles.categoryText}>Desserts</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Popular Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            <TouchableOpacity style={styles.popularItem}>
              <View style={[styles.popularIconContainer, { backgroundColor: '#FF9F43' }]}>
                <Ionicons name="trophy" size={32} color="white" />
              </View>
              <Text style={styles.popularText}>Bestsellers</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.popularItem}>
              <View style={[styles.popularIconContainer, { backgroundColor: '#2ecc71' }]}>
                <Ionicons name="checkmark-circle" size={32} color="white" />
              </View>
              <Text style={styles.popularText}>Newly Launched</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.popularItem}>
              <View style={[styles.popularIconContainer, { backgroundColor: '#54A0FF' }]}>
                <Ionicons name="trending-up" size={32} color="white" />
              </View>
              <Text style={styles.popularText}>Trending Now</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Featured Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Meals</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredContainer}
          >
            <TouchableOpacity style={styles.featuredItem}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3' }} 
                style={styles.featuredImage} 
              />
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredName}>Grilled Salmon</Text>
                <Text style={styles.featuredPrice}>$24.99</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.featuredItem}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3' }} 
                style={styles.featuredImage} 
              />
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredName}>Chicken Rice Bowl</Text>
                <Text style={styles.featuredPrice}>$16.99</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.featuredItem}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3' }} 
                style={styles.featuredImage} 
              />
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredName}>Vegetarian Curry</Text>
                <Text style={styles.featuredPrice}>$14.99</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  deliveryText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 16,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  categoriesContainer: {
    paddingRight: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  popularItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  popularIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  popularText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    maxWidth: 100,
  },
  featuredContainer: {
    paddingRight: 20,
  },
  featuredItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 16,
    width: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 120,
  },
  featuredInfo: {
    padding: 12,
  },
  featuredName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  featuredPrice: {
    fontSize: 14,
    color: '#2ecc71',
    marginTop: 4,
  },
}); 