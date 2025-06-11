import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Platform,
  Image,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface Service {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap | 'custom';
  image?: any;
  href: string;
}

interface Deal {
  id: string;
  title: string;
  description: string;
  discount: string;
  backgroundColor: string;
  icon: keyof typeof Ionicons.glyphMap;
  image?: any;
}

const services: Service[] = [
  { 
    id: '1', 
    name: 'Grocery', 
    icon: 'cart',
    image: require('../assets/images/Colorful_Fruit_Display-removebg-preview.png'),
    href: '/grocery' 
  },
  { 
    id: '2', 
    name: 'Food Delivery', 
    icon: 'custom',
    image: require('../assets/images/fooddelivery.png'),
    href: '/food-delivery' 
  },
  { 
    id: '3', 
    name: 'Medicines', 
    icon: 'custom',
    image: require('../assets/images/medicines.png'),
    href: '/medicines' 
  },
  { 
    id: '4', 
    name: 'Rides', 
    icon: 'custom',
    image: require('../assets/images/Car-removebg-preview2.png'),
    href: '/rides' 
  },
  { 
    id: '5', 
    name: 'Stays', 
    icon: 'custom',
    image: require('../assets/images/resort.png'),
    href: '/stays' 
  },
  { 
    id: '6', 
    name: 'Travel', 
    icon: 'custom',
    image: require('../assets/images/travel.png'),
    href: '/travel' 
  },
  { 
    id: '7', 
    name: 'Shopping', 
    icon: 'custom',
    image: require('../assets/images/shopping.png'),
    href: '/shopping' 
  },
  { 
    id: '8', 
    name: 'Events', 
    icon: 'custom',
    image: require('../assets/images/events.png'),
    href: '/events' 
  },
  { 
    id: '9', 
    name: 'Quick Commerce', 
    icon: 'custom',
    image: require('../assets/images/cart-removebg-preview (1).png'),
    href: '/quick-commerce' 
  },
  { 
    id: '10', 
    name: 'Nexor Pay', 
    icon: 'custom',
    image: require('../assets/images/nexor pay.png'),
    href: '/wallet' 
  },
];

const deals: Deal[] = [
  {
    id: '1',
    title: 'Shopping Deals',
    description: 'Up to 70% off on Fashion',
    discount: '70% OFF',
    backgroundColor: '#FF6B6B',
    icon: 'cart',
    image: require('../assets/images/MATCHTIMEMUNCHIES.jpg')
  },
  {
    id: '2',
    title: 'Food Deals',
    description: 'Up to 50% off on Food',
    discount: '50% OFF',
    backgroundColor: '#4ECDC4',
    icon: 'restaurant',
    image: require('../assets/images/MEGADEALSFEB.png')
  },
];

// Add simple mock product data (no images)
const products = [
  { id: '1', name: 'Peri-Peri Potato Fries', description: 'Thick, crispy potato wedges seasoned with zesty peri-peri spi...', price: 80, oldPrice: 150, discount: 56, image: require('../assets/images/menu/perifries.jpeg'), bestseller: true },
  { id: '2', name: 'Grilled Chicken Club Sandwich', description: 'Flame-grilled chicken, bacon, lettuce, tomato & mayo on toasted bread...', price: 179, oldPrice: 249, discount: 43, image: require('../assets/images/menu/sandwitch.jpeg') },
  { id: '3', name: 'Vietnamese Iced Latte', description: 'Bold Robusta coffee blended with sweetened condensed milk, served chilled over ice...', price: 199, oldPrice: 249, discount: 20, image: require('../assets/images/menu/WhatsApp Image 2025-04-30 at 10.15.03 PM.jpeg') },
  { id: '4', name: 'Masala Chaas', description: '450 ml', price: 99, oldPrice: 119, discount: 16, image: require('../assets/images/menu/chicken pasta.jpeg') },
  { id: '5', name: 'Tiramisu', description: '1 Piece', price: 119, oldPrice: 309, discount: 61 },
  { id: '6', name: 'Adrak Chai', description: '250 ml', price: 129, oldPrice: 154, discount: 16 },
];

const marqueeTexts: string[] = [
  "Use Grocery section for larger monthly orders at great prices.",
  "Use Quick Commerce section for fast deliveries of essentials"
];

