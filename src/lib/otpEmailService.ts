import emailjs from '@emailjs/browser';
import { OTP_EMAILJS_CONFIG } from './config';

// Initialize EmailJS specifically for OTP emails with a separate user ID
export const initOtpEmailJS = () => {
  const otpUserId = OTP_EMAILJS_CONFIG.userId;
  console.log('Initializing OTP EmailJS with User ID:', otpUserId);
  
  if (!otpUserId) {
    console.error('OTP EmailJS User ID not found in environment variables');
    return false;
  }
  
  try {
    emailjs.init(otpUserId);
    console.log('OTP EmailJS initialization successful');
    return true;
  } catch (error) {
    console.error('OTP EmailJS initialization failed:', error);
    return false;
  }
};

// Export OTP EmailJS configuration for use in other modules
export { OTP_EMAILJS_CONFIG };

/**
 * Send an email using the OTP-specific EmailJS account
 * @param templateParams Parameters to populate the email template
 * @returns Promise resolving to success status
 */
export const sendOtpEmail = async (templateParams: {
  to_name: string;
  to_email: string;
  otp_code?: string;  // Make otp_code optional
  expiry_minutes?: number;  // Make expiry_minutes optional
}): Promise<{ success: boolean; message: string; otp?: string }> => {
  try {
    // Initialize OTP EmailJS if needed
    initOtpEmailJS();
    
    // Generate OTP if not provided
    let otp = templateParams.otp_code;
    if (!otp || otp === 'GENERATED_BY_SERVICE') {
      // Import and use the OTP service to generate and store a new OTP
      const { generateOTP, createOTP } = await import('./otpService');
      otp = createOTP(templateParams.to_email);
      console.log(`Generated new OTP for ${templateParams.to_email}: ${otp} (masked in production)`);
    }
    
    // Set default expiry minutes if not provided
    const expiryMinutes = templateParams.expiry_minutes || 15;
    
    // Log the OTP EmailJS configuration
    console.log('OTP EmailJS Configuration details:', {
      serviceId: OTP_EMAILJS_CONFIG.serviceId || 'Not set',
      templateId: OTP_EMAILJS_CONFIG.templateId || 'Not set',
      userId: OTP_EMAILJS_CONFIG.userId || 'Not set'
    });
    
    // Validate email address - this is critical
    if (!templateParams.to_email || !templateParams.to_email.includes('@')) {
      console.error('Invalid email address:', templateParams.to_email);
      throw new Error('Invalid recipient email address');
    }
    
    // Log the template parameters for debugging (masking sensitive data)
    console.log('Sending OTP email with params:', {
      to_name: templateParams.to_name,
      to_email: templateParams.to_email,
      otp_code: '******', // Mask the actual OTP in logs
      expiry_minutes: expiryMinutes
    });
    
    // Ensure all required config values are present
    if (!OTP_EMAILJS_CONFIG.serviceId || !OTP_EMAILJS_CONFIG.templateId) {
      console.error('OTP EmailJS configuration incomplete:', {
        serviceId: OTP_EMAILJS_CONFIG.serviceId ? 'Set' : 'Missing',
        templateId: OTP_EMAILJS_CONFIG.templateId ? 'Set' : 'Missing'
      });
      throw new Error('OTP email configuration is incomplete');
    }
    
    console.log(`Using OTP template ID: ${OTP_EMAILJS_CONFIG.templateId}`);
    
    // Format the template parameters according to EmailJS requirements
    // EmailJS typically expects 'email' or 'user_email' instead of 'to_email'
    const emailJSParams = {
      // Standard EmailJS params for the template
      to_name: templateParams.to_name,
      to_email: templateParams.to_email,
      email: templateParams.to_email, // Adding this as a fallback parameter
      user_email: templateParams.to_email, // Adding this as a fallback parameter
      otp_code: otp,
      expiry_minutes: expiryMinutes,
      // Additional params that might be expected by the template
      subject: 'Your OTP Verification Code',
      message: `Your verification code is: ${otp}. It will expire in ${expiryMinutes} minutes.`
    };
    
    console.log('Sending with EmailJS params:', {
      ...emailJSParams,
      otp_code: '******', // Mask the actual OTP in logs
    });
    
    const response = await emailjs.send(
      OTP_EMAILJS_CONFIG.serviceId,
      OTP_EMAILJS_CONFIG.templateId,
      emailJSParams
    );
    
    console.log('OTP email sent successfully:', response);
    
    return { 
      success: true, 
      message: 'OTP sent successfully',
      otp: otp // Return the OTP for potential use by the caller
    };
  } catch (error) {
    console.error('Error sending OTP email:', error);
    // Provide more specific error message
    let errorMessage = 'Failed to send OTP. Please try again later.';
    
    if (error instanceof Error) {
      if (error.message.includes('recipients address is empty')) {
        errorMessage = 'Failed to send email: The recipient email address is missing or invalid.';
      } else if (error.message.includes('Unprocessable Content')) {
        errorMessage = 'Failed to send email: The email service rejected the request format.';
      }
      console.error('Detailed error:', error.message);
    }
    
    return { 
      success: false, 
      message: errorMessage 
    };
  }
}; 