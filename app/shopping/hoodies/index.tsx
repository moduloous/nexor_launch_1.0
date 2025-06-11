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
  Modal,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, ArrowLeft, ShoppingBag, List } from 'lucide-react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 0.10 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 300;

type Product = {
  id: number;
  name: string;
  image: any;
  price: number;
  originalPrice: number;
  color: string;
  details: string[];
  care: string[];
  brand: string;
  firstImage?: { uri: string };
  secondImage?: { uri: string };
  thirdImage?: { uri: string };
  fourthImage?: { uri: string };
};

export default function HoodiesScreen() {
  const router = useRouter();
  const [hoodiesProducts, setHoodiesProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const hoodiesProductsRef = useRef<Product[]>([]);
  const [isPreviewModalVisible, setPreviewModalVisible] = useState(false);
  const [previewImageUri, setPreviewImageUri] = useState<string | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const lastTap = useRef<number>(0);

  useEffect(() => {
    async function fetchHoodies() {
      setIsLoading(true);
      setHasError(false);
      try {
        const response = await fetch('https://ajfonpzetlpmenxemofe.supabase.co/rest/v1/Hoddies', {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZm9ucHpldGxwbWVueGVtb2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NjI2OTMsImV4cCI6MjA2MTQzODY5M30.qHwXGZw6A2wFc5qXCICGzGcesmGcvNfAvWlExeQJ620',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZm9ucHpldGxwbWVueGVtb2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NjI2OTMsImV4cCI6MjA2MTQzODY5M30.qHwXGZw6A2wFc5qXCICGzGcesmGcvNfAvWlExeQJ620',
          },
        });
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
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
        }));
        setHoodiesProducts(mapped);
      } catch (e) {
        console.log('Fetch error:', e);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHoodies();
  }, []);

  useEffect(() => {
    hoodiesProductsRef.current = hoodiesProducts;
  }, [hoodiesProducts]);

  // Only reset currentIndex to 0 after the initial data load
  useEffect(() => {
    if (hoodiesProducts.length > 0) setCurrentIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoodiesProducts.length]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
      onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: 0 });
      },
      onPanResponderRelease: (_, gesture) => {
        console.log('Pan released', gesture.dx);
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
    console.log('forceSwipe called', direction);
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
    setCurrentIndex(prev => {
      const productsLength = hoodiesProductsRef.current.length;
      if (!productsLength) return 0;
      const next =
        direction === 'right'
          ? (prev + 1) % productsLength
          : (prev - 1 + productsLength) % productsLength;
      console.log('Swiped', direction, 'from', prev, 'to', next);
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
    if (!hoodiesProducts.length) return null;
    const safeIndex = currentIndex % hoodiesProducts.length;
    const product = hoodiesProducts[safeIndex];
    console.log('currentIndex', currentIndex, 'safeIndex', safeIndex, 'hoodiesProducts.length', hoodiesProducts.length);
    return (
      <Animated.View style={[styles.card, getCardStyle()]} {...panResponder.panHandlers}>
        <ScrollView style={styles.cardContent} showsVerticalScrollIndicator={false} bounces={false}>
          <View style={styles.imageContainer}>
            {product.image && product.image.uri ? (
              <Image
                source={{ uri: product.image.uri }}
                style={styles.productImage}
                resizeMode="cover"
                onError={() => console.log('Image failed to load:', product.image.uri)}
              />
            ) : (
              <View style={[styles.productImage, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee' }]}> 
                <Text>No image</Text>
              </View>
            )}
          </View>
          <View style={styles.productInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.productName}>{product.name}</Text>
            </View>
            <View style={{ height: 12 }} />
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
            {/* Preview Section */}
            {product.firstImage && product.firstImage.uri ? (
              <View style={styles.section}>
                <View style={styles.imageContainer}>
                  <Pressable
                    onPress={() => {
                      console.log('Preview image pressed', product.firstImage?.uri);
                      setPreviewImageUri(product.firstImage?.uri || null);
                      setPreviewModalVisible(true);
                    }}
                    accessibilityRole="imagebutton"
                    accessibilityLabel="View preview image full screen"
                    style={{ flex: 1 }}
                  >
                    <Image
                      source={{ uri: product.firstImage.uri }}
                      style={[styles.productImage, { borderRadius: 16 }]}
                      resizeMode="cover"
                    />
                  </Pressable>
                </View>
              </View>
            ) : null}
            {/* Product Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Product Details</Text>
              {product.details.map((detail: string, index: number) => (
                <Text key={index} style={styles.detailText}>• {detail}</Text>
              ))}
            </View>
            {/* Care Instructions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Care</Text>
              {product.care.map((item: string, idx: number) => (
                <Text key={idx} style={styles.detailText}>• {item}</Text>
              ))}
            </View>
            {/* 2nd Image Preview */}
            {product.secondImage && product.secondImage.uri ? (
              <View style={styles.section}>
                <View style={styles.imageContainer}>
                  <Pressable
                    onPress={() => {
                      setPreviewImageUri(product.secondImage?.uri || null);
                      setPreviewModalVisible(true);
                    }}
                    accessibilityRole="imagebutton"
                    accessibilityLabel="View 2nd image full screen"
                    style={{ flex: 1 }}
                  >
                    <Image
                      source={{ uri: product.secondImage.uri }}
                      style={[styles.productImage, { borderRadius: 16 }]}
                      resizeMode="cover"
                    />
                  </Pressable>
                </View>
              </View>
            ) : null}
            {/* 3rd Image Preview */}
            {product.thirdImage && product.thirdImage.uri ? (
              <View style={styles.section}>
                <View style={styles.imageContainer}>
                  <Pressable
                    onPress={() => {
                      setPreviewImageUri(product.thirdImage?.uri || null);
                      setPreviewModalVisible(true);
                    }}
                    accessibilityRole="imagebutton"
                    accessibilityLabel="View 3rd image full screen"
                    style={{ flex: 1 }}
                  >
                    <Image
                      source={{ uri: product.thirdImage.uri }}
                      style={[styles.productImage, { borderRadius: 16 }]}
                      resizeMode="cover"
                    />
                  </Pressable>
                </View>
              </View>
            ) : null}
            {/* 4th Image Preview */}
            {product.fourthImage && product.fourthImage.uri ? (
              <View style={styles.section}>
                <View style={styles.imageContainer}>
                  <Pressable
                    onPress={() => {
                      setPreviewImageUri(product.fourthImage?.uri || null);
                      setPreviewModalVisible(true);
                    }}
                    accessibilityRole="imagebutton"
                    accessibilityLabel="View 4th image full screen"
                    style={{ flex: 1 }}
                  >
                    <Image
                      source={{ uri: product.fourthImage.uri }}
                      style={[styles.productImage, { borderRadius: 16 }]}
                      resizeMode="cover"
                    />
                  </Pressable>
                </View>
              </View>
            ) : null}
            {/* Add to Bag Button */}
            <Pressable style={styles.addToBagButton} onPress={() => {}}>
              <ShoppingBag size={24} color="#fff" />
              <Text style={styles.addToBagText}>Add to Bag</Text>
            </Pressable>
            <View style={{ height: 32 }} />
          </View>
        </ScrollView>
      </Animated.View>
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading hoodies...</Text>
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Failed to load hoodies. Please try again later.</Text>
      </View>
    );
  }

  if (!hoodiesProducts.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No hoodies found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 0, margin: 0 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => router.back()} style={styles.headerButton}>
            <ArrowLeft size={24} color="#000" />
          </Pressable>
          <Text style={styles.headerTitle}>Hoodies</Text>
        </View>
        <View style={styles.headerButtons}>
          <Pressable 
            onPress={goToPreviousProduct}
            style={styles.headerButton}
          >
            <ArrowLeft size={24} color="#000" />
          </Pressable>
          <Pressable style={styles.headerButton}>
            <List size={24} color="#000" />
          </Pressable>
        </View>
      </View>
      <View style={styles.cardContainer}>{renderCard()}</View>
      <Modal
        visible={isPreviewModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPreviewModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.95)' }}>
          <Pressable
            onPress={() => setPreviewModalVisible(false)}
            style={{ position: 'absolute', top: 48, left: 24, zIndex: 10, padding: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Close preview"
          >
            <ArrowLeft size={32} color="#fff" />
          </Pressable>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable
              onPress={() => {
                const now = Date.now();
                if (lastTap.current && (now - lastTap.current) < 300) {
                  setZoomed(z => !z);
                }
                lastTap.current = now;
              }}
              style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
            >
              {previewImageUri && (
                <Image
                  source={{ uri: previewImageUri }}
                  style={{
                    width: zoomed ? '200%' : '100%',
                    height: zoomed ? 800 : 400,
                    resizeMode: 'contain',
                  }}
                />
              )}
            </Pressable>
          </View>
        </View>
      </Modal>
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
    height: SCREEN_HEIGHT * 0.75,
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
    padding: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    color: '#666',
  },
}); 