@echo off
echo ===================================================
echo CalmSpace Signed APK Build Script - v1.0
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

REM Check if keystore exists
if not exist "android\app\calmspace.keystore" (
  echo Error: calmspace.keystore not found!
  echo Please make sure you have created a keystore file first.
  exit /b 1
)

REM Clean previous APKs to avoid confusion
echo Cleaning up previous APK builds...
if exist "calmspace-v1.apk" (
  del "calmspace-v1.apk"
)
if exist "calmspace.apk" (
  del "calmspace.apk"
)
if exist "app-release.apk" (
  del "app-release.apk"
)

REM Delete old APKs from Android build
echo Cleaning up previous Android build APKs...
if exist "android\app\build\outputs\apk\debug\app-debug.apk" (
  del "android\app\build\outputs\apk\debug\app-debug.apk"
)
if exist "android\app\build\outputs\apk\release\app-release.apk" (
  del "android\app\build\outputs\apk\release\app-release.apk"
)
if exist "android\app\build\outputs\apk\release\app-release-unsigned.apk" (
  del "android\app\build\outputs\apk\release\app-release-unsigned.apk"
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
  REM Clean the project first
  echo Cleaning Android project...
  call gradlew clean
  if %ERRORLEVEL% NEQ 0 (
    echo Failed to clean Android project!
    cd ..
    exit /b 1
  )
  
  echo Building and signing release APK...
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
echo Copying and renaming signed APK...
echo Source: android\app\build\outputs\apk\release\app-release.apk
echo Destination: calmspace-v1.apk

copy "android\app\build\outputs\apk\release\app-release.apk" "calmspace-v1.apk"
if %ERRORLEVEL% NEQ 0 (
  echo Failed to copy APK!
  exit /b 1
)

echo.
echo ===================================================
echo Build Process Complete!
echo ===================================================
echo.
echo Signed APK created: calmspace-v1.apk
echo.
echo You can install this APK on your Android device.
echo.

REM Ask if user wants to install the APK on connected device
echo Would you like to install the APK on a connected device? (Y/N)
set /p INSTALL_CHOICE=

if /i "%INSTALL_CHOICE%"=="Y" (
  echo.
  echo Installing APK on connected device...
  adb install -r "calmspace-v1.apk"
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