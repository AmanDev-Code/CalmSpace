# EmailJS Setup for CalmSpace

This document provides instructions for setting up EmailJS to handle form submissions without a backend. We'll set up two email templates:
1. Contact Form Email (sent to you when a user submits the contact form)
2. Booking Confirmation Email (sent to customers when they book a session)

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and sign up for an account (there's a free tier available)
2. Log in to your EmailJS dashboard

## Step 2: Add an Email Service

1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose an email provider (Gmail, Outlook, etc.)
4. Follow the steps to connect your email account

## Step 3: Create Email Templates

### 1. Contact Form Template (sent to owner)

1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Set the template name (e.g., "contact_form")
4. Copy and paste the template below into the HTML section:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #4a5568;">
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="https://your-website.com/assets/brandLogo.png" alt="CalmSpace Logo" style="height: 80px;">
    <h1 style="color: #4c6280; margin-top: 10px; margin-bottom: 5px;">CalmSpace Contact Message</h1>
  </div>
  
  <div style="background-color: #f9f5f2; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
    <p>Hello Admin,</p>
    <p>You got a new message from {{from_name}}:</p>
    <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;">{{message}}</p>
    
    <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; margin-top: 20px;">
      <h3 style="color: #4c6280; margin-top: 0; margin-bottom: 10px;">Contact Information:</h3>
      <p><strong>Email:</strong> {{from_email}}</p>
      <p><strong>Phone:</strong> {{phone}}</p>
      <p><strong>Submitted on:</strong> {{date}}</p>
    </div>
  </div>
  
  <div style="text-align: center; color: #718096; font-size: 14px;">
    <p style="margin-bottom: 5px;">CalmSpace Mental Wellness Support</p>
    <p style="margin-bottom: 5px;">44/2/8/5, Mylasandra Rd, Bengaluru, Karnataka 560068</p>
    <p>+91 6203789409 | contact@calmspace.com</p>
  </div>
</div>
```

5. In the "Subject" field of your template, enter: `New Message from {{from_name}} via CalmSpace Contact Form`
6. Save your template and note the Template ID

### 2. Booking Confirmation Template (sent to customer)

1. Create another template for booking confirmations
2. Set the template name (e.g., "booking_confirmation")
3. Copy and paste the template below into the HTML section:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #4a5568;">
  <div style="text-align: center; margin-bottom: 25px;">
    <img src="https://your-website.com/assets/brandLogo.png" alt="CalmSpace Logo" style="height: 80px;">
    <h1 style="color: #4c6280; margin-top: 15px; margin-bottom: 5px;">Your Session is Booked!</h1>
    <p style="color: #718096; font-size: 16px;">Thank you for choosing CalmSpace for your wellness journey</p>
  </div>
  
  <div style="background-color: #f9f5f2; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
    <p>Hello <strong>{{name}}</strong>,</p>
    <p>Thank you for booking a session with CalmSpace. We've received your request and our team will contact you shortly to confirm your appointment details.</p>
    
    <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
      <h3 style="color: #4c6280; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Your Booking Details</h3>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; width: 40%;"><strong>Name:</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">{{name}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Email:</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">{{email}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Phone:</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">{{phone}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Service Type:</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">{{service_type}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Preferred Date:</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">{{appointment_date}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Therapist Preference:</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">{{therapist}}</td>
        </tr>
      </table>
    </div>
    
    <div style="background-color: #edf2f7; padding: 15px; border-radius: 8px; margin-top: 20px; font-size: 14px;">
      <p style="margin-top: 0;"><strong>What happens next?</strong></p>
      <ol style="margin-bottom: 0; padding-left: 20px;">
        <li>Our team will review your booking request</li>
        <li>We'll contact you within 24 hours to confirm your appointment</li>
        <li>You'll receive information about preparing for your session</li>
      </ol>
    </div>
  </div>
  
  <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 20px;">
    <p>If you need to reschedule or have any questions, please contact us at:</p>
    <div style="display: flex; justify-content: center; gap: 40px; margin: 15px 0;">
      <div style="text-align: center;">
        <div style="font-size: 20px; margin-bottom: 5px;">📞</div>
        <div style="font-weight: bold; margin-bottom: 3px;">Phone</div>
        <div>+91 6203789409</div>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 20px; margin-bottom: 5px;">✉️</div>
        <div style="font-weight: bold; margin-bottom: 3px;">Email</div>
        <div>contact@calmspace.com</div>
      </div>
    </div>
  </div>
  
  <div style="text-align: center; color: #718096; font-size: 14px; margin-top: 30px;">
    <p style="margin-bottom: 5px;">CalmSpace Mental Wellness Support</p>
    <p style="margin-bottom: 5px;">44/2/8/5, Mylasandra Rd, Bengaluru, Karnataka 560068</p>
    <p>Office Hours: Monday-Friday (9:00 AM - 7:00 PM) | Saturday (10:00 AM - 5:00 PM)</p>
  </div>
</div>
```

4. In the "Subject" field of your template, enter: `Your CalmSpace Appointment Confirmation`
5. Save your template and note the Template ID

## Step 4: Update Your Code

Open the `src/lib/emailjs.ts` file and update the following values:

```typescript
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your user ID
// Visit https://dashboard.emailjs.com/admin/account to get your user ID
export const initEmailJS = () => {
  emailjs.init('YOUR_USER_ID'); // Replace with your actual User ID from EmailJS
};

// EmailJS service and template IDs
export const EMAILJS_CONFIG = {
  // Contact form (sent to owner)
  contactForm: {
    serviceId: 'YOUR_SERVICE_ID', // Replace with your service ID
    templateId: 'YOUR_CONTACT_TEMPLATE_ID', // Replace with your contact form template ID
  },
  // Booking confirmation (sent to customer)
  bookingConfirmation: {
    serviceId: 'YOUR_SERVICE_ID', // Replace with your service ID
    templateId: 'YOUR_CONFIRMATION_TEMPLATE_ID', // Replace with your confirmation template ID
  }
};
```

1. Replace `YOUR_USER_ID` with your EmailJS User ID (found in Account > API Keys)
2. Replace `YOUR_SERVICE_ID` with your EmailJS Service ID
3. Replace each template ID with the corresponding template IDs you created

## Step 5: Update Your Form Utils

Now let's modify the `src/lib/formUtils.ts` file to work with these two templates:

```typescript
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

// Submit booking form data using EmailJS (combines booking data and sends confirmation to customer)
export const submitBookingData = async (bookingData: Record<string, any>): Promise<{success: boolean, message: string}> => {
  try {
    // Send confirmation email to client
    const templateParams = {
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone || 'Not provided',
      service_type: bookingData.serviceType,
      appointment_date: bookingData.appointmentDate,
      therapist: bookingData.therapistPreference || 'No preference'
    };
    
    // Send confirmation email using EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.bookingConfirmation.serviceId,
      EMAILJS_CONFIG.bookingConfirmation.templateId,
      templateParams
    );
    
    console.log('EmailJS Booking Response:', response);
    
    return {
      success: true,
      message: 'Booking request submitted successfully! We will confirm your appointment shortly.'
    };
  } catch (error) {
    console.error('EmailJS Booking Error:', error);
    return {
      success: false,
      message: 'Failed to submit the booking request. Please try again later.'
    };
  }
};

// This function is now no longer needed since we're sending the confirmation in submitBookingData
// You can remove it or keep it for future use
export const sendConfirmationEmail = async (email: string, name: string): Promise<{success: boolean}> => {
  // This is now handled directly in the submitBookingData function
  return { success: true };
};
```

## Testing

1. Fill out your contact form and submit it
   - Check that you (the owner) receive an email with the contact form details
   
2. Fill out your booking form and submit it
   - Check that the customer receives a confirmation email with their booking details

## Troubleshooting

If emails are not being sent:

1. Check the browser console for any errors
2. Verify that your EmailJS service is active
3. Confirm that all IDs are correctly entered in the config file
4. Make sure your email templates have the correct variables
5. Check your EmailJS dashboard for any failed deliveries

## Note on Free Tier Limitations

EmailJS's free tier includes:
- 200 emails per month
- 2 email templates
- 1 email service

This setup is optimized to work within these limitations by focusing on the two most important emails (contact form notifications and booking confirmations). 