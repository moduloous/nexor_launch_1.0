# App Icon Configuration Guide

## Overview
This guide explains how the app icon is configured for the Nexor app across different platforms.

## Current Icon
- **File**: `Group 6.png` → `assets/images/icon.png`
- **Design**: "xe" logo on gradient background (teal to dark blue)
- **Format**: PNG with transparency support
- **Style**: Modern, rounded corners, professional branding

## Configuration in app.json

### Global Icon Configuration
```json
{
  "expo": {
    "name": "Nexor",
    "icon": "./assets/images/icon.png"
  }
}
```

### iOS-Specific Configuration
```json
{
  "ios": {
    "icon": "./assets/images/icon.png",
    "supportsTablet": true
  }
}
```

### Android-Specific Configuration
```json
{
  "android": {
    "icon": "./assets/images/icon.png",
    "adaptiveIcon": {
      "foregroundImage": "./assets/images/icon.png",
      "backgroundColor": "#1a365d"
    }
  }
}
```

## Icon Requirements by Platform

### iOS Icon Sizes
| Device | Size (px) | Usage |
|--------|-----------|-------|
| iPhone | 180x180 | App icon on home screen |
| iPad | 152x152 | App icon on home screen |
| App Store | 1024x1024 | App Store listing |
| Spotlight | 120x120 | Search results |
| Settings | 87x87 | Settings app |

### Android Icon Sizes
| Density | Size (px) | Folder |
|---------|-----------|--------|
| mdpi | 48x48 | drawable-mdpi |
| hdpi | 72x72 | drawable-hdpi |
| xhdpi | 96x96 | drawable-xhdpi |
| xxhdpi | 144x144 | drawable-xxhdpi |
| xxxhdpi | 192x192 | drawable-xxxhdpi |

### Adaptive Icons (Android 8.0+)
- **Foreground**: 108x108dp safe area within 192x192dp canvas
- **Background**: Solid color or simple pattern
- **Shape**: System applies mask (circle, square, rounded square, etc.)

## Current Setup

### File Locations
```
assets/
  images/
    icon.png          # Main app icon (1024x1024 recommended)
    
app/
  assets/
    images/
      icon.png        # Copy for app-specific usage
```

### App.json Configuration
```json
{
  "expo": {
    "name": "Nexor",
    "slug": "nexor",
    "icon": "./assets/images/icon.png",
    "ios": {
      "icon": "./assets/images/icon.png"
    },
    "android": {
      "icon": "./assets/images/icon.png",
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/icon.png",
        "backgroundColor": "#1a365d"
      }
    }
  }
}
```

## Design Guidelines

### iOS Human Interface Guidelines
- Use a simple, recognizable design
- Avoid text in icons (except for brands)
- Ensure icon works at small sizes
- Use appropriate corner radius (iOS applies automatically)
- Avoid transparency in background

### Android Material Design
- Use adaptive icon format for Android 8.0+
- Ensure icon works with different shapes
- Consider monochrome version for themed icons
- Use appropriate contrast ratios
- Follow Material Design principles

## Testing Icons

### Development Testing
```bash
# Start development server
npx expo start

# Test on device/simulator
npx expo run:ios
npx expo run:android
```

### Icon Preview
```bash
# Generate native projects to see icons
npx expo prebuild --clean

# Check generated icon files
ls ios/nexor/Images.xcassets/AppIcon.appiconset/
ls android/app/src/main/res/drawable-*/
```

## Optimization Tips

### File Size
- Keep icon file under 1MB
- Use PNG format for transparency
- Optimize with tools like TinyPNG

### Design
- Test icon at multiple sizes (16px to 1024px)
- Ensure visibility on light and dark backgrounds
- Use consistent branding across platforms
- Consider accessibility (color contrast)

## Troubleshooting

### Icon Not Updating
1. Clear cache: `npx expo r -c`
2. Rebuild: `npx expo prebuild --clean`
3. Restart development server
4. Check file paths in app.json

### Platform-Specific Issues
- **iOS**: Check Xcode project for icon assets
- **Android**: Verify adaptive icon configuration
- **Web**: Update favicon in web configuration

### Common Mistakes
- Wrong file path in app.json
- Incorrect image format or size
- Missing platform-specific configurations
- Cache issues during development

## Future Enhancements

### Multiple Icon Variants
- Light/dark mode icons
- Seasonal or promotional icons
- A/B testing different designs

### Advanced Features
- Dynamic icons (iOS 10.3+)
- Shortcut icons (Android)
- Notification icons
- Widget icons

## Resources

- [Expo Icon Documentation](https://docs.expo.dev/guides/app-icons/)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/app-icons)
- [Android Icon Guidelines](https://developer.android.com/guide/practices/ui_guidelines/icon_design)
- [Adaptive Icons](https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive)

## Icon Generation Tools

- [App Icon Generator](https://appicon.co/)
- [Icon Kitchen](https://icon.kitchen/)
- [Expo Icon Generator](https://expo.github.io/app-icon-generator/)
- [Adobe Illustrator](https://www.adobe.com/products/illustrator.html)
- [Figma](https://www.figma.com/)
