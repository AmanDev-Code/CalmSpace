// Modified utility functions (without Capacitor dependencies)

/**
 * Check if running in a mobile app environment
 * Now uses basic user agent detection instead of Capacitor
 */
export const isNativeApp = (): boolean => {
  return false; // Always return false since we're removing native app functionality
};

/**
 * Get the current platform
 * Now uses basic user agent detection instead of Capacitor
 */
export const getPlatform = (): string => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(userAgent)) return 'ios';
  if (/android/.test(userAgent)) return 'web'; // Changed from 'android' to 'web'
  return 'web';
};

/**
 * This function is now a no-op since we're not using Capacitor
 */
export const getGoogleAuthResult = async () => {
  console.log("getGoogleAuthResult is a no-op in web mode");
  return null;
};

/**
 * This function is now a no-op since we're not using Capacitor
 */
export const hideSplashScreen = async (): Promise<void> => {
  console.log("hideSplashScreen is a no-op in web mode");
  return;
};

/**
 * This function is now a no-op since we're not using Capacitor
 */
export const showSplashScreen = async (): Promise<void> => {
  console.log("showSplashScreen is a no-op in web mode");
  return;
};

/**
 * Initialize plugins (now a no-op)
 */
export const initCapacitorPlugins = (): void => {
  console.log('Capacitor plugins not available in web mode');
  return;
}; 