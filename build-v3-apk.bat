@echo off
echo ===================================================
echo CalmSpace v3 APK Build Script - With Simple Web Redirect Auth
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
if exist "calmspace-v3.apk" (
  del "calmspace-v3.apk"
)

REM Build the React app
echo Building React app...
set NODE_ENV=production
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

REM Copy and rename the APK to v3
echo Copying APK to root as calmspace-v3.apk...
copy "android\app\build\outputs\apk\release\app-release.apk" "calmspace-v3.apk"
if %ERRORLEVEL% NEQ 0 (
  echo Failed to copy APK!
  exit /b 1
)
echo APK created successfully: calmspace-v3.apk

echo.
echo ===================================================
echo Build Process Complete!
echo ===================================================
echo.
echo Signed APK created: calmspace-v3.apk
echo.
echo This version includes:
echo 1. Simple web redirect for Google authentication
echo 2. No complex dynamic links - just a basic web redirect
echo 3. Improved auth handling and user experience
echo.
echo IMPORTANT: Before testing, make sure you've added 
echo https://calm-space-gamma.vercel.app/auth-redirect.html
echo as an authorized redirect URI in your Google OAuth settings!
echo.

REM Ask if user wants to install the APK on connected device
echo Would you like to install the APK on a connected device? (Y/N)
set /p INSTALL_CHOICE=

if /i "%INSTALL_CHOICE%"=="Y" (
  echo.
  echo Installing APK on connected device...
  adb install -r "calmspace-v3.apk"
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