import { Stack } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function MedicinesLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 32,
              paddingHorizontal: 16,
              paddingBottom: 8,
              backgroundColor: '#fff',
              borderBottomWidth: 1,
              borderBottomColor: '#eee'
            }}>
              <Pressable onPress={() => router.back()}>
                <ArrowLeft size={24} color="#000" />
              </Pressable>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 8 }}>Medicines</Text>
            </View>
          ),
        }}
      />
    </Stack>
  );
} 