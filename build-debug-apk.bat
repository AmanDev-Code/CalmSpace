@echo off
echo ===================================================
echo CalmSpace Debug APK Build Script - For Auth Troubleshooting
echo ===================================================
echo.

REM Set environment variables
set ANDROID_SDK_PATH=C:\Users\ASUS\AppData\Local\Android\Sdk
echo Setting ANDROID_SDK_PATH to %ANDROID_SDK_PATH%

REM Create local.properties if it doesn't exist
if not exist "android\local.properties" (
  echo Creating android\local.properties...
  echo sdk.dir=%ANDROID_SDK_PATH% > android\local.properties
  echo Created local.properties with SDK path.
) else (
  echo local.properties already exists.
)

REM Clean up old APKs
echo Cleaning up previous APK builds...
if exist "calmspace-debug.apk" (
  del "calmspace-debug.apk"
)

REM Build the React app with development mode for better logging
echo Building React app in development mode for better logging...
call npx vite build --mode development 
if %ERRORLEVEL% NEQ 0 (
  echo Failed to build React application!
  exit /b 1
)
echo React build completed successfully with debug logging.

REM Sync the web assets with Capacitor
echo Syncing with Capacitor...
call npx cap sync android
if %ERRORLEVEL% NEQ 0 (
  echo Failed to sync with Capacitor!
  exit /b 1
)
echo Capacitor sync completed successfully.

REM Build the Android debug APK (not release version)
echo Building Android debug APK...
cd android
call gradlew clean
call gradlew assembleDebug
if %ERRORLEVEL% NEQ 0 (
  echo Failed to build APK!
  cd ..
  exit /b 1
)
cd ..

REM Copy and rename the APK to debug
echo Copying APK to root as calmspace-debug.apk...
copy "android\app\build\outputs\apk\debug\app-debug.apk" "calmspace-debug.apk"
if %ERRORLEVEL% NEQ 0 (
  echo Failed to copy APK!
  exit /b 1
)
echo Debug APK created successfully: calmspace-debug.apk

echo.
echo ===================================================
echo Debug Build Process Complete!
echo ===================================================
echo.
echo Debug APK created: calmspace-debug.apk
echo.
echo This version includes:
echo 1. Enhanced logging for Google authentication issues
echo 2. Better error reporting for redirect URIs
echo 3. Debug build for more detailed error messages
echo.
echo IMPORTANT: 
echo 1. Make sure you've added the EXACT redirect URI to Google Cloud Console:
echo    https://calm-space-gamma.vercel.app/auth-redirect.html
echo 2. Check your Android logcat when testing the app for detailed error messages
echo.

REM Ask if user wants to install the APK on connected device
echo Would you like to install the APK on a connected device? (Y/N)
set /p INSTALL_CHOICE=

if /i "%INSTALL_CHOICE%"=="Y" (
  echo.
  echo Installing APK on connected device...
  adb install -r "calmspace-debug.apk"
  if %ERRORLEVEL% NEQ 0 (
    echo Failed to install APK! Make sure a device is connected and ADB is working.
  ) else (
    echo APK installed successfully.
  )
) else (
  echo Skipping APK installation.
)

echo.
echo Done! 