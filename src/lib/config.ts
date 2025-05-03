// Firebase configuration
export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "your-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-auth-domain",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-storage-bucket",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "your-messaging-sender-id",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "your-app-id",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "your-measurement-id"
};

// EmailJS configuration
export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "your-service-id",
  userId: import.meta.env.VITE_EMAILJS_USER_ID || "your-user-id",
  
  // Template IDs
  templates: {
    otpVerification: import.meta.env.VITE_EMAILJS_OTP_TEMPLATE_ID || "template_otpverification",
    welcome: import.meta.env.VITE_EMAILJS_WELCOME_TEMPLATE_ID || "template_welcome",
    contact: import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || "template_contact"
  }
}; 

// OTP-specific EmailJS configuration
export const OTP_EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_OTP_EMAILJS_SERVICE_ID || "your-otp-service-id",
  userId: import.meta.env.VITE_OTP_EMAILJS_USER_ID || "your-otp-user-id",
  templateId: import.meta.env.VITE_OTP_EMAILJS_TEMPLATE_ID || "your-otp-template-id"
}; 