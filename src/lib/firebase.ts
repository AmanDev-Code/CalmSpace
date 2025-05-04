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
  sendEmailVerification as firebaseSendEmailVerification,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Simple platform detection without capacitorUtils
const isNativeApp = () => false; // Always return false since we removed Capacitor
const getPlatform = () => 'web'; // Always return 'web' since we removed native app support

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

// For mobile auth persistence - simplified
const isMobileUserAgent = () => {
  if (typeof window === 'undefined') return false;
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /android|iphone|ipad|ipod/.test(userAgent);
};

if (isMobileUserAgent()) {
  // Set persistence to LOCAL for mobile devices
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log("Set Firebase auth persistence to LOCAL for mobile browser");
    })
    .catch((error) => {
      console.error("Error setting persistence:", error);
    });
  
  // Set Firebase language to device language
  auth.useDeviceLanguage();
}

// Configure Google provider with simplified settings
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Simplified Google provider settings
googleProvider.setCustomParameters({
  prompt: 'select_account',
});
console.log('Configured Firebase Auth for web browser');

// Add debugging for development
if (import.meta.env.DEV) {
  console.log('Firebase initialized successfully');
  console.log('Running on platform: web');
  console.log('Is native app: false');
  console.log('Firebase auth domain:', firebaseConfig.authDomain);
}

// Sign in with email and password
export const signInWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign up with email and password
export const signUpWithEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// SIMPLIFIED GOOGLE SIGN-IN FOR WEB
export const signInWithGoogle = async () => {
  console.log(`Google sign-in method: Web Browser`);
  console.log('Auth domain:', auth.config.authDomain);
  
  try {
    console.log('Starting Google sign-in with popup for web browser');
    return await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Google sign-in error:", error);
    const firebaseError = error as { code?: string };
    
    // Enhanced error reporting
    if (firebaseError.code === 'auth/redirect-cancelled-by-user') {
      console.log('User cancelled the redirect flow');
    } else if (firebaseError.code === 'auth/redirect-operation-pending') {
      console.log('A redirect operation is already pending');
    } else if (firebaseError.code === 'auth/invalid-credential') {
      console.log('There might be an issue with the OAuth credentials configuration');
    } else if (firebaseError.code === 'auth/operation-not-allowed') {
      console.log('Google sign-in may not be enabled in Firebase console');
    } else if (firebaseError.code === 'auth/network-request-failed') {
      console.log('Network error - check internet connection');
    }
    
    throw error;
  }
};

// SIMPLIFIED REDIRECT RESULT HANDLER
export const getGoogleAuthResult = async () => {
  try {
    console.log('Checking for redirect authentication result...');
    const result = await getRedirectResult(auth);
    
    if (result && result.user) {
      console.log("✅ Authentication success via redirect:", result.user.displayName || result.user.email);
      // Force auth state update for consistent behavior
      auth.updateCurrentUser(result.user);
      return result;
    } else {
      console.log("⚠️ No authentication result found after redirect");
      return null;
    }
  } catch (error) {
    console.error("❌ Error getting redirect result:", error);
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
}

// Rest of the file remains unchanged
export const initRecaptchaVerifier = (containerId: string, callback?: () => void) => {
  return new RecaptchaVerifier(auth, containerId, {
    size: 'normal',
    callback: callback
  });
};

export const sendPhoneOTP = (phoneNumber: string, appVerifier: RecaptchaVerifier) => {
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
};

export const sendEmailVerification = async (user: User) => {
  await firebaseSendEmailVerification(user);
};

// Export services and providers
export { auth, firestore, googleProvider, phoneAuthProvider };
export default app; 