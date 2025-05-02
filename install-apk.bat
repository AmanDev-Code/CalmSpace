@echo off
echo ===================================================
echo CalmSpace Android APK Installation Script
echo ===================================================
echo.

REM Check if adb is available
where adb >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo Android Debug Bridge (adb) not found in PATH!
  echo Please install Android SDK Platform Tools and add them to your PATH.
  echo You can download them from: https://developer.android.com/studio/releases/platform-tools
  exit /b 1
)

REM Check if APK exists
if not exist "app-release.apk" (
  echo APK file not found!
  echo Please make sure app-release.apk exists in the current directory.
  exit /b 1
)

echo Checking for connected Android devices...
adb devices | findstr "device$" >nul
if %ERRORLEVEL% NEQ 0 (
  echo No Android devices connected or authorized.
  echo Please connect your device via USB and enable USB debugging.
  echo.
  echo How to enable USB debugging:
  echo 1. Go to Settings on your Android device
  echo 2. Navigate to About Phone
  echo 3. Tap on Build Number 7 times to enable Developer Options
  echo 4. Go back to Settings and find Developer Options
  echo 5. Enable USB debugging
  echo 6. Connect your device via USB and allow USB debugging when prompted
  exit /b 1
)

echo.
echo Device(s) found! Installing CalmSpace APK...
echo.

REM Install the APK
adb install -r app-release.apk
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Failed to install APK.
  echo Please check if your device has enough storage space and installation from unknown sources is allowed.
  exit /b 1
)

echo.
echo ===================================================
echo CalmSpace APK installed successfully!
echo ===================================================
echo.
echo You can now open the CalmSpace app on your Android device.
echo.
echo If you encounter any issues, please refer to the APK-INSTALLATION-GUIDE.md file.
echo.

pause 