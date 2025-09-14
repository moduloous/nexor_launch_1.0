import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows, animation, accessibility } from '../constants/designTokens';

interface DesignSystemContextType {
  // Theme
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
  
  // Colors
  colors: typeof colors;
  getColor: (path: string) => string;
  
  // Typography
  typography: typeof typography;
  
  // Spacing
  spacing: typeof spacing;
  
  // Border Radius
  borderRadius: typeof borderRadius;
  
  // Shadows
  shadows: typeof shadows;
  
  // Animation
  animation: typeof animation;
  
  // Accessibility
  accessibility: typeof accessibility;
  
  // High Contrast Mode
  isHighContrast: boolean;
  toggleHighContrast: () => void;
  
  // Large Text Mode
  isLargeText: boolean;
  toggleLargeText: () => void;
  
  // Regional Settings
  selectedLanguage: string;
  setLanguage: (language: string) => void;
  selectedRegion: string;
  setRegion: (region: string) => void;
}

const DesignSystemContext = createContext<DesignSystemContextType | undefined>(undefined);

interface DesignSystemProviderProps {
  children: ReactNode;
}

export function DesignSystemProvider({ children }: DesignSystemProviderProps) {
  const [isDark, setIsDark] = useState(Appearance.getColorScheme() === 'dark');
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedRegion, setSelectedRegion] = useState('bollywood');

  const toggleTheme = () => setIsDark(!isDark);
  const setTheme = (dark: boolean) => setIsDark(dark);
  
  const toggleHighContrast = () => setIsHighContrast(!isHighContrast);
  const toggleLargeText = () => setIsLargeText(!isLargeText);
  
  const setLanguage = (language: string) => setSelectedLanguage(language);
  const setRegion = (region: string) => setSelectedRegion(region);

  // Get color by path (e.g., 'primary.red', 'neutral.textPrimary')
  const getColor = (path: string): string => {
    const keys = path.split('.');
    let current: any = colors;
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return colors.neutral.textPrimary; // fallback
      }
    }
    
    return typeof current === 'string' ? current : colors.neutral.textPrimary;
  };

  // Get current theme colors
  const getCurrentColors = () => {
    if (isHighContrast) {
      return {
        ...colors,
        primary: {
          ...colors.primary,
          red: colors.accessibility.highContrast.primary,
        },
        neutral: {
          ...colors.neutral,
          backgroundPrimary: colors.accessibility.highContrast.background,
          textPrimary: colors.accessibility.highContrast.text,
          border: colors.accessibility.highContrast.border,
        },
      };
    }
    
    return isDark ? colors : {
      ...colors,
      neutral: {
        ...colors.light,
      },
    };
  };

  const contextValue: DesignSystemContextType = {
    isDark,
    toggleTheme,
    setTheme,
    colors: getCurrentColors(),
    getColor,
    typography: {
      ...typography,
      fontSize: isLargeText ? {
        ...typography.fontSize,
        xs: typography.fontSize.sm,
        sm: typography.fontSize.base,
        base: typography.fontSize.lg,
        lg: typography.fontSize.xl,
        xl: typography.fontSize['2xl'],
        '2xl': typography.fontSize['3xl'],
        '3xl': typography.fontSize['4xl'],
        '4xl': typography.fontSize['4xl'] * 1.2,
      } : typography.fontSize,
    },
    spacing,
    borderRadius,
    shadows,
    animation,
    accessibility,
    isHighContrast,
    toggleHighContrast,
    isLargeText,
    toggleLargeText,
    selectedLanguage,
    setLanguage,
    selectedRegion,
    setRegion,
  };

  return (
    <DesignSystemContext.Provider value={contextValue}>
      {children}
    </DesignSystemContext.Provider>
  );
}

export function useDesignSystem() {
  const context = useContext(DesignSystemContext);
  if (context === undefined) {
    throw new Error('useDesignSystem must be used within a DesignSystemProvider');
  }
  return context;
}

// Hook for getting theme-aware styles
export function useThemeStyles() {
  const { colors, typography, spacing, borderRadius, shadows, isDark, isHighContrast } = useDesignSystem();
  
  return {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    isDark,
    isHighContrast,
    
    // Common style combinations
    container: {
      flex: 1,
      backgroundColor: colors.neutral.backgroundPrimary,
    },
    
    card: {
      backgroundColor: colors.neutral.backgroundCard,
      borderRadius: borderRadius.lg,
      ...shadows.md,
    },
    
    text: {
      primary: {
        color: colors.neutral.textPrimary,
        fontSize: typography.fontSize.base,
        fontFamily: typography.fontFamily.primary,
        fontWeight: typography.fontWeight.regular,
      },
      secondary: {
        color: colors.neutral.textSecondary,
        fontSize: typography.fontSize.sm,
        fontFamily: typography.fontFamily.primary,
        fontWeight: typography.fontWeight.regular,
      },
      muted: {
        color: colors.neutral.textMuted,
        fontSize: typography.fontSize.sm,
        fontFamily: typography.fontFamily.primary,
        fontWeight: typography.fontWeight.regular,
      },
      heading: {
        color: colors.neutral.textPrimary,
        fontSize: typography.fontSize['2xl'],
        fontFamily: typography.fontFamily.display,
        fontWeight: typography.fontWeight.bold,
      },
      subheading: {
        color: colors.neutral.textPrimary,
        fontSize: typography.fontSize.lg,
        fontFamily: typography.fontFamily.display,
        fontWeight: typography.fontWeight.semibold,
      },
    },
    
    button: {
      primary: {
        backgroundColor: colors.primary.red,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
      },
      secondary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary.red,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        color: colors.neutral.textPrimary,
        fontSize: typography.fontSize.base,
        fontFamily: typography.fontFamily.primary,
        fontWeight: typography.fontWeight.semibold,
      },
    },
    
    input: {
      backgroundColor: colors.neutral.backgroundSecondary,
      borderWidth: 1,
      borderColor: colors.neutral.border,
      borderRadius: borderRadius.lg,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      color: colors.neutral.textPrimary,
      fontSize: typography.fontSize.base,
      fontFamily: typography.fontFamily.primary,
    },
  };
}
