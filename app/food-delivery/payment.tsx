import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCart } from './context/CartContext';

type PaymentMethod = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
};

export default function PaymentScreen() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isOrderSummaryExpanded, setIsOrderSummaryExpanded] = useState(true);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: <Ionicons name="qr-code" size={24} color="#2ecc71" />,
      description: 'Pay using Google Pay, PhonePe, Paytm, or other UPI apps',
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <Ionicons name="card" size={24} color="#3498db" />,
      description: 'Pay using Visa, MasterCard, or RuPay cards',
    },
    {
      id: 'nexor',
      name: 'Nexor Pay',
      icon: <Ionicons name="wallet" size={24} color="#9b59b6" />,
      description: 'Fast and secure payment with Nexor Pay',
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: <Ionicons name="cash" size={24} color="#e67e22" />,
      description: 'Pay with cash when your order arrives',
    },
  ];

  const handlePayment = () => {
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }
    
    alert('Order placed successfully!');
    clearCart();
    router.push('/food-delivery');
  };

  const subtotal = getTotal();
  const deliveryFee = 40;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + deliveryFee + tax;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
        </View>

        <ScrollView style={styles.content}>
          {/* Order Summary Section */}
          <View style={styles.summaryContainer}>
            <TouchableOpacity 
              style={styles.summaryHeader} 
              onPress={() => setIsOrderSummaryExpanded(!isOrderSummaryExpanded)}
            >
              <Text style={styles.summaryTitle}>Order Summary</Text>
              {isOrderSummaryExpanded ? (
                <Ionicons name="chevron-up" size={20} color="#000" />
              ) : (
                <Ionicons name="chevron-down" size={20} color="#000" />
              )}
            </TouchableOpacity>
            
            {isOrderSummaryExpanded && (
              <>
                <View style={styles.itemsList}>
                  {items.map((item) => (
                    <View key={item.id} style={styles.summaryItem}>
                      <View style={styles.itemQuantity}>
                        <Text style={styles.quantityText}>{item.quantity}x</Text>
                      </View>
                      <View style={styles.itemDetails}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemDescription} numberOfLines={1}>
                          {item.description}
                        </Text>
                      </View>
                      <Text style={styles.itemPrice}>₹{(item.price * item.quantity).toFixed(2)}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.summaryDivider} />
                
                <View style={styles.summaryDetails}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryValue}>₹{subtotal.toFixed(2)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Delivery Fee</Text>
                    <Text style={styles.summaryValue}>₹{deliveryFee.toFixed(2)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Tax (5%)</Text>
                    <Text style={styles.summaryValue}>₹{tax.toFixed(2)}</Text>
                  </View>
                  <View style={[styles.summaryRow, styles.totalRow]}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalAmount}>₹{total.toFixed(2)}</Text>
                  </View>
                </View>
              </>
            )}
          </View>

          <Text style={styles.sectionTitle}>Select Payment Method</Text>
          
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethod,
                selectedMethod === method.id && styles.selectedMethod,
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={styles.methodIcon}>
                {method.icon}
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodName}>{method.name}</Text>
                <Text style={styles.methodDescription}>{method.description}</Text>
              </View>
              <View style={[
                styles.radioButton,
                selectedMethod === method.id && styles.radioButtonSelected,
              ]} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.payButton,
              !selectedMethod && styles.payButtonDisabled,
            ]}
            onPress={handlePayment}
            disabled={!selectedMethod}
          >
            <Text style={styles.payButtonText}>Pay ₹{total.toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: Platform.OS === 'ios' ? 44 : 0, // Add top margin for iOS notch
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  summaryContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  itemsList: {
    padding: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemQuantity: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
    minWidth: 30,
    alignItems: 'center',
    marginRight: 12,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  itemDetails: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2ecc71',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 16,
  },
  summaryDetails: {
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2ecc71',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedMethod: {
    borderColor: '#2ecc71',
    borderWidth: 2,
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 14,
    color: '#666',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    marginLeft: 12,
  },
  radioButtonSelected: {
    borderColor: '#2ecc71',
    backgroundColor: '#2ecc71',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  payButton: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonDisabled: {
    backgroundColor: '#ccc',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 