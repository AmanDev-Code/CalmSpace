#!/bin/bash

# Custom build script for Vercel deployment
# This script ensures that .well-known files are properly copied to the output directory

echo "Starting custom Vercel build process..."

# Run the normal build process
echo "Running npm build..."
npm run build

# Create the .well-known directory in the output folder
echo "Ensuring .well-known directory exists in output..."
mkdir -p dist/.well-known

# Copy the assetlinks.json file from public
echo "Copying assetlinks.json to output directory..."
cp -f public/.well-known/assetlinks.json dist/.well-known/

# Verify the file exists in the output directory
if [ -f "dist/.well-known/assetlinks.json" ]; then
  echo "✅ Successfully copied assetlinks.json to dist/.well-known/"
  echo "Content of dist/.well-known/assetlinks.json:"
  cat dist/.well-known/assetlinks.json
else
  echo "❌ Failed to copy assetlinks.json to dist/.well-known/"
  echo "Creating file manually..."
  
  # If the file copy failed, create it manually with the correct content
  cat > dist/.well-known/assetlinks.json << 'EOF'
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

  echo "Manually created assetlinks.json in dist/.well-known/"
fi

# Copy the manifest file if it exists
if [ -f "public/manifest.webmanifest" ]; then
  echo "Copying manifest.webmanifest to output directory..."
  cp -f public/manifest.webmanifest dist/
  echo "✅ Successfully copied manifest.webmanifest to dist/"
else
  echo "❌ manifest.webmanifest not found in public directory"
fi

# Make sure verify pages are copied
if [ -f "public/verify-technical-files.html" ]; then
  echo "Copying verify-technical-files.html to output directory..."
  cp -f public/verify-technical-files.html dist/
  echo "✅ Successfully copied verify-technical-files.html to dist/"
fi

if [ -f "public/check-assetlinks.html" ]; then
  echo "Copying check-assetlinks.html to output directory..."
  cp -f public/check-assetlinks.html dist/
  echo "✅ Successfully copied check-assetlinks.html to dist/"
fi

echo "Custom build process completed!" 