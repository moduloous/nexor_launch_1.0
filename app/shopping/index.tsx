import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  TextInput,
  Animated,
  PanResponder,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Search, Heart, ShoppingBag, ChevronLeft, Filter } from 'lucide-react-native';

type QuickPick = {
  id: string;
  name: string;
  image?: any;
  icon?: string;
  backgroundColor: string;
  isImage: boolean;
};

type Product = {
  id: number | string;
  name: string;
  price: number;
  image: any;
  category: string;
  discount?: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
};

const categories = [
  { id: 'women', name: 'Women', icon: '👗' },
  { id: 'men', name: 'Men', icon: '👔' },
  { id: 'accessories', name: 'Accessories', icon: '👜' },
  { id: 'lifestyle', name: 'Lifestyle', icon: '🏠' },
];

const trendingProducts: Product[] = [
  {
    id: 1,
    name: 'Elegant Bowknot Backless A-Line',
    price: 2499,
    image: require('./assets/Elegant Bowknot Backless A-Line.jpg'),
    category: 'dresses',
  },
  {
    id: 2,
    name: 'Knit Bow Cropped Sweater',
    price: 1400,
    originalPrice: 6900,
    image: require('./assets/Knit Bow Cropped Sweater.webp'),
    category: 'dresses',
    rating: 4.9,
    reviews: 35,
  },
  {
    id: 3,
    name: 'Asymmetric Layered Lace Mesh Mini Skort',
    price: 3300,
    originalPrice: 6600,
    image: require('./assets/Asymmetric Layered Lace Mesh Mini Skort.webp'),
    category: 'skirts',
    rating: 4.8,
    reviews: 42,
  },
];

const mensTrendingProducts: Product[] = [
  {
    id: 'm1',
    name: 'Classic White Shirt',
    price: 999,
    image: '👔',
    discount: 15,
    category: 'mens-topwear',
  },
  {
    id: 'm2',
    name: 'Slim Fit Jeans',
    price: 1499,
    image: '👖',
    discount: 20,
    category: 'mens-bottomwear',
  },
  {
    id: 'm3',
    name: 'Kurta Pajama Set',
    price: 1999,
    image: '🧥',
    category: 'mens-ethnic',
  },
];

const quickPicks: QuickPick[] = [
  {
    id: 'topwear',
    name: 'Top Wear',
    image: require('./assets/topwear.jpg'),
    backgroundColor: '#FFE4E1',
    isImage: true,
  },
  {
    id: 'bottomwear',
    name: 'Bottom Wear',
    image: require('./assets/bottomwear.jpg'),
    backgroundColor: '#E6E6FA',
    isImage: true,
  },
  {
    id: 'dresses',
    name: 'Dresses',
    image: require('./assets/dresses.jpg'),
    backgroundColor: '#FFE4B5',
    isImage: true,
  },
  {
    id: 'athleisure',
    name: 'Athleisure',
    image: require('./assets/athleisure.jpg'),
    backgroundColor: '#E0FFFF',
    isImage: true,
  },
  {
    id: 'ethnic',
    name: 'Ethnic & Fusion',
    image: require('./assets/ethnicandfusion.jpg'),
    backgroundColor: '#FFB6C1',
    isImage: true,
  },
  {
    id: 'sleepwear',
    name: 'Sleepwear',
    image: require('./assets/sleepwear.jpg'),
    backgroundColor: '#E6E6FA',
    isImage: true,
  },
];

const menQuickPicks: QuickPick[] = [
  {
    id: 'mens-topwear',
    name: 'Top Wear',
    icon: '👕',
    backgroundColor: '#FFE4E1',
    isImage: false,
  },
  {
    id: 'mens-bottomwear',
    name: 'Bottom Wear',
    icon: '👖',
    backgroundColor: '#E6E6FA',
    isImage: false,
  },
  {
    id: 'mens-ethnic',
    name: 'Ethnic Wear',
    icon: '🧥',
    backgroundColor: '#FFE4B5',
    isImage: false,
  },
  {
    id: 'mens-sports',
    name: 'Sports Wear',
    icon: '⚽',
    backgroundColor: '#E0FFFF',
    isImage: false,
  },
  {
    id: 'mens-accessories',
    name: 'Accessories',
    icon: '⌚',
    backgroundColor: '#FFB6C1',
    isImage: false,
  },
  {
    id: 'mens-footwear',
    name: 'Footwear',
    icon: '👟',
    backgroundColor: '#E6E6FA',
    isImage: false,
  },
];

