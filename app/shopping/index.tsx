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
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
    name: 'Ery Wide Leg Mid Rise Jeans',
    price: 5700,
    originalPrice: 9500,
    image: require('./assets/Ery Wide Leg Mid Rise Jeans.webp'),
    category: 'dresses',
  },
  {
    id: 2,
    name: 'Varsity Cropped Sweater',
    price: 3000,
    originalPrice: 7500,
    image: require('./assets/Varsity Cropped Sweater.webp'),
    category: 'dresses',
  },
  {
    id: 3,
    name: 'Contrast Layered Look Halter Mini Dress',
    price: 2400,
    originalPrice: 4000,
    image: require('./assets/Contrast Layered Look Halter Mini Dress.webp'),
    category: 'skirts',
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
  const [isSearchModalVisible, setSearchModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const insets = useSafeAreaInsets();

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
                } else if (pick.id === 'dresses') {
                  console.log("Navigating to dresses");
                  router.push("/shopping/dresses");
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
        <Text style={styles.sectionTitle}>TRENDING NOW - SUMMER COLLECTION</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trendingScroll}>
          {products.map((product, idx) => (
            <Pressable 
              key={product.id}
              style={[styles.productCard, idx === 0 && { marginLeft: 8 }]}
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
        </ScrollView>
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
        <Pressable onPress={() => router.push('/')} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Shopping</Text>
        <View style={styles.headerRight}>
          <Pressable style={styles.iconButton} accessibilityLabel="Cart" accessibilityRole="button" onPress={() => {}}>
            <Ionicons name="cart-outline" size={24} color="#fff" />
          </Pressable>
          <Pressable style={styles.iconButton} accessibilityLabel="Profile" accessibilityRole="button" onPress={() => {}}>
            <Ionicons name="person-outline" size={24} color="#fff" />
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

        {/* Remote Banner - Inserted between Summer Collection and Quick Picks */}
        <View style={styles.remoteBannerContainer}>
          <Image
            source={{ uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/banners/banner.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJiYW5uZXJzL2Jhbm5lci5qcGciLCJpYXQiOjE3NDg0NDg2ODYsImV4cCI6MTc3OTk4NDY4Nn0.OYO-rMGFe-JHrZol1Z0XKlm1sVb9ZA6fOiz1fBI6Wgw' }}
            style={styles.remoteBannerImage}
            resizeMode="cover"
            accessible
            accessibilityLabel="Promotional Banner"
          />
        </View>

        {/* Quick Picks Section */}
        {renderQuickPicks()}

        {/* Trending Products */}
        {renderTrendingProducts()}

        {/* Resort Dream Collection Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resort Dream Collection</Text>
          <Image
            source={require('./assets/Resort.webp')}
            style={styles.resortBanner}
            resizeMode="cover"
          />
        </View>

        {/* Outer Wear Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Outer Wear</Text>
          <View style={styles.splitOuterWearContainer}>
            <Pressable style={styles.splitOuterWearHalf} onPress={() => router.push('/shopping/hoodies')} accessibilityRole="button" accessibilityLabel="Shop Hoodies">
              <Image
                source={require('./assets/hoodies.webp')}
                style={styles.splitOuterWearImage}
                resizeMode="cover"
              />
              <View style={styles.outerWearOverlay}>
                <Text style={styles.outerWearText}>SHOP HOODIES</Text>
              </View>
            </Pressable>
            <View style={styles.splitOuterWearHalf}>
              <Image
                source={require('./assets/jackets.webp')}
                style={styles.splitOuterWearImage}
                resizeMode="cover"
              />
              <View style={styles.outerWearOverlay}>
                <Text style={styles.outerWearText}>SHOP JACKETS</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={[styles.bottomNavBar, { paddingBottom: insets.bottom }]} accessibilityRole="tablist" accessible>
        <Pressable style={styles.bottomNavItem} accessibilityRole="tab" accessibilityLabel="Home" onPress={() => router.push('/shopping')}>
          <Ionicons name="flash-outline" size={26} color="#fff" />
          <Text style={styles.bottomNavLabel}>Home</Text>
        </Pressable>
        <Pressable style={styles.bottomNavItem} accessibilityRole="tab" accessibilityLabel="Shop" onPress={() => router.push('/shopping/shop')}>
          <Ionicons name="shirt-outline" size={26} color="#fff" />
          <Text style={styles.bottomNavLabel}>Shop</Text>
        </Pressable>
        <Pressable style={styles.bottomNavItem} accessibilityRole="tab" accessibilityLabel="Search" onPress={() => router.push('/shopping/search')}>
          <Ionicons name="search-outline" size={26} color="#fff" />
          <Text style={styles.bottomNavLabel}>Search</Text>
        </Pressable>
        <Pressable style={styles.bottomNavItem} accessibilityRole="tab" accessibilityLabel="Wishlist" onPress={() => router.push('/shopping/wishlist')}>
          <Ionicons name="heart-outline" size={26} color="#fff" />
          <Text style={styles.bottomNavLabel}>Wishlist</Text>
        </Pressable>
      </View>

      {/* Full-screen search modal */}
      <Modal
        visible={isSearchModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setSearchModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: '#121212', paddingTop: 60 }}>
          <Text style={{
            fontSize: 22,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 24,
            fontFamily: 'Urbanist-Bold',
            color: '#fff',
          }}>
            SEARCH RESULTS
          </Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 16,
            backgroundColor: '#232323',
            borderRadius: 16,
            paddingHorizontal: 16,
            marginBottom: 24,
          }}>
            <TextInput
              placeholder="Search"
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={setSearchText}
              style={{
                flex: 1,
                fontSize: 16,
                paddingVertical: 12,
                backgroundColor: 'transparent',
                color: '#fff',
              }}
              autoFocus
            />
            <Ionicons name="search" size={22} color="#fff" />
          </View>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 16,
              fontFamily: 'Urbanist-Bold',
              color: '#fff',
            }}>
              BEST SELLERS
            </Text>
            {/* Product grid removed for now */}
          </ScrollView>
          <Pressable
            onPress={() => setSearchModalVisible(false)}
            style={{
              position: 'absolute',
              top: 60,
              right: 24,
              backgroundColor: '#232323',
              borderRadius: 20,
              padding: 8,
            }}
            accessibilityRole="button"
            accessibilityLabel="Close search"
          >
            <Text style={{ fontSize: 18, color: '#fff' }}>✕</Text>
          </Pressable>
        </View>
      </Modal>
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
    fontFamily: 'Urbanist-Bold',
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
    fontFamily: 'Urbanist-SemiBold',
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Urbanist-Bold',
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
    fontFamily: 'Urbanist-Bold',
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'left',
    fontFamily: 'Urbanist-Regular',
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
    fontFamily: 'Urbanist-Bold',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    fontFamily: 'Urbanist-Bold',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  productCard: {
    width: (Dimensions.get('window').width - 48) / 2,
    borderRadius: 16,
    backgroundColor: '#1E1E1E',
    overflow: 'hidden',
    marginRight: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  productImageContainer: {
    width: '100%',
    height: 280,
    backgroundColor: '#2D2D2D',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
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
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  discountText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Urbanist-Bold',
  },
  productInfo: {
    padding: 16,
    backgroundColor: '#1E1E1E',
  },
  productName: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 8,
    fontFamily: 'Urbanist-SemiBold',
    lineHeight: 20,
  },
  productPrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Urbanist-Bold',
  },
  quickPicksTitle: {
    color: '#808080',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    letterSpacing: 1,
    fontFamily: 'Urbanist-Bold',
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
    fontFamily: 'Urbanist-SemiBold',
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
    fontFamily: 'Urbanist-Bold',
  },
  reviewsText: {
    color: '#666',
    fontSize: 12,
    marginLeft: 4,
    fontFamily: 'Urbanist-Regular',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  originalPrice: {
    color: '#808080',
    fontSize: 15,
    textDecorationLine: 'line-through',
    fontFamily: 'Urbanist-Regular',
    marginLeft: 8,
  },
  trendingScroll: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  resortBanner: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginTop: 12,
  },
  splitOuterWearContainer: {
    flexDirection: 'row',
    height: 200,
    marginTop: 12,
    gap: 8,
  },
  splitOuterWearHalf: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  splitOuterWearImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  outerWearOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  outerWearText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Urbanist-Bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },
  remoteBannerContainer: {
    marginHorizontal: 16,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#232323',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteBannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#181818',
    borderTopWidth: 1,
    borderTopColor: '#232323',
    height: 76,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  bottomNavLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
    fontFamily: 'Urbanist-SemiBold',
  },
}); 