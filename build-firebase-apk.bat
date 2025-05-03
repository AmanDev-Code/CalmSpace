@echo off
echo ===================================================
echo CalmSpace APK Build Script - Using Firebase Default Auth Handlers
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
if exist "calmspace-firebase.apk" (
  del "calmspace-firebase.apk"
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
echo Copying APK to root as calmspace-firebase.apk...
copy "android\app\build\outputs\apk\release\app-release.apk" "calmspace-firebase.apk"
if %ERRORLEVEL% NEQ 0 (
  echo Failed to copy APK!
  exit /b 1
)
echo APK created successfully: calmspace-firebase.apk

echo.
echo ===================================================
echo Build Process Complete!
echo ===================================================
echo.
echo Signed APK created: calmspace-firebase.apk
echo.
echo This version includes:
echo 1. Using Firebase's default authentication handlers
echo 2. No custom redirect URIs that might cause conflicts
echo 3. Simplified authentication flow
echo.
echo IMPORTANT: 
echo Make sure you have authorized https://calmspace-haven.firebaseapp.com/auth/handler
echo in your Google Cloud Console OAuth settings!
echo.

REM Ask if user wants to install the APK on connected device
echo Would you like to install the APK on a connected device? (Y/N)
set /p INSTALL_CHOICE=

if /i "%INSTALL_CHOICE%"=="Y" (
  echo.
  echo Installing APK on connected device...
  adb install -r "calmspace-firebase.apk"
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