export default function ShoppingScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('women');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const swipeAnim = useRef(new Animated.Value(0)).current;

  const handleProductPress = (product: any) => {
    router.push({
      pathname: "/shopping/product/[id]",
      params: { id: product.id }
    });
  };

  const toggleLike = (productId: string) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const renderQuickPicks = () => {
    const picks = selectedCategory === 'men' ? menQuickPicks : quickPicks;
    return (
      <View style={styles.section}>
        <Text style={styles.quickPicksTitle}>QUICK PICKS</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.quickPicksScroll}
        >
          {picks.map(pick => (
            <Pressable
              key={pick.id}
              style={styles.quickPickCard}
              onPress={() => {
                console.log("Quick pick pressed:", pick.id);
                if (pick.id === 'topwear') {
                  console.log("Navigating to topwear");
                  router.push("/shopping/topwear");
                } else if (pick.id === 'bottomwear') {
                  console.log("Navigating to bottomwear");
                  router.push("/shopping/bottomwear");
                }
              }}
            >
              <View style={[styles.quickPickImageContainer, { backgroundColor: pick.backgroundColor }]}>
                {pick.isImage ? (
                  <Image 
                    source={pick.image} 
                    style={styles.quickPickImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={styles.quickPickEmoji}>{pick.icon}</Text>
                )}
              </View>
              <Text style={styles.quickPickName}>{pick.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderTrendingProducts = () => {
    const products = selectedCategory === 'men' ? mensTrendingProducts : trendingProducts;
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending Now</Text>
        <View style={styles.productsGrid}>
          {products.map(product => (
            <Pressable 
              key={product.id}
              style={styles.productCard}
              onPress={() => handleProductPress(product)}
            >
              <View style={styles.productImageContainer}>
                {typeof product.image === 'string' ? (
                  <Text style={styles.productEmoji}>{product.image}</Text>
                ) : (
                  <Image 
                    source={product.image} 
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                )}
              </View>
              <Pressable 
                style={styles.likeButton}
                onPress={() => toggleLike(product.id.toString())}
              >
                <Heart 
                  size={20} 
                  color={likedProducts.includes(product.id.toString()) ? '#FF4081' : '#fff'}
                  fill={likedProducts.includes(product.id.toString()) ? '#FF4081' : 'none'}
                />
              </Pressable>
              {product.discount && (
                <View style={styles.discountTag}>
                  <Text style={styles.discountText}>{product.discount}% OFF</Text>
                </View>
              )}
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                {product.rating && (
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>{product.rating} ★</Text>
                    <Text style={styles.reviewsText}>({product.reviews})</Text>
                  </View>
                )}
                <View style={styles.priceContainer}>
                  <Text style={styles.productPrice}>₹{product.price}</Text>
                  {product.originalPrice && (
                    <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
                  )}
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Shopping</Text>
        <View style={styles.headerRight}>
          <Pressable style={styles.iconButton}>
            <Search size={24} color="#fff" />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Filter size={24} color="#fff" />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          {categories.map(category => (
            <Pressable
              key={category.id}
              style={[
                styles.categoryItem,
                selectedCategory === category.id && styles.categoryItemActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive
              ]}>
                {category.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Featured Banner */}
        <View style={styles.featuredBanner}>
          <Image 
            source={require('./assets/Type_2A_Mobile_Desk_CLOTHING.jpg')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Summer Collection</Text>
            <Text style={styles.bannerSubtitle}>Up to 50% off</Text>
            <Pressable style={styles.shopNowButton}>
              <Text style={styles.shopNowText}>Shop Now</Text>
            </Pressable>
          </View>
        </View>

        {/* Quick Picks Section */}
        {renderQuickPicks()}

        {/* Trending Products */}
        {renderTrendingProducts()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#121212',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#2D2D2D',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryItemActive: {
    backgroundColor: '#FF4081',
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  featuredBanner: {
    marginHorizontal: 16,
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    position: 'relative',
  },
  bannerImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  bannerContent: {
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 1,
    alignItems: 'flex-start',
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'left',
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'left',
  },
  shopNowButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  shopNowText: {
    color: '#121212',
    fontWeight: '600',
    fontSize: 14,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  productCard: {
    width: (Dimensions.get('window').width - 48) / 2,
    borderRadius: 12,
    backgroundColor: '#2D2D2D',
    overflow: 'hidden',
  },
  productImageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#404040',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
  },
  productEmoji: {
    fontSize: 64,
    textAlign: 'center',
  },
  likeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 20,
  },
  discountTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF4081',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  productPrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  quickPicksTitle: {
    color: '#808080',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    letterSpacing: 1,
  },
  quickPicksScroll: {
    marginLeft: -16,
    paddingLeft: 16,
    marginBottom: 24,
  },
  quickPickCard: {
    width: 140,
    marginRight: 12,
  },
  quickPickImageContainer: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickPickEmoji: {
    fontSize: 48,
  },
  quickPickName: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  quickPickImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
  },
  reviewsText: {
    color: '#666',
    fontSize: 12,
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  originalPrice: {
    color: '#666',
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
}); 