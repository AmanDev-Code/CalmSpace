@echo off
SETLOCAL ENABLEEXTENSIONS

echo ===================================================
echo      CalmSpace TWA (Trusted Web Activity) Builder
echo ===================================================

echo.
echo 📌 Checking requirements...
where java >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Java not found! Please install JDK 17+ and add it to PATH.
    exit /b
)

where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js from https://nodejs.org
    exit /b
)

echo ✅ Java and Node.js found.
echo.

set /p CONTINUE=Do you want to build the TWA? (Y/N): 
if /i "%CONTINUE%" NEQ "Y" (
    echo Operation cancelled.
    exit /b
)

:: Ask for URL
set /p DEPLOYED_URL=Enter your deployed HTTPS URL (e.g., https://calm-space-gamma.vercel.app): 
if "%DEPLOYED_URL%"=="" (
    echo ❌ Error: URL cannot be empty.
    exit /b
)

:: Ensure .well-known directory exists and create assetlinks.json
echo.
echo 📄 Creating or updating Digital Asset Links file...
if not exist "public\.well-known" mkdir "public\.well-known"

:: Create assetlinks.json with the correct content
echo [{"relation":["delegate_permission/common.handle_all_urls"],"target":{"namespace":"android_app","package_name":"com.calmspace.haven","sha256_cert_fingerprints":["59:77:CC:93:3B:B4:A4:CD:0F:C3:D9:C5:99:E7:F2:51:B8:04:CE:F0:55:2E:43:EA:5D:E0:35:14:E4:41:07:E3"]}}] > "public\.well-known\assetlinks.json"

echo ✅ Created assetlinks.json file at public/.well-known/assetlinks.json
echo 🔗 Your Digital Asset Links URL will be: %DEPLOYED_URL%/.well-known/assetlinks.json
echo.

:: Go to / create twa-build
echo.
echo 📁 Creating or switching to twa-build directory...
if not exist "twa-build" mkdir twa-build
cd twa-build

:: Cleanup old builds
echo 🔄 Cleaning old build folders...
if exist build rmdir /s /q build
if exist .gradle rmdir /s /q .gradle

:: Step 1 - Install Bubblewrap
echo 🛠️ Installing Bubblewrap CLI globally...
call npm install -g @bubblewrap/cli
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install Bubblewrap CLI.
    exit /b
)

:: Step 2 - Init project with no fallback
echo 🚀 Initializing Bubblewrap project...
call bubblewrap init --manifest %DEPLOYED_URL%/manifest.webmanifest ^
    --directory . ^
    --packageId com.calmspace.haven ^
    --fallbackType none

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Bubblewrap init failed. Check your manifest.webmanifest and HTTPS URL.
    cd ..
    exit /b
)

:: Step 3 - Build signed APK
echo 🏗️ Building TWA APK...
call bubblewrap build --ks-key-alias calmspace
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Bubblewrap build failed. Check JDK and Android SDK.
    cd ..
    exit /b
)

echo ✅ Success! TWA APK created.
echo ➜ File: %CD%\app-release-signed.apk

:: Step 4 - Optional ADB install
set /p INSTALL=Do you want to install the APK to your connected Android device? (Y/N): 
if /i "%INSTALL%"=="Y" (
    echo 📱 Installing to device...
    adb install -r app-release-signed.apk
)

:: Step 5 - Copy to parent for access
copy app-release-signed.apk ..\public\calmspace-twa.apk >nul
cd ..
echo ✅ APK copied to /public/calmspace-twa.apk
echo.

:: Final instructions
echo 🔍 IMPORTANT: To test TWA integration, you must:
echo 1. Deploy your app to %DEPLOYED_URL%
echo 2. Verify assetlinks.json is accessible at %DEPLOYED_URL%/.well-known/assetlinks.json
echo 3. Install the APK on your Android device and test integration

pause
