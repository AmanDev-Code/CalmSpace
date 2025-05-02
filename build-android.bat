@echo off
echo ===================================================
echo CalmSpace Android APK Build Script
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

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo Node.js is not installed! Please install Node.js and try again.
  exit /b 1
)

REM Check for NPM
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo npm is not installed! Please check your Node.js installation.
  exit /b 1
)

REM Install dependencies if needed
if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
  if %ERRORLEVEL% NEQ 0 (
    echo Failed to install dependencies!
    exit /b 1
  )
  echo Dependencies installed successfully.
) else (
  echo Dependencies already installed.
)

echo.
echo Building React application...
call npm run build
if %ERRORLEVEL% NEQ 0 (
  echo Failed to build React application!
  exit /b 1
)
echo React build completed successfully.

echo.
echo Syncing with Capacitor...
call npx cap sync android
if %ERRORLEVEL% NEQ 0 (
  echo Failed to sync with Capacitor!
  exit /b 1
)
echo Capacitor sync completed successfully.

echo.
echo Building Android APK...
cd android
if exist "gradlew" (
  echo Building debug APK...
  call gradlew assembleDebug
  if %ERRORLEVEL% NEQ 0 (
    echo Failed to build debug APK!
    cd ..
    exit /b 1
  )
  
  echo Building release APK...
  call gradlew assembleRelease
  if %ERRORLEVEL% NEQ 0 (
    echo Failed to build release APK!
    cd ..
    exit /b 1
  )
) else (
  echo Gradle wrapper not found! Make sure your Android project is set up correctly.
  cd ..
  exit /b 1
)

cd ..

echo.
echo ===================================================
echo Build Process Complete!
echo ===================================================
echo.
echo Debug APK location:   android\app\build\outputs\apk\debug\app-debug.apk
echo Release APK location: android\app\build\outputs\apk\release\app-release-unsigned.apk
echo.
echo Note: The release APK is unsigned. To sign it, follow the instructions in ANDROID-BUILD-INSTRUCTIONS.md
echo.

REM Ask if user wants to install the debug APK on connected device
echo Would you like to install the debug APK on a connected device? (Y/N)
set /p INSTALL_CHOICE=

if /i "%INSTALL_CHOICE%"=="Y" (
  echo.
  echo Installing debug APK on connected device...
  adb install -r android\app\build\outputs\apk\debug\app-debug.apk
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