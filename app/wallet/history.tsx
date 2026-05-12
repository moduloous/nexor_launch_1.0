import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Transaction = {
  id: number;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  category: string;
  day: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

export default function TransactionHistoryScreen() {
  const router = useRouter();

  const transactions: Transaction[] = [
    { 
      id: 1, 
      type: 'debit', 
      amount: 28150, 
      description: 'Play Station', 
      category: 'Gaming',
      day: 'Monday',
      icon: 'game-controller-outline',
      color: '#E0CFFF'
    },
    { 
      id: 2, 
      type: 'debit', 
      amount: 1234, 
      description: 'Amazon', 
      category: 'Shopping',
      day: 'Tuesday',
      icon: 'cart-outline',
      color: '#FFF4CF'
    },
    { 
      id: 3, 
      type: 'debit', 
      amount: 2600, 
      description: 'Spotify Family', 
      category: 'Entertainment',
      day: 'Wednesday',
      icon: 'musical-note-outline',
      color: '#E0CFFF'
    },
    { 
      id: 4, 
      type: 'debit', 
      amount: 2555, 
      description: 'Taco Bell', 
      category: 'Food',
      day: 'Friday',
      icon: 'restaurant-outline',
      color: '#CFE5FF'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <TouchableOpacity>
          <Ionicons name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Transactions List */}
        <View style={styles.transactionsSection}>
          {transactions.map((transaction) => (
            <TouchableOpacity 
              key={transaction.id} 
              style={[styles.transactionCard, { backgroundColor: transaction.color }]}
            >
              <View style={styles.transactionLeft}>
                <View style={styles.transactionIconContainer}>
                  <Ionicons name={transaction.icon} size={20} color="#000" />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionCategory}>{transaction.category}</Text>
                  <Text style={styles.transactionName}>{transaction.description}</Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={styles.transactionDay}>{transaction.day}</Text>
                <Text style={styles.transactionAmount}>-₹{transaction.amount}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  transactionsSection: {
    padding: 16,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionDay: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
}); 