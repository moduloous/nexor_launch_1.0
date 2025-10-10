@echo off
echo 🔧 Fixing expo-router plugin resolution issue...

REM Step 1: Clean installation
echo 📦 Cleaning node_modules and lock files...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist yarn.lock del yarn.lock

REM Step 2: Clear npm cache
echo 🧹 Clearing npm cache...
npm cache clean --force

REM Step 3: Install dependencies
echo ⬇️ Installing dependencies...
npm install

REM Step 4: Install expo-router specifically
echo 🚀 Installing expo-router...
npm install expo-router@~5.0.5

REM Step 5: Prebuild
echo 🏗️ Running prebuild...
npx expo prebuild --clean

echo ✅ Setup complete! Now run: npx expo start
pause
