// Capacitor utility functions
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { getRedirectResult } from 'firebase/auth';
import { auth } from './firebase';

// Check if running in a Capacitor native app
export const isNativeApp = (): boolean => {
  return Capacitor.isNativePlatform();
};

// Check platform type
export const getPlatform = (): string => {
  return Capacitor.getPlatform();
};

// Get Google Auth redirect result
export const getGoogleAuthResult = async () => {
  if (!isNativeApp()) return null;

  try {
    console.log("Checking for Google Auth redirect result in capacitorUtils...");
    const result = await getRedirectResult(auth);
    console.log("Redirect result:", result ? "Found" : "None");
    return result;
  } catch (error) {
    console.error("Error getting Google Auth redirect result:", error);
    return null;
  }
};

// Hide the native splash screen
export const hideSplashScreen = async (): Promise<void> => {
  try {
    if (isNativeApp()) {
      await SplashScreen.hide();
      console.log('Native splash screen hidden');
    }
  } catch (error) {
    console.error('Error hiding splash screen:', error);
  }
};

// Show the native splash screen
export const showSplashScreen = async (): Promise<void> => {
  try {
    if (isNativeApp()) {
      await SplashScreen.show();
      console.log('Native splash screen shown');
    }
  } catch (error) {
    console.error('Error showing splash screen:', error);
  }
};

// Initialize Capacitor plugins
export const initCapacitorPlugins = (): void => {
  try {
    if (isNativeApp()) {
      console.log('Initializing Capacitor plugins');
      // Add other plugin initializations here as needed
    }
  } catch (error) {
    console.error('Error initializing Capacitor plugins:', error);
  }
}; 