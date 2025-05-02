import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Foodie!</Text>
          <Text style={styles.subtitle}>What would you like to eat today?</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>
      
      {/* Search Bar */}
      <TouchableOpacity style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#666" />
        <Text style={styles.searchText}>Search for food...</Text>
      </TouchableOpacity>
      
      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          <TouchableOpacity 
            style={[styles.categoryItem, styles.activeCategory]}
            onPress={() => navigation.navigate('Meals')}
          >
            <Ionicons name="restaurant" size={24} color="#2ecc71" />
            <Text style={[styles.categoryText, styles.activeCategoryText]}>Meals</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryItem}>
            <Ionicons name="fast-food" size={24} color="#666" />
            <Text style={styles.categoryText}>Burgers</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryItem}>
            <Ionicons name="pizza" size={24} color="#666" />
            <Text style={styles.categoryText}>Pizza</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryItem}>
            <Ionicons name="ice-cream" size={24} color="#666" />
            <Text style={styles.categoryText}>Desserts</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryItem}>
            <Ionicons name="cafe" size={24} color="#666" />
            <Text style={styles.categoryText}>Drinks</Text>
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
    padding: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
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
  profileImage: {
    width: '100%',
    height: '100%',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  searchText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 16,
    marginBottom: 12,
  },
  categoriesContainer: {
    paddingHorizontal: 8,
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 80,
    height: 80,
    borderRadius: 12,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeCategory: {
    backgroundColor: '#e8f8e8',
  },
  categoryText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  activeCategoryText: {
    color: '#2ecc71',
    fontWeight: '600',
  },
  featuredContainer: {
    paddingHorizontal: 8,
  },
  featuredItem: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    fontWeight: '600',
    color: '#333',
  },
  featuredPrice: {
    fontSize: 14,
    color: '#2ecc71',
    fontWeight: '600',
    marginTop: 4,
  },
}); 