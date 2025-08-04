import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface BeamsBackgroundProps {
  beamWidth?: number;
  beamHeight?: number;
  beamNumber?: number;
  lightColor?: string;
  speed?: number;
  noiseIntensity?: number;
  scale?: number;
  rotation?: number;
  style?: any;
}

const BeamsBackground: React.FC<BeamsBackgroundProps> = ({
  beamWidth = 2,
  beamHeight = 15,
  beamNumber = 12,
  lightColor = "#ffffff",
  speed = 2,
  noiseIntensity = 1.75,
  scale = 0.2,
  rotation = 0,
  style
}) => {
  const animatedValues = useRef<Animated.Value[]>([]);
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Initialize animated values for each beam
  useEffect(() => {
    animatedValues.current = Array.from({ length: beamNumber }, () => new Animated.Value(0));
  }, [beamNumber]);

  // Create animation loop
  useEffect(() => {
    const animations = animatedValues.current.map((value, index) => {
      return Animated.loop(
        Animated.timing(value, {
          toValue: 1,
          duration: (3000 / speed) + (index * 200), // Vary timing for each beam
          useNativeDriver: true,
        })
      );
    });

    // Start all animations
    Animated.parallel(animations).start();

    return () => {
      animations.forEach(animation => animation.stop());
    };
  }, [speed, beamNumber]);

  // Calculate beam positions
  const totalWidth = beamNumber * beamWidth + (beamNumber - 1) * 2;
  const startX = (screenWidth - totalWidth) / 2;

  const renderBeam = (index: number) => {
    const animatedValue = animatedValues.current[index];
    if (!animatedValue) return null;

    const xPosition = startX + index * (beamWidth + 2);
    const randomOffset = Math.random() * 20 - 10;

    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-screenHeight, screenHeight + beamHeight],
    });

    const opacity = animatedValue.interpolate({
      inputRange: [0, 0.1, 0.9, 1],
      outputRange: [0, 1.0, 1.0, 0],
    });

    const scaleY = animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.5, 1, 0.5],
    });

    return (
      <Animated.View
        key={index}
        style={[
          styles.beam,
          {
            width: beamWidth,
            height: beamHeight * 10,
            left: xPosition + randomOffset,
            transform: [
              { translateY },
              { scaleY },
            ],
            opacity,
          },
        ]}
      >
        <LinearGradient
          colors={[
            'transparent',
            lightColor + '30',
            lightColor + '60',
            lightColor + '80',
            lightColor + '60',
            lightColor + '30',
            'transparent',
          ]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: beamNumber }, (_, index) => renderBeam(index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  beam: {
    position: 'absolute',
    borderRadius: 1,
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default BeamsBackground; 