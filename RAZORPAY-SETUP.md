# Razorpay Integration Setup for CalmSpace

This guide will help you set up Razorpay payment gateway integration for CalmSpace's booking system.

## Prerequisites

1. A Razorpay account (sign up at [razorpay.com](https://razorpay.com/))
2. Access to the Razorpay Dashboard
3. The CalmSpace codebase

## Step 1: Create a Razorpay Account

1. Sign up for a Razorpay account at [razorpay.com](https://razorpay.com/).
2. Complete the verification process to activate your account.
3. Razorpay offers both Test and Live modes - use Test mode during development.

## Step 2: Get Your API Keys

1. Log in to your Razorpay Dashboard.
2. Navigate to Settings > API Keys.
3. Generate a new pair of API keys (Key ID and Secret).
4. Keep these keys secure - they grant access to your Razorpay account.

## Step 3: Set Up Environment Variables

1. Create a `.env` file in the root directory of your project (or copy from `.env.example`).
2. Add your Razorpay API Key ID to the environment variables:

```
# Razorpay API Keys
VITE_RAZORPAY_KEY_ID=rzp_test_YourTestKey
```

3. Make sure to replace `rzp_test_YourTestKey` with your actual Razorpay test key ID.
4. Note: The environment variable is prefixed with `VITE_` to make it accessible in the client-side code when using Vite.

## Step 4: Test the Integration

1. Run your application in development mode.
2. Complete a booking form and proceed to checkout.
3. When you click "Proceed to Payment", the Razorpay payment modal should appear.
4. In test mode, you can use the following test card details:
   - Card Number: 4111 1111 1111 1111
   - Expiry: Any future date
   - CVV: Any 3-digit number
   - Name: Any name
   - 3D Secure Password: 1234

## Step 5: Verify Webhook Integration (Optional, for Production)

For production, you should set up webhooks for payment verification:

1. In the Razorpay Dashboard, go to Settings > Webhooks.
2. Add a new webhook with your server endpoint URL.
3. Select the events you want to listen for (payment.authorized, payment.failed, etc.).
4. Set a secret to verify webhook authenticity.

## Step 6: Going Live

When you're ready to accept real payments:

1. Complete Razorpay's verification process for live mode.
2. Update your `.env` file with your live API key:

```
VITE_RAZORPAY_KEY_ID=rzp_live_YourLiveKey
```

3. Set up proper error handling and logging for production.
4. Implement server-side verification of payments for added security.

## Important Notes

1. **Security**: Never expose your Razorpay Secret Key in client-side code.
2. **Environment Variables**: Make sure your `.env` file is in `.gitignore` to prevent accidental commits.
3. **Testing**: Always test thoroughly with Razorpay's test mode before going live.
4. **Compliance**: Ensure your checkout flow complies with payment card industry standards.
5. **Mobile Responsiveness**: Test the payment flow on various devices and screen sizes.

## Troubleshooting

If you encounter issues with the Razorpay integration:

1. **Payment Modal Not Appearing**: Check if the Razorpay script is loading correctly.
2. **Payment Failures**: Check the browser console for error messages from Razorpay.
3. **Environment Variables Not Working**: Make sure they are prefixed with `VITE_` for client-side access.
4. **Webhook Issues**: Verify your server endpoint is accessible and properly configured.
5. **Success Page Not Showing**: Check the browser console for errors and ensure sessionStorage is working.

For more detailed information, refer to the [Razorpay Documentation](https://razorpay.com/docs/). 