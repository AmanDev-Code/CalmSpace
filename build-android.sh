#!/bin/bash

echo "==================================================="
echo "CalmSpace Android APK Build Script"
echo "==================================================="
echo ""

# Set environment variables based on OS
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  ANDROID_SDK_PATH="$HOME/Library/Android/sdk"
else
  # Linux or other
  ANDROID_SDK_PATH="$HOME/Android/Sdk"
  # Allow override from environment if set
  if [ -n "$ANDROID_HOME" ]; then
    ANDROID_SDK_PATH="$ANDROID_HOME"
  fi
fi

export ANDROID_SDK_PATH
echo "Setting ANDROID_SDK_PATH to $ANDROID_SDK_PATH"

# Create local.properties if it doesn't exist
if [ ! -f "android/local.properties" ]; then
  echo "Creating android/local.properties..."
  echo "sdk.dir=$ANDROID_SDK_PATH" > android/local.properties
  echo "Created local.properties with SDK path."
else
  echo "local.properties already exists."
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "Node.js is not installed! Please install Node.js and try again."
  exit 1
fi

# Check for NPM
if ! command -v npm &> /dev/null; then
  echo "npm is not installed! Please check your Node.js installation."
  exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
  if [ $? -ne 0 ]; then
    echo "Failed to install dependencies!"
    exit 1
  fi
  echo "Dependencies installed successfully."
else
  echo "Dependencies already installed."
fi

echo ""
echo "Building React application..."
npm run build
if [ $? -ne 0 ]; then
  echo "Failed to build React application!"
  exit 1
fi
echo "React build completed successfully."

echo ""
echo "Syncing with Capacitor..."
npx cap sync android
if [ $? -ne 0 ]; then
  echo "Failed to sync with Capacitor!"
  exit 1
fi
echo "Capacitor sync completed successfully."

echo ""
echo "Building Android APK..."
cd android
if [ -f "gradlew" ]; then
  echo "Building debug APK..."
  chmod +x gradlew
  ./gradlew assembleDebug
  if [ $? -ne 0 ]; then
    echo "Failed to build debug APK!"
    cd ..
    exit 1
  fi
  
  echo "Building release APK..."
  ./gradlew assembleRelease
  if [ $? -ne 0 ]; then
    echo "Failed to build release APK!"
    cd ..
    exit 1
  fi
else
  echo "Gradle wrapper not found! Make sure your Android project is set up correctly."
  cd ..
  exit 1
fi

cd ..

echo ""
echo "==================================================="
echo "Build Process Complete!"
echo "==================================================="
echo ""
echo "Debug APK location:   android/app/build/outputs/apk/debug/app-debug.apk"
echo "Release APK location: android/app/build/outputs/apk/release/app-release-unsigned.apk"
echo ""
echo "Note: The release APK is unsigned. To sign it, follow the instructions in ANDROID-BUILD-INSTRUCTIONS.md"
echo ""

# Ask if user wants to install the debug APK on connected device
read -p "Would you like to install the debug APK on a connected device? (y/N) " INSTALL_CHOICE

if [[ "$INSTALL_CHOICE" =~ ^[Yy]$ ]]; then
  echo ""
  echo "Installing debug APK on connected device..."
  adb install -r android/app/build/outputs/apk/debug/app-debug.apk
  if [ $? -ne 0 ]; then
    echo "Failed to install APK! Make sure a device is connected and ADB is working."
  else
    echo "APK installed successfully."
  fi
else
  echo "Skipping APK installation."
fi

echo ""
echo "Done!" 