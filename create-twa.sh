#!/bin/bash

echo "===================================================="
echo "      CalmSpace TWA (Trusted Web Activity) Builder"
echo "===================================================="
echo

# Check for Java
echo "📌 Checking requirements..."
if ! command -v java &> /dev/null; then
    echo "❌ Java not found! Please install JDK 17+ and add it to PATH."
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js."
    exit 1
fi

echo "✅ Java and Node.js found."
echo

read -p "Do you want to build the TWA? (Y/N): " CONTINUE

if [[ $CONTINUE != "Y" && $CONTINUE != "y" ]]; then
    echo "Operation cancelled."
    exit 1
fi

# Ask for URL
read -p "Enter your deployed HTTPS URL (e.g., https://calm-space-gamma.vercel.app): " DEPLOYED_URL

if [ -z "$DEPLOYED_URL" ]; then
    echo "❌ Error: URL cannot be empty."
    exit 1
fi

# Ensure .well-known directory exists and create assetlinks.json
echo
echo "📄 Creating or updating Digital Asset Links file..."
mkdir -p "public/.well-known"

# Create assetlinks.json with the correct content
cat > "public/.well-known/assetlinks.json" << EOF
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.calmspace.haven",
      "sha256_cert_fingerprints": [
        "59:77:CC:93:3B:B4:A4:CD:0F:C3:D9:C5:99:E7:F2:51:B8:04:CE:F0:55:2E:43:EA:5D:E0:35:14:E4:41:07:E3"
      ]
    }
  }
]
EOF

echo "✅ Created assetlinks.json file at public/.well-known/assetlinks.json"
echo "🔗 Your Digital Asset Links URL will be: $DEPLOYED_URL/.well-known/assetlinks.json"
echo

# Create a temporary directory for bubblewrap
echo "📁 Creating or switching to twa-build directory..."
mkdir -p twa-build
cd twa-build

# Cleanup old builds
echo "🔄 Cleaning old build folders..."
rm -rf build .gradle

# Step 1 - Install Bubblewrap
echo "🛠️ Installing Bubblewrap CLI globally..."
npm install -g @bubblewrap/cli

if [ $? -ne 0 ]; then
    echo "❌ Failed to install Bubblewrap CLI."
    cd ..
    exit 1
fi

# Step 2 - Init project with no fallback
echo "🚀 Initializing Bubblewrap project..."
bubblewrap init --manifest "$DEPLOYED_URL/manifest.webmanifest" \
    --directory . \
    --packageId com.calmspace.haven \
    --fallbackType none

if [ $? -ne 0 ]; then
    echo "❌ Bubblewrap init failed. Check your manifest.webmanifest and HTTPS URL."
    cd ..
    exit 1
fi

# Step 3 - Build signed APK
echo "🏗️ Building TWA APK..."
bubblewrap build --ks-key-alias calmspace

if [ $? -ne 0 ]; then
    echo "❌ Bubblewrap build failed. Check JDK and Android SDK."
    cd ..
    exit 1
fi

echo "✅ Success! TWA APK created."
echo "➜ File: $(pwd)/app-release-signed.apk"

# Step 4 - Optional ADB install
read -p "Do you want to install the APK to your connected Android device? (Y/N): " INSTALL
if [[ $INSTALL == "Y" || $INSTALL == "y" ]]; then
    echo "📱 Installing to device..."
    adb install -r app-release-signed.apk
fi

# Step 5 - Copy to parent for access
cp app-release-signed.apk ../public/calmspace-twa.apk
cd ..

echo "✅ APK copied to public/calmspace-twa.apk"
echo

# Final instructions
echo "🔍 IMPORTANT: To test TWA integration, you must:"
echo "1. Deploy your app to $DEPLOYED_URL"
echo "2. Verify assetlinks.json is accessible at $DEPLOYED_URL/.well-known/assetlinks.json"
echo "3. Install the APK on your Android device and test integration"
echo

read -p "Press Enter to exit..." 