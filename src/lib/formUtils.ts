import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from './emailjs';

// Basic email validation
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Submit contact form data using EmailJS (sends email to owner)
export const submitFormData = async (formData: Record<string, any>): Promise<{success: boolean, message: string}> => {
  try {
    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      message: formData.message,
      date: new Date().toLocaleDateString()
    };
    
    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.contactForm.serviceId,
      EMAILJS_CONFIG.contactForm.templateId,
      templateParams
    );
    
    console.log('EmailJS Response:', response);
    
    return {
      success: true,
      message: 'Form submitted successfully! We will get back to you shortly.'
    };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return {
      success: false,
      message: 'Failed to submit the form. Please try again later.'
    };
  }
};

// Submit booking form data using EmailJS (sends confirmation email to customer)
export const submitBookingData = async (bookingData: Record<string, any>): Promise<{success: boolean, message: string}> => {
  try {
    // Prepare template parameters for sending confirmation to customer
    const templateParams = {
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone || 'Not provided',
      service_type: bookingData.serviceType,
      appointment_date: bookingData.appointmentDate,
      therapist: bookingData.therapistPreference || 'No preference'
    };
    
    // Send booking confirmation email to customer
    const response = await emailjs.send(
      EMAILJS_CONFIG.bookingConfirmation.serviceId,
      EMAILJS_CONFIG.bookingConfirmation.templateId,
      templateParams
    );
    
    console.log('EmailJS Booking Response:', response);
    
    return {
      success: true,
      message: 'Booking request submitted successfully! We have sent you a confirmation email.'
    };
  } catch (error) {
    console.error('EmailJS Booking Error:', error);
    return {
      success: false,
      message: 'Failed to submit the booking request. Please try again later.'
    };
  }
};

// This function is no longer needed since we send the confirmation directly in submitBookingData
// Keeping it with a simplified implementation for backward compatibility
export const sendConfirmationEmail = async (email: string, name: string): Promise<{success: boolean}> => {
  // This is now handled in the submitBookingData function
  return { success: true };
};
