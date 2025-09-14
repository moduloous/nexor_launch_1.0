import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RideMatch, PricingDetails } from '../api/rideService';

const { width } = Dimensions.get('window');

interface RidePricingProps {
  driver: RideMatch;
  pricing: PricingDetails;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function RidePricing({
  driver,
  pricing,
  onConfirm,
  onCancel,
  isLoading = false,
}: RidePricingProps) {
  const formatTime = (minutes: number) => {
    if (minutes < 1) return 'Less than 1 min';
    if (minutes === 1) return '1 min';
    return `${minutes} mins`;
  };

  const formatDistance = (km: number) => {
    if (km < 1) return `${Math.round(km * 1000)}m`;
    return `${km.toFixed(1)}km`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Confirm Your Ride</Text>
        <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Driver Info */}
        <View style={styles.driverSection}>
          <Text style={styles.sectionTitle}>Your Driver</Text>
          <View style={styles.driverCard}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverInitial}>
                {driver.driverName.charAt(0)}
              </Text>
            </View>
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{driver.driverName}</Text>
              <View style={styles.vehicleInfo}>
                <Ionicons name="car" size={16} color="#666" />
                <Text style={styles.vehicleNumber}>{driver.vehicleNumber}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.rating}>{driver.rating}</Text>
                <Text style={styles.ratingText}>• {driver.estimatedPickupTime} min away</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Trip Details */}
        <View style={styles.tripSection}>
          <Text style={styles.sectionTitle}>Trip Details</Text>
          <View style={styles.tripCard}>
            <View style={styles.tripRow}>
              <View style={styles.tripIcon}>
                <Ionicons name="time-outline" size={20} color="#4CAF50" />
              </View>
              <View style={styles.tripInfo}>
                <Text style={styles.tripLabel}>Estimated Pickup Time</Text>
                <Text style={styles.tripValue}>{formatTime(driver.estimatedPickupTime)}</Text>
              </View>
            </View>
            
            <View style={styles.tripRow}>
              <View style={styles.tripIcon}>
                <Ionicons name="location-outline" size={20} color="#FF6B6B" />
              </View>
              <View style={styles.tripInfo}>
                <Text style={styles.tripLabel}>Distance to Pickup</Text>
                <Text style={styles.tripValue}>{formatDistance(driver.distanceToPickup)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Fare Breakdown */}
        <View style={styles.fareSection}>
          <Text style={styles.sectionTitle}>Fare Breakdown</Text>
          <View style={styles.fareCard}>
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Base Fare</Text>
              <Text style={styles.fareValue}>₹{pricing.breakdown.base}</Text>
            </View>
            
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Distance Charge</Text>
              <Text style={styles.fareValue}>₹{pricing.breakdown.distance}</Text>
            </View>
            
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Time Charge</Text>
              <Text style={styles.fareValue}>₹{pricing.breakdown.time}</Text>
            </View>
            
            {pricing.breakdown.surge > 0 && (
              <View style={styles.fareRow}>
                <Text style={styles.fareLabel}>Surge Pricing</Text>
                <Text style={[styles.fareValue, styles.surgeText]}>₹{pricing.breakdown.surge}</Text>
              </View>
            )}
            
            <View style={styles.divider} />
            
            <View style={styles.fareRow}>
              <Text style={styles.totalLabel}>Total Fare</Text>
              <Text style={styles.totalValue}>₹{pricing.totalFare}</Text>
            </View>
          </View>
        </View>

        {/* Additional Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Ionicons name="shield-checkmark" size={16} color="#4CAF50" />
            <Text style={styles.infoText}>Your ride is covered by insurance</Text>
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

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.cancelButton, styles.footerButton]}
          onPress={onCancel}
          disabled={isLoading}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.confirmButton, styles.footerButton]}
          onPress={onConfirm}
          disabled={isLoading}
        >
          <Text style={styles.confirmButtonText}>
            {isLoading ? 'Confirming...' : 'Confirm Ride'}
          </Text>
        </TouchableOpacity>
      </View>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginTop: 20,
  },
  driverSection: {
    marginTop: 8,
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  driverAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  driverInitial: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
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
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  tripSection: {
    marginTop: 8,
  },
  tripCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    padding: 16,
  },
  tripRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tripIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  tripInfo: {
    flex: 1,
  },
  tripLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  tripValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  fareSection: {
    marginTop: 8,
  },
  fareCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    padding: 16,
  },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  fareLabel: {
    fontSize: 14,
    color: '#666',
  },
  fareValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  surgeText: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CAF50',
  },
  infoSection: {
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
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 12,
  },
  footerButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
