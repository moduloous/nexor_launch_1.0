import React, { useState, useRef, useEffect } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 300;

type Product = {
  id: number;
  name: string;
  image: any;
  price: number;
  originalPrice: number;
  description?: string;
  color: string;
  details: string[];
  care: string[];
  brand: string;
  rating?: number;
  reviewCount?: number;
  firstImage?: any;
  secondImage?: any;
  thirdImage?: any;
  fourthImage?: any;
  groupId?: string;
};

export default function DressesScreen() {
  const router = useRouter();
  const [dressesProducts, setDressesProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const position = useRef(new Animated.ValueXY()).current;
  const dressesProductsRef = useRef<Product[]>([]);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    async function fetchDresses() {
      setIsLoading(true);
      setHasError(false);
      try {
        const response = await fetch('https://ajfonpzetlpmenxemofe.supabase.co/rest/v1/dress', {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZm9ucHpldGxwbWVueGVtb2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NjI2OTMsImV4cCI6MjA2MTQzODY5M30.qHwXGZw6A2wFc5qXCICGzGcesmGcvNfAvWlExeQJ620',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZm9ucHpldGxwbWVueGVtb2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NjI2OTMsImV4cCI6MjA2MTQzODY5M30.qHwXGZw6A2wFc5qXCICGzGcesmGcvNfAvWlExeQJ620',
          },
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const mapped = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          image: { uri: item.image },
          price: Number(item.price),
          originalPrice: Number(item.originalPrice),
          color: item.color,
          details: item.details ? item.details.split(/\||\n/) : [],
          care: item.care ? item.care.split(/\||\n/) : [],
          brand: item.brand || '',
          firstImage: item['1st image'] ? { uri: item['1st image'] } : undefined,
          secondImage: item['2nd image'] ? { uri: item['2nd image'] } : undefined,
          thirdImage: item['3rd image'] ? { uri: item['3rd image'] } : undefined,
          fourthImage: item['4th image'] ? { uri: item['4th image'] } : undefined,
          groupId: item.groupId || item.groupid,
        }));
        setDressesProducts(mapped);
      } catch (e) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDresses();
  }, []);

  useEffect(() => {
    dressesProductsRef.current = dressesProducts;
  }, [dressesProducts]);

  // After fetching all products, create a uniqueProducts array for swiping
  const uniqueProducts: Product[] = React.useMemo(() => {
    const seen = new Set<string>();
    return dressesProducts.filter((product) => {
      const groupKey = product.groupId || String(product.id);
      if (seen.has(groupKey)) return false;
      seen.add(groupKey);
      return true;
    });
  }, [dressesProducts]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const safeIndex = currentIndex % uniqueProducts.length;
  const product = uniqueProducts[safeIndex];

  // State for selected variant (for Clea Open Back Maxi Dress)
  const [selectedProduct, setSelectedProduct] = useState(product);
  useEffect(() => {
    setSelectedProduct(product);
  }, [product]);

  // Group products by groupId for variant selection
  const grouped: Record<string, Product[]> = dressesProducts.reduce((acc, product) => {
    const groupKey = product.groupId || '';
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  // Helper to map color names to hex (add more as needed)
  const colorMap: Record<string, string> = {
    red: '#FF2D55',
    hamra: '#E57342',
    black: '#000',
    white: '#fff',
    brown: '#8B4513',
    navy: '#001F6D',
    orange: '#FFA500',
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
      onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: 0 });
      },
      onPanResponderRelease: (_, gesture) => {
        console.log('Pan released', gesture.dx, { currentIndex, length: uniqueProducts.length });
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
    const productsLength = dressesProductsRef.current.length;
    if (!productsLength) return;
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
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
    const productsLength = dressesProductsRef.current.length;
    if (!productsLength || productsLength === 1) return;
    setCurrentIndex(prev => {
      const next =
        direction === 'right'
          ? (prev + 1) % productsLength
          : (prev - 1 + productsLength) % productsLength;
      console.log('Swiped', direction, 'from', prev, 'to', next, 'length', productsLength);
      return next;
    });
  };

  const goToPreviousProduct = () => {
    forceSwipe('left');
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

  const renderCard = () => {
    if (isLoading) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading...</Text></View>;
    if (hasError) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Failed to load dresses.</Text></View>;
    if (!uniqueProducts.length) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>No dresses found.</Text></View>;
    const safeIndex = currentIndex % uniqueProducts.length;
    const product = uniqueProducts[safeIndex];
    console.log('currentIndex', currentIndex, 'safeIndex', safeIndex, 'uniqueProducts.length', uniqueProducts.length);
    if (!product) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>No product found.</Text></View>;

    // If Clea Open Back Maxi Dress or Cupped Drop Waist Mini Dress, show color swatches and use selectedProduct
    if (selectedProduct && (
      selectedProduct.name.trim().startsWith('Clea Open Back Maxi Dress') ||
      selectedProduct.name.trim().startsWith('Cupped Drop Waist Mini Dress')
    )) {
      const groupKey = selectedProduct.groupId || String(selectedProduct.id);
      const currentGroup = (grouped[groupKey] || []).filter(variant => variant.groupId === selectedProduct.groupId);
      const validVariants = currentGroup.filter(variant => {
        const c = (variant.color || '').toLowerCase().trim();
        if (!c || c === 'white') return false;
        const resolved = (colorMap[c] || c);
        if (resolved === '#fff' || resolved === 'white') return false;
        return true;
      });
      return (
        <Animated.View style={[styles.card, getCardStyle()]} {...panResponder.panHandlers}>
          <ScrollView style={styles.cardContent} showsVerticalScrollIndicator={false} bounces={false}>
            {/* Main image at the top */}
            <View style={styles.imageContainer}>
              <Image
                source={selectedProduct.image}
                style={styles.productImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.productInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.productName}>{selectedProduct.name}</Text>
              </View>
              <View style={{ height: 4 }} />
              <View style={styles.priceContainer}>
                <Text style={styles.price}>₹{selectedProduct.price}</Text>
                <Text style={styles.originalPrice}>₹{selectedProduct.originalPrice}</Text>
              </View>
              {/* Color label and swatch UI (filter out empty/white) */}
              <View style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
                  Color / <Text style={{ color: '#000' }}>{selectedProduct.color?.charAt(0).toUpperCase() + selectedProduct.color?.slice(1)}</Text>
                </Text>
                <View style={{ flexDirection: 'row', gap: 16, marginBottom: 8 }}>
                  {validVariants.map((variant: Product) => (
                    <Pressable
                      key={variant.id + variant.color}
                      onPress={() => setSelectedProduct(variant)}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        borderWidth: selectedProduct.id === variant.id && selectedProduct.color === variant.color ? 3 : 1,
                        borderColor: selectedProduct.id === variant.id && selectedProduct.color === variant.color ? '#222' : '#ccc',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 8,
                      }}
                    >
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          backgroundColor: colorMap[variant.color.toLowerCase()] || variant.color,
                        }}
                      />
                    </Pressable>
                  ))}
                </View>
              </View>
              {/* Size Section */}
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
              {/* First image after color swatches, before product details, only if different from main image */}
              {selectedProduct.firstImage && selectedProduct.firstImage.uri !== selectedProduct.image?.uri && (
                <View style={styles.secondaryImageContainer}>
                  <Image source={selectedProduct.firstImage} style={styles.productImage} resizeMode="cover" />
                </View>
              )}
              {/* Product Details, Care, Images, etc. for selectedProduct */}
              {/* Render first image (skip, already shown as main) */}
              {/* Product Details Section (between 1st and 2nd image) */}
              {(selectedProduct.details && selectedProduct.details.length > 0) && (
                <View className="details-between-images">
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Product Details</Text>
                    {selectedProduct.details.map((detail, index) => (
                      <Text key={index} style={styles.detailText}>• {detail}</Text>
                    ))}
                  </View>
                </View>
              )}
              {/* Care Section (below product details, before 2nd image) */}
              {(selectedProduct.care && selectedProduct.care.length > 0) && (
                <View className="care-between-images">
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Care</Text>
                    {selectedProduct.care.map((item, idx) => (
                      <Text key={idx} style={styles.detailText}>• {item.replace(/^Item care: ?/, '')}</Text>
                    ))}
                  </View>
                </View>
              )}
              {/* Render 2nd, 3rd, 4th images */}
              {[selectedProduct.secondImage, selectedProduct.thirdImage, selectedProduct.fourthImage]
                .filter(img => img && img.uri)
                .map((img, idx) => (
                  <View key={idx} style={styles.secondaryImageContainer}>
                    <Image source={img} style={styles.productImage} resizeMode="cover" />
                  </View>
                ))}
              {/* Add to Bag Button */}
              <Pressable style={styles.addToBagButton} onPress={() => {}}>
                <Ionicons name="cart" size={24} color="#fff" />
                <Text style={styles.addToBagText}>Add to Bag</Text>
              </Pressable>
              <View style={{ height: 32 }} />
            </View>
          </ScrollView>
        </Animated.View>
      );
    }
    // ... fallback: render as before for other products ...
    return (
      <Animated.View style={[styles.card, getCardStyle()]} {...panResponder.panHandlers}>
        <ScrollView style={styles.cardContent} showsVerticalScrollIndicator={false} bounces={false}>
          <View style={styles.imageContainer}>
            <Image
              source={product.image}
              style={styles.productImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.productInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.productName}>{product.name}</Text>
            </View>
            <View style={{ height: 4 }} />
            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹{product.price}</Text>
              <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
            </View>
            {/* Color Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Color</Text>
              <Text style={styles.sectionText}>{product.color}</Text>
            </View>
            {/* Size Section */}
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
            {/* Render first image */}
            {[product.firstImage]
              .filter(img => img && img.uri)
              .map((img, idx) => (
                <View key={idx} style={styles.secondaryImageContainer}>
                  <Image source={img} style={styles.productImage} resizeMode="cover" />
                </View>
              ))}
            {/* Product Details Section (between 1st and 2nd image) */}
            {(product.details && product.details.length > 0) && (
              <View className="details-between-images">
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Product Details</Text>
                  {product.details.map((detail, index) => (
                    <Text key={index} style={styles.detailText}>• {detail}</Text>
                  ))}
                </View>
              </View>
            )}
            {/* Care Section (below product details, before 2nd image) */}
            {(product.care && product.care.length > 0) && (
              <View className="care-between-images">
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Care</Text>
                  {product.care.map((item, idx) => (
                    <Text key={idx} style={styles.detailText}>• {item.replace(/^Item care: ?/, '')}</Text>
                  ))}
                </View>
              </View>
            )}
            {/* Render 2nd, 3rd, 4th images */}
            {[product.secondImage, product.thirdImage, product.fourthImage]
              .filter(img => img && img.uri)
              .map((img, idx) => (
                <View key={idx} style={styles.secondaryImageContainer}>
                  <Image source={img} style={styles.productImage} resizeMode="cover" />
                </View>
              ))}
            {/* Add to Bag Button */}
            <Pressable style={styles.addToBagButton} onPress={() => {}}>
              <Ionicons name="cart" size={24} color="#fff" />
              <Text style={styles.addToBagText}>Add to Bag</Text>
            </Pressable>
            <View style={{ height: 32 }} />
          </View>
        </ScrollView>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 0, margin: 0 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => router.push('/')} style={styles.headerButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>
          <Text style={styles.headerTitle}>Dresses</Text>
        </View>
        <View style={styles.headerButtons}>
          <Pressable 
            onPress={goToPreviousProduct}
            style={styles.headerButton}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>
          <Pressable style={styles.headerButton}>
            <Ionicons name="list" size={24} color="#000" />
          </Pressable>
        </View>
      </View>
      <View style={styles.cardContainer}>{renderCard()}</View>
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
    height: SCREEN_HEIGHT * 0.8,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productName: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
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
  },
  sizeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  sizeButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
  },
  sizeText: {
    fontSize: 16,
    fontWeight: 'bold',
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
  productInfo: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  descriptionText: {
    fontSize: 16,
    color: '#666',
  },
  detailText: {
    fontSize: 16,
    color: '#666',
  },
  secondaryImageContainer: {
    height: SCREEN_HEIGHT * 0.8,
    marginVertical: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
}); 