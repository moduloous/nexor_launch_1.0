import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface XOLogoProps {
  size?: number;
  color?: string;
}

export default function XOLogo({ size = 24, color = '#000' }: XOLogoProps) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size * 0.5} viewBox="0 0 80 40">
        {/* X part - fluid, wavy lines */}
        <Path
          d="M5 35 Q15 5, 25 15 Q35 25, 35 20"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Path
          d="M5 15 Q15 35, 25 25 Q35 15, 35 20"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Connection from X to O */}
        <Path
          d="M35 20 Q40 18, 45 20"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* O part - wavy, not perfect circle */}
        <Path
          d="M45 20 Q55 15, 65 20 Q70 25, 65 30 Q55 35, 45 30 Q40 25, 45 20"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </View>
  );
}
