# Splash Screen Configuration Guide

## Overview
This guide explains the splash screen configuration for the Nexor app, including native splash screens and programmatic control.

## Configuration Files

### 1. app.json Configuration

The splash screen is configured in `app.json` with the following settings:

```json
{
  "expo": {
    "splash": {
      "image": "./assets/images/splash-background.png",
      "resizeMode": "cover",
      "backgroundColor": "#1a365d"
    },
    "ios": {
      "splash": {
        "image": "./assets/images/splash-background.png",
        "resizeMode": "cover",
        "backgroundColor": "#1a365d",
        "tabletImage": "./assets/images/splash-background.png"
      }
    },
    "android": {
      "splash": {
        "image": "./assets/images/splash-background.png",
        "resizeMode": "cover",
        "backgroundColor": "#1a365d"
      }
    }
  }
}
```

### 2. Splash Screen Properties

| Property | Description | Options |
|----------|-------------|---------|
| `image` | Path to splash screen image | Relative path to image file |
| `resizeMode` | How image should be resized | `contain`, `cover`, `native` |
| `backgroundColor` | Background color | Hex color code |
| `tabletImage` | iPad-specific image (iOS only) | Relative path to image file |

### 3. Resize Modes

- **`contain`**: Scale image to fit within screen bounds while maintaining aspect ratio
- **`cover`**: Scale image to fill entire screen while maintaining aspect ratio (may crop)
- **`native`**: Use platform's default behavior

## Assets Requirements

### Image Specifications

| Platform | Recommended Size | Format |
|----------|------------------|---------|
| iOS | 1284x2778px (iPhone 12 Pro Max) | PNG |
| Android | 1080x1920px | PNG |
| Universal | 1242x2436px | PNG |

### Current Assets
- `./assets/images/splash-background.png` - Main splash screen image
- `./assets/images/icon.png` - App icon (used in custom splash component)

## Programmatic Control

### App.tsx Implementation

The main App.tsx file controls the splash screen lifecycle:

```typescript
import * as SplashScreen from 'expo-splash-screen';

// Prevent auto-hide
SplashScreen.preventAutoHideAsync();

// In your component
useEffect(() => {
  async function prepare() {
    try {
      // Your loading logic here
      await loadResources();
    } finally {
      setIsReady(true);
      await SplashScreen.hideAsync();
    }
  }
  prepare();
}, []);
```

### Custom Splash Component

A custom splash screen component is available at `app/components/SplashScreen.tsx` for additional customization:

- Animated logo entrance
- Fade transitions
- Custom branding text
- Loading indicators

## Best Practices

### 1. Performance
- Keep splash screen images optimized (< 1MB)
- Use appropriate image formats (PNG for transparency, JPEG for photos)
- Minimize loading time in App.tsx

### 2. Design
- Match splash screen colors with app theme
- Ensure readability on all device sizes
- Consider dark mode compatibility

### 3. User Experience
- Don't show splash screen for too long (2-3 seconds max)
- Use splash time for essential loading only
- Provide smooth transitions to main app

## Testing

### Development
```bash
npx expo start
```

### Production Build
```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

### Splash Screen Preview
```bash
npx expo prebuild --clean
```

## Troubleshooting

### Common Issues

1. **Splash screen not showing**
   - Check image path in app.json
   - Verify image exists in assets folder
   - Run `npx expo prebuild --clean`

2. **Image not fitting properly**
   - Adjust `resizeMode` property
   - Check image dimensions
   - Verify backgroundColor matches design

3. **Splash screen showing too long**
   - Check App.tsx loading logic
   - Ensure `SplashScreen.hideAsync()` is called
   - Verify no blocking operations

### Debug Commands
```bash
# Clear cache and rebuild
npx expo r -c

# Clean prebuild
npx expo prebuild --clean

# Check configuration
npx expo config
```

## Platform-Specific Notes

### iOS
- Supports tablet-specific images
- Uses Launch Screen storyboard
- Requires app store compliance

### Android
- Uses splash screen API (Android 12+)
- Supports adaptive icons
- Different behavior on various Android versions

### Web
- Uses favicon and meta tags
- Limited splash screen support
- Consider custom loading component

## Updates and Deployment

After making splash screen changes:

1. Run `npx expo prebuild --clean`
2. Test on both platforms
3. Update EAS build if using managed workflow
4. Submit to app stores if needed

## Resources

- [Expo Splash Screen Documentation](https://docs.expo.dev/guides/splash-screens/)
- [React Native Splash Screen](https://github.com/crazycodeboy/react-native-splash-screen)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/launch-screen)
- [Android Splash Screen Guidelines](https://developer.android.com/guide/topics/ui/splash-screen)
