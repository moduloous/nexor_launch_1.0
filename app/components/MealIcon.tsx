import React from 'react';
import Svg, { Circle, Path, G } from 'react-native-svg';

interface MealIconProps {
  width?: number;
  height?: number;
}

export const MealIcon: React.FC<MealIconProps> = ({ width = 60, height = 60 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 512 512">
      <Circle cx="256" cy="256" r="240" fill="#8B4513"/>
      <G transform="translate(56, 56)">
        {/* Red/Orange Vegetables */}
        <Path d="M200 100 C250 50, 300 50, 350 100" fill="#FF6B35" stroke="#D14633" strokeWidth={8}/>
        {/* Green Vegetables */}
        <Path d="M150 120 C200 70, 250 70, 300 120" fill="#4CAF50" stroke="#388E3C" strokeWidth={8}/>
        {/* Mushrooms */}
        <Path d="M100 140 C150 90, 200 90, 250 140" fill="#F5F5DC" stroke="#8B7355" strokeWidth={8}/>
        {/* Egg */}
        <Circle cx="200" cy="180" r="40" fill="#FFD700"/>
        <Circle cx="200" cy="180" r="20" fill="#FFF"/>
        {/* Sauce */}
        <Path d="M180 160 Q200 140, 220 160" fill="none" stroke="#FF0000" strokeWidth={4}/>
        {/* Carrots */}
        <Path d="M280 140 C330 90, 380 90, 430 140" fill="#FFA500" stroke="#FF8C00" strokeWidth={8}/>
      </G>
    </Svg>
  );
}; 