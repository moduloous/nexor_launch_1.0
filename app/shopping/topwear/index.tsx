import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 150;

type Product = {
  id: number;
  name: string;
  image: any;
  price: number;
  originalPrice: number;
  description: string;
  color: string;
  details: string[];
  care: string[];
  discount?: number;
  isNew?: boolean;
  isVerified?: boolean;
  brand: string;
  rating?: number;
  reviewCount?: number;
};

const topwearProducts: Product[] = [
  {
    id: 1,
    name: 'Twisted Split Front Tube Top',
    image: require('./assets/Twisted Split Front Tube Top(main).webp'),
    price: 2000,
    originalPrice: 4900,
    description: 'Elegant twisted front tube top with split detail',
    color: 'black',
    details: [
      'Tube top',
      'Split front',
      'Sweetheart neckline',
      'Twist front detail',
      'Jersey fabric',
      'Polyester, Cotton',
      'Model wears size S',
      'Model height is 5\'9',
      'Item care: Machine wash at maximum 30ºC, wash with similar colors, do not bleach, do not tumble dry, iron at a maximum of 110ºC, do not dry clean'
    ],
    care: [
      'Machine wash cold',
      'Do not bleach',
      'Tumble dry low',
      'Iron on low heat'
    ],
    discount: 15,
    isNew: true,
    isVerified: true,
    brand: 'Zara',
  },
  {
    id: 2,
    name: 'Eira Sheer Lace Tank Top',
    image: require('./assets/Eira Sheer Lace Tank Top(main).webp'),
    price: 2200,
    originalPrice: 5400,
    description: 'Elegant sheer lace tank top with delicate details',
    color: 'bordu',
    details: [
      'Tank top',
      'Mini bow detail',
      'Adjustable straps',
      'Lined bust',
      'Sheer lace fabric',
      'Polyester, Spandex',
      'Model wears size S',
      'Model height is 5\'7',
      'Item care: Hand wash'
    ],
    care: [
      'Hand wash cold',
      'Do not bleach',
      'Do not tumble dry',
      'Iron on low heat'
    ],
    discount: 20,
    isNew: true,
    isVerified: true,
    brand: 'Eira',
    rating: 4.9,
    reviewCount: 399,
  },
  {
    id: 3,
    name: "Twisted Split Front Tube Top",
    image: require('./assets/Twisted Split Front Tube Top(main).webp'),
    price: 1299,
    originalPrice: 1999,
    description: "A stylish tube top with a twisted split front design, perfect for a chic and modern look.",
    color: "Black",
    details: [
      "Split front design",
      "Twisted detail",
      "Regular fit",
      "Spaghetti straps",
      "Made from premium quality fabric"
    ],
    care: [
      "Machine wash cold",
      "Do not bleach",
      "Tumble dry low",
      "Iron on medium heat"
    ],
    discount: 35,
    isNew: true,
    brand: "Urban Chic",
    rating: 4.8,
    reviewCount: 156
  },
  {
    id: 4,
    name: "Classic White T-Shirt",
    image: require('./assets/Twisted Split Front Tube Top(main).webp'),
    price: 799,
    originalPrice: 999,
    description: "A timeless white t-shirt made from soft, breathable cotton.",
    color: "White",
    details: [
      "100% cotton",
      "Regular fit",
      "Round neck",
      "Short sleeves",
      "Machine washable"
    ],
    care: [
      "Machine wash cold",
      "Do not bleach",
      "Tumble dry low",
      "Iron on medium heat"
    ],
    discount: 20,
    brand: "Basic Essentials",
    rating: 4.5,
    reviewCount: 289
  },
  {
    id: 5,
    name: "Striped Button-Up Shirt",
    image: require('./assets/Eira Sheer Lace Tank Top(main).webp'),
    price: 1499,
    originalPrice: 1999,
    description: "A classic striped button-up shirt perfect for both casual and formal occasions.",
    color: "Blue & White",
    details: [
      "Striped pattern",
      "Button-up front",
      "Long sleeves",
      "Regular fit",
      "Collar design"
    ],
    care: [
      "Machine wash cold",
      "Do not bleach",
      "Tumble dry low",
      "Iron on medium heat"
    ],
    discount: 25,
    isNew: true,
    brand: "Classic Collection",
    rating: 4.7,
    reviewCount: 178
  },
  {
    id: 6,
    name: "Oversized Graphic Tee",
    image: require('./assets/Massie Tailored Button Up Shirt(main).webp'),
    price: 999,
    originalPrice: 1299,
    description: "A trendy oversized t-shirt with a unique graphic design.",
    color: "Gray",
    details: [
      "Oversized fit",
      "Graphic print",
      "Round neck",
      "Short sleeves",
      "Relaxed silhouette"
    ],
    care: [
      "Machine wash cold",
      "Do not bleach",
      "Tumble dry low",
      "Iron on medium heat"
    ],
    discount: 23,
    brand: "Street Style",
    rating: 4.6,
    reviewCount: 234
  }
];

