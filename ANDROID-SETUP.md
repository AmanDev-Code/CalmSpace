# CalmSpace Android App Build Guide

This document provides a comprehensive guide for building and customizing the CalmSpace Android APK.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [Java Development Kit (JDK)](https://adoptium.net/) (version 11 or later)
- [Android Studio](https://developer.android.com/studio) (for Android SDK)
- Android SDK (API level 33 or later)
- [Gradle](https://gradle.org/install/) (included with Android Studio)

## Environment Setup

1. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

2. **Install Capacitor CLI** (if not already installed):
   ```bash
   npm install -g @capacitor/cli
   ```

3. **Configure Android SDK environment variables**:

   For Windows:
   ```
   set ANDROID_SDK_ROOT=C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk
   set PATH=%PATH%;%ANDROID_SDK_ROOT%\tools;%ANDROID_SDK_ROOT%\platform-tools
   ```

   For macOS/Linux:
   ```
   export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_SDK_ROOT/tools:$ANDROID_SDK_ROOT/platform-tools
   ```

## Automated Build Process

CalmSpace provides scripts to simplify the build process:

### 1. Generate Keystore (First-time only)

Run the provided script to generate a keystore for signing the APK:

```bash
# Windows
generate-keystore.bat

# macOS/Linux
chmod +x generate-keystore.sh
./generate-keystore.sh
```

This creates a keystore file at `android/app/calmspace.keystore` with the following properties:
- Keystore password: `calmspace`
- Key alias: `calmspace`
- Key password: `calmspace`
- Validity: 10000 days

**IMPORTANT**: For production releases, change these default values in the script and keep your keystore secure.

### 2. Build the APK

Run the build script to compile and package the app:

```bash
# Windows
build-apk.bat

# macOS/Linux
chmod +x build-apk.sh
./build-apk.sh
```

This script:
1. Builds the web app with `npm run build`
2. Copies the web assets to the Android project with `npx cap copy android`
3. Builds the release APK with Gradle
4. Copies the final APK to the project root as `calmspace.apk`

### 3. Install the APK

Install the APK on your device:

```bash
adb install calmspace.apk
```

## Manual Build Steps

If you prefer to build manually or need to customize the process:

1. **Build the web app**:
   ```bash
   npm run build
   ```

2. **Update the Android project with the latest web content**:
   ```bash
   npx cap copy android
   ```

3. **Open the Android project in Android Studio** (optional, for debugging):
   ```bash
   npx cap open android
   ```

4. **Build the APK from the command line**:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

5. **Locate the APK** at:
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

## Customizing the App

### App Configuration

The app is configured in `capacitor.config.ts`. Key settings include:

```typescript
const config: CapacitorConfig = {
  appId: 'com.calmspace.haven',  // Android package name
  appName: 'CalmSpace',          // Display name
  webDir: 'dist',                // Web assets directory
  plugins: {
    SplashScreen: {
      // Splash screen configuration
    }
  },
  // Android-specific configurations
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false
  }
};
```

### Changing App Icons

1. Replace the icon files in:
   - `android/app/src/main/res/mipmap-hdpi/`
   - `android/app/src/main/res/mipmap-mdpi/`
   - `android/app/src/main/res/mipmap-xhdpi/`
   - `android/app/src/main/res/mipmap-xxhdpi/`
   - `android/app/src/main/res/mipmap-xxxhdpi/`

   For best results, use [Android Image Asset Studio](https://developer.android.com/studio/write/image-asset-studio).

### Customizing the Splash Screen

1. Replace the splash image at:
   ```
   android/app/src/main/res/drawable/splash.png
   ```

2. Edit colors in `android/app/src/main/res/values/colors.xml`:
   ```xml
   <color name="ic_launcher_background">#f9f5f2</color>
   ```

## Troubleshooting

### Common Issues

#### Build Failures

- **Issue**: Gradle build fails with "SDK location not found"
  **Solution**: Set the `ANDROID_SDK_ROOT` environment variable

- **Issue**: "Unable to merge dex" error
  **Solution**: In `android/app/build.gradle`, add:
  ```gradle
  android {
      defaultConfig {
          multiDexEnabled true
      }
  }
  dependencies {
      implementation 'androidx.multidex:multidex:2.0.1'
  }
  ```

#### Runtime Issues

- **Issue**: White screen on app launch
  **Solution**: Check the web build output in `dist/` and ensure `npx cap copy android` was run

- **Issue**: "ERR_CLEARTEXT_NOT_PERMITTED" error
  **Solution**: Check that `allowMixedContent` is set to `true` in `capacitor.config.ts`

### Debugging

1. Enable USB debugging on your device
2. Connect your device and run:
   ```bash
   adb logcat | grep -e CalmSpace -e Capacitor -e System.err
   ```

## APK Optimization

To reduce the APK size:

1. **Enable minification** in `android/app/build.gradle`:
   ```gradle
   buildTypes {
       release {
           minifyEnabled true
           shrinkResources true
           proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
       }
   }
   ```

2. **Optimize web assets**:
   - Use image compression
   - Enable code splitting in the Vite configuration
   - Remove unused dependencies

## Creating Multiple App Variants

To create different app variants (e.g., free/paid versions):

1. In `android/app/build.gradle`, add:
   ```gradle
   flavorDimensions "version"
   productFlavors {
       free {
           dimension "version"
           applicationIdSuffix ".free"
           versionNameSuffix "-free"
       }
       premium {
           dimension "version"
           applicationIdSuffix ".premium"
           versionNameSuffix "-premium"
       }
   }
   ```

2. Build specific variants:
   ```bash
   cd android
   ./gradlew assembleFreeRelease
   ./gradlew assemblePremiumRelease
   ```

## Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Developer Documentation](https://developer.android.com/guide)
- [Vite Documentation](https://vitejs.dev/guide/)

## Support

For issues with the build process, please:
1. Check the troubleshooting section above
2. Consult the Capacitor community forums
3. Open an issue in the CalmSpace repository

---

*Last updated: June 2023*