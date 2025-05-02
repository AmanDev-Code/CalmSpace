# CalmSpace Checkout Flow

This document outlines the checkout flow for the CalmSpace booking system, integrated with Razorpay for payment processing.

## Overview of the Checkout Flow

The checkout process follows these steps:

1. **Booking Form**: User fills out the booking form with personal details, service selection, and preferred date.
2. **Checkout Page**: User reviews their booking information and enters any promo code.
3. **Payment Processing**: User completes payment via Razorpay's secure payment gateway.
4. **Confirmation**: Upon successful payment, the booking is confirmed and a confirmation email is sent.

## Components and Pages

The checkout flow consists of the following components and pages:

1. **BookingForm.tsx**: Collects user information and redirects to the checkout page.
2. **Checkout.tsx**: Displays booking summary, allows promo code application, and initiates payment.
3. **PaymentSuccess.tsx**: Shown after successful payment, displays booking details and payment confirmation.
4. **PaymentFailure.tsx**: Shown when payment fails or is cancelled, offers options to retry or modify booking.
5. **formUtils.ts**: Contains utility functions for form validation and email sending.

## User Journey

1. User navigates to the Book page (`/book`)
2. User fills out the booking form with their details
3. User clicks "Continue to Checkout" button
4. User is redirected to the Checkout page (`/checkout`)
5. User reviews their booking information
6. User optionally applies a promo code
7. User clicks "Proceed to Payment" button
8. Razorpay payment modal appears
9. User completes payment in the modal
10. If payment is successful, user is redirected to the Success page (`/payment-success`)
11. If payment fails or is cancelled, user is redirected to the Failure page (`/payment-failure`)

## How It Works

### Data Flow

1. Booking form data is stored in `sessionStorage` when the user proceeds to checkout.
2. The Checkout page retrieves this data and displays it, along with calculated pricing.
3. When payment is successful, the booking data is combined with payment details and sent via EmailJS.
4. Payment success data is stored in `sessionStorage` for displaying on the success page.

### Pricing Logic

The pricing is determined based on the selected service type:

- **Subscription-Based Model**: ₹1,500 (Premium monthly plan)
- **Pay-Per-Session Model**: ₹1,500 (Standard session)
- **Corporate Wellness Programs**: ₹5,000 (Per employee)
- **Workshops & Webinars**: ₹1,000 (Per attendee)
- **E-Books & Online Courses**: ₹1,200 (Digital product)
- Other services default to ₹1,500

### Promo Codes

The system supports promo codes with percentage-based discounts:

- `WELCOME10`: 10% discount
- `CALM20`: 20% discount
- `FIRSTTIME15`: 15% discount

## Customization Guide

### Modifying Pricing

To change the pricing structure, edit the `Checkout.tsx` file:

```javascript
// Find this switch statement in src/pages/Checkout.tsx
switch(parsedData.serviceType) {
  case 'subscription-based-model':
    price = 1500; // Premium monthly plan
    break;
  // ... other cases
}
```

### Adding Promo Codes

To add or modify promo codes, update the `Checkout.tsx` file:

```javascript
// Find this object in src/pages/Checkout.tsx
const validPromoCodes = {
  'WELCOME10': 10,
  'CALM20': 20,
  'FIRSTTIME15': 15
};
```

### Customizing Email Templates

Email templates are managed through EmailJS. Update your templates in the EmailJS dashboard to match the data being sent from the application.

The booking confirmation email template should include these variables:
- `{{name}}`: Customer's name
- `{{email}}`: Customer's email
- `{{phone}}`: Customer's phone
- `{{service_type}}`: Selected service
- `{{appointment_date}}`: Appointment date
- `{{therapist}}`: Selected therapist
- `{{payment_id}}`: Razorpay payment ID
- `{{amount_paid}}`: Total amount paid
- `{{discount_applied}}`: Discount amount (if any)
- `{{concerns}}`: Additional notes/concerns

## Testing the Checkout Flow

1. Fill out the booking form with test data
2. On the checkout page, try applying a promo code
3. Complete payment using Razorpay test credentials:
   - Card: 4111 1111 1111 1111
   - Expiry: Any future date
   - CVV: Any 3-digit number
   - Name: Any name
   - Password: 1234
4. Verify that the success page shows correct information
5. Check that confirmation emails are received

## Troubleshooting

### Common Issues

1. **Booking data not appearing on checkout**: Check that sessionStorage is working and the data is being stored correctly.
2. **Razorpay modal not appearing**: Verify that the Razorpay script is loading correctly and the API key is valid.
3. **Email confirmation not received**: Check EmailJS configuration and template IDs.
4. **Payment failures**: Check browser console for Razorpay error messages.

### Debug Tips

- Check browser console for errors
- Verify that sessionStorage contains the expected data
- Test with different browsers and devices
- Clear cache and cookies if issues persist

## Integration with Other Systems

The checkout flow can be integrated with other systems:

1. **CRM Systems**: Add API calls to store booking data in a CRM system.
2. **Analytics**: Add tracking events for checkout steps and conversions.
3. **Appointment Systems**: Integrate with calendar services for automated scheduling.

For assistance with customizations or issues, contact the development team. 