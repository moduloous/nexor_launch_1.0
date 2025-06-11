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
import { ArrowLeft, Heart, ShoppingBag, Share2 } from 'lucide-react-native';

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

type JeansProduct = BaseProduct & {
  originalPrice: number;
  details: string[];
  care: string;
};

type Product = DressProduct | SweaterProduct | SkortProduct | JeansProduct;

const products: Record<number, Product> = {
  1: {
    id: 1,
    name: 'Ery Wide Leg Mid Rise Jeans',
    price: 5700,
    originalPrice: 9500,
    images: [
      require('../assets/Ery Wide Leg Mid Rise Jeans.webp'),
    ],
    color: 'Blue',
    details: [
      'Jeans',
      'Mid rise waist',
      'Wide leg fit',
      'Denim fabric',
      '100% Cotton',
      'Model wears size S',
      'Inseam of size S (in): 30.71',
      'Model height is 5\'9'
    ],
    care: 'Machine wash at maximum 30ºC, do not bleach, tumble dry low, iron at a maximum of 110ºC, do not dry clean'
  },
  2: {
    id: 2,
    name: 'Varsity Cropped Sweater',
    price: 3000,
    originalPrice: 7500,
    images: [
      require('../assets/Varsity Cropped Sweater.webp'),
    ],
    color: 'Cream',
    details: [
      'Sweater',
      'Cropped fit',
      'Knit graphic',
      'Acrylic',
      'Model wears size S',
      'Model height is 5\'6'
    ],
    care: 'Machine wash at maximum 30ºC, do not bleach, do not tumble dry, iron at a maximum of 110ºC, do not dry clean'
  },
  3: {
    id: 3,
    name: 'Contrast Layered Look Halter Mini Dress',
    price: 2400,
    originalPrice: 4000,
    images: [
      require('../assets/Contrast Layered Look Halter Mini Dress.webp'),
    ],
    color: 'Black',
    details: [
      'Mini dress',
      'Adjustable straps',
      'Contrast halter tie closure',
      'Contrast trim',
      'Layered look',
      'Cotton, Spandex',
      'Model wears size S',
      'Model height is 5\'10'
    ],
    care: 'Machine wash at maximum 30ºC, wash with similar colors, do not bleach, do not tumble dry, iron at a maximum of 110ºC, do not dry clean'
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

      {/* Fixed Top Navigation Bar */}
      <View style={styles.topNavBar}>
        <View style={styles.leftSection}>
          <Pressable onPress={() => router.back()} style={styles.iconButton}>
            <ArrowLeft size={24} color="#000" />
          </Pressable>
          <Text style={styles.navTitle}>Summer Collection</Text>
        </View>
        <View style={styles.headerRight}>
          <Pressable style={styles.iconButton} onPress={() => setIsLiked(!isLiked)}>
            <Heart 
              size={24} 
              color={isLiked ? '#000' : '#000'}
              fill={isLiked ? '#000' : 'none'}
            />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Share2 size={24} color="#000" />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
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
          </View>

          {product.id === 2 && (
            <>
              <View style={styles.additionalImageContainer}>
                <Image
                  source={require('./assets/Varsity Cropped Sweater 2.webp')}
                  style={styles.additionalImage}
                  resizeMode="cover"
                />
              </View>

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

              {('care' in product) && (
                <View style={styles.careSection}>
                  <Text style={styles.sectionTitle}>Item care</Text>
                  <Text style={styles.careText}>{product.care}</Text>
                </View>
              )}

              <View style={styles.additionalImageContainer}>
                <Image
                  source={require('./assets/Varsity Cropped Sweater 1.webp')}
                  style={styles.additionalImage}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.additionalImageContainer}>
                <Image
                  source={require('./assets/Varsity Cropped Sweater 3.jpg')}
                  style={styles.additionalImage}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.additionalImageContainer}>
                <Image
                  source={require('./assets/Varsity Cropped Sweater 4.webp')}
                  style={styles.additionalImage}
                  resizeMode="cover"
                />
              </View>
            </>
          )}

          {product.id === 3 && (
            <>
              <View style={styles.additionalImageContainer}>
                <Image
                  source={require('./assets/Contrast Layered Look Halter Mini Dress 1.webp')}
                  style={styles.additionalImage}
                  resizeMode="cover"
                />
              </View>

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

              {('care' in product) && (
                <View style={styles.careSection}>
                  <Text style={styles.sectionTitle}>Item care</Text>
                  <Text style={styles.careText}>{product.care}</Text>
                </View>
              )}

              <View style={styles.additionalImageContainer}>
                <Image
                  source={require('./assets/Contrast Layered Look Halter Mini Dress 3.webp')}
                  style={styles.additionalImage}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.additionalImageContainer}>
                <Image
                  source={require('./assets/Contrast Layered Look Halter Mini Dress 2.webp')}
                  style={styles.additionalImage}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.additionalImageContainer}>
                <Image
                  source={require('./assets/Contrast Layered Look Halter Mini Dress 4.webp')}
                  style={styles.additionalImage}
                  resizeMode="cover"
                />
              </View>
            </>
          )}

          {product.id === 1 && (
            <>
              <View style={styles.additionalImageContainer}>
                <Image
                  source={require('./assets/Ery Wide Leg Mid Rise Jeans 1.jpg')}
                  style={styles.additionalImage}
                  resizeMode="cover"
                />
              </View>

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

              {('care' in product) && (
                <View style={styles.careSection}>
                  <Text style={styles.sectionTitle}>Item care</Text>
                  <Text style={styles.careText}>{product.care}</Text>
                </View>
              )}

              <View style={styles.additionalImageContainer}>
                <Image
                  source={require('./assets/Ery Wide Leg Mid Rise Jeans 2.webp')}
                  style={styles.additionalImage}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.additionalImageContainer}>
                <Image
                  source={require('./assets/Ery Wide Leg Mid Rise Jeans 3.jpg')}
                  style={styles.additionalImage}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.additionalImageContainer}>
                <Image
                  source={require('./assets/Ery Wide Leg Mid Rise Jeans 4.webp')}
                  style={styles.additionalImage}
                  resizeMode="cover"
                />
              </View>
            </>
          )}

          {product.id !== 1 && product.id !== 2 && product.id !== 3 && (
            <>
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

              {('care' in product) && (
                <View style={styles.careSection}>
                  <Text style={styles.sectionTitle}>Item care</Text>
                  <Text style={styles.careText}>{product.care}</Text>
                </View>
              )}
            </>
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
  topNavBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: 40,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -4,
  },
  productImage: {
    width: width,
    height: width * 1.5,
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
    color: '#000',
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
    backgroundColor: '#000',
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
  additionalImageContainer: {
    marginBottom: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
  additionalImage: {
    width: '100%',
    height: width * 1.5,
  },
}); 