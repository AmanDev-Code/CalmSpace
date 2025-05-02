# EmailJS Setup for CalmSpace

This guide provides step-by-step instructions for setting up EmailJS to handle form submissions and send booking confirmations without requiring a backend server.

## What is EmailJS?

EmailJS allows you to send emails directly from client-side code without needing a backend server to process forms. This is ideal for static sites or apps where you want to implement simple form functionality.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and sign up for an account
2. The free tier includes 200 emails per month, which is suitable for testing and sites with moderate contact form usage

## Step 2: Add an Email Service

1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your preferred email provider (Gmail, Outlook, etc.)
4. Follow the steps to connect your email account
5. Note down the Service ID for use in your code

## Step 3: Create Email Templates

### Contact Form Email Template

This template will be used when someone submits the contact form. The email will be sent to you (the site owner).

1. In the EmailJS dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Name it "CalmSpace Contact Form"
4. Use the following variables in your template:
   - `{{from_name}}` - The name of the person contacting you
   - `{{from_email}}` - Their email address
   - `{{phone}}` - Their phone number
   - `{{message}}` - Their message
   - `{{date}}` - The submission date
5. Design the template or use the provided HTML template in `EMAILJS-SETUP.md`
6. Set the subject to: `New Message from {{from_name}} via CalmSpace Contact Form`
7. Save the template and note the Template ID

### Booking Confirmation Email Template

This template will be sent to customers after they successfully complete a booking with payment.

1. Create another template named "CalmSpace Booking Confirmation"
2. Use the following variables:
   - `{{name}}` - Customer's name
   - `{{email}}` - Customer's email
   - `{{phone}}` - Customer's phone
   - `{{service_type}}` - The service they booked
   - `{{appointment_date}}` - Their appointment date
   - `{{therapist}}` - Selected therapist
   - `{{payment_id}}` - Payment reference ID
   - `{{amount_paid}}` - The total amount paid
   - `{{discount_applied}}` - Any discount applied
   - `{{concerns}}` - Any additional notes/concerns
3. Design the template or use the provided HTML template in `EMAILJS-SETUP.md`
4. Set the subject to: `Your CalmSpace Appointment Confirmation`
5. Save the template and note the Template ID

## Step 4: Configure Environment Variables

For security and flexibility, we use environment variables to store EmailJS configuration:

1. Edit or create a `.env` file in the project root directory
2. Add the following variables:

```
# EmailJS Configuration
VITE_EMAILJS_USER_ID=your_user_id_here
VITE_EMAILJS_SERVICE_ID_CONTACT=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID_CONTACT=your_contact_template_id_here
VITE_EMAILJS_SERVICE_ID_BOOKING=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID_BOOKING=your_booking_template_id_here
```

3. Replace the placeholder values with your actual EmailJS credentials
4. Ensure the `.env` file is in your `.gitignore` to keep these values private

## Step 5: Testing the Implementation

### Testing the Contact Form

1. Open your site and navigate to the Contact page
2. Fill out the form with valid information and submit
3. Check the email account connected to your EmailJS service
4. Verify that you receive an email with all the submitted information

### Testing the Booking Confirmation

1. Complete a booking process including payment
2. After successful payment, the system should send a confirmation email
3. Check the email account of the address you entered during booking
4. Verify that the confirmation email contains all booking details

## Troubleshooting

If emails are not being sent:

1. Check browser console for errors related to EmailJS
2. Verify that EmailJS is properly initialized in your components
3. Confirm all environment variables are correctly set
4. Ensure template variables match those being passed from the code
5. Check your email service provider for any sending restrictions

## Important Notes

1. The free tier of EmailJS has a limit of 200 emails per month
2. For production sites with higher volume, consider upgrading to a paid plan
3. The code is configured to show success messages even if email sending fails, to avoid disrupting the user experience
4. All email sending code is located in `src/lib/formUtils.ts` and initialized in the form components

## Further Customization

You can further customize the email templates to match your branding:

1. Add your logo (use an absolute URL to a hosted image)
2. Customize colors to match your brand palette
3. Adjust the layout and messaging to fit your communication style
4. Add additional variables if you need to include more data in the emails 