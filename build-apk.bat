@echo off
echo Building CalmSpace Android APK...

rem First build the web app
echo Building web app...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo Failed to build web app
    exit /b %ERRORLEVEL%
)

rem Copy web assets to Android
echo Copying web assets to Android...
call npx cap copy android
if %ERRORLEVEL% NEQ 0 (
    echo Failed to copy web assets
    exit /b %ERRORLEVEL%
)

rem Build Android APK
echo Building Android APK...
cd android
call .\gradlew.bat assembleRelease
if %ERRORLEVEL% NEQ 0 (
    echo Failed to build APK
    exit /b %ERRORLEVEL%
)

cd ..

echo APK build completed successfully!
echo The APK is available at: android\app\build\outputs\apk\release\app-release.apk

rem Copy APK to project root for easy access
echo Copying APK to project root...
copy android\app\build\outputs\apk\release\app-release.apk calmspace.apk

echo Done! The APK is available as calmspace.apk in the project root directory. 