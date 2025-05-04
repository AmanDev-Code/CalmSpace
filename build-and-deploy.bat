@echo off
echo ===============================================
echo CalmSpace App Build and Deploy Script
echo ===============================================
echo.

echo Step 1: Detecting connected devices...
adb devices
echo.

set DEVICE_ID=adb-ef7a0d3c-Up1J0y._adb-tls-connect._tcp

echo Step 2: Using device: %DEVICE_ID%...
echo.

echo Step 3: Cleaning previous build for a fresh start...
call npm run clean
if exist android\app\build rmdir /s /q android\app\build
echo.

echo Step 4: Building the web app...
call npm run build
if %ERRORLEVEL% neq 0 (
  echo Error building web app
  exit /b %ERRORLEVEL%
)
echo Web app built successfully!
echo.

echo Step 5: Syncing web assets to Capacitor...
call npx cap sync
if %ERRORLEVEL% neq 0 (
  echo Error syncing Capacitor
  exit /b %ERRORLEVEL%
)
echo Assets synced successfully!
echo.

echo Step 6: Building Android debug APK...
cd android
call gradlew clean assembleDebug --stacktrace
if %ERRORLEVEL% neq 0 (
  echo Error building APK
  cd ..
  exit /b %ERRORLEVEL%
)
cd ..
echo Debug APK built successfully!
echo.

echo Step 7: Uninstalling previous app version (if exists)...
adb -s %DEVICE_ID% uninstall com.calmspace.haven
echo.

echo Step 8: Installing the fresh APK on the device...
adb -s %DEVICE_ID% install -r android\app\build\outputs\apk\debug\app-debug.apk
if %ERRORLEVEL% neq 0 (
  echo Error installing APK
  exit /b %ERRORLEVEL%
)
echo APK installed successfully!
echo.

echo Step 9: Clearing logcat...
adb -s %DEVICE_ID% logcat -c
echo.

echo Step 10: Creating test-auth-redirect.bat for direct redirect testing...
echo @echo off > test-auth-redirect.bat
echo echo Testing direct auth redirect... >> test-auth-redirect.bat
echo adb -s %DEVICE_ID% shell am start -a android.intent.action.VIEW -d "https://calm-space-gamma.vercel.app/auth-redirect.html?debug=true" >> test-auth-redirect.bat
echo echo. >> test-auth-redirect.bat
echo echo Starting logs to monitor redirect handling... >> test-auth-redirect.bat
echo adb -s %DEVICE_ID% logcat -v time *:I ^| findstr -i "calmspace auth firebase google intent redirect deep" >> test-auth-redirect.bat
echo Test redirect script created!
echo.

echo Step 11: Starting the app...
adb -s %DEVICE_ID% shell am start -n com.calmspace.haven/com.calmspace.haven.MainActivity
echo.

echo Step 12: Starting logcat to monitor authentication flow...
echo Looking for auth and deep link related logs...
echo -----------------------------------------------
echo Press Ctrl+C to stop logging when finished
echo -----------------------------------------------
echo.

adb -s %DEVICE_ID% logcat -v time *:I | findstr -i "calmspace auth firebase google intent redirect deep"

echo ===============================================
echo Script execution complete!
echo =============================================== 