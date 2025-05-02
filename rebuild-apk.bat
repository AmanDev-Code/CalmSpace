@echo off
echo ===================================================
echo CalmSpace Android APK Build Script
echo ===================================================
echo.

REM Check if we're in the root directory
if not exist "android" (
  echo Error: Please run this script from the project root directory.
  exit /b 1
)

echo Building Android APK...
echo.

REM Ensure we have a clean build
cd android
call gradlew clean
if %ERRORLEVEL% NEQ 0 (
  echo Error: Clean failed.
  exit /b 1
)

REM Build the release APK
call gradlew assembleRelease
if %ERRORLEVEL% NEQ 0 (
  echo Error: Build failed.
  exit /b 1
)

REM Copy the APK to project root for convenience
echo.
echo Copying APK to project root...
copy app\build\outputs\apk\release\app-release.apk ..
if %ERRORLEVEL% NEQ 0 (
  echo Error: Failed to copy APK.
  exit /b 1
)

cd ..

echo.
echo ===================================================
echo Build completed successfully!
echo.
echo APK location: %CD%\app-release.apk
echo.
echo You can now install this APK on your Android device.
echo See APK-INSTALLATION-GUIDE.md for installation instructions.
echo =================================================== 