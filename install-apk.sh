#!/bin/bash

echo "==================================================="
echo "CalmSpace Android APK Installation Script"
echo "==================================================="
echo

# Check if adb is available
if ! command -v adb &> /dev/null; then
    echo "Android Debug Bridge (adb) not found in PATH!"
    echo "Please install Android SDK Platform Tools and add them to your PATH."
    echo "You can download them from: https://developer.android.com/studio/releases/platform-tools"
    exit 1
fi

# Check if APK exists
if [ ! -f "app-release.apk" ]; then
    echo "APK file not found!"
    echo "Please make sure app-release.apk exists in the current directory."
    exit 1
fi

echo "Checking for connected Android devices..."
if ! adb devices | grep -q "device$"; then
    echo "No Android devices connected or authorized."
    echo "Please connect your device via USB and enable USB debugging."
    echo
    echo "How to enable USB debugging:"
    echo "1. Go to Settings on your Android device"
    echo "2. Navigate to About Phone"
    echo "3. Tap on Build Number 7 times to enable Developer Options"
    echo "4. Go back to Settings and find Developer Options"
    echo "5. Enable USB debugging"
    echo "6. Connect your device via USB and allow USB debugging when prompted"
    exit 1
fi

echo
echo "Device(s) found! Installing CalmSpace APK..."
echo

# Install the APK
if ! adb install -r app-release.apk; then
    echo
    echo "Failed to install APK."
    echo "Please check if your device has enough storage space and installation from unknown sources is allowed."
    exit 1
fi

echo
echo "==================================================="
echo "CalmSpace APK installed successfully!"
echo "==================================================="
echo
echo "You can now open the CalmSpace app on your Android device."
echo
echo "If you encounter any issues, please refer to the APK-INSTALLATION-GUIDE.md file."
echo

read -p "Press Enter to continue..." 