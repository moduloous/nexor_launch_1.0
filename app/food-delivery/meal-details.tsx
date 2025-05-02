import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from './context/CartContext';
import { meals, type Meal } from './data/meals';

const { width } = Dimensions.get('window');

const reviews = [
  {
    id: '1',
    user: 'Rahul M.',
    rating: 4.5,
    comment: 'Delicious meal! The flavors were perfectly balanced.',
    date: '2 days ago'
  },
  {
    id: '2',
    user: 'Priya S.',
    rating: 5,
    comment: 'One of the best meals I have had. Great value for money.',
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

export default function MealDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addItem, removeItem, getItemQuantity } = useCart();
  
  // Debug: Log the params and available meals
  console.log('Navigation Params:', params);
  console.log('Available meal IDs:', meals?.map(m => m.id)?.join(', ') || 'No meals found');
  
  // Convert params.id to string if it's not already
  const mealId = params.id?.toString();
  console.log('Looking for meal with ID:', mealId);
  
  // Find the meal from the meals array using the id from params
  const meal = meals?.find((m) => m.id === mealId);
  console.log('Found meal:', meal ? meal.name : 'Not found');
  
  const quantity = getItemQuantity(meal?.id || '');

  const handleAddToCart = () => {
    if (meal) {
      // Convert price from string (e.g., "₹199") to number (199)
      const numericPrice = parseInt(meal.price.replace(/[^0-9]/g, ''));
      addItem({
        ...meal,
        price: numericPrice
      });
    }
  };

  const handleRemoveFromCart = () => {
    if (meal) {
      removeItem(meal.id);
    }
  };

  if (!meal) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFoundText}>Meal not found</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: meal.image }} 
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
        <View style={styles.header}>
          <Text style={styles.title}>{meal.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>{meal.rating}</Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.detailText}>{meal.prepTime + meal.cookTime} mins</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="flame-outline" size={20} color="#666" />
            <Text style={styles.detailText}>{meal.calories} cal</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="people-outline" size={20} color="#666" />
            <Text style={styles.detailText}>{meal.servings} servings</Text>
          </View>
        </View>

        <View style={styles.tags}>
          {meal.tags.map((tag: string, index: number) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.description}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            A delicious {meal.category.toLowerCase()} meal from the {meal.subcategory.toLowerCase()} category. 
            Perfect for {meal.servings} people, this meal is {meal.difficulty.toLowerCase()} to prepare 
            and takes about {meal.prepTime + meal.cookTime} minutes to make.
          </Text>
        </View>

        <View style={styles.nutrition}>
          <Text style={styles.sectionTitle}>Nutrition Information</Text>
          <View style={styles.nutritionGrid}>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Protein</Text>
              <Text style={styles.nutritionValue}>{meal.nutrition.protein}g</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Carbs</Text>
              <Text style={styles.nutritionValue}>{meal.nutrition.carbs}g</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Fat</Text>
              <Text style={styles.nutritionValue}>{meal.nutrition.fat}g</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Fiber</Text>
              <Text style={styles.nutritionValue}>{meal.nutrition.fiber}g</Text>
            </View>
          </View>
        </View>

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
          <Text style={styles.price}>{meal.price}</Text>
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
    width: width,
    height: width * 0.8,
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
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  rating: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  description: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  nutrition: {
    marginBottom: 20,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reviewsSection: {
    marginBottom: 20,
  },
  reviewCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewUser: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewRatingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    padding: 5,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 15,
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 10,
  },
}); 