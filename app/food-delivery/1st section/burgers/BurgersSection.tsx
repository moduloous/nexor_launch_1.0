import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, ImageSourcePropType } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../../food-delivery/context/CartContext';
import { ShoppingCart } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const popularBrands = [
  {
    id: '1',
    name: "McDonald's",
    rating: 4.5,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png',
    deliveryTime: '20-30 min',
    priceRange: '₹200 for two'
  },
  {
    id: '2',
    name: 'Burger King',
    rating: 4.3,
    image: 'https://logos-world.net/wp-content/uploads/2020/04/Burger-King-Logo.png',
    deliveryTime: '25-35 min',
    priceRange: '₹250 for two'
  },
  {
    id: '3',
    name: 'KFC',
    rating: 4.2,
    image: 'https://assets.stickpng.com/images/58429977a6515b1e0ad75ade.png',
    deliveryTime: '30-40 min',
    priceRange: '₹300 for two'
  }
];

export interface BurgerType {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  image: string | ImageSourcePropType;
  calories: string;
  tags: string[];
  rating: number;
  restaurant?: string;
  location?: string;
  deliveryTime?: string;
}

export const burgerTypes: BurgerType[] = [
  {
    id: '1',
    name: 'Special Chicken Burger',
    type: 'Non-Veg',
    description: 'Grilled chicken with special sauce, lettuce, and tomatoes',
    price: 250.00,
    image: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?auto=format&fit=crop&w=500&q=80',
    calories: '650 cal',
    tags: ['🔴 Non-Veg', '🧀 Cheesy'],
    rating: 4.5
  },
  {
    id: '2',
    name: 'Classic Chicken Burger',
    type: 'Non-Veg',
    description: 'Grilled chicken, mayo, lettuce',
    price: 180,
    image: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?auto=format&fit=crop&w=500&q=80',
    calories: '520 cal',
    tags: ['🔴 Non-Veg', '🧀 Cheesy'],
    rating: 4.5
  },
  {
    id: '3',
    name: 'Double Cheese Veg Burger',
    type: 'Veg',
    description: 'Double veg patties, cheese slices, lettuce',
    price: 160,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=500&q=80',
    calories: '490 cal',
    tags: ['🟢 Veg', '🧀 Cheesy'],
    rating: 4.3
  },
  {
    id: '4',
    name: 'Spicy Paneer Burger',
    type: 'Veg',
    description: 'Grilled paneer patty with spicy sauce',
    price: 170,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=500&q=80',
    calories: '460 cal',
    tags: ['🟢 Veg', '🌶️ Spicy'],
    rating: 4.4
  },
  {
    id: '5',
    name: 'BBQ Chicken Burger',
    type: 'Non-Veg',
    description: 'Grilled chicken with BBQ sauce',
    price: 190,
    image: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f?auto=format&fit=crop&w=500&q=80',
    calories: '550 cal',
    tags: ['🔴 Non-Veg', '🔥 BBQ'],
    rating: 4.6
  },
  {
    id: '6',
    name: 'Mushroom Swiss Burger',
    type: 'Veg',
    description: 'Grilled mushrooms with Swiss cheese',
    price: 175,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80',
    calories: '480 cal',
    tags: ['🟢 Veg', '🧀 Cheesy'],
    rating: 4.2
  },
  {
    id: '7',
    name: 'Fish Fillet Burger',
    type: 'Non-Veg',
    description: 'Crispy fish fillet with tartar sauce',
    price: 200,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=500&q=80',
    calories: '510 cal',
    tags: ['🔴 Non-Veg', '🐟 Fish'],
    rating: 4.3
  },
  {
    id: '8',
    name: 'Quinoa Veggie Burger',
    type: 'Vegan',
    description: 'Quinoa patty with fresh veggies',
    price: 185,
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=500&q=80',
    calories: '420 cal',
    tags: ['🟣 Vegan', '🥗 Healthy'],
    rating: 4.4
  },
  {
    id: '9',
    name: 'Double Chicken Burger',
    type: 'Non-Veg',
    description: 'Double chicken patty with cheese',
    price: 220,
    image: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?auto=format&fit=crop&w=500&q=80',
    calories: '680 cal',
    tags: ['🔴 Non-Veg', '🧀 Cheesy'],
    rating: 4.7
  },
  {
    id: '10',
    name: 'Mexican Bean Burger',
    type: 'Vegan',
    description: 'Spicy bean patty with guacamole',
    price: 165,
    image: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=500&q=80',
    calories: '440 cal',
    tags: ['🟣 Vegan', '🌶️ Spicy'],
    rating: 4.3
  },
  {
    id: '11',
    name: 'Ultimate Lamb Burger',
    type: 'Non-Veg',
    description: 'Grilled lamb patty with mint sauce',
    price: 240,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
    calories: '620 cal',
    tags: ['🔴 Non-Veg', '🐑 Lamb'],
    rating: 4.8
  }
];

