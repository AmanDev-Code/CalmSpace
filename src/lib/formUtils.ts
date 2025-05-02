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
    console.log('submitBookingData called with:', bookingData);
    console.log('EmailJS Config:', EMAILJS_CONFIG);
    
    // Prepare template parameters for sending confirmation to customer
    const templateParams = {
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone || 'Not provided',
      service_type: bookingData.serviceType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      appointment_date: bookingData.appointmentDate,
      therapist: bookingData.therapistPreference 
        ? getTherapistName(bookingData.therapistPreference)
        : 'Assigned by CalmSpace',
      payment_id: bookingData.paymentId || 'Not available',
      amount_paid: bookingData.amountPaid ? `₹${bookingData.amountPaid.toFixed(2)}` : 'Not available',
      discount_applied: bookingData.discountApplied ? `₹${bookingData.discountApplied.toFixed(2)}` : '₹0.00',
      concerns: bookingData.concerns || 'None provided'
    };
    
    console.log('EmailJS template params:', templateParams);
    console.log('Using service ID:', EMAILJS_CONFIG.bookingConfirmation.serviceId);
    console.log('Using template ID:', EMAILJS_CONFIG.bookingConfirmation.templateId);

    // Send booking confirmation email to customer
    console.log('Attempting to send email via EmailJS...');
    const response = await emailjs.send(
      EMAILJS_CONFIG.bookingConfirmation.serviceId,
      EMAILJS_CONFIG.bookingConfirmation.templateId,
      templateParams
    );
    
    console.log('EmailJS Booking Response:', response);
    
    return {
      success: true,
      message: 'Booking confirmed successfully! A confirmation email has been sent to you.'
    };
  } catch (error) {
    console.error('EmailJS Booking Error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    // For debugging, return success even on error
    return {
      success: true,
      message: 'Your booking is confirmed, but we could not send the confirmation email. Our team will contact you shortly.'
    };
  }
};

// Helper function to get therapist full name from preference id
function getTherapistName(preference: string): string {
  switch(preference) {
    case 'dr-sharma': return 'Dr. Priya Sharma (Mindfulness Specialist)';
    case 'dr-mehta': return 'Dr. Rajiv Mehta (Sleep & Anxiety Expert)';
    case 'dr-das': return 'Dr. Priyanka Das (Workplace Wellness Consultant)';
    case 'dr-kapoor': return 'Dr. Arjun Kapoor (Depression & Public Health)';
    case 'dr-reddy': return 'Dr. Arjun Reddy (Digital Wellness Specialist)';
    case 'dr-patel': return 'Dr. Anjali Patel (Relationship Therapist)';
    case 'dr-krishnan': return 'Dr. Maya Krishnan (Burnout Prevention Expert)';
    case 'no-preference': return 'No Preference (Assigned by CalmSpace)';
    default: return 'Assigned by CalmSpace';
  }
}

// This function is no longer needed since we send the confirmation directly in submitBookingData
// Keeping it with a simplified implementation for backward compatibility
export const sendConfirmationEmail = async (email: string, name: string): Promise<{success: boolean}> => {
  // This is now handled in the submitBookingData function
  return { success: true };
};
