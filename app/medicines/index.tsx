import { View, Text, StyleSheet, ScrollView, Pressable, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MainService {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  offer?: string;
  badge?: string;
}

const mainServices: MainService[] = [
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    description: 'Medicines & health products',
    icon: 'document-text-outline',
    color: '#ff6b6b'
  },
  {
    id: 'lab',
    name: 'Lab Tests',
    description: 'Book tests & checkups',
    icon: 'flask-outline',
    color: '#4dabf7',
    offer: 'Up to 60% off'
  },
  {
    id: 'doctor',
    name: 'Consult Doctor',
    description: '24/7 online consultation',
    icon: 'medkit-outline',
    color: '#51cf66',
    badge: '24x7'
  }
];

const advertisements = [
  {
    id: 1,
    title: 'Health Checkup',
    description: 'Complete body checkup starting at ₹999',
    image: { uri: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&h=400&fit=crop' },
    backgroundColor: '#e3fafc'
  },
  {
    id: 2,
    title: 'Apollo Hospital',
    description: 'Book appointments with top doctors',
    image: { uri: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop' },
    backgroundColor: '#fff9db'
  }
];

const categorySections = [
  {
    title: 'Personal Care',
    categories: [
      {
        id: 'skin-care',
        name: 'Skin Care',
        image: require('./assets/skincare.png'),
        products: [
          'Cetaphil Gentle Cleanser',
          'Neutrogena Moisturizer',
          'La Roche-Posay Sunscreen'
        ],
        offer: 'Up to 30% off'
      },
      {
        id: 'men-grooming',
        name: 'Men Grooming',
        image: require('./assets/mengrooming.png'),
        products: [
          'Gillette Fusion Razor',
          'Old Spice Deodorant',
          'Beardo Beard Oil'
        ],
        offer: 'Up to 25% off'
      },
      {
        id: 'women-care',
        name: 'Women Care',
        image: require('./assets/womencare.png'),
        products: [
          'Dove Beauty Bar',
          'Nivea Body Lotion',
          'Lakme Face Cream'
        ],
        offer: 'Up to 35% off'
      }
    ]
  },
  {
    title: 'Health Devices',
    categories: [
      {
        id: 'monitoring',
        name: 'Health Monitors',
        image: require('./assets/healthmoniter.jpg'),
        products: [
          'Omron BP Monitor',
          'Dr Trust Oximeter',
          'OneTouch Glucometer'
        ],
        offer: 'Up to 15% off'
      },
      {
        id: 'first-aid',
        name: 'First Aid',
        image: require('./assets/firstaid.webp'),
        products: [
          'Band-Aid Pack',
          'Dettol Antiseptic',
          'Savlon Spray'
        ],
        offer: 'Starting ₹99'
      },
      {
        id: 'medical-devices',
        name: 'Medical Devices',
        image: require('./assets/medicaldevices.jpg'),
        products: [
          'Dr Morepen Nebulizer',
          'Omron Thermometer',
          'Vissco Support Belt'
        ],
        offer: 'Up to 20% off'
      }
    ]
  },
  {
    title: 'Health Conditions',
    categories: [
      {
        id: 'pain-relief',
        name: 'Pain Relief',
        image: { uri: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=500&h=500&fit=crop' },
        products: [
          'Volini Spray',
          'Moov Pain Gel',
          'Iodex Balm'
        ],
        offer: 'Up to 20% off'
      },
      {
        id: 'diabetes-care',
        name: 'Diabetes Care',
        image: { uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/medicines_icons/diabetes%20care.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpY2luZXNfaWNvbnMvZGlhYmV0ZXMgY2FyZS5wbmciLCJpYXQiOjE3NjIxODg0ODgsImV4cCI6MTc5MzcyNDQ4OH0.IEpY1MsQkENIjHwlXdKOab9cSz4M27FIIrPqTFEuhR8' },
        products: [
          'OneTouch Test Strips',
          'Sugar Free Gold',
          'Dr Morepen Insulin Pen'
        ],
        offer: 'Up to 25% off'
      },
      {
        id: 'skin-infection',
        name: 'Skin Infection',
        image: { uri: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=500&h=500&fit=crop' },
        products: [
          'Betadine Solution',
          'Soframycin Cream',
          'Candid Powder'
        ],
        offer: 'Up to 15% off'
      }
    ]
  },
  {
    title: 'Daily Health',
    categories: [
      {
        id: 'vitamins',
        name: 'Vitamins & Supplements',
        image: { uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/medicines_icons/vitaminsandsup.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpY2luZXNfaWNvbnMvdml0YW1pbnNhbmRzdXAucG5nIiwiaWF0IjoxNzYyMTg4NjY2LCJleHAiOjE3OTM3MjQ2NjZ9.guoiXTEfwC1MikQM3LyjsOI9lcwq_e7sMQ7yvFcMydI' },
        products: [
          'Centrum Adults',
          'Revital H',
          'Calcium Sandoz'
        ],
        offer: 'Up to 30% off'
      },
      {
        id: 'ayurveda',
        name: 'Ayurvedic Care',
        image: { uri: 'https://images.unsplash.com/photo-1598496888741-57c8fdb1e6b7?w=500&h=500&fit=crop' },
        products: [
          'Himalaya Ashwagandha',
          'Dabur Chyawanprash',
          'Patanjali Giloy'
        ],
        offer: 'Up to 40% off'
      },
      {
        id: 'immunity',
        name: 'Immunity Boosters',
        image: { uri: 'https://images.unsplash.com/photo-1582638272377-e5d5bf6ec494?w=500&h=500&fit=crop' },
        products: [
          'Zandu Kesari Jivan',
          'Dabur Honey',
          'Ensure Protein'
        ],
        offer: 'Up to 25% off'
      }
    ]
  }
];

export default function MedicineScreen() {
  const nav = useRouter();
  const handleServicePress = (serviceId: string) => {
    if (serviceId === 'pharmacy') {
      nav.push('/medicines/pharmacy');
    } else {
      // For other services, we'll just log until we create the service screens
      console.log('Service pressed:', serviceId);
    }
  };

  const handleCategoryPress = (categoryId: string) => {
    console.log('Category pressed:', categoryId);
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#fff' }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 16,
          paddingHorizontal: 16,
          paddingBottom: 8,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#eee'
        }}>
          <Pressable onPress={() => nav.back()}>
            <Ionicons name="arrow-back-outline" size={24} color="#000" />
          </Pressable>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 8 }}>Medicines</Text>
        </View>
      </SafeAreaView>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.locationBar}>
            <Ionicons name="location-outline" size={20} color="#ff6b6b" />
            <View style={styles.locationInfo}>
              <Text style={styles.locationLabel}>DELIVERY TO</Text>
              <Text style={styles.locationText}>Home - Bengaluru, Karnataka</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#333" />
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search-outline" size={20} color="#666" />
              <TextInput 
                placeholder="Search medicines, ayurvedic & health products"
                style={styles.searchInput}
              />
            </View>
          </View>

          <View style={styles.servicesContainer}>
            {mainServices.map((service) => (
              <Pressable 
                key={service.id} 
                style={styles.serviceCard}
                onPress={() => handleServicePress(service.id)}
              >
                {service.id === 'lab' ? (
                  <View style={styles.labTestContainer}>
                    <Image 
                      source={{ 
                        uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/medicines_icons/labtest.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpY2luZXNfaWNvbnMvbGFidGVzdC5wbmciLCJpYXQiOjE3NjA4NjQyNTQsImV4cCI6MTc5MjQwMDI1NH0.HMZxEND6ZukaeF0km1v-_mNzEBo8sVwN0khQVepWRaU'
                      }} 
                      style={styles.labTestImage}
                      resizeMode="contain"
                    />
                  </View>
                ) : service.id === 'pharmacy' ? (
                  <View style={styles.labTestContainer}>
                    <Image 
                      source={{ 
                        uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/medicines_icons/pharmacy.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpY2luZXNfaWNvbnMvcGhhcm1hY3kucG5nIiwiaWF0IjoxNzYxMTM5ODc2LCJleHAiOjE3OTI2NzU4NzZ9.flyFjByzmTkK1qkJHXfDTYk4OEuisE3_yFFQlptNDzk'
                      }} 
                      style={styles.labTestImage}
                      resizeMode="contain"
                    />
                  </View>
                ) : service.id === 'doctor' ? (
                  <View style={styles.labTestContainer}>
                    <Image 
                      source={{ 
                        uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/medicines_icons/consult%20donctor.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpY2luZXNfaWNvbnMvY29uc3VsdCBkb25jdG9yLnBuZyIsImlhdCI6MTc2MTE0MDEzMiwiZXhwIjoxNzkyNjc2MTMyfQ.WYjxqyq9Dhw5Cul5XmqjPQgGZwKoB8-VD-XUrHuqlK4'
                      }} 
                      style={styles.labTestImage}
                      resizeMode="contain"
                    />
                  </View>
                ) : (
                  <View style={[styles.serviceIcon, { backgroundColor: service.color + '15' }]}>
                    <Ionicons name={service.icon} size={24} color={service.color} />
                    {service.badge && (
                      <View style={styles.serviceBadge}>
                        <Ionicons name="time-outline" size={12} color="#fff" />
                        <Text style={styles.serviceBadgeText}>{service.badge}</Text>
                      </View>
                    )}
                  </View>
                )}
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
                {service.offer && (
                  <Text style={[styles.serviceOffer, { color: service.color }]}>
                    {service.offer}
                  </Text>
                )}
              </Pressable>
            ))}
          </View>

          {/* Pharmacy Banner */}
          <Pressable style={styles.bannerCard}>
            <Image 
              source={{ 
                uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/banners/pharma%20banner.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYW5uZXJzL3BoYXJtYSBiYW5uZXIucG5nIiwiaWF0IjoxNzYwODU4ODkxLCJleHAiOjE3OTIzOTQ4OTF9.WWOZx31VZ0FEi5VxItTQhzBMIZERXPEBf4VHWljRQNY'
              }} 
              style={styles.bannerImage}
              resizeMode="cover"
            />
          </Pressable>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.adsContainer}
          >
            {advertisements.map((ad) => (
              <Pressable 
                key={ad.id} 
                style={[styles.adCard, { backgroundColor: ad.backgroundColor }]}
              >
                <View style={styles.adContent}>
                  <Text style={styles.adTitle}>{ad.title}</Text>
                  <Text style={styles.adDescription}>{ad.description}</Text>
                  <Pressable style={styles.adButton}>
                    <Text style={styles.adButtonText}>Book Now</Text>
                  </Pressable>
                </View>
                <Image source={ad.image} style={styles.adImage} />
              </Pressable>
            ))}
          </ScrollView>

          {/* Quick Meds Section */}
          <View style={styles.quickMedsSection}>
            <Text style={styles.quickMedsTitle}>Quick Meds</Text>
            <View style={styles.quickMedsContainer}>
              <Image 
                source={{ 
                  uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/medicines_icons/cold&cough.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpY2luZXNfaWNvbnMvY29sZCZjb3VnaC5wbmciLCJpYXQiOjE3NjA4NjAwNDUsImV4cCI6MTc5MjM5NjA0NX0.fh0dSXDAl4jUj9NyPiOx4VIl2-pdu4Gk7DKQtemUKvg'
                }} 
                style={styles.quickMedImage}
                resizeMode="cover"
              />
              <Image 
                source={{ 
                  uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/medicines_icons/headace.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpY2luZXNfaWNvbnMvaGVhZGFjZS5wbmciLCJpYXQiOjE3NjA4NjI2NDksImV4cCI6MTc5MjM5ODY0OX0.jY58JgCREB4Rnt2Vq7oIY4qg6cPpkvRaXO8oLMomnco'
                }} 
                style={styles.quickMedImage}
                resizeMode="cover"
              />
            </View>
          </View>

          {categorySections.map((section) => (
            <View key={section.title} style={styles.categorySection}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.categoriesRow}>
                {section.categories.map((category) => (
                  <Pressable 
                    key={category.id} 
                    style={styles.categoryCard}
                    onPress={() => handleCategoryPress(category.id)}
                  >
                    <View style={styles.categoryImageContainer}>
                      <Image 
                        source={category.image} 
                        style={styles.categoryImage}
                        resizeMode="cover"
                      />
                    </View>
                    <Text style={styles.categoryName} numberOfLines={2}>
                      {category.name}
                    </Text>
                    <Text style={styles.productsCount}>
                      {category.products.length} Products
                    </Text>
                    <Text style={styles.categoryOffer}>
                      {category.offer}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
    fontFamily: 'Urbanist-SemiBold',
  },
  locationText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
    fontFamily: 'Urbanist-SemiBold',
  },
  searchContainer: {
    padding: 12,
  },
  searchBar: {
    height: 48,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    fontFamily: 'Urbanist-Regular',
  },
  servicesContainer: {
    padding: 12,
    flexDirection: 'row',
    gap: 12,
  },
  serviceCard: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  serviceImage: {
    width: 28,
    height: 28,
  },
  labTestContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  labTestImage: {
    width: 80,
    height: 80,
  },
  serviceBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#51cf66',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 2,
  },
  serviceBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Urbanist-Bold',
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
    fontFamily: 'Urbanist-Bold',
  },
  serviceDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'Urbanist-Regular',
  },
  serviceOffer: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'Urbanist-Bold',
  },
  bannerCard: {
    margin: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 100,
  },
  adsContainer: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    gap: 12,
  },
  adCard: {
    width: 280,
    height: 160,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
  },
  adContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  adTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Urbanist-Bold',
  },
  adDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    fontFamily: 'Urbanist-Regular',
  },
  adButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  adButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Urbanist-Bold',
  },
  adImage: {
    width: 120,
    height: '100%',
    borderRadius: 8,
  },
  categorySection: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    fontFamily: 'Urbanist-Bold',
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryCard: {
    width: '31%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  categoryImageContainer: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 18,
    fontFamily: 'Urbanist-SemiBold',
  },
  productsCount: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'Urbanist-Regular',
  },
  categoryOffer: {
    fontSize: 12,
    color: '#ff6b6b',
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Urbanist-SemiBold',
  },
  quickMedsSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  quickMedsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    fontFamily: 'Urbanist-Bold',
  },
  quickMedsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  quickMedImage: {
    width: 160,
    height: 160,
    borderRadius: 16,
  },
}); 