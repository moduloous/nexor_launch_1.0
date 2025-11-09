import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

interface Collection {
  id: string;
  name: string;
  image: any;
}

const collections: Collection[] = [
  {
    id: 'new-in',
    name: 'NEW IN',
    image: require('./assets/Varsity Cropped Sweater.webp'),
  },
  {
    id: 'best-sellers',
    name: 'BEST SELLERS',
    image: require('./assets/Ery Wide Leg Mid Rise Jeans.webp'),
  },
  {
    id: 'swim',
    name: 'SWIM',
    image: require('./assets/athleisure.jpg'),
  },
  {
    id: 'tops',
    name: 'TOPS',
    image: require('./assets/topwear.jpg'),
  },
  {
    id: 'bottoms',
    name: 'BOTTOMS',
    image: require('./assets/bottomwear.jpg'),
  },
  {
    id: 'dresses',
    name: 'DRESSES',
    image: require('./assets/dresses.jpg'),
  },
  {
    id: 'sets',
    name: 'SETS',
    image: require('./assets/Contrast Layered Look Halter Mini Dress.webp'),
  },
  {
    id: 'outerwear',
    name: 'OUTERWEAR',
    image: require('./assets/hoodies.webp'),
  },
  {
    id: 'clothing',
    name: 'CLOTHING',
    image: require('./assets/Type_2A_Mobile_Desk_CLOTHING.jpg'),
  },
  {
    id: 'accessories',
    name: 'ACCESSORIES',
    image: require('./assets/Elegant Bowknot Backless A-Line.jpg'),
  },
  {
    id: 'trending',
    name: 'TRENDING',
    image: require('./assets/Knit Bow Cropped Sweater.webp'),
  },
  {
    id: 'sale',
    name: 'SALE',
    image: require('./assets/Resort.webp'),
  },
];

export default function ShopScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const handleCollectionPress = (collectionId: string) => {
    // Navigate to specific collection or category
    switch (collectionId) {
      case 'tops':
        router.push('/shopping/topwear');
        break;
      case 'bottoms':
        router.push('/shopping/bottomwear');
        break;
      case 'dresses':
        router.push('/shopping/dresses');
        break;
      case 'outerwear':
        router.push('/shopping/hoodies');
        break;
      default:
        // For now, just show a console log for other categories
        console.log('Collection pressed:', collectionId);
        break;
    }
  };

  const renderCollectionCard = (collection: Collection) => (
    <Pressable
      key={collection.id}
      style={[
        styles.collectionCard,
        { backgroundColor: isDark ? '#1a1a1a' : '#fff' },
      ]}
      onPress={() => handleCollectionPress(collection.id)}
    >
      <View style={styles.collectionContent}>
        <Text
          style={[
            styles.collectionText,
            { color: isDark ? '#fff' : '#000' },
            collection.id === 'sale' && { color: '#FF6B9D' },
          ]}
        >
          {collection.name}
        </Text>
        <View style={styles.collectionImageContainer}>
          <Image
            source={collection.image}
            style={styles.collectionImage}
            resizeMode="cover"
          />
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#000' : '#fff' },
      ]}
      edges={['top']}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => router.push('/')} style={styles.backButton}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={isDark ? '#fff' : '#000'}
            />
          </Pressable>
          <Text
            style={[
              styles.headerTitle,
              { color: isDark ? '#fff' : '#000' },
            ]}
          >
            Collections
          </Text>
        </View>
        <Pressable style={styles.cartButton}>
          <Ionicons
            name="bag-outline"
            size={24}
            color={isDark ? '#fff' : '#000'}
          />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBar,
            { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' },
          ]}
        >
          <Ionicons
            name="search"
            size={20}
            color={isDark ? '#999' : '#666'}
          />
          <TextInput
            placeholder="Search products"
            placeholderTextColor={isDark ? '#999' : '#666'}
            style={[
              styles.searchInput,
              { color: isDark ? '#fff' : '#000' },
            ]}
          />
        </View>
      </View>

      {/* Collections List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {collections.map(renderCollectionCard)}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  cartButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  collectionCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  collectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 120,
  },
  collectionText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'left',
    paddingLeft: 20,
    letterSpacing: 1,
  },
  collectionImageContainer: {
    width: 120,
    height: 120,
    marginLeft: 16,
  },
  collectionImage: {
    width: '100%',
    height: '100%',
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