# Nexor Project Setup Guide

## Prerequisites
Before running this project, make sure you have the following installed:

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** or **yarn** (comes with Node.js)
   - Verify installation: `npm --version`

3. **Expo CLI**
   ```bash
   npm install -g @expo/cli
   ```

4. **Git** (to clone the repository)
   - Download from: https://git-scm.com/

## Setup Instructions

### Step 1: Clone the Repository
```bash
git clone https://github.com/moduloous/nexor.git
cd nexor
```

### Step 2: Clean Installation
If you're getting plugin resolution errors, follow these steps:

1. **Delete existing node_modules and lock files:**
   ```bash
   # On Windows
   rmdir /s node_modules
   del package-lock.json
   del yarn.lock

   # On macOS/Linux
   rm -rf node_modules
   rm -f package-lock.json yarn.lock
   ```

2. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

### Step 3: Install Expo Router (if still having issues)
If you're still getting expo-router plugin errors, manually install it:

```bash
npm install expo-router@~5.0.5
```

### Step 4: Prebuild (Important for expo-router)
Run the prebuild command to generate native code:

```bash
npx expo prebuild --clean
```

### Step 5: Start the Development Server
```bash
npx expo start
```

## Troubleshooting

### If you get "Failed to resolve plugin for module expo-router" error:

1. **Check Expo CLI version:**
   ```bash
   npx expo --version
   ```
   Make sure you have the latest version (50+)

2. **Update Expo CLI:**
   ```bash
   npm install -g @expo/cli@latest
   ```

3. **Clear Expo cache:**
   ```bash
   npx expo r -c
   ```

4. **Reset Metro bundler:**
   ```bash
   npx expo start --clear
   ```

### If you get dependency conflicts:

1. **Use npm with legacy peer deps:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Or use yarn instead:**
   ```bash
   npm install -g yarn
   yarn install
   ```

### If you get React version conflicts:

The project uses React 19. If you encounter issues:

1. **Check your Node.js version** (should be 18+)
2. **Use the exact versions in package.json**
3. **Clear cache and reinstall**

## Project Structure

This is a React Native Expo project with the following features:
- 🍕 Food Delivery
- 🛒 Shopping/E-commerce
- 🚗 Ride Booking
- 🎫 Events & Tickets
- 🏨 Hotel Booking
- ✈️ Travel Booking
- 💊 Medicine Delivery
- 💰 Wallet & Payments

## Environment Setup

### For iOS Development:
- Install Xcode from the Mac App Store
- Install iOS Simulator

### For Android Development:
- Install Android Studio
- Set up Android SDK and emulator

### For Web Development:
- No additional setup required

## Running the Project

1. **Start the development server:**
   ```bash
   npx expo start
   ```

2. **Choose your platform:**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser
   - Scan QR code with Expo Go app on your phone

## Common Issues and Solutions

### Metro bundler issues:
```bash
npx expo start --clear
```

### Cache issues:
```bash
npx expo r -c
```

### Native module issues:
```bash
npx expo prebuild --clean
npx expo run:ios  # or run:android
```

## Support

If you encounter any issues:
1. Check this setup guide first
2. Clear cache and reinstall dependencies
3. Make sure you're using the correct Node.js and Expo CLI versions
4. Check the Expo documentation: https://docs.expo.dev/

## API Keys

The project includes Google Maps API keys in the configuration. For production use, you should:
1. Get your own API keys
2. Replace them in `app.json`
3. Set up proper environment variables

---

**Happy coding! 🚀**
