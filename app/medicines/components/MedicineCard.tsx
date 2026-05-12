import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Medicine } from '../data/pharmacyData';

interface MedicineCardProps {
  medicine: Medicine;
  onPress: () => void;
  onAddToCart: () => void;
}

const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  onPress,
  onAddToCart,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.medicineInfo}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: medicine.image || '' }}
            style={styles.medicineImage}
            resizeMode="contain"
            onError={(error) => {
              console.log('Medicine image error:', error);
            }}
          />
          {medicine.requiresPrescription && (
            <View style={styles.prescriptionBadge}>
              <Ionicons name="document-text" size={12} color="#FF6B6B" />
            </View>
          )}
        </View>
        
        <View style={styles.medicineDetails}>
          <Text style={styles.medicineName} numberOfLines={2}>
            {medicine.name}
            {medicine.requiresPrescription && (
              <Text style={styles.prescriptionText}> (Prescription Required)</Text>
            )}
          </Text>
          <Text style={styles.medicineDosage}>{medicine.dosage}</Text>
          <Text style={styles.medicinePrice}>₹{medicine.price.toFixed(2)}</Text>
          {!medicine.inStock && (
            <Text style={styles.outOfStock}>Out of Stock</Text>
          )}
        </View>
      </View>
      
      <TouchableOpacity
        style={[
          styles.addButton,
          !medicine.inStock && styles.addButtonDisabled,
        ]}
        onPress={onAddToCart}
        disabled={!medicine.inStock}
      >
        <Text style={[
          styles.addButtonText,
          !medicine.inStock && styles.addButtonTextDisabled,
        ]}>
          {medicine.inStock ? 'Add' : 'N/A'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  medicineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  medicineImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: 'transparent',
    minHeight: 56,
    maxHeight: 56,
  },
  prescriptionBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FFE5E5',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  medicineDetails: {
    flex: 1,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D171C',
    marginBottom: 4,
    lineHeight: 20,
    fontFamily: 'Urbanist-SemiBold',
  },
  prescriptionText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FF6B6B',
    fontFamily: 'Urbanist-Regular',
  },
  medicineDosage: {
    fontSize: 14,
    color: '#4C7F99',
    marginBottom: 4,
    fontFamily: 'Urbanist-Regular',
  },
  medicinePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
    fontFamily: 'Urbanist-Bold',
  },
  outOfStock: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '500',
    fontFamily: 'Urbanist-Medium',
  },
  addButton: {
    backgroundColor: '#E8F0F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#F0F0F0',
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0D171C',
    fontFamily: 'Urbanist-SemiBold',
  },
  addButtonTextDisabled: {
    color: '#999999',
    fontFamily: 'Urbanist-Regular',
  },
});

export default MedicineCard;
