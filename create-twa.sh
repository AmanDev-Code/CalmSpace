#!/bin/bash

echo "===================================================="
echo "   CalmSpace TWA (Trusted Web Activity) Creator"
echo "===================================================="
echo
echo "This script will help you create a TWA for your PWA."
echo "Before continuing, please ensure:"
echo "1. Your app is deployed to a HTTPS URL"
echo "2. You have Node.js and npm installed"
echo

read -p "Do you want to continue? (Y/N): " CONTINUE

if [[ $CONTINUE != "Y" && $CONTINUE != "y" ]]; then
    echo "Operation cancelled."
    exit 1
fi

echo
echo "Step 1: Installing Bubblewrap CLI globally..."
echo

npm install -g @bubblewrap/cli

if [ $? -ne 0 ]; then
    echo "Error: Failed to install Bubblewrap CLI."
    echo "Please ensure you have Node.js and npm installed and try again."
    exit 1
fi

echo
echo "Bubblewrap CLI installed successfully!"
echo

read -p "Enter your deployed HTTPS URL (e.g., https://calmspace-haven.vercel.app): " DEPLOYED_URL

if [ -z "$DEPLOYED_URL" ]; then
    echo "Error: URL cannot be empty."
    exit 1
fi

echo
echo "Step 2: Initializing Bubblewrap project..."
echo
echo "Using default settings:"
echo "Package name: com.calmspace.haven"
echo

# Create a temporary directory for bubblewrap
mkdir -p twa-build
cd twa-build

bubblewrap init --manifest "$DEPLOYED_URL/manifest.webmanifest" \
    --directory . \
    --packageId com.calmspace.haven

if [ $? -ne 0 ]; then
    echo
    echo "Error: Failed to initialize Bubblewrap project."
    echo "Possible reasons:"
    echo "- The URL may not be accessible"
    echo "- The manifest.webmanifest file may not exist or is invalid"
    echo "- Java Development Kit (JDK) might not be installed or configured"
    cd ..
    exit 1
fi

echo
echo "Step 3: Building the TWA APK..."
echo

bubblewrap build

if [ $? -ne 0 ]; then
    echo
    echo "Error: Failed to build the TWA APK."
    echo "- Java Development Kit (JDK) might not be installed or configured"
    echo "- Android SDK might be missing"
    cd ..
    exit 1
fi

echo
echo "Success! Your TWA APK has been created."
echo
echo "You can find the APK file in:"
echo "$(pwd)/app-release-signed.apk"
echo
echo "For production release:"
echo "1. Sign the APK with your own keystore"
echo "2. Use the command: bubblewrap build --release"
echo

# Copy the APK to the parent directory
cp app-release-signed.apk ../public/calmspace-twa.apk

cd ..

echo "The APK has been copied to public/calmspace-twa.apk for easy access."
echo
echo "Next steps:"
echo "1. Deploy your app again to ensure the latest PWA changes are live"
echo "2. Test the APK on your Android device"
echo "3. For Google Play Store submission, use 'bubblewrap build --release'"
echo

read -p "Press Enter to exit..." 