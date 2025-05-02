@echo off
echo ===================================================
echo Copying CalmSpace APK for Direct Download
echo ===================================================
echo.

REM Check if we're in the root directory
if not exist "android" (
  echo Error: Please run this script from the project root directory.
  exit /b 1
)

echo Checking for APK file...
echo.

if exist "android\app\build\outputs\apk\release\app-release.apk" (
  echo Found APK file in android/app/build/outputs/apk/release/
  echo Copying APK file to project root...
  copy "android\app\build\outputs\apk\release\app-release.apk" "app-release.apk"
  
  if %ERRORLEVEL% NEQ 0 (
    echo Error: Failed to copy APK.
    exit /b 1
  )
  
  echo.
  echo APK file successfully copied to project root as app-release.apk
) else (
  echo APK file not found in expected location.
  echo Please build the APK first using rebuild-apk.bat
  exit /b 1
)

echo.
echo ===================================================
echo APK is now available for direct download
echo from the mobile menu when using an Android device.
echo =================================================== 