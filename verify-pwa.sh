#!/bin/bash

# Build the application
echo "Building the application..."
npm run build

echo "Starting the preview server..."
npm run preview &
SERVER_PID=$!

# Give the server some time to start
sleep 3

# Function to check if a URL returns a 200 OK status
check_url() {
  URL=$1
  DESCRIPTION=$2
  
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $URL)
  
  if [ $HTTP_CODE -eq 200 ]; then
    echo "✅ $DESCRIPTION is accessible (200 OK)"
  else
    echo "❌ $DESCRIPTION returned HTTP $HTTP_CODE"
  fi
}

# Check important PWA files
BASE_URL="http://localhost:4173"
echo -e "\nVerifying critical PWA files:"
check_url "$BASE_URL/manifest.webmanifest" "Manifest file"
check_url "$BASE_URL/.well-known/assetlinks.json" "Asset links file"
check_url "$BASE_URL/pwa-icons/icon-192x192.png" "PWA icon (192x192)"
check_url "$BASE_URL/pwa-icons/icon-512x512.png" "PWA icon (512x512)"
check_url "$BASE_URL/sw.js" "Service worker"

echo -e "\nChecking Lighthouse PWA scores requires running Lighthouse in Chrome."
echo "You can do this by:"
echo "1. Opening Chrome DevTools"
echo "2. Going to the Lighthouse tab"
echo "3. Selecting 'Progressive Web App' category"
echo "4. Clicking 'Generate report'"

# Keep the script running to allow manual testing
echo -e "\nPress Ctrl+C to stop the server and exit..."
wait $SERVER_PID 