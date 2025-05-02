import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Heart, ShoppingBag, Share2 } from 'lucide-react-native';

const { width } = Dimensions.get('window');

type BaseProduct = {
  id: number;
  name: string;
  price: number;
  images: any[];
  color: string;
};

type DressProduct = BaseProduct & {
  description: string;
  details: string[];
};

type SweaterProduct = BaseProduct & {
  originalPrice: number;
  rating: number;
  reviews: number;
};

type SkortProduct = BaseProduct & {
  originalPrice: number;
  details: string[];
  care: string;
  rating: number;
  reviews: number;
};

type Product = DressProduct | SweaterProduct | SkortProduct;

const products: Record<number, Product> = {
  1: {
    id: 1,
    name: 'Elegant Bowknot Backless A-Line',
    price: 2499,
    images: [
      require('../assets/Elegant Bowknot Backless A-Line.jpg'),
    ],
    color: 'Black',
    description: 'Turn heads this season with this high-end summer graduation dress featuring a flattering square neckline, elegant bowknot back, and a sexy backless design.',
    details: [
      'Square neckline',
      'Bowknot back detail',
      'Backless design',
      'A-line silhouette',
      'Mini length',
      'Perfect for graduation, date nights, and parties'
    ]
  },
  2: {
    id: 2,
    name: 'Knit Bow Cropped Sweater',
    price: 1400,
    originalPrice: 6900,
    images: [
      require('../assets/Knit Bow Cropped Sweater.webp'),
    ],
    color: 'Cream',
    rating: 4.9,
    reviews: 35
  },
  3: {
    id: 3,
    name: 'Asymmetric Layered Lace Mesh Mini Skort',
    price: 3300,
    originalPrice: 6600,
    images: [
      require('../assets/Asymmetric Layered Lace Mesh Mini Skort.webp'),
      require('../assets/Asymmetric Layered Lace Mesh Mini Skort(1).webp'),
      require('../assets/Asymmetric Layered Lace Mesh Mini Skort(2).webp'),
      require('../assets/Asymmetric Layered Lace Mesh Mini Skort(3).webp'),
      require('../assets/Asymmetric Layered Lace Mesh Mini Skort(4).webp'),
    ],
    color: 'sage',
    details: [
      'Mini skort',
      'Ruched waistband',
      'Asymmetric hem',
      'Layered design',
      'Lace & mesh fabric',
      'Polyester',
      'Model wears size S',
      'Model height is 5\'9'
    ],
    care: 'Machine wash at maximum 30ºC, do not bleach, do not tumble dry, iron at a maximum of 110ºC, do not dry clean',
    rating: 4.8,
    reviews: 42
  }
};

const isDressProduct = (product: Product): product is DressProduct => {
  return 'description' in product;
};

const isSkortProduct = (product: Product): product is SkortProduct => {
  return 'care' in product;
};

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('XS');
  const [isLiked, setIsLiked] = useState(false);

  const productId = typeof id === 'string' ? parseInt(id, 10) : (Array.isArray(id) ? parseInt(id[0], 10) : 1);
  const product = products[productId];

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.iconButton}>
            <ChevronLeft size={24} color="#000" />
          </Pressable>
          <View style={styles.headerRight}>
            <Pressable style={styles.iconButton} onPress={() => setIsLiked(!isLiked)}>
              <Heart 
                size={24} 
                color={isLiked ? '#FF4081' : '#000'}
                fill={isLiked ? '#FF4081' : 'none'}
              />
            </Pressable>
            <Pressable style={styles.iconButton}>
              <Share2 size={24} color="#000" />
            </Pressable>
          </View>
        </View>

        {/* Image Gallery */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const offset = e.nativeEvent.contentOffset.x;
            setCurrentImageIndex(Math.round(offset / width));
          }}
          scrollEventThrottle={16}
        >
          {product.images.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={styles.productImage}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* Image Pagination Dots */}
        <View style={styles.paginationDots}>
          {product.images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentImageIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{product.price}</Text>
            {'originalPrice' in product && (
              <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
            )}
          </View>

          {product.color && (
            <View style={styles.colorSection}>
              <Text style={styles.sectionTitle}>Color</Text>
              <Text style={styles.colorText}>{product.color}</Text>
            </View>
          )}

          {isSkortProduct(product) && (
            <>
              <View style={styles.sizeSection}>
                <Text style={styles.sectionTitle}>Size</Text>
                <View style={styles.sizeButtons}>
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                    <Pressable
                      key={size}
                      style={[
                        styles.sizeButton,
                        selectedSize === size && styles.sizeButtonActive,
                      ]}
                      onPress={() => setSelectedSize(size)}
                    >
                      <Text style={[
                        styles.sizeButtonText,
                        selectedSize === size && styles.sizeButtonTextActive,
                      ]}>
                        {size}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                <Pressable style={styles.sizeChartButton}>
                  <Text style={styles.sizeChartText}>Size Chart</Text>
                </Pressable>
              </View>

              <View style={styles.deliverySection}>
                <Text style={styles.sectionTitle}>Estimated delivery</Text>
                <Text style={styles.deliveryText}>April 25th</Text>
              </View>
            </>
          )}

          {('details' in product) && (
            <View style={styles.detailsSection}>
              <Text style={styles.sectionTitle}>Product Details</Text>
              <View style={styles.detailsList}>
                {product.details.map((detail: string, index: number) => (
                  <Text key={index} style={styles.detailItem}>• {detail}</Text>
                ))}
              </View>
            </View>
          )}

          {isSkortProduct(product) && (
            <View style={styles.careSection}>
              <Text style={styles.sectionTitle}>Item care</Text>
              <Text style={styles.careText}>{product.care}</Text>
            </View>
          )}

          {isDressProduct(product) && (
            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.descriptionText}>{product.description}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.addToCartButton}>
          <ShoppingBag size={20} color="#fff" />
          <Text style={styles.addToCartText}>Add to bag</Text>
        </Pressable>
      </View>
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
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: width,
    height: width * 1.3,
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  activeDot: {
    backgroundColor: '#FF4081',
    width: 24,
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FF4081',
  },
  originalPrice: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  colorSection: {
    marginBottom: 24,
  },
  colorText: {
    fontSize: 16,
    color: '#666',
  },
  sizeSection: {
    marginBottom: 24,
  },
  sizeButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  sizeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sizeButtonActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  sizeButtonText: {
    fontSize: 14,
    color: '#000',
  },
  sizeButtonTextActive: {
    color: '#fff',
  },
  sizeChartButton: {
    alignSelf: 'flex-start',
  },
  sizeChartText: {
    color: '#666',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  deliverySection: {
    marginBottom: 24,
  },
  deliveryText: {
    fontSize: 16,
    color: '#666',
  },
  detailsSection: {
    marginBottom: 24,
  },
  detailsList: {
    gap: 8,
  },
  detailItem: {
    fontSize: 16,
    color: '#666',
  },
  careSection: {
    marginBottom: 24,
  },
  careText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addToCartButton: {
    backgroundColor: '#FF4081',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
}); 