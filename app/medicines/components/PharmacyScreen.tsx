import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MedicineCard from './MedicineCard';
import PharmacyCard from './PharmacyCard';
import {
  medicines,
  pharmacies,
  offers,
  categories,
  quickActions,
  filterMedicinesByCategory,
  searchMedicines,
  getAvailablePharmacies,
  getActiveOffers,
  Medicine,
  Pharmacy,
  Offer,
} from '../data/pharmacyData';

const PharmacyScreen = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Get filtered data based on current state
  const filteredMedicines = searchQuery 
    ? searchMedicines(searchQuery)
    : filterMedicinesByCategory(selectedCategory);
  
  const availablePharmacies = getAvailablePharmacies();
  const activeOffers = getActiveOffers();
  const categoryNames = ['All', 'OTC', 'Prescription'];

  const handleMedicinePress = (medicine: Medicine) => {
    console.log('Medicine pressed:', medicine.name);
    // Navigate to medicine details
  };

  const handleAddToCart = (medicine: Medicine) => {
    console.log('Add to cart:', medicine.name);
    // Add to cart logic
  };

  const handlePharmacyPress = (pharmacy: Pharmacy) => {
    console.log('Pharmacy pressed:', pharmacy.name);
    // Navigate to pharmacy details
  };

  const handleUploadPrescription = () => {
    console.log('Upload prescription');
    // Handle prescription upload
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#0D171C" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Pharmacy</Text>
      <View style={styles.headerRight} />
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <View style={styles.searchIconContainer}>
          <Ionicons name="search" size={20} color="#4C7F99" />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for medicines, ayurvedic & OTC products"
          placeholderTextColor="#4C7F99"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </View>
  );

  const renderCategoryTabs = () => (
    <View style={styles.categoryContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categoryNames.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryTab,
              selectedCategory === category && styles.selectedCategoryTab,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderSectionTitle = (title: string) => (
    <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  const renderOffers = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.offersContainer}>
      {activeOffers.map((offer) => (
        <TouchableOpacity key={offer.id} style={styles.offerCard}>
          <Image 
            source={{ uri: `https://via.placeholder.com/173x97/E8F0F3/4C7F99?text=${offer.discount || 0}%` }}
            style={styles.offerImage}
            resizeMode="cover"
            onError={(error) => {
              console.log('Offer image error:', error);
            }}
          />
          <View style={styles.offerContent}>
            <Text style={styles.offerTitle}>{offer.title}</Text>
            <Text style={styles.offerDescription}>{offer.description}</Text>
            {offer.code && (
              <Text style={styles.offerCode}>Code: {offer.code}</Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderPharmacies = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pharmaciesContainer}>
      {availablePharmacies.slice(0, 5).map((pharmacy) => (
        <PharmacyCard
          key={pharmacy.id}
          pharmacy={pharmacy}
          onPress={() => handlePharmacyPress(pharmacy)}
        />
      ))}
    </ScrollView>
  );

  const renderUploadPrescription = () => (
    <View style={styles.uploadContainer}>
      <View style={styles.uploadContent}>
        <View style={styles.uploadTextSection}>
          <Text style={styles.uploadTitle}>Upload Prescription</Text>
          <Text style={styles.uploadSubtitle}>Upload your prescription</Text>
          <Text style={styles.uploadDescription}>
            Upload doctor's prescription to order medicines safely
          </Text>
        </View>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadPrescription}>
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: 'https://via.placeholder.com/130x139/E8F0F3/4C7F99?text=Rx' }}
        style={styles.uploadImage}
        resizeMode="contain"
        onError={(error) => {
          console.log('Upload image error:', error);
        }}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {renderHeader()}
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderSearchBar()}
        {renderCategoryTabs()}
        
        {renderSectionTitle('Offers')}
        {renderOffers()}
        
        {renderSectionTitle('Featured Pharmacies')}
        {renderPharmacies()}
        
        {renderSectionTitle('Quick Actions')}
        {renderUploadPrescription()}
        
        {renderSectionTitle('Popular Medicines')}
        <View style={styles.medicinesContainer}>
          {filteredMedicines.map((medicine) => (
            <MedicineCard
              key={medicine.id}
              medicine={medicine}
              onPress={() => handleMedicinePress(medicine)}
              onAddToCart={() => handleAddToCart(medicine)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0D171C',
    flex: 1,
    fontFamily: 'Urbanist-Bold',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F0F3',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIconContainer: {
    backgroundColor: '#E8F0F3',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0D171C',
    fontFamily: 'Urbanist-Regular',
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#CFE0E8',
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginRight: 32,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedCategoryTab: {
    borderBottomColor: '#4C7F99',
  },
  categoryText: {
    fontSize: 16,
    color: '#4C7F99',
    fontWeight: '500',
    fontFamily: 'Urbanist-Medium',
  },
  selectedCategoryText: {
    color: '#0D171C',
    fontWeight: '600',
    fontFamily: 'Urbanist-SemiBold',
  },
  sectionTitleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0D171C',
    fontFamily: 'Urbanist-SemiBold',
  },
  offersContainer: {
    paddingHorizontal: 16,
  },
  offerCard: {
    width: 173,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  offerImage: {
    width: '100%',
    height: 97,
    borderRadius: 8,
    minHeight: 97,
    maxHeight: 97,
  },
  offerContent: {
    padding: 12,
  },
  offerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0D171C',
    lineHeight: 20,
    marginBottom: 4,
    fontFamily: 'Urbanist-SemiBold',
  },
  offerDescription: {
    fontSize: 12,
    color: '#4C7F99',
    lineHeight: 16,
    marginBottom: 4,
    fontFamily: 'Urbanist-Regular',
  },
  offerCode: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2E7D32',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    fontFamily: 'Urbanist-SemiBold',
  },
  pharmaciesContainer: {
    paddingHorizontal: 16,
  },
  pharmacyCard: {
    width: 162,
    marginRight: 12,
  },
  pharmacyImage: {
    width: '100%',
    height: 162,
    borderRadius: 8,
  },
  pharmacyContent: {
    paddingTop: 12,
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D171C',
    marginBottom: 4,
  },
  pharmacyRating: {
    fontSize: 14,
    color: '#4C7F99',
  },
  uploadContainer: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  uploadContent: {
    flex: 1,
  },
  uploadTextSection: {
    marginBottom: 16,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4C7F99',
    marginBottom: 4,
    fontFamily: 'Urbanist-SemiBold',
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#0D171C',
    marginBottom: 4,
    fontFamily: 'Urbanist-Regular',
  },
  uploadDescription: {
    fontSize: 12,
    color: '#4C7F99',
    lineHeight: 16,
    fontFamily: 'Urbanist-Regular',
  },
  uploadButton: {
    backgroundColor: '#E8F0F3',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0D171C',
    fontFamily: 'Urbanist-Medium',
  },
  uploadImage: {
    width: 130,
    height: 139,
    borderRadius: 8,
    marginLeft: 16,
    minHeight: 139,
    maxHeight: 139,
  },
  medicinesContainer: {
    paddingHorizontal: 16,
  },
  medicineItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  medicineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  medicineImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 16,
  },
  medicineDetails: {
    flex: 1,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0D171C',
    marginBottom: 4,
  },
  medicineDosage: {
    fontSize: 14,
    color: '#4C7F99',
  },
  addButton: {
    backgroundColor: '#E8F0F3',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0D171C',
  },
});

export default PharmacyScreen;