const TextMarquee = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Change text
        setCurrentIndex((prevIndex) => (prevIndex + 1) % marqueeTexts.length);
        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.marqueeContainer}>
      <Animated.Text 
        style={[
          styles.marqueeText,
          {
            opacity: fadeAnim,
          }
        ]}
      >
        {marqueeTexts[currentIndex]}
      </Animated.Text>
    </View>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = React.useState(0);

  const renderServiceItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={styles.serviceItem}
      onPress={() => {
        try {
          router.push(item.href as any);
        } catch (error) {
          console.error('Navigation error:', error);
        }
      }}
    >
      {item.image ? (
        <View style={[styles.serviceIconContainer, { backgroundColor: 'transparent' }]}> 
          <Image 
            source={item.image} 
            style={[
              { width: 50, height: 50 },
              item.id === '4' && { width: 55, height: 55 } // Slightly smaller size for rides icon
            ]} 
            resizeMode="contain" 
          />
        </View>
      ) : (
        <View style={styles.serviceIconContainer}>
          <Ionicons name={item.icon} size={32} color="#2196F3" />
        </View>
      )}
      <Text style={styles.serviceName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderDealItem = (item: Deal) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.dealCard, 
        item.image ? { backgroundColor: 'transparent', padding: 0 } : { backgroundColor: item.backgroundColor, padding: 16 }
      ]}
    >
      {item.image ? (
        <Image 
          source={item.image}
          style={styles.dealImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.dealContent}>
          <View style={styles.dealIconContainer}>
            <Ionicons name={item.icon} size={32} color="#fff" />
          </View>
          <Text style={styles.dealTitle}>{item.title}</Text>
          <Text style={styles.dealDescription}>{item.description}</Text>
          <View style={styles.dealButton}>
            <Text style={styles.dealButtonText}>{item.discount} {'>'}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {deals.map((_, i) => (
        <View
          key={i}
          style={[
            styles.paginationDot,
            { backgroundColor: i === activeSlide ? '#2196F3' : '#D1D1D1' }
          ]}
        />
      ))}
    </View>
  );

  const renderProductCard = (item: any) => (
    <View key={item.id} style={styles.simpleProductCard}>
      {item.image && (
        <Image source={item.image} style={styles.simpleProductImage} resizeMode="cover" />
      )}
      <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: 2}}>
        <View style={styles.simpleDiscountBadge}>
          <Text style={styles.simpleDiscountText}>{item.discount}% Off</Text>
        </View>
        {item.id === '1' && (
          <View style={[styles.simpleDiscountBadge, { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#3C91E6', marginLeft: 6 }]}> 
            <Text style={[styles.simpleDiscountText, { color: '#3C91E6' }]}>BESTSELLER</Text>
          </View>
        )}
      </View>
      <Text style={styles.simpleProductName}>{item.name}</Text>
      <View style={styles.simplePriceRow}>
        <Text style={styles.simpleProductPrice}>₹{item.price}</Text>
        <Text style={styles.simpleProductOldPrice}>₹{item.oldPrice}</Text>
        <View style={styles.vegSymbolSquare}>
          <View style={styles.vegSymbolCircle} />
        </View>
      </View>
      <Text style={styles.simpleProductDesc}>{item.description}</Text>
      <TouchableOpacity style={styles.simpleAddToCartBtn}>
        <Text style={styles.simpleAddToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.locationButton}>
          <Ionicons name="location-outline" size={24} color="black" />
          <Text style={styles.locationText}>Bengaluru</Text>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="moon-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="cart-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="gray" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="gray"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Services Grid */}
        <View style={styles.servicesGrid}>
          {services.map(renderServiceItem)}
        </View>

        {/* Deals Section */}
        <View style={styles.dealsSection}>
          <Text style={styles.sectionTitle}>Today's Deals !</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dealsScrollView}
            onScroll={({nativeEvent}) => {
              const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
              if (slide !== activeSlide) {
                setActiveSlide(slide);
              }
            }}
            scrollEventThrottle={200}
            pagingEnabled
          >
            {deals.map(renderDealItem)}
          </ScrollView>
          {renderPagination()}
        </View>

        {/* Text Marquee */}
        <TextMarquee />

        {/* Recently Visited Section */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>What's brewing in your head?</Text>
        </View>
        {/* Simple Product Card Section */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.simpleProductScroll}>
          {products.map(renderProductCard)}
        </ScrollView>

        {/* Resort Banner */}
        <View style={styles.resortBannerContainer}>
          <Image 
            source={require('../shopping/assets/Deskresortdreams.webp')}
            style={styles.resortBanner}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerSubtitle}>SHOP RESORT DREAMS</Text>
          </View>
        </View>

        {/* Split Fashion Banner */}
        <View style={styles.splitFashionContainer}>
          <View style={styles.splitFashionLeft}>
            <Image 
              source={require('../shopping/assets/spbanner.webp')}
              style={styles.splitFashionImage}
              resizeMode="cover"
            />
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerTitle}>NEW IN TOPS</Text>
              <Text style={styles.bannerSubtitle}>SHOP NEW IN TOPS</Text>
            </View>
          </View>
          <View style={styles.splitFashionRight}>
            <Image 
              source={require('../shopping/assets/homemen.jpg')}
              style={styles.splitFashionImage}
              resizeMode="cover"
            />
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerTitle}>NEW IN SHIRTS</Text>
              <Text style={styles.bannerSubtitle}>SHOP NEW SHIRTS</Text>
            </View>
          </View>
        </View>
        
        {/* Going Out Shopping Banner */}
        <View style={styles.goingOutBannerContainer}>
          <Image 
            source={{ uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/banners/going%20out%20shopping%20banner.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJiYW5uZXJzL2dvaW5nIG91dCBzaG9wcGluZyBiYW5uZXIuanBnIiwiaWF0IjoxNzQ4Njk3MjY5LCJleHAiOjE3ODAyMzMyNjl9.4CX_TAkgsB_VwBpzZw-d9vzTh_VAzbGSqws5ZYTOk-I' }}
            style={styles.goingOutBanner}
            resizeMode="cover"
          />
        </View>
        
        {/* Add bottom padding for tab bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 4,
    fontSize: 16,
    fontFamily: 'Urbanist-Bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Urbanist-Regular',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
    width: '100%',
  },
  serviceItem: {
    width: '19%',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Urbanist-Medium',
  },
  dealsSection: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 12,
    fontFamily: 'Urbanist-Bold',
  },
  dealsScrollView: {
    paddingRight: 16,
  },
  dealCard: {
    width: 300,
    height: 150,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
  },
  dealContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  dealIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  dealTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Urbanist-Bold',
  },
  dealDescription: {
    fontSize: 16,
    color: '#fff',
    marginTop: 4,
    fontFamily: 'Urbanist-Regular',
  },
  dealButton: {
    marginTop: 8,
  },
  dealButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Urbanist-Bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  recentSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  bottomPadding: {
    height: 80, // Keep bottom padding for tab bar
  },
  dealImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  simpleProductScroll: {
    marginTop: 8,
    paddingLeft: 16,
    marginBottom: 24,
  },
  simpleProductCard: {
    width: 180,
    minHeight: 220,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  simpleDiscountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF6B81',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  simpleDiscountText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Urbanist-Bold',
  },
  simpleProductName: {
    fontSize: 15,
    marginTop: 2,
    marginBottom: 2,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 2,
    fontFamily: 'Urbanist-SemiBold',
  },
  simpleProductDesc: {
    fontSize: 11,
    color: '#888',
    marginBottom: 4,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: 'Urbanist-Regular',
  },
  simplePriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    alignSelf: 'flex-start',
    width: '100%',
  },
  simpleProductPrice: {
    fontSize: 15,
    color: '#222',
    fontFamily: 'Urbanist-Bold',
  },
  simpleProductOldPrice: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
    marginLeft: 6,
    fontFamily: 'Urbanist-Regular',
  },
  simpleAddToCartBtn: {
    borderWidth: 1,
    borderColor: '#E91E63',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginTop: 4,
  },
  simpleAddToCartText: {
    color: '#E91E63',
    fontSize: 14,
    fontFamily: 'Urbanist-SemiBold',
  },
  simpleProductImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  vegSymbolSquare: {
    width: 14,
    height: 14,
    borderRadius: 3,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#228B22',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  vegSymbolCircle: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#228B22',
  },
  resortBannerContainer: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    height: 210,
  },
  resortBanner: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  splitFashionContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    height: 300,
  },
  splitFashionLeft: {
    flex: 1,
    marginRight: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  splitFashionRight: {
    flex: 1,
    marginLeft: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  splitFashionImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 24,
    paddingBottom: 24,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Urbanist-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    fontStyle: 'italic',
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Urbanist-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    paddingBottom: 2,
    fontStyle: 'italic',
  },
  marqueeContainer: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marqueeText: {
    fontSize: 13,
    color: '#000',
    fontFamily: 'Urbanist-Bold',
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  goingOutBannerContainer: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    height: 350, // Increased height further
  },
  goingOutBanner: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    alignSelf: 'flex-start',
  }
}); 