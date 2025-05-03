import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  updateProfile,
  User,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendEmailVerification as firebaseSendEmailVerification
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { isNativeApp, getPlatform } from '@/lib/capacitorUtils';

// Firebase configuration (replace with your own values from Firebase console)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID",
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const phoneAuthProvider = new PhoneAuthProvider(auth);

// Set the custom redirect domains for auth
const PRODUCTION_URL = "https://calm-space-gamma.vercel.app";
// Use a simple web redirect page instead of direct deep linking
const MOBILE_REDIRECT_URL = "https://calm-space-gamma.vercel.app/auth-redirect.html";

// Configure Google provider with better mobile support
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Platform-specific auth configuration
if (isNativeApp()) {
  // Native app-specific configuration
  const platform = getPlatform();
  console.log(`Configuring Firebase Auth for native ${platform} app`);
  
  // Set auth persistence to LOCAL for native apps
  auth.useDeviceLanguage();
  
  // For Android, set package name and custom scheme
  if (platform === 'android') {
    googleProvider.setCustomParameters({
      prompt: 'select_account',
      android_package_name: 'com.calmspace.haven',
      // This allows Google to redirect back to our web page, which then redirects to our app
      androidInstallApp: 'true',
      // Use web page that will redirect to app scheme
      redirect_uri: MOBILE_REDIRECT_URL
    });
    console.log('Configured Firebase Auth for Android with web redirect to:', MOBILE_REDIRECT_URL);
  } 
  // For iOS specifics (though we're focusing on Android now)
  else if (platform === 'ios') {
    googleProvider.setCustomParameters({
      prompt: 'select_account',
      // iOS bundle ID should be configured if needed
      redirect_uri: MOBILE_REDIRECT_URL
    });
    console.log('Configured Firebase Auth for iOS with web redirect to:', MOBILE_REDIRECT_URL);
  }
} else {
  // Web-specific configuration
  googleProvider.setCustomParameters({
    prompt: 'select_account',
    redirect_uri: PRODUCTION_URL
  });
  console.log('Configured Firebase Auth for web with redirect to:', PRODUCTION_URL);
}

// Add debugging for development
if (import.meta.env.DEV) {
  console.log('Firebase initialized successfully');
  console.log('Running on platform:', getPlatform());
  console.log('Is native app:', isNativeApp());
}

// Sign in with email and password
export const signInWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign up with email and password
export const signUpWithEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in with Google - Updated to use web redirect
export const signInWithGoogle = async () => {
  const isNative = isNativeApp();
  const platform = getPlatform();
  console.log(`Google sign-in method: ${isNative ? 'Native App' : 'Web Browser'} on ${platform}`);
  
  try {
    if (isNative) {
      // For native mobile apps (Capacitor/Android)
      console.log('Starting Google sign-in with web redirect flow');
      
      // Make sure we've set up the redirect correctly for this platform
      if (platform === 'android') {
        googleProvider.setCustomParameters({
          prompt: 'select_account',
          android_package_name: 'com.calmspace.haven',
          androidInstallApp: 'true',
          redirect_uri: MOBILE_REDIRECT_URL
        });
      } else if (platform === 'ios') {
        googleProvider.setCustomParameters({
          prompt: 'select_account',
          redirect_uri: MOBILE_REDIRECT_URL
        });
      }
      
      // Use redirect flow for mobile - will exit current JS execution
      console.log('Initiating sign-in with redirect using web page:', MOBILE_REDIRECT_URL);
      await signInWithRedirect(auth, googleProvider);
      
      // This code only runs after returning from the redirect
      console.log('Returned from redirect - checking result...');
      const result = await getRedirectResult(auth);
      console.log('Redirect result:', result ? 'Success' : 'No result');
      return result || { user: null };
    } else {
      // For web browsers - use popup flow
      console.log('Starting Google sign-in with popup for web');
      return await signInWithPopup(auth, googleProvider);
    }
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};

// Helper to get redirect result (for when using signInWithRedirect)
export const getGoogleAuthResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    console.log("Got redirect result:", result ? "SUCCESS" : "NO RESULT");
    if (result && result.user) {
      console.log("User authenticated successfully:", result.user.displayName || result.user.email);
    }
    return result;
  } catch (error) {
    console.error("Error getting redirect result:", error);
    throw error;
  }
};

// Sign out the current user
export const signOutUser = () => {
  return signOut(auth);
};

// Update user profile
export const updateUserProfile = (user: User, displayName: string) => {
  return updateProfile(user, { displayName });
};

// Listen for auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Initialize reCAPTCHA verifier
export const initRecaptchaVerifier = (containerId: string, callback?: () => void) => {
  return new RecaptchaVerifier(auth, containerId, {
    size: 'normal',
    callback: callback,
    'expired-callback': () => {
      console.log('reCAPTCHA expired');
    }
  });
};

// Send OTP to phone number
export const sendPhoneOTP = (phoneNumber: string, appVerifier: RecaptchaVerifier) => {
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
};

// Add this new function
export const sendEmailVerification = async (user: User) => {
  try {
    await firebaseSendEmailVerification(user);
    console.log('Verification email sent successfully');
    return { success: true, message: 'Verification email sent' };
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

// Export other services and providers
export { auth, firestore, googleProvider, phoneAuthProvider };
export default app; 