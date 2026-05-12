import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RideMatch } from '../api/rideService';

const { width } = Dimensions.get('window');

interface DriverSelectionProps {
  drivers: RideMatch[];
  onDriverSelect: (driver: RideMatch) => void;
  onClose: () => void;
  isSearching: boolean;
}

export default function DriverSelection({
  drivers,
  onDriverSelect,
  onClose,
  isSearching,
}: DriverSelectionProps) {
  const getVehicleIcon = (vehicleType: string) => {
    switch (vehicleType) {
      case 'bike':
        return 'bicycle';
      case 'auto':
        return 'car';
      case 'car':
        return 'car-sport';
      case 'premium':
        return 'car-sport';
      default:
        return 'car';
    }
  };

  const getVehicleColor = (vehicleType: string) => {
    switch (vehicleType) {
      case 'bike':
        return '#4CAF50';
      case 'auto':
        return '#FF9800';
      case 'car':
        return '#2196F3';
      case 'premium':
        return '#9C27B0';
      default:
        return '#666';
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 1) return 'Less than 1 min';
    if (minutes === 1) return '1 min';
    return `${minutes} mins`;
  };

  const formatDistance = (km: number) => {
    if (km < 1) return `${Math.round(km * 1000)}m`;
    return `${km.toFixed(1)}km`;
  };

  if (isSearching) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Finding Drivers</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.searchingText}>Searching for nearby drivers...</Text>
          <Text style={styles.searchingSubtext}>This may take a few moments</Text>
        </View>
      </View>
    );
  }

  if (drivers.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>No Drivers Found</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.noDriversContainer}>
          <Ionicons name="car-outline" size={64} color="#ccc" />
          <Text style={styles.noDriversText}>No drivers available</Text>
          <Text style={styles.noDriversSubtext}>
            Try adjusting your location or ride type
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={onClose}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choose Your Driver</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          {drivers.length} driver{drivers.length !== 1 ? 's' : ''} found nearby
        </Text>

        {drivers.map((driver, index) => (
          <TouchableOpacity
            key={driver.driverId}
            style={styles.driverCard}
            onPress={() => onDriverSelect(driver)}
            activeOpacity={0.7}
          >
            {/* Driver Info */}
            <View style={styles.driverInfo}>
              <View style={styles.driverAvatar}>
                <Text style={styles.driverInitial}>
                  {driver.driverName.charAt(0)}
                </Text>
              </View>
              
              <View style={styles.driverDetails}>
                <Text style={styles.driverName}>{driver.driverName}</Text>
                <View style={styles.vehicleInfo}>
                  <Ionicons
                    name={getVehicleIcon(driver.vehicleType)}
                    size={16}
                    color={getVehicleColor(driver.vehicleType)}
                  />
                  <Text style={styles.vehicleNumber}>{driver.vehicleNumber}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.rating}>{driver.rating}</Text>
                </View>
              </View>
            </View>

            {/* Ride Details */}
            <View style={styles.rideDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.detailText}>
                  {formatTime(driver.estimatedPickupTime)}
                </Text>
              </View>
              
              <View style={styles.detailItem}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <Text style={styles.detailText}>
                  {formatDistance(driver.distanceToPickup)} away
                </Text>
              </View>
            </View>

            {/* Price */}
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Fare</Text>
              <Text style={styles.price}>₹{driver.price}</Text>
            </View>

            {/* Selection Indicator */}
            <View style={styles.selectionIndicator}>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </View>
          </TouchableOpacity>
        ))}

        {/* Additional Info */}
        <View style={styles.additionalInfo}>
          <View style={styles.infoItem}>
            <Ionicons name="shield-checkmark" size={16} color="#4CAF50" />
            <Text style={styles.infoText}>All drivers are verified</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="card" size={16} color="#2196F3" />
            <Text style={styles.infoText}>Cashless payment available</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="help-circle" size={16} color="#FF9800" />
            <Text style={styles.infoText}>24/7 customer support</Text>
          </View>
        </View>
      </ScrollView>
    </View>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  driverInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  driverInitial: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  vehicleNumber: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  rideDetails: {
    alignItems: 'center',
    marginRight: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  priceContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  priceLabel: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CAF50',
  },
  selectionIndicator: {
    padding: 4,
  },
  searchingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  searchingText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  searchingSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  noDriversContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  noDriversText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  noDriversSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  additionalInfo: {
    marginTop: 20,
    marginBottom: 40,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
});
