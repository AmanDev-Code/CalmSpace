import { initOtpEmailJS, sendOtpEmail } from './otpEmailService';
import { EMAILJS_CONFIG, OTP_EMAILJS_CONFIG } from './config';

// Constants for OTP generation and expiry
const OTP_LENGTH = 6;
const OTP_EXPIRY = 15 * 60 * 1000; // 15 minutes in milliseconds

// Store for OTPs with expiry and verification status
const otpStore: Record<string, {
  code: string;
  expiresAt: number;
  verified: boolean;
}> = {};

/**
 * Generate a random numeric OTP of specified length
 * @param length Length of OTP
 * @returns Generated OTP
 */
export const generateOTP = (length: number = 6): string => {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }
  return otp;
};

/**
 * Create and store OTP for an email
 * @param email Email to create OTP for
 * @returns Generated OTP
 */
export const createOTP = (email: string): string => {
  const otp = generateOTP(OTP_LENGTH);
  otpStore[email] = {
    code: otp,
    expiresAt: Date.now() + OTP_EXPIRY,
    verified: false
  };
  return otp;
};

/**
 * Send OTP verification email
 * @param email Recipient email address
 * @param name Recipient name
 * @returns Promise resolving to success status
 */
export const sendOTPEmail = async (email: string, name: string): Promise<{ success: boolean; message: string }> => {
  try {
    // Log the OTP EmailJS configuration for debugging
    console.log('OTP EmailJS Configuration:', {
      serviceId: OTP_EMAILJS_CONFIG.serviceId ? OTP_EMAILJS_CONFIG.serviceId : 'Not set',
      templateId: OTP_EMAILJS_CONFIG.templateId ? OTP_EMAILJS_CONFIG.templateId : 'Not set',
      userId: OTP_EMAILJS_CONFIG.userId ? OTP_EMAILJS_CONFIG.userId : 'Not set'
    });
    
    console.log('General EmailJS Configuration (templates):', {
      otpVerification: EMAILJS_CONFIG.templates.otpVerification ? EMAILJS_CONFIG.templates.otpVerification : 'Not set'
    });
    
    // Generate an OTP for the email
    const otp = createOTP(email);
    console.log(`Generated OTP ${otp} for ${email}`);
    
    // Use our dedicated OTP email service
    const templateParams = {
      to_name: name,
      to_email: email,
      otp_code: otp,
      expiry_minutes: OTP_EXPIRY / (60 * 1000)
    };
    
    console.log('Attempting to send OTP email using dedicated OTP email service...');
    
    // Call the specialized OTP email service
    const result = await sendOtpEmail(templateParams);
    
    if (result.success) {
      console.log('OTP email sent successfully using dedicated service');
      return result;
    }
    
    // If the OTP email service fails, fall back to the general email service as a backup
    console.warn('OTP email service failed, attempting fallback to general email service');
    
    try {
      // Import and initialize the general EmailJS as a fallback
      console.log('Importing general EmailJS module for fallback...');
      const { initEmailJS, EMAILJS_CONFIG: originalEmailJSConfig } = await import('./emailjs');
      initEmailJS();
      
      // Use the appropriate service ID and template ID from the emailjs.ts configuration
      // Note: The structure here is different from the one in config.ts
      const emailjs = (await import('@emailjs/browser')).default;
      
      // Use contact form service ID as fallback
      const serviceId = originalEmailJSConfig.contactForm.serviceId;
      
      // Try to use the OTP template ID from config.ts, or fall back to contact template
      const templateId = EMAILJS_CONFIG.templates.otpVerification ||
                        originalEmailJSConfig.contactForm.templateId;
      
      console.log('Fallback EmailJS Configuration:', {
        serviceId: serviceId,
        templateId: templateId
      });
      
      console.log(`Falling back to general email service with service ID: ${serviceId} and template ID: ${templateId}`);
      
      await emailjs.send(serviceId, templateId, templateParams);
      console.log('OTP email sent successfully using fallback method');
      return { success: true, message: 'OTP sent successfully' };
    } catch (fallbackError) {
      console.error('Fallback email method also failed:', fallbackError);
      return { success: false, message: 'Failed to send OTP. Please try again later.' };
    }
    
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return { success: false, message: 'Failed to send OTP. Please try again later.' };
  }
};

/**
 * Verify OTP code for a given email
 * @param email Email address to verify
 * @param code OTP code submitted by user
 * @returns Verification result
 */
export const verifyOTP = (email: string, code: string): { valid: boolean; message: string } => {
  const otpData = otpStore[email];
  
  // Check if OTP exists
  if (!otpData) {
    return { valid: false, message: 'No OTP found for this email. Please request a new code.' };
  }
  
  // Check if OTP has expired
  if (Date.now() > otpData.expiresAt) {
    delete otpStore[email]; // Clean up expired OTP
    return { valid: false, message: 'OTP has expired. Please request a new code.' };
  }
  
  // Verify code
  if (otpData.code !== code) {
    return { valid: false, message: 'Invalid OTP. Please check and try again.' };
  }
  
  // Mark as verified
  otpStore[email].verified = true;
  
  return { valid: true, message: 'OTP verified successfully' };
};

/**
 * Check if an email has been verified with OTP
 * @param email Email address to check
 * @returns Verification status
 */
export const isEmailVerified = (email: string): boolean => {
  return otpStore[email]?.verified === true;
};

/**
 * Reset verification status for an email
 * @param email Email address to reset
 */
export const resetVerification = (email: string): void => {
  if (otpStore[email]) {
    delete otpStore[email];
  }
};