export default function TopwearScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [showLikedProducts, setShowLikedProducts] = useState(false);
  const position = useRef(new Animated.ValueXY()).current;
  const scrollViewRef = useRef(null);

  const goToPreviousProduct = () => {
    if (currentIndex > 0) {
      // Start with the card off-screen to the right
      position.setValue({ x: SCREEN_WIDTH, y: 0 });
      
      // Animate the card sliding back to center with timing animation
      Animated.timing(position, {
        toValue: { x: 0, y: 0 },
        duration: SWIPE_OUT_DURATION,
        useNativeDriver: false,
      }).start(() => {
        setCurrentIndex(currentIndex - 1);
      });
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        // Only handle horizontal swipes
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only handle horizontal swipes
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: 0 });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const forceSwipe = (direction: 'right' | 'left') => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    
    console.log("Force swipe - Current index:", currentIndex);
    console.log("Force swipe - Direction:", direction);
    
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => {
      onSwipeComplete(direction);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const onSwipeComplete = (direction: 'right' | 'left') => {
    const item = topwearProducts[currentIndex];
    
    console.log("Swipe complete - Current index:", currentIndex);
    console.log("Swipe complete - Current product:", item.name);
    console.log("Swipe complete - Total products:", topwearProducts.length);
    
    if (direction === 'right') {
      setLikedProducts([...likedProducts, item.id]);
    }
    
    // Use modulo to create a circular navigation
    const nextIndex = (currentIndex + 1) % topwearProducts.length;
    console.log("Swipe complete - Next index:", nextIndex);
    console.log("Swipe complete - Next product:", topwearProducts[nextIndex].name);
    
    setCurrentIndex(nextIndex);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-30deg', '0deg', '30deg'],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  const handleLike = () => {
    const item = topwearProducts[currentIndex];
    setLikedProducts([...likedProducts, item.id]);
    forceSwipe('right');
  };

  const toggleLikedProducts = () => {
    setShowLikedProducts(!showLikedProducts);
  };

  const renderLikedProducts = () => {
    if (!showLikedProducts) return null;

    const likedItems = topwearProducts.filter(product => 
      likedProducts.includes(product.id)
    );

    return (
      <View style={styles.likedProductsContainer}>
        <Text style={styles.likedProductsTitle}>Liked Products</Text>
        {likedItems.length === 0 ? (
          <Text style={styles.noLikedProducts}>No liked products yet</Text>
        ) : (
          <ScrollView style={styles.likedProductsList}>
            {likedItems.map(product => (
              <View key={product.id} style={styles.likedProductItem}>
                <Image 
                  source={product.image} 
                  style={styles.likedProductImage}
                  resizeMode="cover"
                />
                <View style={styles.likedProductInfo}>
                  <Text style={styles.likedProductName}>{product.name}</Text>
                  <Text style={styles.likedProductPrice}>₹{product.price}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    );
  };

  const renderCard = () => {
    console.log("Current index:", currentIndex);
    console.log("Total products:", topwearProducts.length);
    console.log("Current product:", topwearProducts[currentIndex]?.name);
    
    // Force the currentIndex to be within bounds
    const safeIndex = currentIndex % topwearProducts.length;
    const product = topwearProducts[safeIndex];
    
    console.log("Rendering product:", product.name);
    
    // Special check for the third product
    if (safeIndex === 2) {
      console.log("Rendering the third product (Twisted Split Front Tube Top)");
      console.log("Image path:", product.image);
    }
    
    return (
      <Animated.View
        style={[styles.card, getCardStyle()]}
        {...panResponder.panHandlers}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.cardContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.imageContainer}>
            <Image 
              source={product.image} 
              style={styles.productImage}
              resizeMode="cover"
            />
            <Pressable 
              style={styles.cardLikeButton}
              onPress={handleLike}
            >
              <Ionicons name="heart" size={24} color="#FF4B6A" />
            </Pressable>
          </View>
          
          {product.isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>New Arrival</Text>
            </View>
          )}
          
          <View style={styles.productInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.productName}>{product.name}</Text>
              {product.isVerified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>✓</Text>
                </View>
              )}
            </View>
            
            <Text style={styles.brandText}>{product.brand}</Text>
            
            {product.rating && (
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{product.rating} out of 5 star rating</Text>
                <Text style={styles.reviewCountText}>({product.reviewCount})</Text>
              </View>
            )}
            
            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹{product.price}</Text>
              <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Color</Text>
              <Text style={styles.sectionText}>{product.color}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Size</Text>
              <View style={styles.sizeContainer}>
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <Pressable key={size} style={styles.sizeButton}>
                    <Text style={styles.sizeText}>{size}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {currentIndex === 0 ? (
              <View style={styles.secondaryImageContainer}>
                <Image 
                  source={require('./assets/Twisted Split Front Tube Top(1).webp')} 
                  style={styles.secondaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : currentIndex === 1 ? (
              <View style={styles.secondaryImageContainer}>
                <Image 
                  source={require('./assets/Eira Sheer Lace Tank Top(1).webp')} 
                  style={styles.secondaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : currentIndex === 2 ? (
              <View style={styles.secondaryImageContainer}>
                <Image 
                  source={require('./assets/Massie Tailored Button Up Shirt(main).webp')} 
                  style={styles.secondaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : currentIndex === 3 ? (
              <View style={styles.secondaryImageContainer}>
                <Image 
                  source={require('./assets/Twisted Split Front Tube Top(1).webp')} 
                  style={styles.secondaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : currentIndex === 4 ? (
              <View style={styles.secondaryImageContainer}>
                <Image 
                  source={require('./assets/Twisted Split Front Tube Top(1).webp')} 
                  style={styles.secondaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : currentIndex === 5 ? (
              <View style={styles.secondaryImageContainer}>
                <Image 
                  source={require('./assets/Eira Sheer Lace Tank Top(1).webp')} 
                  style={styles.secondaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View style={styles.secondaryImageContainer}>
                <Image 
                  source={require('./assets/Massie Tailored Button Up Shirt(main).webp')} 
                  style={styles.secondaryImage}
                  resizeMode="cover"
                />
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.descriptionText}>{product.description}</Text>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Product Details</Text>
              {product.details.map((detail, index) => (
                <Text key={index} style={styles.detailText}>• {detail}</Text>
              ))}
            </View>
            
            {currentIndex === 0 ? (
              <View style={styles.tertiaryImageContainer}>
                <Image 
                  source={require('./assets/Twisted Split Front Tube Top(2).webp')} 
                  style={styles.tertiaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : currentIndex === 1 ? (
              <View style={styles.tertiaryImageContainer}>
                <Image 
                  source={require('./assets/Eira Sheer Lace Tank Top(2).webp')} 
                  style={styles.tertiaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : currentIndex === 2 ? (
              <View style={styles.tertiaryImageContainer}>
                <Image 
                  source={require('./assets/Twisted Split Front Tube Top(2).webp')} 
                  style={styles.tertiaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : currentIndex === 3 ? (
              <View style={styles.tertiaryImageContainer}>
                <Image 
                  source={require('./assets/Twisted Split Front Tube Top(2).webp')} 
                  style={styles.tertiaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : currentIndex === 4 ? (
              <View style={styles.tertiaryImageContainer}>
                <Image 
                  source={require('./assets/Twisted Split Front Tube Top(2).webp')} 
                  style={styles.tertiaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : currentIndex === 5 ? (
              <View style={styles.tertiaryImageContainer}>
                <Image 
                  source={require('./assets/Eira Sheer Lace Tank Top(2).webp')} 
                  style={styles.tertiaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View style={styles.tertiaryImageContainer}>
                <Image 
                  source={require('./assets/Massie Tailored Button Up Shirt(main).webp')} 
                  style={styles.tertiaryImage}
                  resizeMode="cover"
                />
              </View>
            )}

            {currentIndex === 0 ? (
              <View style={styles.quaternaryImageContainer}>
                <Image 
                  source={require('./assets/Twisted Split Front Tube Top(3).webp')} 
                  style={styles.quaternaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : currentIndex === 1 ? (
              <View style={styles.quaternaryImageContainer}>
                <Image 
                  source={require('./assets/Eira Sheer Lace Tank Top(3).webp')} 
                  style={styles.quaternaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : currentIndex === 2 ? (
              <View style={styles.quaternaryImageContainer}>
                <Image 
                  source={require('./assets/Twisted Split Front Tube Top(4).webp')} 
                  style={styles.quaternaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : currentIndex === 3 ? (
              <View style={styles.quaternaryImageContainer}>
                <Image 
                  source={require('./assets/Twisted Split Front Tube Top(4).webp')} 
                  style={styles.quaternaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : currentIndex === 4 ? (
              <View style={styles.quaternaryImageContainer}>
                <Image 
                  source={require('./assets/Twisted Split Front Tube Top(4).webp')} 
                  style={styles.quaternaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : currentIndex === 5 ? (
              <View style={styles.quaternaryImageContainer}>
                <Image 
                  source={require('./assets/Eira Sheer Lace Tank Top(3).webp')} 
                  style={styles.quaternaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View style={styles.quaternaryImageContainer}>
                <Image 
                  source={require('./assets/Massie Tailored Button Up Shirt(main).webp')} 
                  style={styles.quaternaryImage}
                  resizeMode="cover"
                />
              </View>
            )}

            {currentIndex === 0 ? (
              <View style={styles.quinaryImageContainer}>
                <Image 
                  source={require('./assets/Twisted Split Front Tube Top(4).webp')} 
                  style={styles.quinaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : currentIndex === 1 ? (
              <View style={styles.quinaryImageContainer}>
                <Image 
                  source={require('./assets/Eira Sheer Lace Tank Top(4).webp')} 
                  style={styles.quinaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : currentIndex === 2 ? (
              <View style={styles.quinaryImageContainer}>
                <Image 
                  source={require('./assets/Twisted Split Front Tube Top(3).webp')} 
                  style={styles.quinaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : currentIndex === 3 ? (
              <View style={styles.quinaryImageContainer}>
                <Image 
                  source={require('./assets/Twisted Split Front Tube Top(3).webp')} 
                  style={styles.quinaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : currentIndex === 4 ? (
              <View style={styles.quinaryImageContainer}>
                <Image 
                  source={require('./assets/Twisted Split Front Tube Top(3).webp')} 
                  style={styles.quinaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : currentIndex === 5 ? (
              <View style={styles.quinaryImageContainer}>
                <Image 
                  source={require('./assets/Eira Sheer Lace Tank Top(4).webp')} 
                  style={styles.quinaryImage}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View style={styles.quinaryImageContainer}>
                <Image 
                  source={require('./assets/Massie Tailored Button Up Shirt(main).webp')} 
                  style={styles.quinaryImage}
                  resizeMode="cover"
                />
              </View>
            )}

            <Pressable style={styles.addToBagButton}>
              <Ionicons name="cart" size={24} color="#fff" />
              <Text style={styles.addToBagText}>Add to Bag</Text>
            </Pressable>
          </View>
        </ScrollView>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable 
            style={styles.headerButton}
            onPress={() => router.push('/')}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>
          <Text style={styles.headerTitle}>Top Wear</Text>
        </View>
        <View style={styles.headerButtons}>
          <Pressable 
            style={styles.headerButton}
            onPress={toggleLikedProducts}
          >
            <Ionicons name="list" size={24} color="#000" />
          </Pressable>
          <Pressable 
            style={styles.headerButton}
            onPress={goToPreviousProduct}
            disabled={currentIndex === 0}
          >
            <Ionicons name="chevron-back" size={24} color={currentIndex === 0 ? '#ccc' : '#000'} />
          </Pressable>
        </View>
      </View>
      
      <View style={styles.cardContainer}>
        {renderCard()}
      </View>

      {renderLikedProducts()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  headerButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  card: {
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_HEIGHT * 0.95,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'absolute',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    left: 0,
    right: 0,
    marginHorizontal: '2.5%',
  },
  cardContent: {
    flex: 1,
  },
  imageContainer: {
    height: SCREEN_HEIGHT * 0.75,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  newBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#FFE4B5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  newBadgeText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  productInfo: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 100,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  productName: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  verifiedBadge: {
    backgroundColor: '#1DA1F2',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  brandText: {
    color: '#666',
    fontSize: 16,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#666',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  sizeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  sizeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 16,
  },
  addToBagButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    gap: 8,
    marginTop: 16,
  },
  addToBagText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMoreCardsText: {
    color: '#666',
    fontSize: 18,
    marginBottom: 16,
  },
  resetButton: {
    backgroundColor: '#1DA1F2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryImageContainer: {
    height: SCREEN_HEIGHT * 0.65,
    marginVertical: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  secondaryImage: {
    width: '100%',
    height: '100%',
  },
  tertiaryImageContainer: {
    height: SCREEN_HEIGHT * 0.65,
    marginVertical: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tertiaryImage: {
    width: '100%',
    height: '100%',
  },
  quaternaryImageContainer: {
    height: SCREEN_HEIGHT * 0.65,
    marginVertical: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  quaternaryImage: {
    width: '100%',
    height: '100%',
  },
  quinaryImageContainer: {
    height: SCREEN_HEIGHT * 0.65,
    marginVertical: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  quinaryImage: {
    width: '100%',
    height: '100%',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  reviewCountText: {
    fontSize: 14,
    color: '#666',
  },
  cardLikeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  likedProductsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    zIndex: 100,
    padding: 16,
  },
  likedProductsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  noLikedProducts: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 32,
  },
  likedProductsList: {
    flex: 1,
  },
  likedProductItem: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  likedProductImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  likedProductInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  likedProductName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  likedProductPrice: {
    fontSize: 14,
    color: '#666',
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
}); 