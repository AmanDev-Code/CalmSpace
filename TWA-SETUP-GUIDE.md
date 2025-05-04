# CalmSpace TWA (Trusted Web Activity) Setup Guide

This guide will help you convert your CalmSpace React + Vite app into a TWA (Trusted Web Activity) so that it behaves like a native Android app. This approach solves the issues with localhost redirects and Google Login authentication.

## What is a TWA?

A Trusted Web Activity (TWA) allows your PWA (Progressive Web App) to run in full-screen mode on Android — functioning like a native app, but powered by Chrome. This approach has several advantages:

- **Google Sign-In works seamlessly** because it stays in the browser context
- **No localhost issues** since it's using your deployed HTTPS website
- **Looks and feels native** with full-screen experience
- **Smaller app size** than Capacitor or Cordova
- **Easier maintenance** as you only need to update your web app

## Prerequisites

Before getting started, make sure you have:

1. Your app deployed to a HTTPS URL (like Vercel or Netlify)
2. Node.js and npm installed
3. Java Development Kit (JDK) 8 or newer
4. Android SDK (can be installed through Android Studio)

## Step 1: Optimize Your PWA Configuration

We've already updated your `vite.config.ts` to optimize PWA settings:

- Set `registerType` to `'autoUpdate'`
- Added proper icon paths
- Configured Workbox for caching
- Added the required manifest properties (`start_url`, `display`, etc.)

## Step 2: Build and Deploy Your PWA

1. Build your application:
   ```bash
   npm run build
   ```

2. Deploy to your hosting service (Vercel, Netlify, etc.)
   ```bash
   # If using Vercel
   vercel --prod
   ```

3. Verify that your deployed app has a valid manifest:
   - Open your deployed URL (e.g., https://calmspace-haven.vercel.app)
   - Open browser DevTools > Application > Manifest
   - Ensure the manifest is correctly loaded

## Step 3: Create TWA Using Bubblewrap CLI

We've created a script called `create-twa.bat` that will guide you through the process. Here's what it does:

1. Installs Bubblewrap CLI globally
2. Prompts for your deployed URL
3. Initializes a TWA project
4. Builds the APK
5. Copies the APK to your public folder

To run the script:
```bash
create-twa.bat
```

If you prefer to do it manually:

```bash
# Install Bubblewrap CLI
npm install -g @bubblewrap/cli

# Initialize TWA project
bubblewrap init --manifest https://your-app.vercel.app/manifest.webmanifest --packageId com.calmspace.haven

# Build the APK
bubblewrap build
```

## Step 4: Configure Firebase for Web Authentication

Since your TWA will be using the web-based authentication flow, ensure your Firebase project is configured properly:

1. Go to the Firebase Console > Authentication > Sign-in methods
2. Enable Google sign-in
3. Add your deployed domain (e.g., calmspace-haven.vercel.app) to the authorized domains
4. Configure your OAuth consent screen in Google Cloud Console
5. No need to add app-specific settings in the Firebase Console for TWA

## Step 5: Test and Install Your TWA

1. Transfer the generated APK to your Android device
2. Install and launch the app
3. Test Google sign-in functionality
4. Verify that the app opens in full-screen mode

## Step 6: Publishing to Google Play Store

When you're ready to publish:

1. Create a production-ready signed APK:
   ```bash
   bubblewrap build --release
   ```

2. Create a Google Play developer account if you don't have one
3. Create a new app listing in the Google Play Console
4. Upload your signed APK or AAB (Android App Bundle)
5. Complete the store listing information
6. Submit for review

## Troubleshooting

### Common Issues

1. **Manifest Validation Errors**
   - Ensure your manifest.webmanifest is valid
   - Make sure all icons exist at the correct paths
   - Verify it's accessible from your deployed URL

2. **Digital Asset Links File Issue**
   - Your app needs a `.well-known/assetlinks.json` file on your server
   - Bubblewrap can generate this for you

3. **Google Sign-In Issues**
   - Verify that your deployed domain is in the Firebase authorized domains list
   - Check that the Google sign-in button is working on your deployed website first

### Additional Resources

- [Bubblewrap Documentation](https://github.com/GoogleChromeLabs/bubblewrap)
- [TWA on web.dev](https://web.dev/articles/using-a-pwa-in-your-android-app)
- [Digital Asset Links validation](https://developers.google.com/digital-asset-links/tools/generator)

## Benefits of TWA vs. Capacitor

| Feature | TWA | Capacitor |
|---------|-----|-----------|
| App Size | Smaller (~5MB) | Larger (~20MB+) |
| Google Auth | Web Flow (Reliable) | Native Plugins (Complex) |
| Updates | Instant (via web) | Require new app version |
| Maintenance | Web-only | Web + Native code |
| Native APIs | Limited to Web APIs | Full Native Access |
| Development | Simple | More complex |

## Next Steps

After you have your TWA working:

1. Consider adding PWA features like offline support
2. Implement push notifications (available in TWAs)
3. Test on various Android devices
4. Consider setting up CI/CD to automate TWA builds 