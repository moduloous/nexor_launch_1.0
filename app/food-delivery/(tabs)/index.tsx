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
              <View style={[styles.categoryIconContainer, { backgroundColor: 'transparent' }]}>
                <Image 
                  source={{ uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/offers-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvb2ZmZXJzLXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaWF0IjoxNzU5MDcxMTI2LCJleHAiOjE3OTA2MDcxMjZ9.gWDyDhrJHRnv3lThJ6G3Wep2nOK9dEfmIis_TN6Z4C4' }}
                  style={{ width: 40, height: 40, resizeMode: 'contain' }}
                />
              </View>
              <Text style={styles.categoryText}>Offers</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.categoryItem}
              onPress={() => router.push('/(tabs)/meals')}
            >
              <View style={[styles.categoryIconContainer, { backgroundColor: 'transparent' }]}>
                <Image 
                  source={{ uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/meals.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvbWVhbHMucG5nIiwiaWF0IjoxNzU5MDQ2MjY5LCJleHAiOjE3OTA1ODIyNjl9.js0Ww_PXrFfXlD2UeFl9yJcJLKaxFdXt1m0oNEJQ7gQ' }}
                  style={{ width: 52, height: 52, resizeMode: 'contain' }}
                />
              </View>
              <Text style={styles.categoryText}>Meals</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.categoryItem}
              onPress={() => router.push('/(tabs)/burgers')}
            >
              <View style={[styles.categoryIconContainer, { backgroundColor: 'transparent' }]}>
                <Image 
                  source={{ uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/bug.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvYnVnLnBuZyIsImlhdCI6MTc1OTA0NDkzNiwiZXhwIjoxNzkwNTgwOTM2fQ.-b6p4Nc88f09lk4jeeei28w7DeOK9NsVPcLIq6cPCH0' }}
                  style={{ width: 40, height: 40, resizeMode: 'contain' }}
                />
              </View>
              <Text style={styles.categoryText}>Burgers</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryItem}>
              <View style={[styles.categoryIconContainer, { backgroundColor: 'transparent' }]}>
                <Image 
                  source={{ uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/piz-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvcGl6LXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaWF0IjoxNzU5MDQ1MzIyLCJleHAiOjE3OTA1ODEzMjJ9.a-jsIvxxLDnydjXryy4lqGeDGp2tP1YdeEDhk6QthIE' }}
                  style={{ width: 48, height: 48, resizeMode: 'contain' }}
                />
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
              <View style={[styles.popularIconContainer, { backgroundColor: 'transparent' }]}>
                <Image 
                  source={{ uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/best.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvYmVzdC5wbmciLCJpYXQiOjE3NTkwODEyOTIsImV4cCI6MTc5MDYxNzI5Mn0.Ib6esOrQJj7VZbYuE1G2we9tLYnUDfC2iwmK7Y6EyGc' }}
                  style={{ width: 56, height: 56, resizeMode: 'contain' }}
                />
              </View>
              <Text style={styles.popularText}>Bestsellers</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.popularItem}>
              <View style={[styles.popularIconContainer, { backgroundColor: 'transparent' }]}>
                <Image 
                  source={{ uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/newlylaunch.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvbmV3bHlsYXVuY2gucG5nIiwiaWF0IjoxNzU5MDgyMjcyLCJleHAiOjE3OTA2MTgyNzJ9.IVI59O_eD8kSP7CHe4cxhrPdp7bROkhHpTrxmgX7VHk' }}
                  style={{ width: 70, height: 70, resizeMode: 'contain' }}
                />
              </View>
              <Text style={styles.popularText}>Newly Launched</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.popularItem}>
              <View style={[styles.popularIconContainer, { backgroundColor: 'transparent' }]}>
                <Image 
                  source={{ uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/Tiramisu-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvVGlyYW1pc3UtcmVtb3ZlYmctcHJldmlldy5wbmciLCJpYXQiOjE3NTkwODIwODAsImV4cCI6MTc5MDYxODA4MH0.8Rb6p-frEjkgj-SZJvowK2v6FSzt9Mt0OSt50IC-BgI' }}
                  style={{ width: 72, height: 72, resizeMode: 'contain' }}
                />
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