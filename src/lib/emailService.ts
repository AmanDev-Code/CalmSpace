import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from './emailjs';

/**
 * Send an email using EmailJS with template parameters
 * @param templateId EmailJS template ID
 * @param templateParams Template parameters
 * @returns Promise resolving to the response
 */
export const sendEmailWithTemplate = async (
  templateId: string, 
  templateParams: Record<string, any>,
  serviceId: string = EMAILJS_CONFIG.contactForm.serviceId
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams
    );
    
    return { 
      success: true, 
      message: 'Email sent successfully' 
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      message: 'Failed to send email. Please try again later.' 
    };
  }
};

/**
 * Replace placeholders in a template string with values
 * @param template Template string with {placeholder} format
 * @param data Object with key-value pairs for replacement
 * @returns Processed template string
 */
export const processTemplate = (template: string, data: Record<string, any>): string => {
  return template.replace(/{(\w+)}/g, (match, key) => {
    return data[key] !== undefined ? data[key] : match;
  });
};

/**
 * Common email templates
 */
export const EMAIL_TEMPLATES = {
  OTP_VERIFICATION: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://calmspace-haven.vercel.app/assets/brandLogo.png" alt="CalmSpace Logo" style="max-width: 200px;">
      </div>
      <h2 style="color: #333745; text-align: center;">Verify Your Email</h2>
      <p style="color: #4a4a4a; font-size: 16px;">Hello {name},</p>
      <p style="color: #4a4a4a; font-size: 16px;">Thank you for signing up with CalmSpace. To complete your registration, please use the following verification code:</p>
      <div style="background-color: #f2f7fa; border-radius: 5px; padding: 15px; text-align: center; margin: 20px 0;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #5D7B9D;">{otp}</span>
      </div>
      <p style="color: #4a4a4a; font-size: 16px;">This code will expire in {expiryMinutes} minutes.</p>
      <p style="color: #4a4a4a; font-size: 16px;">If you did not request this code, please ignore this email.</p>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #777; font-size: 14px; text-align: center;">
        <p>&copy; {year} CalmSpace. All rights reserved.</p>
      </div>
    </div>
  `,
  
  WELCOME: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://calmspace-haven.vercel.app/assets/brandLogo.png" alt="CalmSpace Logo" style="max-width: 200px;">
      </div>
      <h2 style="color: #333745; text-align: center;">Welcome to CalmSpace!</h2>
      <p style="color: #4a4a4a; font-size: 16px;">Hello {name},</p>
      <p style="color: #4a4a4a; font-size: 16px;">Thank you for joining CalmSpace. We're excited to have you on board!</p>
      <p style="color: #4a4a4a; font-size: 16px;">With your new account, you can:</p>
      <ul style="color: #4a4a4a; font-size: 16px;">
        <li>Book therapy sessions with our qualified professionals</li>
        <li>Access our library of mental wellness resources</li>
        <li>Track your progress on your mental wellness journey</li>
      </ul>
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://calmspace-haven.vercel.app/login" style="background-color: #5D7B9D; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Sign In to Your Account</a>
      </div>
      <p style="color: #4a4a4a; font-size: 16px;">If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #777; font-size: 14px; text-align: center;">
        <p>&copy; {year} CalmSpace. All rights reserved.</p>
      </div>
    </div>
  `
}; 