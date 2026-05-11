import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 3;

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

type BillCategory = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  gradientColors: [string, string];
  dueAmount?: number;
  dueDate?: string;
};

type InstantOption = {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  gradientColors: [string, string];
};

type CardType = {
  id: string;
  type: 'virtual' | 'debit' | 'credit';
  name: string;
  number: string;
  expiry: string;
  cvv: string;
  balance?: number;
  bank?: string;
  gradientColors: [string, string];
  frozen?: boolean;
};

type TimelineOption = '1W' | '1M' | '1Y' | '5Y';
type SpendingData = {
  date: string;
  amount: number;
};

export default function WalletScreen() {
  const router = useRouter();
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [showCardSection, setShowCardSection] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardType | null>({
    id: '1',
    type: 'virtual',
    name: 'Nexor Virtual Card',
    number: '4321 •••• •••• 1234',
    expiry: '12/25',
    cvv: '***',
    balance: 15000,
    gradientColors: ['#141E30', '#243B55']
  });
  const [selectedTimeline, setSelectedTimeline] = useState<TimelineOption>('1M');
  const [spendingData, setSpendingData] = useState<SpendingData[]>([
    { date: 'Jan 1', amount: 2500 },
    { date: 'Jan 8', amount: 3800 },
    { date: 'Jan 15', amount: 1200 },
    { date: 'Jan 22', amount: 4500 },
    { date: 'Jan 29', amount: 2800 },
  ]);

  const transactions: Transaction[] = [
    { 
      id: 1, 
      type: 'credit', 
      amount: 15000, 
      description: 'Salary', 
      category: 'Income',
      day: 'Monday',
      icon: 'cash-outline',
      color: '#D1FFD1'
    },
    { 
      id: 2, 
      type: 'debit', 
      amount: 2000, 
      description: 'Zara', 
      category: 'Shopping',
      day: 'Tuesday',
      icon: 'cart-outline',
      color: '#FFF4CF'
    },
    { 
      id: 3, 
      type: 'debit', 
      amount: 250, 
      description: 'Taco Bell', 
      category: 'Food',
      day: 'Wednesday',
      icon: 'restaurant-outline',
      color: '#CFE5FF'
    }
  ];

  const billCategories: BillCategory[] = [
    {
      id: '1',
      name: 'Electricity',
      icon: 'flash-outline',
      gradientColors: ['#4facfe', '#00f2fe'],
      dueAmount: 1250,
      dueDate: '2 days'
    },
    {
      id: '2',
      name: 'Water',
      icon: 'water-outline',
      gradientColors: ['#48c6ef', '#6f86d6'],
      dueAmount: 450,
      dueDate: '5 days'
    },
    {
      id: '3',
      name: 'Gas',
      icon: 'flame-outline',
      gradientColors: ['#f83600', '#fe8c00'],
      dueAmount: 850,
      dueDate: '7 days'
    },
    {
      id: '4',
      name: 'Broadband',
      icon: 'wifi-outline',
      gradientColors: ['#834d9b', '#d04ed6'],
    },
    {
      id: '5',
      name: 'Mobile',
      icon: 'phone-portrait-outline',
      gradientColors: ['#4481eb', '#04befe'],
    },
    {
      id: '6',
      name: 'DTH',
      icon: 'tv-outline',
      gradientColors: ['#667eea', '#764ba2'],
    },
    {
      id: '7',
      name: 'Credit Card',
      icon: 'card-outline',
      gradientColors: ['#141e30', '#243b55'],
      dueAmount: 15000,
      dueDate: '10 days'
    },
    {
      id: '8',
      name: 'Loan EMI',
      icon: 'cash-outline',
      gradientColors: ['#11998e', '#38ef7d'],
    },
    {
      id: '9',
      name: 'Insurance',
      icon: 'shield-checkmark-outline',
      gradientColors: ['#0ba360', '#3cba92'],
    }
  ];

  const instantOptions: InstantOption[] = [
    {
      id: '1',
      title: 'Get Credit',
      subtitle: 'Up to ₹2 Lakh',
      icon: 'cash-outline',
      gradientColors: ['#FFD700', '#FFA500']
    },
    {
      id: '2',
      title: 'SIP Invest',
      subtitle: 'Start Investing',
      icon: 'trending-up-outline',
      gradientColors: ['#4CAF50', '#45a049']
    },
    {
      id: '3',
      title: 'Gold Investment',
      subtitle: 'Buy Digital Gold',
      icon: 'diamond-outline',
      gradientColors: ['#FFD700', '#DAA520']
    }
  ];

  const cards: CardType[] = [
    {
      id: '1',
      type: 'virtual',
      name: 'Nexor Virtual Card',
      number: '4321 •••• •••• 1234',
      expiry: '12/25',
      cvv: '***',
      balance: 15000,
      gradientColors: ['#141E30', '#243B55']
    },
    {
      id: '2',
      type: 'credit',
      name: 'HDFC Credit Card',
      number: '5678 •••• •••• 5678',
      expiry: '09/24',
      cvv: '***',
      bank: 'HDFC Bank',
      gradientColors: ['#4facfe', '#00f2fe']
    },
    {
      id: '3',
      type: 'debit',
      name: 'Axis Debit Card',
      number: '9012 •••• •••• 9012',
      expiry: '03/26',
      cvv: '***',
      bank: 'Axis Bank',
      gradientColors: ['#834d9b', '#d04ed6']
    }
  ];

  const renderCard = (card: CardType) => (
    <TouchableOpacity
      key={card.id}
      style={styles.card}
      onPress={() => setSelectedCard(card)}
    >
      <LinearGradient
        colors={card.gradientColors}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardName}>{card.name}</Text>
          {card.type === 'virtual' && (
            <View style={styles.virtualBadge}>
              <Text style={styles.virtualText}>Virtual</Text>
            </View>
          )}
        </View>

        <Text style={styles.cardNumber}>{card.number}</Text>

        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.cardLabel}>Expiry</Text>
            <Text style={styles.cardValue}>{card.expiry}</Text>
          </View>
          <TouchableOpacity onPress={() => setShowCVV(!showCVV)}>
            <Text style={styles.cardLabel}>CVV</Text>
            <Text style={styles.cardValue}>{showCVV ? card.cvv : '***'}</Text>
          </TouchableOpacity>
          {card.balance !== undefined && (
            <View>
              <Text style={styles.cardLabel}>Balance</Text>
              <Text style={styles.cardValue}>₹{card.balance}</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const quickActions = (
    <View style={styles.quickActions}>
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => router.push('/wallet/send')}
      >
        <View style={styles.actionIcon}>
          <Ionicons name="arrow-up" size={24} color="#FF6B6B" />
        </View>
        <Text style={styles.actionText}>Send</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <View style={styles.actionIcon}>
          <Ionicons name="arrow-down" size={24} color="#4CAF50" />
        </View>
        <Text style={styles.actionText}>Receive</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => setShowCardSection(true)}
      >
        <View style={styles.actionIcon}>
          <Ionicons name="card" size={24} color="#2196F3" />
        </View>
        <Text style={styles.actionText}>Cards</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <View style={styles.actionIcon}>
          <Ionicons name="time" size={24} color="#9C27B0" />
        </View>
        <Text style={styles.actionText}>History</Text>
      </TouchableOpacity>
    </View>
  );

  const cardsSection = (
    <View style={styles.cardsSectionOverlay}>
      <LinearGradient
        colors={['rgba(255, 215, 0, 0.85)', 'rgba(255, 165, 0, 0.9)']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <BlurView intensity={20} tint="default" style={styles.cardsSection}>
          <View style={styles.cardsSectionContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.cardsSectionHeader}>
                <TouchableOpacity onPress={() => setShowCardSection(false)}>
                  <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={[styles.cardsSectionTitle, { color: '#000' }]}>Your Cards</Text>
                <TouchableOpacity>
                  <Ionicons name="add-circle-outline" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.cardsContainer}
              >
                {cards.map(renderCard)}
              </ScrollView>

              {selectedCard && (
                <>
                  <View style={[styles.cardActions, { borderTopColor: 'rgba(0, 0, 0, 0.1)' }]}>
                    <TouchableOpacity style={styles.cardActionButton}>
                      <Ionicons name="lock-closed" size={20} color="#4ECDC4" />
                      <Text style={[styles.cardActionText, { color: '#000' }]}>Freeze</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardActionButton}>
                      <Ionicons name="speedometer" size={20} color="#FF6B6B" />
                      <Text style={[styles.cardActionText, { color: '#000' }]}>Set Limit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardActionButton}>
                      <Ionicons name="shield-checkmark" size={20} color="#45B7D1" />
                      <Text style={[styles.cardActionText, { color: '#000' }]}>Security</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.spendingSection}>
                    <Text style={styles.spendingTitle}>Spending Analysis</Text>
                    
                    <View style={styles.timelineOptions}>
                      {(['1W', '1M', '1Y', '5Y'] as TimelineOption[]).map((option) => (
                        <TouchableOpacity
                          key={option}
                          style={[
                            styles.timelineOption,
                            selectedTimeline === option && styles.timelineOptionActive
                          ]}
                          onPress={() => setSelectedTimeline(option)}
                        >
                          <Text style={[
                            styles.timelineOptionText,
                            selectedTimeline === option && styles.timelineOptionTextActive
                          ]}>
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    <View style={styles.graphContainer}>
                      <LinearGradient
                        colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
                        style={styles.graphBackground}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                      >
                        {[0, 1, 2, 3, 4].map((index) => (
                          <View key={index} style={styles.graphLine} />
                        ))}

                        <View style={styles.graphBars}>
                          {spendingData.map((data, index) => (
                            <View key={index} style={styles.barContainer}>
                              <View 
                                style={[
                                  styles.bar,
                                  { 
                                    height: `${(data.amount / 5000) * 100}%`,
                                    backgroundColor: selectedCard.gradientColors[0]
                                  }
                                ]} 
                              />
                              <Text style={styles.barLabel}>{data.date}</Text>
                            </View>
                          ))}
                        </View>
                      </LinearGradient>
                    </View>

                    <View style={styles.totalSpending}>
                      <Text style={styles.totalLabel}>Total Spending</Text>
                      <Text style={styles.totalAmount}>
                        ₹{spendingData.reduce((sum, data) => sum + data.amount, 0).toLocaleString()}
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </BlurView>
      </LinearGradient>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nexor Pay</Text>
        <TouchableOpacity onPress={() => setIsBalanceVisible(!isBalanceVisible)}>
          <Ionicons name={isBalanceVisible ? "eye-off" : "eye"} size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Balance Card */}
        <LinearGradient
          colors={['#FFD700', '#FFA500']}
          style={styles.balanceCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>
            {isBalanceVisible ? '₹400' : '****'}
          </Text>
          <Text style={styles.balanceSubtext}>Good finances, better life</Text>
        </LinearGradient>

        {/* Quick Actions */}
        {quickActions}

        {/* Recent Transactions */}
        <View style={styles.expensesSection}>
          <View style={styles.expensesHeader}>
            <Text style={styles.expensesTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Ionicons name="add" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          
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
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.type === 'credit' ? '#4CAF50' : '#000' }
                ]}>
                  {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bill Payments Section */}
        <View style={styles.billSection}>
          {/* Smart Bill Summary */}
          <LinearGradient
            colors={['#141E30', '#243B55']}
            style={styles.billSummaryCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.billSummaryContent}>
              <View>
                <Text style={styles.billSummaryTitle}>Bills Due</Text>
                <Text style={styles.billSummaryAmount}>₹17,550</Text>
                <Text style={styles.billSummarySubtext}>3 bills pending</Text>
              </View>
              <TouchableOpacity style={styles.payAllButton}>
                <Text style={styles.payAllButtonText}>Pay All</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Bill Categories Grid */}
          <View style={styles.billCategoriesGrid}>
            {billCategories.map((category) => (
              <TouchableOpacity 
                key={category.id}
                style={styles.billCategoryCard}
              >
                <LinearGradient
                  colors={category.gradientColors}
                  style={styles.billCategoryGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name={category.icon} size={24} color="#fff" />
                </LinearGradient>
                <Text style={styles.billCategoryName}>{category.name}</Text>
                {category.dueAmount && (
                  <Text style={styles.billDueAmount}>₹{category.dueAmount}</Text>
                )}
                {category.dueDate && (
                  <Text style={[
                    styles.billDueDate,
                    { color: parseInt(category.dueDate) <= 3 ? '#FF4B4B' : '#666' }
                  ]}>
                    Due in {category.dueDate}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* After Bills Section and before Get Instant Section */}
        <View style={styles.toolsSection}>
          {/* Fastag Card */}
          <TouchableOpacity style={styles.toolCard}>
            <View style={styles.toolContent}>
              <Text style={styles.toolLabel}>FASTAG</Text>
              <Text style={styles.toolTitle}>Pay Your{'\n'}Fastag Bill</Text>
              <Text style={styles.toolArrow}>→</Text>
            </View>
            <View style={styles.toolIconContainer}>
              <Ionicons name="car-outline" size={28} color="#000" />
            </View>
          </TouchableOpacity>

          {/* Challan Card */}
          <TouchableOpacity style={[styles.toolCard, { backgroundColor: '#E8F5FF' }]}>
            <View style={styles.toolContent}>
              <Text style={styles.toolLabel}>CHALLAN</Text>
              <Text style={styles.toolTitle}>Check{'\n'}Traffic Fine</Text>
              <Text style={styles.toolArrow}>→</Text>
            </View>
            <View style={[styles.toolIconContainer, { backgroundColor: 'rgba(33, 150, 243, 0.1)' }]}>
              <Ionicons name="receipt-outline" size={28} color="#2196F3" />
            </View>
          </TouchableOpacity>

          {/* CIBIL Card */}
          <TouchableOpacity style={[styles.toolCard, { backgroundColor: '#FFF5E6' }]}>
            <View style={styles.toolContent}>
              <Text style={styles.toolLabel}>CIBIL SCORE</Text>
              <Text style={styles.toolTitle}>Check Your{'\n'}Score</Text>
              <Text style={styles.toolArrow}>→</Text>
            </View>
            <View style={[styles.toolIconContainer, { backgroundColor: 'rgba(255, 165, 0, 0.1)' }]}>
              <Ionicons name="speedometer-outline" size={28} color="#FFA500" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Get Instant Section */}
        <View style={styles.instantSection}>
          <Text style={styles.sectionTitle}>Get Instant</Text>
          <View style={styles.instantOptionsContainer}>
            {instantOptions.map((option) => (
              <TouchableOpacity 
                key={option.id}
                style={styles.instantOptionCard}
              >
                <LinearGradient
                  colors={option.gradientColors}
                  style={styles.instantOptionGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name={option.icon} size={24} color="#fff" />
                </LinearGradient>
                <Text style={styles.instantOptionTitle}>{option.title}</Text>
                <Text style={styles.instantOptionSubtitle}>{option.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {showCardSection && cardsSection}
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
  balanceCard: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 8,
  },
  balanceSubtext: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#666',
  },
  expensesSection: {
    padding: 16,
  },
  expensesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  expensesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
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
  billSection: {
    padding: 16,
  },
  billSummaryCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  billSummaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billSummaryTitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  billSummaryAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 4,
  },
  billSummarySubtext: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  payAllButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  payAllButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  billCategoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  billCategoryCard: {
    width: CARD_WIDTH,
    alignItems: 'center',
    marginBottom: 20,
  },
  billCategoryGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  billCategoryName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  billDueAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  billDueDate: {
    fontSize: 11,
    color: '#666',
  },
  instantSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  instantOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  instantOptionCard: {
    width: (width - 48) / 3,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  instantOptionGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  instantOptionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  instantOptionSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  bannerSection: {
    padding: 16,
  },
  bannerGradient: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  bannerLeft: {
    flex: 1,
    marginRight: 16,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
  },
  bannerButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  bannerButtonText: {
    fontWeight: '600',
  },
  bannerIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  toolCard: {
    flex: 1,
    backgroundColor: '#E8FFF3',
    borderRadius: 16,
    padding: 12,
    height: 140,
    position: 'relative',
  },
  toolContent: {
    flex: 1,
    marginBottom: 40,
  },
  toolLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 20,
  },
  toolArrow: {
    fontSize: 20,
    color: '#000',
    marginTop: 4,
  },
  toolIconContainer: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsSectionOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  gradientBackground: {
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  cardsSection: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  cardsSectionContent: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardsSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardsContainer: {
    marginBottom: 20,
  },
  card: {
    width: width - 64,
    height: (width - 64) * 0.6,
    marginRight: 16,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardGradient: {
    flex: 1,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  virtualBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  virtualText: {
    color: '#fff',
    fontSize: 12,
  },
  cardNumber: {
    fontSize: 22,
    color: '#fff',
    letterSpacing: 2,
    marginBottom: 40,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cardActionButton: {
    alignItems: 'center',
  },
  cardActionText: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
  spendingSection: {
    marginTop: 20,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
  },
  spendingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  timelineOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timelineOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  timelineOptionActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  timelineOptionText: {
    fontSize: 14,
    color: '#000',
    opacity: 0.6,
  },
  timelineOptionTextActive: {
    opacity: 1,
    fontWeight: '600',
  },
  graphContainer: {
    height: 200,
    marginBottom: 20,
  },
  graphBackground: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
  },
  graphLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  graphBars: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bar: {
    width: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 12,
    color: '#000',
    opacity: 0.6,
  },
  totalSpending: {
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: '#000',
    opacity: 0.6,
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
}); 