import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, useWindowDimensions, Text, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import XOLogo from './XOLogo';

const TABS = [
  { name: 'index', icon: 'home', label: 'Home' },
  { name: 'flash', icon: 'flash', label: 'Flash' },
  { name: 'grid', icon: 'xo', label: 'Grid' },
  { name: 'orders', icon: 'list', label: 'Orders' },
  { name: 'profile', icon: 'person', label: 'Profile' },
];

const TAB_ICON_SIZE = 24;
const ACTIVE_BG = '#9ACD32'; // Lime green
const TAB_BAR_HEIGHT = 64;
const BORDER_RADIUS = 24;

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  const { isDark } = useTheme();
  const { width } = useWindowDimensions();
  const iconColor = isDark ? '#fff' : '#000';
  const labelColor = isDark ? '#fff' : '#000';

  return (
    <View pointerEvents="box-none" style={styles.fabContainer}>
      <BlurView
        intensity={120}
        tint={isDark ? 'dark' : 'light'}
        style={[
          styles.tabBar,
          {
            backgroundColor: isDark
              ? 'rgba(0,0,0,0.95)'
              : 'rgba(255,255,255,0.95)',
            borderColor: isDark
              ? 'rgba(255,255,255,0.1)'
              : 'rgba(0,0,0,0.1)',
            width: width * 0.9,
          },
        ]}
      >
        {TABS.map((tab, idx) => {
          const isFocused = state.index === idx;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: tab.name,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(tab.name);
            }
          };
          return (
            <AnimatedTabItem
              key={tab.name}
              isFocused={isFocused}
              onPress={onPress}
              icon={tab.icon}
              label={tab.label}
              isDark={isDark}
            />
          );
        })}
      </BlurView>
    </View>
  );
}

// AnimatedTabItem component for smooth transitions
function AnimatedTabItem({ isFocused, onPress, icon, label, isDark }: any) {
  const scale = useRef(new Animated.Value(isFocused ? 1.1 : 1)).current;
  const bgColor = useRef(new Animated.Value(isFocused ? 1 : 0)).current;
  const iconColor = isDark ? '#fff' : '#000';
  const labelColor = isDark ? '#fff' : '#000';
  const backgroundColor = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#9ACD32'],
  });

  useEffect(() => {
    Animated.spring(scale, {
      toValue: isFocused ? 1.1 : 1,
      useNativeDriver: false,
      speed: 20,
      bounciness: 8,
    }).start();
    Animated.timing(bgColor, {
      toValue: isFocused ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  return (
    <Animated.View
      style={[
        styles.tabItem,
        { transform: [{ scale }], backgroundColor },
        { width: 44, height: 44, borderRadius: 22 },
      ]}
    >
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        onPress={onPress}
        activeOpacity={0.8}
        style={{ alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 22 }}
      >
        {icon === 'xo' ? (
          <XOLogo size={TAB_ICON_SIZE} color="#000" />
        ) : (
          <Ionicons
            name={icon as any}
            size={TAB_ICON_SIZE}
            color={iconColor}
            style={{ alignSelf: 'center' }}
          />
        )}
        <Text
          style={[
            styles.tabLabel,
            { color: labelColor },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Platform.OS === 'ios' ? 20 : 16,
    alignItems: 'center',
    zIndex: 100,
    pointerEvents: 'box-none',
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: TAB_BAR_HEIGHT,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  tabItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 2,
  },
}); 