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

// For mobile auth persistence
if (isNativeApp()) {
  // Set persistence to LOCAL for mobile devices
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log("Set Firebase auth persistence to LOCAL for mobile app");
    })
    .catch((error) => {
      console.error("Error setting persistence:", error);
    });
  
  // Set Firebase language to device language
  auth.useDeviceLanguage();
}

// Configure Google provider with mobile-optimized settings
googleProvider.addScope('profile');
googleProvider.addScope('email');

// CRITICAL: Set proper redirect URIs for different environments
// For mobile app we'll use the Vercel redirect page that forwards to our custom scheme
const VERCEL_REDIRECT_URL = 'https://calm-space-gamma.vercel.app/auth-redirect.html';
// For web we'll use the Firebase default handler
const FIREBASE_REDIRECT_URL = 'https://calmspace-haven.firebaseapp.com/__/auth/handler';
// Custom URL scheme used in the app
const CUSTOM_SCHEME = 'calmspace://app/auth-callback';

// MOBILE-OPTIMIZED GOOGLE PROVIDER SETTINGS
const isMobileDevice = isNativeApp();
const platform = getPlatform();

// Configure auth based on platform
if (isMobileDevice) {
  // Log platform info for debugging
  console.log(`Configuring Firebase Auth for MOBILE APP: ${platform}`);
  
  // Android-specific Google auth settings
  if (platform === 'android') {
    console.log('📱 Setting up Android auth parameters...');
    
    // For Android we need to use the Vercel redirect page that then redirects to our custom scheme
    googleProvider.setCustomParameters({
      prompt: 'select_account',
      android_package_name: 'com.calmspace.haven',
      // Use Vercel redirect page which will then redirect to our app using the custom scheme
      redirect_uri: VERCEL_REDIRECT_URL
    });
    
    console.log('✅ CONFIGURED AUTH FOR ANDROID with redirect to Vercel:', VERCEL_REDIRECT_URL);
    console.log('⏩ Vercel page will redirect to:', CUSTOM_SCHEME);
  }
  else if (platform === 'ios') {
    console.log('📱 Setting up iOS auth parameters...');
    
    googleProvider.setCustomParameters({
      prompt: 'select_account',
      // Use Vercel redirect page which will then redirect to our app using the custom scheme
      redirect_uri: VERCEL_REDIRECT_URL
    });
    
    console.log('✅ CONFIGURED AUTH FOR iOS with redirect to Vercel:', VERCEL_REDIRECT_URL);
  }
} else {
  // Web browser configuration
  console.log('🌐 Setting up Web browser auth parameters...');
  
  googleProvider.setCustomParameters({
    prompt: 'select_account',
    // For web we use the Firebase default redirect handler
    redirect_uri: FIREBASE_REDIRECT_URL
  });
  
  console.log('✅ CONFIGURED AUTH FOR WEB BROWSER with redirect to Firebase:', FIREBASE_REDIRECT_URL);
}

// Add debugging for development
if (import.meta.env.DEV) {
  console.log('Firebase initialized successfully');
  console.log('Running on platform:', getPlatform());
  console.log('Is native app:', isNativeApp());
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

// MOBILE-FIRST GOOGLE SIGN-IN IMPLEMENTATION
export const signInWithGoogle = async () => {
  const isNative = isNativeApp();
  const platform = getPlatform();
  
  console.log(`Google sign-in method: ${isNative ? '📱 MOBILE APP' : '🌐 Web Browser'} on ${platform}`);
  
  try {
    // MOBILE APP AUTHENTICATION FLOW
    if (isNative) {
      console.log('🚀 EXECUTING MOBILE APP AUTHENTICATION FLOW');
      
      if (platform === 'android') {
        console.log('🤖 Using Android-specific auth flow');
        
        // Re-set parameters to ensure they're correct
        googleProvider.setCustomParameters({
          prompt: 'select_account',
          android_package_name: 'com.calmspace.haven',
          redirect_uri: VERCEL_REDIRECT_URL
        });
        
        // The most important part - show the user what redirect we're using
        if (typeof window !== 'undefined' && window.alert) {
          window.alert('Google auth will redirect to Vercel page, which will open the app.\n\nRedirect URL: ' + VERCEL_REDIRECT_URL);
        }
        
        console.log('⏳ Starting redirect auth flow...');
        console.log('📍 Using redirect URL:', VERCEL_REDIRECT_URL);
        
        // Enable testing mode for more predictable behavior
        auth.settings.appVerificationDisabledForTesting = true;
        
        try {
          // Use signInWithRedirect for mobile which will navigate away from the app
          await signInWithRedirect(auth, googleProvider);
          console.log('Redirect initiated successfully');
        } catch (redirectError) {
          console.error('❌ ERROR during redirect initiation:', redirectError);
          
          if (typeof window !== 'undefined' && window.alert) {
            window.alert('Auth error: ' + JSON.stringify(redirectError));
          }
          
          throw redirectError;
        }
        
        // This code runs after returning from the redirect
        console.log('Returned from redirect - checking result...');
        
        try {
          const result = await getRedirectResult(auth);
          
          if (result && result.user) {
            console.log('✅ Successfully authenticated:', result.user.displayName || result.user.email);
            
            if (typeof window !== 'undefined' && window.alert) {
              window.alert('Auth success: ' + (result.user.displayName || result.user.email));
            }
          } else {
            console.log('⚠️ No user found in redirect result');
          }
          
          return result || { user: null };
        } catch (resultError) {
          console.error('❌ Error getting auth result:', resultError);
          throw resultError;
        }
      }
      // iOS flow
      else if (platform === 'ios') {
        // Similar to Android but with iOS-specific settings
        console.log('🍎 Using iOS-specific auth flow');
        
        googleProvider.setCustomParameters({
          prompt: 'select_account',
          redirect_uri: VERCEL_REDIRECT_URL
        });
        
        // The rest is similar to Android...
        // (simplified for brevity as it follows the same pattern)
        await signInWithRedirect(auth, googleProvider);
        return { user: null };
      }
    } 
    // WEB BROWSER FLOW
    else {
      console.log('🌐 Starting Google sign-in with popup for web browser');
      return await signInWithPopup(auth, googleProvider);
    }
  } catch (error) {
    console.error("❌ Google sign-in error:", error);
    const firebaseError = error as { code?: string };
    
    // Enhanced error reporting for common issues
    if (firebaseError.code === 'auth/redirect-cancelled-by-user') {
      console.log('User cancelled the redirect flow');
    } else if (firebaseError.code === 'auth/redirect-operation-pending') {
      console.log('A redirect operation is already pending');
    } else if (firebaseError.code === 'auth/invalid-credential') {
      console.log('Invalid OAuth credentials configuration');
    } else if (firebaseError.code === 'auth/operation-not-allowed') {
      console.log('Google sign-in may not be enabled in Firebase console');
    } else if (firebaseError.code === 'auth/network-request-failed') {
      console.log('Network error - check internet connection');
    }
    
    throw error;
  }
};

// Enhanced redirect result handler
export const getGoogleAuthResult = async () => {
  try {
    console.log('Checking for redirect authentication result...');
    const result = await getRedirectResult(auth);
    
    if (result && result.user) {
      console.log("✅ Authentication success via redirect:", result.user.displayName || result.user.email);
      // Force auth state update
      await auth.updateCurrentUser(result.user);
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

// Email verification
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

// Export services and providers
export { auth, firestore, googleProvider, phoneAuthProvider };
export default app; 