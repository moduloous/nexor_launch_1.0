#!/bin/bash

echo "🔧 Fixing expo-router plugin resolution issue..."

# Step 1: Clean installation
echo "📦 Cleaning node_modules and lock files..."
rm -rf node_modules
rm -f package-lock.json yarn.lock

# Step 2: Clear npm cache
echo "🧹 Clearing npm cache..."
npm cache clean --force

# Step 3: Install dependencies
echo "⬇️ Installing dependencies..."
npm install

# Step 4: Install expo-router specifically
echo "🚀 Installing expo-router..."
npm install expo-router@~5.0.5

# Step 5: Prebuild
echo "🏗️ Running prebuild..."
npx expo prebuild --clean

echo "✅ Setup complete! Now run: npx expo start"
