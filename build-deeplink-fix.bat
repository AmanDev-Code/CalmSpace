@echo off
echo ===================================================
echo CalmSpace Mobile App - Deep Link Fix
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
if exist "calmspace-deeplink.apk" (
  del "calmspace-deeplink.apk"
)

REM Build the React app with development mode for better debugging
echo Building React app in development mode for enhanced logging...
call npx vite build --mode development
if %ERRORLEVEL% NEQ 0 (
  echo Failed to build React application!
  exit /b 1
)
echo React build completed successfully with enhanced logging.

REM Sync the web assets with Capacitor
echo Syncing with Capacitor...
call npx cap sync android
if %ERRORLEVEL% NEQ 0 (
  echo Failed to sync with Capacitor!
  exit /b 1
)
echo Capacitor sync completed successfully.

REM Build the Android debug APK for testing
echo Building Android debug APK for better debugging...
cd android
call gradlew clean
call gradlew assembleDebug
if %ERRORLEVEL% NEQ 0 (
  echo Failed to build APK!
  cd ..
  exit /b 1
)
cd ..

REM Copy and rename the APK
echo Copying APK to root as calmspace-deeplink.apk...
copy "android\app\build\outputs\apk\debug\app-debug.apk" "calmspace-deeplink.apk"
if %ERRORLEVEL% NEQ 0 (
  echo Failed to copy APK!
  exit /b 1
)
echo Debug APK created successfully: calmspace-deeplink.apk

echo.
echo ===================================================
echo Build Process Complete!
echo ===================================================
echo.
echo Debug APK created: calmspace-deeplink.apk
echo.
echo DEEP LINK FIX INCLUDES:
echo 1. New mobile redirect flow using Vercel redirect page
echo 2. Enhanced app URL scheme handling (calmspace://)
echo 3. Improved auth-redirect.html with multiple redirect methods
echo 4. Better debug information and status messages
echo.
echo IMPORTANT FOR TESTING: 
echo 1. Make sure you've added BOTH redirect URIs to Google Cloud Console:
echo    - https://calmspace-haven.firebaseapp.com/__/auth/handler
echo    - https://calm-space-gamma.vercel.app/auth-redirect.html
echo 2. Make sure auth-redirect.html is deployed to your Vercel site
echo 3. The app will show alerts to help debug the authentication flow
echo.

REM Ask if user wants to install the APK on connected device
echo Would you like to install the APK on a connected device? (Y/N)
set /p INSTALL_CHOICE=

if /i "%INSTALL_CHOICE%"=="Y" (
  echo.
  echo Installing APK on connected device...
  adb install -r "calmspace-deeplink.apk"
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