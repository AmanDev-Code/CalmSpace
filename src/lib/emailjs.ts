import emailjs from '@emailjs/browser';

// Initialize EmailJS with your user ID
// Visit https://dashboard.emailjs.com/admin/account to get your user ID
export const initEmailJS = () => {
  const userId = import.meta.env.VITE_EMAILJS_USER_ID || 'hKEQLWn9N9pyu5XiM';
  console.log('Initializing EmailJS with User ID:', userId);
  try {
    emailjs.init(userId);
    console.log('EmailJS initialization successful');
  } catch (error) {
    console.error('EmailJS initialization failed:', error);
  }
};

// EmailJS service and template IDs
export const EMAILJS_CONFIG = {
  // Contact form (sends email to owner)
  contactForm: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID_CONTACT || 'service_fvyt0r6',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT || 'template_ruke4i6',
  },
  // Booking confirmation (sends email to customer)
  bookingConfirmation: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID_BOOKING || 'service_fvyt0r6',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_BOOKING || 'template_0mg2nur',
  }
}; 