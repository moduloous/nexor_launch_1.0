import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Dimensions,
  Animated,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

type Contact = {
  id: string;
  name: string;
  upiId: string;
  avatar?: string;
  isRecent?: boolean;
  isFrequent?: boolean;
};

type TabType = 'recent' | 'contacts' | 'scan' | 'bank';

export default function SendMoneyScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('recent');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Aakash',
      upiId: 'aakash@okaxis',
      isRecent: true,
      isFrequent: true
    },
    {
      id: '2',
      name: 'Priya',
      upiId: 'priya@ybl',
      isRecent: true
    },
    {
      id: '3',
      name: 'Rahul',
      upiId: 'rahul@paytm',
      isFrequent: true
    },
    {
      id: '4',
      name: 'Sneha',
      upiId: 'sneha@okicici',
      isRecent: true
    }
  ];

  const tabs: { id: TabType; name: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: 'recent', name: 'Recent', icon: 'time-outline' },
    { id: 'contacts', name: 'Contacts', icon: 'people-outline' },
    { id: 'scan', name: 'Scan QR', icon: 'qr-code-outline' },
    { id: 'bank', name: 'Bank', icon: 'card-outline' }
  ];

  const renderContactCard = (contact: Contact) => (
    <TouchableOpacity 
      key={contact.id}
      style={[
        styles.contactCard,
        selectedContact?.id === contact.id && styles.contactCardSelected
      ]}
      onPress={() => setSelectedContact(contact)}
    >
      <LinearGradient
        colors={['#FFD700', '#FFA500']}
        style={styles.avatarContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.avatarText}>
          {contact.name[0].toUpperCase()}
        </Text>
      </LinearGradient>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{contact.name}</Text>
        <Text style={styles.contactUpi}>{contact.upiId}</Text>
      </View>
      {contact.isFrequent && (
        <View style={styles.frequentBadge}>
          <Text style={styles.frequentText}>Frequent</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send Money</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Ionicons 
              name={tab.icon} 
              size={24} 
              color={activeTab === tab.id ? '#4481eb' : '#666'} 
            />
            <Text style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText
            ]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {/* Contacts Section */}
        <View style={styles.contactsSection}>
          {contacts
            .filter(c => activeTab === 'recent' ? c.isRecent : true)
            .map(renderContactCard)}
        </View>

        {/* Amount Entry */}
        {selectedContact && (
          <View style={styles.amountSection}>
            <Text style={styles.amountLabel}>Enter Amount</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor="#666"
              />
            </View>
            <Text style={styles.balanceText}>
              Wallet Balance: ₹15,000
            </Text>

            {/* Note Input */}
            <View style={styles.noteContainer}>
              <TextInput
                style={styles.noteInput}
                value={note}
                onChangeText={setNote}
                placeholder="Add a note (optional)"
                placeholderTextColor="#666"
              />
              <TouchableOpacity style={styles.emojiButton}>
                <Ionicons name="happy-outline" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Send Button */}
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={() => {
                // Handle payment
              }}
            >
              <LinearGradient
                colors={['#FFD700', '#FFA500']}
                style={styles.sendButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.sendButtonText}>
                  Send ₹{amount || '0'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    margin: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 165, 0, 0.1)',
  },
  tabText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeTabText: {
    color: '#FFA500',
  },
  content: {
    flex: 1,
  },
  contactsSection: {
    padding: 16,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 12,
  },
  contactCardSelected: {
    backgroundColor: '#fff',
    borderColor: '#FFD700',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  contactInfo: {
    marginLeft: 12,
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  contactUpi: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  frequentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(255, 165, 0, 0.1)',
    borderRadius: 12,
  },
  frequentText: {
    fontSize: 10,
    color: '#FFA500',
  },
  amountSection: {
    padding: 16,
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  amountInput: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    minWidth: 150,
  },
  balanceText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    width: '100%',
  },
  noteInput: {
    flex: 1,
    height: 48,
    color: '#333',
  },
  emojiButton: {
    padding: 8,
  },
  sendButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  backButton: {
    padding: 8,
  },
}); 