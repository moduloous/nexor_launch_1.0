import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Pharmacy } from '../data/pharmacyData';

interface PharmacyCardProps {
  pharmacy: Pharmacy;
  onPress: () => void;
}

const PharmacyCard: React.FC<PharmacyCardProps> = ({ pharmacy, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: pharmacy.image || '' }}
          style={styles.pharmacyImage}
          resizeMode="cover"
          onError={(error) => {
            console.log('Pharmacy image error:', error);
          }}
        />
        {!pharmacy.isOpen && (
          <View style={styles.closedOverlay}>
            <Text style={styles.closedText}>Closed</Text>
          </View>
        )}
      </View>
      
      <View style={styles.pharmacyContent}>
        <View style={styles.pharmacyHeader}>
          <Text style={styles.pharmacyName} numberOfLines={2}>
            {pharmacy.name}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.pharmacyRating}>
              {pharmacy.rating} ({pharmacy.reviews}+)
            </Text>
          </View>
        </View>
        
        <View style={styles.pharmacyInfo}>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={14} color="#4C7F99" />
            <Text style={styles.infoText}>{pharmacy.distance}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={14} color="#4C7F99" />
            <Text style={styles.infoText}>{pharmacy.deliveryTime}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="bicycle-outline" size={14} color="#4C7F99" />
            <Text style={styles.infoText}>
              {pharmacy.deliveryFee === 0 ? 'Free delivery' : `₹${pharmacy.deliveryFee.toFixed(0)}`}
            </Text>
          </View>
        </View>
        
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusIndicator,
            { backgroundColor: pharmacy.isOpen ? '#4CAF50' : '#FF6B6B' }
          ]} />
          <Text style={[
            styles.statusText,
            { color: pharmacy.isOpen ? '#4CAF50' : '#FF6B6B' }
          ]}>
            {pharmacy.isOpen ? 'Open' : 'Closed'}
          </Text>
          <Text style={styles.hoursText}>• {pharmacy.openingHours}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  pharmacyImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#F5F5F5',
    minHeight: 140,
    maxHeight: 140,
  },
  closedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Urbanist-SemiBold',
  },
  pharmacyContent: {
    padding: 16,
  },
  pharmacyHeader: {
    marginBottom: 12,
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0D171C',
    marginBottom: 6,
    lineHeight: 22,
    fontFamily: 'Urbanist-SemiBold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pharmacyRating: {
    fontSize: 14,
    color: '#4C7F99',
    marginLeft: 4,
    fontWeight: '500',
    fontFamily: 'Urbanist-Medium',
  },
  pharmacyInfo: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#4C7F99',
    marginLeft: 8,
    fontFamily: 'Urbanist-Regular',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Urbanist-SemiBold',
  },
  hoursText: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 4,
    fontFamily: 'Urbanist-Regular',
  },
});

export default PharmacyCard;
