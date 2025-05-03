@echo off
echo ===================================================
echo CalmSpace APK Build with Forced Redirect URL
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
if exist "calmspace-redirect.apk" (
  del "calmspace-redirect.apk"
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
echo Copying APK to root as calmspace-redirect.apk...
copy "android\app\build\outputs\apk\debug\app-debug.apk" "calmspace-redirect.apk"
if %ERRORLEVEL% NEQ 0 (
  echo Failed to copy APK!
  exit /b 1
)
echo Debug APK created successfully: calmspace-redirect.apk

echo.
echo ===================================================
echo Build Process Complete!
echo ===================================================
echo.
echo Debug APK created: calmspace-redirect.apk
echo.
echo This version includes:
echo 1. FORCED REDIRECT URL to prevent localhost redirects
echo 2. Enhanced debugging and alerts for authentication flow
echo 3. Explicit setting of Firebase auth handlers
echo 4. Local persistence for better auth state management
echo.
echo IMPORTANT: 
echo Before testing this APK, make sure you've:
echo 1. Added https://calmspace-haven.firebaseapp.com/__/auth/handler
echo    to your Google Cloud Console OAuth settings
echo 2. Verified your package name in the Google Cloud Console
echo 3. Enabled debug mode in your Android device
echo.
echo The app will now explicitly enforce the Firebase redirect URL
echo and prevent any localhost redirects during authentication.
echo.

REM Ask if user wants to install the APK on connected device
echo Would you like to install the APK on a connected device? (Y/N)
set /p INSTALL_CHOICE=

if /i "%INSTALL_CHOICE%"=="Y" (
  echo.
  echo Installing APK on connected device...
  adb install -r "calmspace-redirect.apk"
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