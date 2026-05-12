import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../contexts/ThemeContext';
import { Event } from '../data';

interface EventBookingProps {
  event: Event;
  onClose: () => void;
  onBookSuccess: () => void;
}

interface TicketType {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  available: number;
  selected: number;
}

export default function EventBooking({
  event,
  onClose,
  onBookSuccess,
}: EventBookingProps) {
  const { isDarkMode } = useTheme();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'upi' | 'wallet'>('card');
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([
    {
      id: '1',
      name: 'General Admission',
      price: parseInt(event.price.replace('₹', '').replace(',', '')),
      originalPrice: event.originalPrice ? parseInt(event.originalPrice.replace('₹', '').replace(',', '')) : undefined,
      description: 'Standard entry to the event',
      available: event.capacity - event.soldTickets,
      selected: 0,
    },
    {
      id: '2',
      name: 'VIP Pass',
      price: parseInt(event.price.replace('₹', '').replace(',', '')) * 1.5,
      description: 'Premium experience with exclusive benefits',
      available: Math.floor((event.capacity - event.soldTickets) * 0.2),
      selected: 0,
    },
  ]);

  const handleTicketQuantityChange = (ticketId: string, increment: boolean) => {
    setTicketTypes(prev => prev.map(ticket => {
      if (ticket.id === ticketId) {
        const newQuantity = increment ? ticket.selected + 1 : ticket.selected - 1;
        if (newQuantity >= 0 && newQuantity <= ticket.available) {
          return { ...ticket, selected: newQuantity };
        }
      }
      return ticket;
    }));
  };

  const getTotalPrice = () => {
    return ticketTypes.reduce((total, ticket) => {
      return total + (ticket.price * ticket.selected);
    }, 0);
  };

  const getTotalDiscount = () => {
    return ticketTypes.reduce((total, ticket) => {
      if (ticket.originalPrice) {
        return total + ((ticket.originalPrice - ticket.price) * ticket.selected);
      }
      return total;
    }, 0);
  };

  const handleBookNow = () => {
    const totalTickets = ticketTypes.reduce((sum, ticket) => sum + ticket.selected, 0);
    if (totalTickets === 0) {
      Alert.alert('No Tickets Selected', 'Please select at least one ticket to proceed.');
      return;
    }
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    Alert.alert(
      'Booking Confirmed!',
      `Your tickets for ${event.title} have been booked successfully. You will receive a confirmation email shortly.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowBookingModal(false);
            onBookSuccess();
            onClose();
          }
        }
      ]
    );
  };

  const renderTicketType = (ticket: TicketType) => (
    <View key={ticket.id} style={[styles.ticketTypeCard, { backgroundColor: isDarkMode ? '#2a2a2a' : '#fff' }]}>
      <View style={styles.ticketHeader}>
        <View style={styles.ticketInfo}>
          <Text style={[styles.ticketName, { color: isDarkMode ? '#fff' : '#000' }]}>
            {ticket.name}
          </Text>
          <Text style={[styles.ticketDescription, { color: isDarkMode ? '#ccc' : '#666' }]}>
            {ticket.description}
          </Text>
        </View>
        <View style={styles.ticketPrice}>
          <Text style={[styles.priceText, { color: isDarkMode ? '#fff' : '#000' }]}>
            ₹{ticket.price.toLocaleString()}
          </Text>
          {ticket.originalPrice && (
            <Text style={[styles.originalPriceText, { color: isDarkMode ? '#888' : '#666' }]}>
              ₹{ticket.originalPrice.toLocaleString()}
            </Text>
          )}
        </View>
      </View>
      
      <View style={styles.ticketActions}>
        <Text style={[styles.availableText, { color: isDarkMode ? '#ccc' : '#666' }]}>
          {ticket.available} available
        </Text>
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: isDarkMode ? '#3a3a3a' : '#f0f0f0' }]}
            onPress={() => handleTicketQuantityChange(ticket.id, false)}
            disabled={ticket.selected === 0}
          >
            <Ionicons 
              name="remove" 
              size={16} 
              color={ticket.selected === 0 ? (isDarkMode ? '#666' : '#ccc') : (isDarkMode ? '#fff' : '#000')} 
            />
          </TouchableOpacity>
          <Text style={[styles.quantityText, { color: isDarkMode ? '#fff' : '#000' }]}>
            {ticket.selected}
          </Text>
          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: isDarkMode ? '#3a3a3a' : '#f0f0f0' }]}
            onPress={() => handleTicketQuantityChange(ticket.id, true)}
            disabled={ticket.selected === ticket.available}
          >
            <Ionicons 
              name="add" 
              size={16} 
              color={ticket.selected === ticket.available ? (isDarkMode ? '#666' : '#ccc') : (isDarkMode ? '#fff' : '#000')} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderPaymentMethods = () => (
    <View style={styles.paymentSection}>
      <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
        Payment Method
      </Text>
      {[
        { id: 'card', name: 'Credit/Debit Card', icon: 'card-outline' },
        { id: 'upi', name: 'UPI', icon: 'phone-portrait-outline' },
        { id: 'wallet', name: 'Digital Wallet', icon: 'wallet-outline' },
      ].map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.paymentMethod,
            selectedPaymentMethod === method.id && { borderColor: '#FF6B6B' }
          ]}
          onPress={() => setSelectedPaymentMethod(method.id as any)}
        >
          <Ionicons 
            name={method.icon as any} 
            size={20} 
            color={selectedPaymentMethod === method.id ? '#FF6B6B' : (isDarkMode ? '#888' : '#666')} 
          />
          <Text style={[
            styles.paymentMethodText,
            { color: selectedPaymentMethod === method.id ? '#FF6B6B' : (isDarkMode ? '#fff' : '#000') }
          ]}>
            {method.name}
          </Text>
          <View style={[
            styles.radioButton,
            selectedPaymentMethod === method.id && { backgroundColor: '#FF6B6B' }
          ]}>
            {selectedPaymentMethod === method.id && (
              <Ionicons name="checkmark" size={12} color="#fff" />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderBookingModal = () => (
    <Modal
      visible={showBookingModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowBookingModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#2a2a2a' : '#fff' }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
              Complete Booking
            </Text>
            <TouchableOpacity onPress={() => setShowBookingModal(false)}>
              <Ionicons 
                name="close" 
                size={24} 
                color={isDarkMode ? '#fff' : '#000'} 
              />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            <View style={styles.bookingSummary}>
              <Text style={[styles.summaryTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
                Booking Summary
              </Text>
              
              {ticketTypes.map(ticket => {
                if (ticket.selected > 0) {
                  return (
                    <View key={ticket.id} style={styles.summaryItem}>
                      <Text style={[styles.summaryItemText, { color: isDarkMode ? '#ccc' : '#666' }]}>
                        {ticket.name} x{ticket.selected}
                      </Text>
                      <Text style={[styles.summaryItemPrice, { color: isDarkMode ? '#fff' : '#000' }]}>
                        ₹{(ticket.price * ticket.selected).toLocaleString()}
                      </Text>
                    </View>
                  );
                }
                return null;
              })}
              
              {getTotalDiscount() > 0 && (
                <View style={styles.summaryItem}>
                  <Text style={[styles.summaryItemText, { color: '#4CAF50' }]}>
                    Discount
                  </Text>
                  <Text style={[styles.summaryItemPrice, { color: '#4CAF50' }]}>
                    -₹{getTotalDiscount().toLocaleString()}
                  </Text>
                </View>
              )}
              
              <View style={styles.totalSection}>
                <Text style={[styles.totalText, { color: isDarkMode ? '#fff' : '#000' }]}>
                  Total
                </Text>
                <Text style={[styles.totalPrice, { color: isDarkMode ? '#fff' : '#000' }]}>
                  ₹{getTotalPrice().toLocaleString()}
                </Text>
              </View>
            </View>
            
            {renderPaymentMethods()}
            
            <View style={styles.termsSection}>
              <Text style={[styles.termsText, { color: isDarkMode ? '#ccc' : '#666' }]}>
                By proceeding, you agree to our terms and conditions and privacy policy.
              </Text>
            </View>
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={handleConfirmBooking}
            >
              <Text style={styles.confirmButtonText}>Confirm Booking</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f9fa' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons 
            name="close" 
            size={24} 
            color={isDarkMode ? '#fff' : '#000'} 
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
          Book Tickets
        </Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.content}>
        <View style={[styles.eventInfo, { backgroundColor: isDarkMode ? '#2a2a2a' : '#fff' }]}>
          <Text style={[styles.eventTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
            {event.title}
          </Text>
          <Text style={[styles.eventLocation, { color: isDarkMode ? '#ccc' : '#666' }]}>
            📍 {event.venue}, {event.location}
          </Text>
          <Text style={[styles.eventDateTime, { color: isDarkMode ? '#ccc' : '#666' }]}>
            📅 {new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })} at {event.time}
          </Text>
        </View>
        
        <View style={styles.ticketsSection}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
            Select Tickets
          </Text>
          {ticketTypes.map(renderTicketType)}
        </View>
        
        <View style={[styles.totalSection, { backgroundColor: isDarkMode ? '#2a2a2a' : '#fff' }]}>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: isDarkMode ? '#ccc' : '#666' }]}>
              Total Amount
            </Text>
            <Text style={[styles.totalAmount, { color: isDarkMode ? '#fff' : '#000' }]}>
              ₹{getTotalPrice().toLocaleString()}
            </Text>
          </View>
          {getTotalDiscount() > 0 && (
            <View style={styles.totalRow}>
              <Text style={[styles.discountLabel, { color: '#4CAF50' }]}>
                You Save
              </Text>
              <Text style={[styles.discountAmount, { color: '#4CAF50' }]}>
                ₹{getTotalDiscount().toLocaleString()}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      
      <View style={[styles.footer, { backgroundColor: isDarkMode ? '#2a2a2a' : '#fff' }]}>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={handleBookNow}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
      
      {renderBookingModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  eventInfo: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventLocation: {
    fontSize: 14,
    marginBottom: 4,
  },
  eventDateTime: {
    fontSize: 14,
  },
  ticketsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  ticketTypeCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  ticketInfo: {
    flex: 1,
  },
  ticketName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ticketDescription: {
    fontSize: 14,
  },
  ticketPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  originalPriceText: {
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  ticketActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availableText: {
    fontSize: 12,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  totalSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  discountLabel: {
    fontSize: 14,
  },
  discountAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  bookButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBody: {
    padding: 20,
  },
  bookingSummary: {
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryItemText: {
    fontSize: 14,
  },
  summaryItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  paymentSection: {
    marginBottom: 20,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 8,
  },
  paymentMethodText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsSection: {
    marginBottom: 20,
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  confirmButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 