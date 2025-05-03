import { 
  RecaptchaVerifier, 
  ConfirmationResult, 
  PhoneAuthProvider, 
  signInWithCredential 
} from 'firebase/auth';
import { 
  initRecaptchaVerifier, 
  sendPhoneOTP, 
  auth,
  phoneAuthProvider
} from './firebase';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp, getFirestore } from 'firebase/firestore';

// Store confirmation results for later verification
const confirmationResults: Record<string, ConfirmationResult> = {};

// Firebase Firestore instance
const firestore = getFirestore();

// Initialize reCAPTCHA and send OTP
export const sendFirebaseOTP = async (
  phoneNumber: string, 
  recaptchaContainerId: string,
  onVerifierRendered?: () => void
): Promise<{ success: boolean; message: string }> => {
  try {
    console.log(`Sending OTP to ${phoneNumber}`);
    
    // Initialize reCAPTCHA verifier
    const appVerifier = initRecaptchaVerifier(recaptchaContainerId, onVerifierRendered);
    
    // Format phone number if needed (ensure it has country code)
    const formattedPhone = formatPhoneNumber(phoneNumber);
    
    // Send OTP via Firebase
    const confirmationResult = await sendPhoneOTP(formattedPhone, appVerifier);
    
    // Store confirmation result in memory for later verification
    confirmationResults[phoneNumber] = confirmationResult;
    
    // Save verification attempt to Firestore
    await setDoc(doc(firestore, 'otpVerifications', phoneNumber), {
      phoneNumber: formattedPhone,
      sentAt: serverTimestamp(),
      verified: false
    });
    
    console.log('OTP sent successfully');
    return { 
      success: true, 
      message: 'Verification code sent to your phone number' 
    };
  } catch (error: any) {
    console.error('Error sending OTP:', error);
    return { 
      success: false, 
      message: error.message || 'Failed to send verification code. Please try again.' 
    };
  }
};

// Verify OTP code
export const verifyFirebaseOTP = async (
  phoneNumber: string, 
  otp: string
): Promise<{ valid: boolean; message: string; user?: any }> => {
  try {
    // Get confirmation result for this phone number
    const confirmationResult = confirmationResults[phoneNumber];
    
    if (!confirmationResult) {
      return { 
        valid: false, 
        message: 'Verification session expired or not found. Please request a new code.' 
      };
    }
    
    // Verify the code
    const credential = await confirmationResult.confirm(otp);
    
    // Update Firestore record
    const otpRef = doc(firestore, 'otpVerifications', phoneNumber);
    await updateDoc(otpRef, {
      verified: true,
      verifiedAt: serverTimestamp()
    });
    
    // Clear from memory
    delete confirmationResults[phoneNumber];
    
    return { 
      valid: true, 
      message: 'Phone number verified successfully',
      user: credential.user
    };
  } catch (error: any) {
    console.error('Error verifying OTP:', error);
    return { 
      valid: false, 
      message: error.message || 'Invalid verification code. Please try again.' 
    };
  }
};

// Verify with verification ID and OTP code (alternative method)
export const verifyWithCredential = async (verificationId: string, otp: string) => {
  try {
    // Create credential
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    
    // Sign in with credential
    const result = await signInWithCredential(auth, credential);
    
    return {
      valid: true,
      message: 'Phone number verified successfully',
      user: result.user
    };
  } catch (error: any) {
    console.error('Error verifying with credential:', error);
    return { 
      valid: false, 
      message: error.message || 'Invalid verification code. Please try again.' 
    };
  }
};

// Check if a phone number is verified
export const isPhoneVerified = async (phoneNumber: string): Promise<boolean> => {
  try {
    const formattedPhone = formatPhoneNumber(phoneNumber);
    const docRef = doc(firestore, 'otpVerifications', formattedPhone);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().verified === true;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking verification status:', error);
    return false;
  }
};

// Format phone number to ensure it has a country code
// You may need to adjust this based on your requirements
function formatPhoneNumber(phoneNumber: string): string {
  // If phone number doesn't start with '+', add India country code (+91)
  if (!phoneNumber.startsWith('+')) {
    // Remove leading zeros
    const cleaned = phoneNumber.replace(/^0+/, '');
    
    // Add India country code if it's an Indian number
    return '+91' + cleaned;
  }
  
  return phoneNumber;
}

// Reset verification status
export const resetVerification = async (phoneNumber: string): Promise<void> => {
  try {
    const formattedPhone = formatPhoneNumber(phoneNumber);
    const docRef = doc(firestore, 'otpVerifications', formattedPhone);
    await updateDoc(docRef, {
      verified: false
    });
  } catch (error) {
    console.error('Error resetting verification:', error);
  }
}; 