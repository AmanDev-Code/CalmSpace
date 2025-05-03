# Email OTP Verification System

This document outlines the email OTP (One-Time Password) verification system implemented in the CalmSpace application.

## Overview

The email verification system provides a secure way to verify user email addresses during the signup process. When a user tries to create an account, they must first verify their email address by entering a 6-digit code sent to their email.

## Features

- 6-digit numeric OTP generation
- Email delivery of verification codes
- 5-minute expiration for OTPs
- Resend capability with rate limiting (60-second cooldown)
- Clean UI with visual feedback
- Responsive design

## Implementation Details

### Components

1. **OtpInput Component**: A reusable component for entering the 6-digit OTP code
2. **EmailVerification Page**: Dedicated page for the verification process
3. **OTP Service**: Backend service to generate, store, and verify OTPs
4. **Email Service**: Service to send emails using EmailJS

### Flow

1. User fills out the signup form with their information
2. Upon form submission, an OTP is generated and sent to the user's email
3. User is redirected to the verification page
4. User enters the OTP received in their email
5. If verified successfully, the account is created and the user is redirected to login
6. If verification fails, user can request a new OTP after a cooldown period

## Configuration

To set up email verification, the following environment variables need to be configured:

```
# EmailJS Configuration
VITE_EMAILJS_USER_ID=your_emailjs_user_id
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_OTP_TEMPLATE_ID=your_emailjs_template_id_for_otp
VITE_EMAILJS_WELCOME_TEMPLATE_ID=your_emailjs_template_id_for_welcome
```

## EmailJS Template Requirements

Create an EmailJS template for OTP verification with the following placeholders:

- `{{name}}` - User's name
- `{{otp}}` - The OTP code
- `{{expiry}}` - Expiration time (usually 5 minutes)

## Testing

For testing purposes, you can view the OTP codes in the browser console. In production, this logging should be disabled.

## Security Considerations

- OTPs expire after 5 minutes
- OTPs are stored in memory (for demo purposes) - in production, this should use a secure database
- Rate limiting prevents brute force attempts
- OTPs are only valid for the specific email they were generated for

## Future Enhancements

- SMS verification option
- Integration with third-party verification providers
- Biometric verification options for mobile devices
- Enhanced rate limiting and IP-based restrictions