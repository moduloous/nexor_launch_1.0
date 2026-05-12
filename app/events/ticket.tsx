import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

export default function TicketScreen() {
  const router = useRouter();
  const { isDark } = useTheme();

  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons 
          name="arrow-back" 
          size={24} 
          color={isDark ? '#fff' : '#000'} 
        />
      </TouchableOpacity>
      
      <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#000' }]}>Tickets</Text>
      
      <TouchableOpacity 
        style={styles.shareButton}
        onPress={() => {
          // Share functionality
        }}
      >
        <Ionicons 
          name="share-outline" 
          size={24} 
          color={isDark ? '#fff' : '#000'} 
        />
      </TouchableOpacity>
    </View>
  );

  const renderTicketImage = () => (
    <View style={styles.ticketImageContainer}>
      <View style={styles.cartoonCharacter}>
        <View style={styles.characterHead}>
          <View style={styles.hair} />
          <View style={styles.face}>
            <View style={styles.eyes}>
              <View style={styles.eye} />
              <View style={styles.eye} />
            </View>
            <View style={styles.nose} />
            <View style={styles.mouth} />
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.shirt} />
        </View>
        <View style={styles.pillow} />
      </View>
    </View>
  );

  const renderTicketInfo = () => (
    <View style={[styles.ticketInfoContainer, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
      <Text style={[styles.eventTitle, { color: isDark ? '#fff' : '#000' }]}>Oliver Tree Concert: Indonesia 29 December 2022</Text>
      
      <View style={styles.infoGrid}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: isDark ? '#ccc' : '#666' }]}>Date</Text>
            <Text style={[styles.infoValue, { color: isDark ? '#fff' : '#000' }]}>Dec 29, 2022</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: isDark ? '#ccc' : '#666' }]}>Time</Text>
            <Text style={[styles.infoValue, { color: isDark ? '#fff' : '#000' }]}>10:00 PM</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: isDark ? '#ccc' : '#666' }]}>Venue</Text>
            <Text style={[styles.infoValue, { color: isDark ? '#fff' : '#000' }]}>Gelora Bung Karno</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: isDark ? '#ccc' : '#666' }]}>Seat</Text>
            <Text style={[styles.infoValue, { color: isDark ? '#fff' : '#000' }]}>No seat</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderBarcode = () => (
    <View style={styles.barcodeContainer}>
      <View style={styles.barcode}>
        {Array.from({ length: 40 }, (_, i) => (
          <View
            key={i}
            style={[
              styles.barcodeLine,
              { 
                width: Math.random() > 0.5 ? 2 : 1,
                height: 60 + Math.random() * 20
              }
            ]}
          />
        ))}
      </View>
      <Text style={[styles.barcodeText, { color: isDark ? '#ccc' : '#666' }]}>12345678901234567890</Text>
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionButtonsContainer}>
      <TouchableOpacity style={styles.imageButton}>
        <Ionicons name="camera" size={20} color="#fff" />
        <Text style={styles.buttonText}>Image</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.qrButton}>
        <Ionicons name="qr-code" size={20} color="#FF6B6B" />
        <Text style={[styles.buttonText, { color: '#FF6B6B' }]}>QR Code</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#1a1a1a' : '#f8f9fa'} />
      
      {renderHeader()}
      {renderTicketImage()}
      {renderTicketInfo()}
      {renderBarcode()}
      {renderActionButtons()}
    </SafeAreaView>
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
  },
  ticketImageContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  cartoonCharacter: {
    alignItems: 'center',
  },
  characterHead: {
    position: 'relative',
    marginBottom: 20,
  },
  hair: {
    width: 80,
    height: 40,
    backgroundColor: '#8B4513',
    borderRadius: 40,
    position: 'absolute',
    top: -10,
    left: -10,
  },
  face: {
    width: 60,
    height: 60,
    backgroundColor: '#FFE4C4',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyes: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  eye: {
    width: 8,
    height: 8,
    backgroundColor: '#000',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  nose: {
    width: 6,
    height: 12,
    backgroundColor: '#FF6B6B',
    borderRadius: 3,
    marginBottom: 4,
  },
  mouth: {
    width: 12,
    height: 2,
    backgroundColor: '#000',
    borderRadius: 1,
  },
  body: {
    alignItems: 'center',
  },
  shirt: {
    width: 60,
    height: 40,
    backgroundColor: '#4169E1',
    borderRadius: 8,
  },
  pillow: {
    width: 100,
    height: 20,
    backgroundColor: '#F5F5DC',
    borderRadius: 10,
    marginTop: 10,
  },
  ticketInfoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoGrid: {
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  barcodeContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  barcode: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 80,
    marginBottom: 8,
  },
  barcodeLine: {
    backgroundColor: '#000',
    marginHorizontal: 1,
  },
  barcodeText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 