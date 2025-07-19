import React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Platform } from 'react-native';

const MOCK_PROFILE = {
  name: 'Arya',
  dob: '12.07.2005',
  place: 'Jaipur',
  issueDate: '06.25.2021',
  profileImage: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/banners/model.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYW5uZXJzL21vZGVsLmpwZyIsImlhdCI6MTc1Mjg2MjQwNCwiZXhwIjoxNzg0Mzk4NDA0fQ.jxKOj31s5l8uym_spofM3kkYtQ4odYWQv_C5Xu0mcP0', // Updated to Supabase image
};

export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  const fontFamily = Platform.select({ ios: 'System', android: 'sans-serif' });

  return (
    <View style={styles.screen}>    
      <View style={[styles.card, { width: width * 0.92 }]}>        
        {/* Top border stars */}
        <View style={[styles.starsRow, styles.starsTop]} accessible accessibilityLabel="Top border stars">
          {Array.from({ length: 28 }).map((_, i) => (
            <Text key={i} style={[styles.star, { fontFamily, fontWeight: '300' }]}>★</Text>
          ))}
        </View>
        {/* Bottom border stars */}
        <View style={[styles.starsRow, styles.starsBottom]} accessible accessibilityLabel="Bottom border stars">
          {Array.from({ length: 28 }).map((_, i) => (
            <Text key={i} style={[styles.star, { fontFamily, fontWeight: '300' }]}>★</Text>
          ))}
        </View>
        {/* Left border stars */}
        <View style={[styles.starsCol, styles.starsLeft]} accessible accessibilityLabel="Left border stars">
          {Array.from({ length: 12 }).map((_, i) => (
            <Text key={i} style={[styles.star, { fontFamily, fontWeight: '300' }]}>★</Text>
          ))}
        </View>
        {/* Right border stars */}
        <View style={[styles.starsCol, styles.starsRight]} accessible accessibilityLabel="Right border stars">
          {Array.from({ length: 12 }).map((_, i) => (
            <Text key={i} style={[styles.star, { fontFamily, fontWeight: '300' }]}>★</Text>
          ))}
        </View>
        <View style={[styles.contentRow, { zIndex: 2 }]}> {/* ensure content is above the stars */}
          <Image
            source={{ uri: MOCK_PROFILE.profileImage }}
            style={[styles.profileImage, { width: 120, height: 200, marginRight: 2 }]}
            resizeMode="cover"
            accessibilityLabel="Profile photo"
          />
          <View style={[styles.details, { paddingLeft: 12, alignItems: 'flex-start', flex: 1 }]}> {/* left align and padding */}
            <Text style={[styles.labelText, { fontFamily, fontWeight: 'bold' }]}>PERMANENT LICENCE ACCESS TO NEXOR</Text>
            <View style={styles.field}><Text style={[styles.fieldLabel, { fontFamily, fontWeight: '300' }]}>Issued to:</Text><Text style={[styles.fieldValue, { fontFamily, fontWeight: '300' }]}>{MOCK_PROFILE.name}</Text></View>
            <View style={styles.field}><Text style={[styles.fieldLabel, { fontFamily, fontWeight: '300' }]}>Date of birth:</Text><Text style={[styles.fieldValue, { fontFamily, fontWeight: '300' }]}>{MOCK_PROFILE.dob}</Text></View>
            <View style={styles.field}><Text style={[styles.fieldLabel, { fontFamily, fontWeight: '300' }]}>Place of issue:</Text><Text style={[styles.fieldValue, { fontFamily, fontWeight: '300' }]}>{MOCK_PROFILE.place}</Text></View>
            <View style={styles.field}><Text style={[styles.fieldLabel, { fontFamily, fontWeight: '300' }]}>Date of issue:</Text><Text style={[styles.fieldValue, { fontFamily, fontWeight: '300' }]}>{MOCK_PROFILE.issueDate}</Text></View>
            <Text style={[styles.licenseText, { fontFamily, fontWeight: '300' }]}>This is to certify that the person named and described above is permitted to use Nexor app all over the world unless detained by life.</Text>
            <View style={styles.signatureRow}>
              <Text style={[styles.signatureText, { fontFamily, fontWeight: '300' }]}>— {MOCK_PROFILE.name}</Text>
              <Text style={[styles.signatureLabel, { fontFamily, fontWeight: '300' }]}>Signature of Authorized Traveler</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 64,
  },
  card: {
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#DAB1DA',
    padding: 16,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    minHeight: 250,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
  },
  starsTop: {
    top: 0,
  },
  starsBottom: {
    bottom: 0,
  },
  starsCol: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    zIndex: 1,
  },
  starsLeft: {
    left: 0,
    top: 0,
    bottom: 0,
  },
  starsRight: {
    right: 0,
    top: 0,
    bottom: 0,
  },
  star: {
    color: '#000',
    fontSize: 13,
    marginHorizontal: 0,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  profileImage: {
    borderRadius: 18,
    backgroundColor: '#eee',
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  labelText: {
    fontWeight: '400',
    fontSize: 13,
    marginBottom: 10,
    color: '#222',
    letterSpacing: 0.5,
  },
  field: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  fieldLabel: {
    fontWeight: '300',
    width: 90,
    color: '#222',
    fontSize: 10,
  },
  fieldValue: {
    fontWeight: '300',
    color: '#222',
    fontSize: 10,
  },
  licenseText: {
    fontSize: 10,
    marginTop: 10,
    color: '#666',
  },
  signatureRow: {
    marginTop: 12,
    alignItems: 'flex-end',
    width: '100%',
  },
  signatureText: {
    fontSize: 12,
    color: '#222',
    fontStyle: 'italic',
  },
  signatureLabel: {
    fontSize: 8,
    color: '#888',
  },
}); 