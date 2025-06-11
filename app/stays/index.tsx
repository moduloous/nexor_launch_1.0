import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Dimensions, Platform, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Search, Calendar, Users, Filter, Star, TrendingUp, Navigation, Building2, Home, Hotel, Users2, Palmtree, Building, ArrowLeft } from 'lucide-react-native';
import { Stay, stays } from './data';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Types for our accommodations
type AccommodationType = Stay['type'];

const categories = [
  {
    id: 'Hotels',
    title: 'Hotels',
    description: 'Luxury & Budget',
    icon: Hotel,
    color: '#FF6B6B',
  },
  {
    id: 'Hostels',
    title: 'Hostels & PGs',
    description: 'For students & professionals',
    icon: Users2,
    color: '#4ECDC4',
  },
  {
    id: 'Homestays',
    title: 'Homestays',
    description: 'Airbnb-style rentals',
    icon: Home,
    color: '#45B7D1',
  },
  {
    id: 'CoLiving',
    title: 'Co-Living',
    description: 'Long-term stays',
    icon: Building2,
    color: '#96CEB4',
  },
  {
    id: 'Resorts',
    title: 'Resorts & Villas',
    description: 'Premium experiences',
    icon: Palmtree,
    color: '#FFD93D',
  },
];

export default function StaysScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const screenWidth = Dimensions.get('window').width;

  const filteredStays = selectedType ? stays.filter(stay => stay.type === selectedType) : stays;

  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#fff' }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 16,
          paddingHorizontal: 16,
          paddingBottom: 8,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#eee'
        }}>
          <Pressable onPress={() => router.back()}>
            <ArrowLeft size={24} color="#000" />
          </Pressable>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 8 }}>Stays</Text>
        </View>
      </SafeAreaView>
      <ScrollView style={styles.container}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search stays..."
              placeholderTextColor="#666"
            />
          </View>
          
          <View style={styles.dateGuestRow}>
            <TouchableOpacity style={styles.dateButton}>
              <Calendar size={20} color="#666" />
              <Text style={styles.buttonText}>Check in - Check out</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.guestButton}>
              <Users size={20} color="#666" />
              <Text style={styles.buttonText}>2 guests</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryCard,
                    selectedType === category.id && styles.selectedCategory
                  ]}
                  onPress={() => setSelectedType(category.id as string)}
                >
                  <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                    <Icon size={24} color="#fff" />
                  </View>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryDescription}>{category.description}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Trending Stays */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Stays</Text>
            <TrendingUp size={20} color="#FF6B6B" />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {stays.filter(stay => stay.trending).map((stay) => (
              <TouchableOpacity
                key={stay.id}
                style={[styles.dealCard, { width: screenWidth * 0.8 }]}
                onPress={() => router.push(`/stays/${stay.id}`)}
              >
                <Image
                  source={{ uri: stay.image }}
                  style={styles.dealImage}
                  resizeMode="cover"
                />
                <View style={styles.dealInfo}>
                  <Text style={styles.dealTitle}>{stay.title}</Text>
                  <Text style={styles.dealLocation}>{stay.location}</Text>
                  <View style={styles.ratingRow}>
                    <Star size={16} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.ratingText}>{stay.rating}</Text>
                  </View>
                  <Text style={styles.dealPrice}>{stay.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Near You */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Near You</Text>
            <Navigation size={20} color="#4ECDC4" />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {stays.filter(stay => stay.distance).map((stay) => (
              <TouchableOpacity
                key={stay.id}
                style={[styles.nearbyCard, { width: screenWidth * 0.7 }]}
                onPress={() => router.push(`/stays/${stay.id}`)}
              >
                <Image
                  source={{ uri: stay.image }}
                  style={styles.nearbyImage}
                  resizeMode="cover"
                />
                <View style={styles.nearbyInfo}>
                  <Text style={styles.nearbyTitle}>{stay.title}</Text>
                  <View style={styles.nearbyDetails}>
                    <View style={styles.nearbyLocation}>
                      <MapPin size={14} color="#666" />
                      <Text style={styles.nearbyDistance}>{stay.distance}</Text>
                    </View>
                    <Text style={styles.nearbyPrice}>{stay.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Filtered Stays Section */}
        {selectedType && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{selectedType}</Text>
            {filteredStays.map((stay) => (
              <TouchableOpacity
                key={stay.id}
                style={styles.stayCard}
                onPress={() => router.push(`/stays/${stay.id}`)}
              >
                <Image source={{ uri: stay.image }} style={styles.stayImage} />
                <View style={styles.stayInfo}>
                  <Text style={styles.stayTitle}>{stay.title}</Text>
                  <Text style={styles.stayLocation}>{stay.location}</Text>
                  <View style={styles.stayRating}>
                    <Star size={16} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.ratingText}>{stay.rating}</Text>
                  </View>
                  <Text style={styles.stayPrice}>{stay.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchSection: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 12,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
  },
  dateGuestRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  guestButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  buttonText: {
    marginLeft: 8,
    color: '#666',
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoriesScroll: {
    marginTop: 16,
  },
  categoryCard: {
    width: 160,
    padding: 16,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCategory: {
    borderColor: '#35A7BD',
    borderWidth: 2,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 12,
    color: '#666',
  },
  dealCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dealImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  dealInfo: {
    padding: 12,
  },
  dealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dealLocation: {
    color: '#666',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 4,
    color: '#666',
  },
  dealPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#35A7BD',
  },
  nearbyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nearbyImage: {
    width: '100%',
    height: 120,
  },
  nearbyInfo: {
    padding: 12,
  },
  nearbyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  nearbyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nearbyLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  nearbyDistance: {
    color: '#666',
    fontSize: 14,
  },
  nearbyPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#35A7BD',
  },
  stayCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stayImage: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  stayInfo: {
    flex: 1,
    padding: 12,
  },
  stayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stayLocation: {
    color: '#666',
    marginBottom: 4,
  },
  stayRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  stayPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});