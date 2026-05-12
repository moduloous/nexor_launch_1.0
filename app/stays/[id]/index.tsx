import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Stay, stays } from '../data';

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface HouseRule {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

const reviews: Review[] = [
  {
    id: 1,
    user: "Sarah M.",
    rating: 5,
    comment: "Amazing place! The amenities were top-notch and the location was perfect.",
    date: "2024-03-15"
  },
  {
    id: 2,
    user: "John D.",
    rating: 4.5,
    comment: "Great value for money. Very clean and comfortable.",
    date: "2024-03-10"
  }
];

const houseRules: HouseRule[] = [
  {
    icon: 'key',
    title: 'Check-in',
    description: 'After 2:00 PM'
  },
  {
    icon: 'people',
    title: 'Guests',
    description: 'Max 4 people'
  },
  {
    icon: 'cafe',
    title: 'Smoking',
    description: 'Not allowed'
  }
];

const paymentMethods = ['UPI', 'Nexor Wallet', 'Credit Card', 'Pay Later'];

export default function StayDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const stay = stays.find((s) => s.id === Number(id));
  
  if (!stay) {
    return (
      <View style={styles.container}>
        <Text>Stay not found</Text>
      </View>
    );
  }

  // Mock additional images
  const images = [
    stay.image,
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Image Gallery */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: images[currentImageIndex] }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.imageControls}>
          <TouchableOpacity onPress={prevImage} style={styles.imageButton}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={nextImage} style={styles.imageButton}>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.wishlistButton}
          onPress={() => setIsWishlisted(!isWishlisted)}
        >
          <Ionicons name="heart" 
            size={24} 
            color={isWishlisted ? '#FF6B6B' : '#fff'} 
            fill={isWishlisted ? '#FF6B6B' : 'none'} 
          />
        </TouchableOpacity>
        <View style={styles.imagePagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentImageIndex === index && styles.paginationDotActive
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.content}>
        {/* Header Info */}
        <View style={styles.header}>
          <Text style={styles.title}>{stay.title}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={16} color="#666" />
            <Text style={styles.location}>{stay.location}</Text>
          </View>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#FFD700" fill="#FFD700" />
            <Text style={styles.rating}>{stay.rating}</Text>
            <Text style={styles.reviewCount}>({reviews.length} reviews)</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>{stay.description}</Text>

        {/* Amenities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {stay.amenities.map((amenity: string, index: number) => (
              <View key={index} style={styles.amenityItem}>
                {amenity.includes('WiFi') && <Ionicons name="wifi" size={20} color="#666" />}
                {amenity.includes('Parking') && <Ionicons name="car" size={20} color="#666" />}
                {amenity.includes('Restaurant') && <Ionicons name="restaurant" size={20} color="#666" />}
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* House Rules */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>House Rules</Text>
          {houseRules.map((rule, index) => (
            <View key={index} style={styles.ruleItem}>
              <Ionicons name={rule.icon} size={20} color="#666" />
              <View style={styles.ruleText}>
                <Text style={styles.ruleTitle}>{rule.title}</Text>
                <Text style={styles.ruleDescription}>{rule.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewUser}>{review.user}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.reviewRating}>{review.rating}</Text>
                </View>
              </View>
              <Text style={styles.reviewDate}>{review.date}</Text>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>

        {/* Payment Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <View style={styles.paymentMethods}>
            {paymentMethods.map((method, index) => (
              <View key={index} style={styles.paymentMethod}>
                <Ionicons name="card" size={20} color="#666" />
                <Text style={styles.paymentText}>{method}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Special Offers */}
        <View style={styles.section}>
          <View style={styles.offerHeader}>
            <Text style={styles.sectionTitle}>Special Offers</Text>
            <Ionicons name="gift" size={20} color="#FF6B6B" />
          </View>
          <View style={styles.offerCard}>
            <Text style={styles.offerTitle}>Early Bird Discount</Text>
            <Text style={styles.offerDescription}>
              Book 30 days in advance and get 15% off
            </Text>
          </View>
        </View>

        {/* Booking Section */}
        <View style={styles.bookingSection}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{stay.price}</Text>
            <Text style={styles.priceUnit}>
              {stay.price.includes('month') ? '/month' : '/night'}
            </Text>
          </View>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageControls: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    top: '50%',
    transform: [{ translateY: -20 }],
  },
  imageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePagination: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  paginationDotActive: {
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    marginLeft: 4,
    color: '#666',
    fontSize: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewCount: {
    marginLeft: 4,
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 8,
  },
  amenityText: {
    color: '#666',
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  ruleText: {
    flex: 1,
  },
  ruleTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  ruleDescription: {
    color: '#666',
  },
  reviewItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: '500',
  },
  reviewRating: {
    marginLeft: 4,
  },
  reviewDate: {
    color: '#666',
    marginBottom: 8,
  },
  reviewComment: {
    color: '#444',
    lineHeight: 20,
  },
  paymentMethods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  paymentText: {
    color: '#666',
  },
  offerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  offerCard: {
    backgroundColor: '#FFF3F3',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE5E5',
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF6B6B',
    marginBottom: 4,
  },
  offerDescription: {
    color: '#666',
  },
  bookingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#35A7BD',
  },
  priceUnit: {
    marginLeft: 4,
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#35A7BD',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
}); 