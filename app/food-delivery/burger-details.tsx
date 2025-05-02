import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../food-delivery/context/CartContext';

// Import burgerTypes array and type
import { burgerTypes, BurgerType } from './1st section/burgers/BurgersSection';

const { width } = Dimensions.get('window');

const reviews = [
  {
    id: '1',
    user: 'Rahul M.',
    rating: 4.5,
    comment: 'Delicious burger! The patty was juicy and perfectly cooked.',
    date: '2 days ago'
  },
  {
    id: '2',
    user: 'Priya S.',
    rating: 5,
    comment: 'One of the best burgers in town. Great value for money.',
    date: '1 week ago'
  },
  {
    id: '3',
    user: 'Amit K.',
    rating: 4,
    comment: 'Good portion size and quick delivery. Will order again.',
    date: '2 weeks ago'
  }
];

export default function BurgerDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addItem, removeItem, getItemQuantity } = useCart();
  
  // Find the burger from the burgerTypes array using the id from params
  const burger: BurgerType | undefined = burgerTypes.find(b => b.id === params.id);
  const quantity = getItemQuantity(burger?.id || '');

  const handleAddToCart = () => {
    if (!burger) return;
    
    addItem({
      id: burger.id,
      name: burger.name,
      price: burger.price,
      image: typeof burger.image === 'string' ? burger.image : '',
      description: burger.description
    });
  };

  const handleRemoveFromCart = () => {
    removeItem(burger?.id || '');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image 
          source={typeof burger?.image === 'string' ? { uri: burger.image } : burger?.image} 
          style={styles.image} 
        />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Restaurant Info */}
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{burger?.restaurant}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>{burger?.rating}</Text>
            <Text style={styles.ratingCount}>(200+ ratings)</Text>
          </View>
          <Text style={styles.location}>{burger?.location}</Text>
          <Text style={styles.deliveryTime}>🕒 {burger?.deliveryTime}</Text>
        </View>

        {/* Burger Details */}
        <View style={styles.burgerDetails}>
          <Text style={styles.burgerName}>{burger?.name}</Text>
          <View style={[
            styles.typeBadge,
            { backgroundColor: burger?.type === 'Non-Veg' ? '#FF4B4B' : burger?.type === 'Veg' ? '#4CAF50' : '#9C27B0' }
          ]}>
            <Text style={styles.typeText}>{burger?.type}</Text>
          </View>
          <Text style={styles.description}>{burger?.description}</Text>
          <Text style={styles.calories}>🔥 {burger?.calories} cal</Text>
          <View style={styles.tags}>
            {burger?.tags.map((tag: string, index: number) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Customer Reviews</Text>
          {reviews.map(review => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewUser}>{review.user}</Text>
                <View style={styles.reviewRating}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.reviewRatingText}>{review.rating}</Text>
                </View>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>{burger?.price}</Text>
        </View>
        {quantity > 0 ? (
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={handleRemoveFromCart} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={handleAddToCart} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleAddToCart} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
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
    width: '100%',
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  restaurantInfo: {
    marginBottom: 20,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 4,
  },
  ratingCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  deliveryTime: {
    fontSize: 14,
    color: '#666',
  },
  burgerDetails: {
    marginBottom: 24,
  },
  burgerName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 15,
    color: '#444',
    marginBottom: 8,
    lineHeight: 22,
  },
  calories: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 13,
    color: '#666',
  },
  reviewsSection: {
    marginBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  reviewCard: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewRatingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#000',
  },
  reviewComment: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 25,
    paddingHorizontal: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  quantity: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
  },
}); 