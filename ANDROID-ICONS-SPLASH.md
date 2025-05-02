# Android App Icons and Splash Screen Setup

This document explains how the CalmSpace Android app's icons and splash screen are set up and how to update them if needed.

## App Icons

The app icons are generated from a single source file (`public/assets/appicon.png`) using the `generate-app-icons.js` script. This ensures that all required sizes for different screen densities are created properly.

### Icon Sizes

The script generates icons for all required Android screen densities:

| Density | Size (px) | Location |
|---------|-----------|----------|
| mdpi    | 36x36     | mipmap-mdpi/ |
| hdpi    | 48x48     | mipmap-hdpi/ |
| xhdpi   | 72x72     | mipmap-xhdpi/ |
| xxhdpi  | 96x96     | mipmap-xxhdpi/ |
| xxxhdpi | 144x144   | mipmap-xxxhdpi/ |

### Icon Types

For each density, the following files are generated:

1. **ic_launcher.png**: The standard app icon
2. **ic_launcher_round.png**: The round version of the app icon
3. **ic_launcher_foreground.png**: The foreground layer for adaptive icons

### Adaptive Icons

For Android 8.0 (API level 26) and higher, adaptive icons are provided through:

- XML files in `mipmap-anydpi-v26/`
- Foreground layer in each density folder
- Background color defined in `values/ic_launcher_background.xml`

## Splash Screen

The splash screen uses the CalmSpace brand logo (`public/assets/brandLogo.png`) displayed center-aligned on a background color.

### Implementation

The splash screen is defined in `drawable/splash.xml` and uses a layered approach:

1. Background layer using the color defined in `ic_launcher_background`
2. Logo layer displaying the brand logo at a fixed size (200dp x 200dp)

### Configuration

The splash screen is configured in `values/styles.xml` where it's associated with the app's theme, and in `AndroidManifest.xml` where it's applied to the main activity.

## How to Update

### Updating App Icons

To update the app icons:

1. Replace `public/assets/appicon.png` with your new icon (use a high-resolution square PNG, at least 512x512px)
2. Run the icon generation script:
   ```
   node generate-app-icons.js
   ```
   
Alternatively, use the `build-with-icons.bat` script which will regenerate the icons and build the APK.

### Updating Splash Screen

To update the splash screen:

1. Replace `android/app/src/main/res/drawable-nodpi/splash_logo.png` with your new logo
2. Adjust the dimensions in `drawable/splash.xml` if needed:
   ```xml
   <item
       android:width="200dp"
       android:height="200dp"
       android:gravity="center">
   ```

3. Rebuild the app:
   ```
   npx cap sync android
   cd android && ./gradlew assembleDebug
   ```

### Changing Background Colors

To change the background colors:

1. Edit `android/app/src/main/res/values/colors.xml` for app theme colors
2. Edit `android/app/src/main/res/values/ic_launcher_background.xml` for icon background color

## Additional Options

### Custom Shape for App Icons

To customize the shape of adaptive icons:

1. Create a custom shape in `drawable/ic_launcher_background.xml`
2. Update the adaptive icon XML files to reference this custom background

### Animated Splash Screen

For advanced users, you can implement an animated splash screen:

1. Create an animation XML file in `drawable/`
2. Reference this animation in `splash.xml`
3. Update the theme in `styles.xml` to support animation 