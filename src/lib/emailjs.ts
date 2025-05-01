import emailjs from '@emailjs/browser';

// Initialize EmailJS with your user ID
// Visit https://dashboard.emailjs.com/admin/account to get your user ID
export const initEmailJS = () => {
  emailjs.init('hKEQLWn9N9pyu5XiM'); // Replace with your actual User ID from EmailJS dashboard
};

// EmailJS service and template IDs
export const EMAILJS_CONFIG = {
  // Contact form (sends email to owner)
  contactForm: {
    serviceId: 'service_fvyt0r6', // Replace with your service ID
    templateId: 'template_ruke4i6', // Replace with your contact form template ID
  },
  // Booking confirmation (sends email to customer)
  bookingConfirmation: {
    serviceId: 'service_fvyt0r6', // Replace with your service ID
    templateId: 'template_0mg2nur', // Replace with your booking confirmation template ID
  }
}; 