export default function BurgersSection() {
  const router = useRouter();
  const { addItem: addToCart, removeItem: removeFromCart, getItemQuantity } = useCart();
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterPress = (filter: string) => {
    setSelectedType(filter);
  };

  const renderBrand = (brand: typeof popularBrands[0]) => (
    <TouchableOpacity key={brand.id} style={styles.brandCard}>
      <Image source={{ uri: brand.image }} style={styles.brandImage} />
      <View style={styles.brandInfo}>
        <Text style={styles.brandName}>{brand.name}</Text>
        <View style={styles.brandDetails}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{brand.rating}</Text>
          </View>
          <Text style={styles.deliveryTime}>{brand.deliveryTime}</Text>
        </View>
        <Text style={styles.priceRange}>{brand.priceRange}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderBurgerType = (item: typeof burgerTypes[0]) => {
    const quantity = getItemQuantity(item.id);
    
    const handleAddToCart = () => {
      addToCart({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        image: typeof item.image === 'string' ? item.image : undefined,
        description: item.description
      });
    };

    const handleRemoveFromCart = () => {
      removeFromCart(item.id);
    };
    
    return (
      <TouchableOpacity 
        key={item.id} 
        style={styles.burgerCard}
        onPress={() => router.push(`/food-delivery/burger-details?id=${item.id}`)}
      >
        <Image 
          source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
          style={styles.burgerImage} 
        />
        <View style={styles.burgerInfo}>
          <View style={styles.burgerHeader}>
            <Text style={styles.burgerName}>{item.name}</Text>
            <View style={[
              styles.typeBadge,
              { backgroundColor: item.type === 'Non-Veg' ? '#FF4B4B' : item.type === 'Veg' ? '#4CAF50' : '#9C27B0' }
            ]}>
              <Text style={styles.typeText}>{item.type}</Text>
            </View>
          </View>
          
          <Text style={styles.burgerDescription} numberOfLines={2}>{item.description}</Text>
          
          <View style={styles.burgerDetails}>
            <Text style={styles.calories}>🔥 {item.calories}</Text>
            <View style={styles.tagsContainer}>
              {item.tags.slice(0, 2).map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.deliveryInfo}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.deliveryTime}>Under 25 mins</Text>
          </View>
          
          <View style={styles.burgerFooter}>
            <Text style={styles.burgerPrice}>₹{item.price}</Text>
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
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredBurgers = burgerTypes.filter(burger => 
    (selectedType === 'All' || burger.type === selectedType) &&
    (burger.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     burger.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={22} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search burgers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.promotionCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500' }}
            style={styles.promotionImage}
          />
          <View style={styles.promotionContent}>
            <Text style={styles.promotionTitle}>Special Offer</Text>
            <Text style={styles.promotionText}>Get 20% off on your{'\n'}first burger order</Text>
            <TouchableOpacity style={styles.promotionButton}>
              <Text style={styles.promotionButtonText}>Claim Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Brands</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.brandsContainer}
          >
            {popularBrands.map(renderBrand)}
          </ScrollView>
        </View>

        <View style={styles.filterContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContent}
          >
            {['All', 'Veg', 'Non-Veg', 'Vegan'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterButton,
                  selectedType === type && styles.filterButtonActive
                ]}
                onPress={() => handleFilterPress(type)}
              >
                <Text style={[
                  styles.filterText,
                  selectedType === type && styles.filterTextActive
                ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.burgersContainer}>
          {filteredBurgers.map(renderBurgerType)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 46,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    padding: 0,
  },
  content: {
    flex: 1,
  },
  promotionCard: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#000',
    height: 150,
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  promotionImage: {
    width: '45%',
    height: '100%',
    resizeMode: 'contain',
    marginLeft: -5,
    transform: [{ scale: 1.2 }],
    backgroundColor: '#000',
  },
  promotionContent: {
    flex: 1,
    padding: 20,
    paddingLeft: 0,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  promotionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  promotionText: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 16,
    lineHeight: 22,
  },
  promotionButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  promotionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginTop: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  brandsContainer: {
    paddingLeft: 16,
  },
  brandCard: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  brandImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'contain',
    backgroundColor: '#fff',
    padding: 16,
  },
  brandInfo: {
    padding: 12,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  brandName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  brandDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 13,
    color: '#666',
  },
  deliveryTime: {
    fontSize: 13,
    color: '#666',
  },
  priceRange: {
    color: '#666',
    fontSize: 13,
  },
  filterContainer: {
    marginVertical: 16,
  },
  filterContent: {
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    marginRight: 12,
  },
  filterButtonActive: {
    backgroundColor: '#2196F3',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  burgersContainer: {
    paddingHorizontal: 16,
  },
  burgerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  burgerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  burgerInfo: {
    padding: 12,
  },
  burgerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  burgerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  typeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500',
  },
  burgerDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  burgerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  calories: {
    fontSize: 12,
    color: '#666',
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  tagText: {
    fontSize: 10,
    color: '#666',
  },
  burgerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  burgerPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 8,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 16,
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
}); 