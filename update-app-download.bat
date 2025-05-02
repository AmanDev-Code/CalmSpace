@echo off
echo ===================================================
echo CalmSpace APK Update Script
echo ===================================================
echo This script will rebuild the APK and prepare it for download.
echo.

REM Check if we're in the root directory
if not exist "android" (
  echo Error: Please run this script from the project root directory.
  exit /b 1
)

echo Step 1: Rebuilding the APK...
echo.
call rebuild-apk.bat

if %ERRORLEVEL% NEQ 0 (
  echo Error: APK rebuild failed.
  exit /b 1
)

echo.
echo Step 2: Copying APK for direct download...
echo.
call copy-apk.bat

if %ERRORLEVEL% NEQ 0 (
  echo Error: Failed to copy APK.
  exit /b 1
)

echo.
echo ===================================================
echo APK has been successfully rebuilt and prepared
echo for download through the mobile menu.
echo =================================================== 