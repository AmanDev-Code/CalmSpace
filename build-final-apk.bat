@echo off
echo ===================================================
echo CalmSpace Final APK Build Script
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
if exist "calmspace-final.apk" (
  del "calmspace-final.apk"
)

REM Build the React app with production mode
echo Building React app in production mode...
call npx vite build --mode production
if %ERRORLEVEL% NEQ 0 (
  echo Failed to build React application!
  exit /b 1
)
echo React build completed successfully.

REM Sync the web assets with Capacitor
echo Syncing with Capacitor...
call npx cap sync android
if %ERRORLEVEL% NEQ 0 (
  echo Failed to sync with Capacitor!
  exit /b 1
)
echo Capacitor sync completed successfully.

REM Build the Android APK
echo Building Android APK...
cd android
call gradlew clean
call gradlew assembleRelease
if %ERRORLEVEL% NEQ 0 (
  echo Failed to build APK!
  cd ..
  exit /b 1
)
cd ..

REM Copy and rename the APK
echo Copying APK to root as calmspace-final.apk...
copy "android\app\build\outputs\apk\release\app-release.apk" "calmspace-final.apk"
if %ERRORLEVEL% NEQ 0 (
  echo Failed to copy APK!
  exit /b 1
)
echo APK created successfully: calmspace-final.apk

echo.
echo ===================================================
echo Build Process Complete!
echo ===================================================
echo.
echo Signed APK created: calmspace-final.apk
echo.
echo This version includes:
echo 1. Simplified Firebase authentication with ZERO custom redirect settings
echo 2. Uses Firebase's default authentication flow
echo 3. Should work on both mobile and web environments
echo.
echo IMPORTANT: 
echo Make sure you've added https://calmspace-haven.firebaseapp.com/__/auth/handler
echo to your Google Cloud Console OAuth settings!
echo.

REM Ask if user wants to install the APK on connected device
echo Would you like to install the APK on a connected device? (Y/N)
set /p INSTALL_CHOICE=

if /i "%INSTALL_CHOICE%"=="Y" (
  echo.
  echo Installing APK on connected device...
  adb install -r "calmspace-final.apk"
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