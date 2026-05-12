import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TicketPurchaseScreen() {
  const router = useRouter();
  const [selectedTicketType, setSelectedTicketType] = useState('general');

  const ticketTypes = [
    { id: 'general', name: 'General Admission', price: '₹8,300', description: 'Standard concert access' },
    { id: 'vip', name: 'VIP', price: '₹16,600', description: 'Premium seating + meet & greet' },
    { id: 'premium', name: 'Premium', price: '₹12,450', description: 'Better seating + merchandise' },
  ];

  const handlePurchase = () => {
    Alert.alert(
      'Ticket Purchase',
      'Your ticket has been purchased successfully! You will receive a confirmation email shortly.',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Buy Ticket</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Select Ticket Type</Text>
        
        {/* Ticket Types */}
        <View style={styles.ticketTypesContainer}>
          {ticketTypes.map((ticket) => (
            <TouchableOpacity
              key={ticket.id}
              style={[
                styles.ticketTypeCard,
                selectedTicketType === ticket.id && styles.selectedTicketType
              ]}
              onPress={() => setSelectedTicketType(ticket.id)}
            >
              <View style={styles.ticketTypeInfo}>
                <Text style={styles.ticketTypeName}>{ticket.name}</Text>
                <Text style={styles.ticketTypeDescription}>{ticket.description}</Text>
              </View>
              <View style={styles.ticketTypePrice}>
                <Text style={styles.ticketPrice}>{ticket.price}</Text>
                {selectedTicketType === ticket.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#FF6B35" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Purchase Button */}
        <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
          <Text style={styles.purchaseButtonText}>
            Purchase Ticket - {ticketTypes.find(t => t.id === selectedTicketType)?.price}
          </Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 24,
  },
  ticketTypesContainer: {
    flex: 1,
  },
  ticketTypeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTicketType: {
    borderColor: '#FF6B35',
    backgroundColor: '#fff',
  },
  ticketTypeInfo: {
    flex: 1,
  },
  ticketTypeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  ticketTypeDescription: {
    fontSize: 14,
    color: '#666',
  },
  ticketTypePrice: {
    alignItems: 'center',
  },
  ticketPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 4,
  },
  purchaseButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  purchaseButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
