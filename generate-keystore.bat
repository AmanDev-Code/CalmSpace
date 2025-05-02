@echo off
echo Generating keystore for signing the Android app...

cd android\app

rem Generate a new keystore
keytool -genkeypair -v -keystore calmspace.keystore -alias calmspace -keyalg RSA -keysize 2048 -validity 10000 -storepass calmspace -keypass calmspace -dname "CN=CalmSpace, OU=Mobile, O=CalmSpace, L=Bangalore, ST=Karnataka, C=IN"

echo Keystore generated successfully at android\app\calmspace.keystore

cd ..\..

echo Now you can build the APK using: gradlew.bat assembleRelease
echo The APK will be available at: android\app\build\outputs\apk\release\app-release.apk 