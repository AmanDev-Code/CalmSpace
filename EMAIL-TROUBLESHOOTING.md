# Email Troubleshooting Guide for CalmSpace

If you're experiencing issues with the email functionality in CalmSpace, this guide will help you identify and resolve common problems.

## Common Issues and Solutions

### 1. Emails Not Being Sent

#### Check EmailJS Configuration

**Problem**: EmailJS service isn't properly configured.

**Solution**:
1. Verify that your `.env` file contains the correct EmailJS credentials:
```
VITE_EMAILJS_USER_ID=your_user_id_here
VITE_EMAILJS_SERVICE_ID_CONTACT=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID_CONTACT=your_contact_template_id_here
VITE_EMAILJS_SERVICE_ID_BOOKING=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID_BOOKING=your_booking_template_id_here
```

2. Check that EmailJS is being initialized in your components:
```javascript
// In src/lib/emailjs.ts
console.log('Initializing EmailJS with:', import.meta.env.VITE_EMAILJS_USER_ID);
```

3. Verify that the service and template IDs in `src/lib/emailjs.ts` match those in your EmailJS dashboard.

#### Check Browser Console

**Problem**: JavaScript errors are preventing email sending.

**Solution**:
1. Open your browser's developer tools (F12 or right-click > Inspect)
2. Go to the Console tab
3. Look for errors related to EmailJS, especially when submitting forms
4. Common errors include:
   - "EmailJS not initialized"
   - "Invalid template ID"
   - "Invalid service ID"

### 2. Emails Sent But Not Received

#### Check Email Service

**Problem**: Your email service might be blocking or filtering the emails.

**Solution**:
1. Check the spam/junk folder in your email client
2. Verify the email service is properly connected in your EmailJS dashboard
3. Check the Email History in your EmailJS dashboard to see if sending attempts were successful
4. Try sending to a different email address to rule out recipient-specific issues

#### Template Variables Issues

**Problem**: Incorrect variable names in your template.

**Solution**:
1. Ensure your template variables match exactly with what's sent in the code:
   - For contact form: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{message}}`, `{{date}}`
   - For booking confirmation: `{{name}}`, `{{email}}`, `{{phone}}`, `{{service_type}}`, etc.
2. Check that variable case matches exactly (EmailJS is case-sensitive)

### 3. Email Content Appears Incorrectly

**Problem**: Template rendering issues.

**Solution**:
1. Test your templates in EmailJS dashboard's "Test" feature
2. Check that your HTML is valid
3. Simplify your template if necessary to isolate the problem
4. Ensure your template is responsive and looks good on different devices

## Debugging Email Functionality

### Add Logging to Email Functions

Add more detailed logging to help diagnose email issues:

```javascript
// In src/lib/formUtils.ts
export const submitFormData = async (formData: Record<string, any>): Promise<{success: boolean, message: string}> => {
  try {
    console.log('Submitting form data:', formData);
    
    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      message: formData.message,
      date: new Date().toLocaleDateString()
    };
    
    console.log('Using template params:', templateParams);
    console.log('Using service ID:', EMAILJS_CONFIG.contactForm.serviceId);
    console.log('Using template ID:', EMAILJS_CONFIG.contactForm.templateId);
    
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
```

### Test EmailJS Directly in Console

You can test EmailJS directly in the browser console:

```javascript
// Test EmailJS initialization
emailjs.init("your_user_id_here");

// Test sending a simple email
emailjs.send(
  "your_service_id", 
  "your_template_id",
  {
    from_name: "Test User",
    from_email: "test@example.com",
    message: "This is a test message"
  }
).then(
  function(response) {
    console.log("SUCCESS", response);
  },
  function(error) {
    console.log("FAILED", error);
  }
);
```

## Quick Fixes for Common Scenarios

### 1. Silent Failures in Contact Form

If the contact form appears to submit but no email is sent:

```javascript
// In src/components/ContactForm.tsx
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  
  try {
    console.log('Submitting contact form...');
    
    // Test EmailJS initialization
    console.log('EmailJS User ID:', import.meta.env.VITE_EMAILJS_USER_ID);
    
    const response = await submitFormData(formData);
    console.log('Form submission response:', response);
    
    // Success handling...
  } catch (error) {
    console.error('Contact form submission error:', error);
    // Error handling...
  }
};
```

### 2. Booking Confirmation Email Issues

If booking confirmation emails aren't sending after payment:

```javascript
// In src/pages/Checkout.tsx, in handlePaymentSuccess
// Send confirmation email
try {
  console.log('Sending booking confirmation email...');
  
  // Add a slight delay to ensure storage operations complete first
  setTimeout(async () => {
    try {
      const emailResponse = await submitBookingData(bookingWithPayment);
      console.log('Email response:', emailResponse);
    } catch (emailError) {
      console.error('Delayed email sending error:', emailError);
    }
  }, 500);
} catch (emailError) {
  console.error('Email sending error:', emailError);
}
```

## Free Tier Limitations

Remember that EmailJS free tier has limitations:
- 200 emails per month
- 2 email templates
- Limited email history

If you're approaching these limits, consider:
1. Upgrading to a paid plan
2. Implementing a server-side email solution for production
3. Adding rate limiting to prevent abuse

## Getting Further Help

If you continue experiencing issues:
1. Check the [EmailJS documentation](https://www.emailjs.com/docs/)
2. Review the email templates in your EmailJS dashboard
3. Verify network connectivity and CORS settings
4. Consider implementing alternative email solutions for critical functionality 