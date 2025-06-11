import React from 'react';
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
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ArrowLeft } from 'lucide-react-native';
import { router, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

interface TravelType {
  id: string;
  iconName: 'airplane-outline' | 'train-outline' | 'bus-outline' | 'car-outline';
  name: string;
  route: string;
}

const travelTypes: TravelType[] = [
  {
    id: 'flights',
    iconName: 'airplane-outline',
    name: 'Flights',
    route: '/travel/flights',
  },
  {
    id: 'trains',
    iconName: 'train-outline',
    name: 'Trains',
    route: '/travel/trains',
  },
  {
    id: 'buses',
    iconName: 'bus-outline',
    name: 'Buses',
    route: '/travel/buses',
  },
  {
    id: 'rentals',
    iconName: 'car-outline',
    name: 'Rentals',
    route: '/travel/rentals',
  },
];

const exclusiveDeals = [
  {
    id: '1',
    title: 'Up to 15% Off on Flights',
    description: 'Book domestic flights and get instant cashback',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=60',
    discount: '15% OFF',
  },
  {
    id: '2',
    title: 'Train Travel',
    description: 'Get ₹200 off on train bookings',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&auto=format&fit=crop&q=60',
    discount: '₹200 OFF',
  },
];

interface Trip {
  id: string;
  type: string;
  iconName: 'airplane-outline' | 'train-outline';
  from: string;
  to: string;
  date: string;
  time: string;
  status: string;
}

const upcomingTrips: Trip[] = [
  {
    id: '1',
    type: 'Flight',
    iconName: 'airplane-outline',
    from: 'Bangalore',
    to: 'Delhi',
    date: '25 Mar 2024',
    time: '10:30 AM',
    status: 'Confirmed',
  },
  {
    id: '2',
    type: 'Train',
    iconName: 'train-outline',
    from: 'Bangalore',
    to: 'Chennai',
    date: '28 Mar 2024',
    time: '8:00 PM',
    status: 'Confirmed',
  },
];

export default function TravelScreen() {
  const nav = useRouter();
  const handleNavigation = (route: string) => {
    try {
      router.push(route as any);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

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
          <Pressable onPress={() => nav.back()}>
            <ArrowLeft size={24} color="#000" />
          </Pressable>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 8 }}>Travel</Text>
        </View>
      </SafeAreaView>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for flights, trains, buses..."
              placeholderTextColor="#666"
            />
          </View>
        </View>

        {/* Travel Types */}
        <View style={styles.travelTypes}>
          {travelTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={styles.travelTypeButton}
              onPress={() => handleNavigation(type.route)}
            >
              <View style={styles.iconContainer}>
                <Ionicons name={type.iconName} size={24} color="#007AFF" />
              </View>
              <Text style={styles.travelTypeName}>{type.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Exclusive Deals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exclusive Deals</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {exclusiveDeals.map((deal) => (
              <TouchableOpacity key={deal.id} style={styles.dealCard}>
                <Image source={{ uri: deal.image }} style={styles.dealImage} />
                <View style={styles.dealContent}>
                  <View style={styles.dealDiscount}>
                    <Text style={styles.dealDiscountText}>{deal.discount}</Text>
                  </View>
                  <Text style={styles.dealTitle}>{deal.title}</Text>
                  <Text style={styles.dealDescription}>{deal.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Upcoming Trips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Trips</Text>
          {upcomingTrips.map((trip) => (
            <TouchableOpacity key={trip.id} style={styles.tripCard}>
              <View style={styles.tripIcon}>
                <Ionicons name={trip.iconName} size={20} color="#007AFF" />
              </View>
              <View style={styles.tripInfo}>
                <View style={styles.tripHeader}>
                  <Text style={styles.tripType}>{trip.type}</Text>
                  <View style={styles.tripStatus}>
                    <Text style={styles.tripStatusText}>{trip.status}</Text>
                  </View>
                </View>
                <Text style={styles.tripRoute}>{trip.from} → {trip.to}</Text>
                <View style={styles.tripTimeInfo}>
                  <Text style={styles.tripDate}>{trip.date}</Text>
                  <Text style={styles.tripTime}>{trip.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    paddingBottom: 16,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  travelTypes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  travelTypeButton: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f9ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  travelTypeName: {
    fontSize: 14,
    color: '#333',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  dealCard: {
    width: 300,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dealImage: {
    width: '100%',
    height: 160,
  },
  dealContent: {
    padding: 16,
  },
  dealDiscount: {
    position: 'absolute',
    top: -156,
    right: 12,
    backgroundColor: '#ff4757',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  dealDiscountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  dealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  dealDescription: {
    fontSize: 14,
    color: '#666',
  },
  tripCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f9ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tripInfo: {
    flex: 1,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  tripType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  tripStatus: {
    backgroundColor: '#4cd137',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tripStatusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tripRoute: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  tripTimeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tripDate: {
    fontSize: 14,
    color: '#666',
  },
  tripTime: {
    fontSize: 14,
    color: '#666',
  },
}); 