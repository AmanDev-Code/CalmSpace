# Checkout and Payment Flow Troubleshooting

This guide provides solutions for common issues with the checkout flow and payment success page in the CalmSpace booking system.

## Payment Success Page Not Showing

If payments are successful but the success page is not displaying correctly:

### 1. Check Browser Console

First, open your browser's developer tools (F12 or right-click > Inspect) and check the console for errors during the payment process.

### 2. Check Session Storage

The payment success page relies on data stored in sessionStorage:

1. After a successful payment but before navigating away, check if data is properly stored:
   ```javascript
   // In browser console
   console.log(sessionStorage.getItem('paymentSuccess'));
   ```
2. If this returns `null` or is missing data, there's an issue with data storage.

### 3. Fix Session Storage Issues

If sessionStorage isn't working properly:

```javascript
// Add this in src/pages/Checkout.tsx in the handlePaymentSuccess function
try {
  // Test sessionStorage
  sessionStorage.setItem('test', 'test');
  const testItem = sessionStorage.getItem('test');
  console.log('SessionStorage test:', testItem);
  sessionStorage.removeItem('test');
  
  // Store payment data with a try-catch
  try {
    sessionStorage.setItem('paymentSuccess', JSON.stringify(paymentSuccessData));
    console.log('Payment data stored successfully');
  } catch (storageError) {
    console.error('Error storing payment data:', storageError);
    // Alternative: use localStorage as fallback
    localStorage.setItem('paymentSuccess', JSON.stringify(paymentSuccessData));
  }
} catch (error) {
  console.error('Storage API error:', error);
}
```

### 4. Local Storage Fallback

If session storage isn't working, modify the PaymentSuccess.tsx component to check localStorage:

```javascript
// In PaymentSuccess.tsx useEffect hook
useEffect(() => {
  // Try sessionStorage first
  let storedData = sessionStorage.getItem('paymentSuccess');
  console.log('PaymentSuccess: sessionStorage data:', storedData);
  
  // If not in sessionStorage, try localStorage
  if (!storedData) {
    console.log('PaymentSuccess: Checking localStorage...');
    storedData = localStorage.getItem('paymentSuccess');
    console.log('PaymentSuccess: localStorage data:', storedData);
    
    if (storedData) {
      console.log('PaymentSuccess: Found data in localStorage');
      // Clean up from localStorage
      localStorage.removeItem('paymentSuccess');
    }
  } else {
    console.log('PaymentSuccess: Found data in sessionStorage');
    // Clean up from sessionStorage
    sessionStorage.removeItem('paymentSuccess');
  }
  
  // If no data found in either storage
  if (!storedData) {
    console.log('PaymentSuccess: No data found in any storage');
    // Show a message instead of redirecting
    setPaymentData(null);
    return;
  }
  
  // Rest of the code...
});
```

### 5. Navigation Issue Fix

If the page navigation is happening too quickly:

```javascript
// In Checkout.tsx
const handlePaymentSuccess = async (response: any) => {
  try {
    // Store data first
    sessionStorage.setItem('paymentSuccess', JSON.stringify({
      bookingData: bookingWithPayment,
      paymentId: response.razorpay_payment_id
    }));
    
    // Add a slight delay before navigation
    setTimeout(() => {
      navigate('/payment-success');
    }, 300);
    
    // Continue with email sending in background
    try {
      await submitBookingData(bookingWithPayment);
    } catch (emailError) {
      console.error('Email error:', emailError);
    }
  } catch (error) {
    console.error('Error:', error);
    // Still try to navigate
    navigate('/payment-success');
  }
};
```

## Email Confirmation Issues

If booking confirmation emails aren't being sent after successful payment:

### 1. Check EmailJS Initialization

Ensure that EmailJS is properly initialized:

```javascript
// In src/components/BookingForm.tsx or src/pages/Checkout.tsx
import { initEmailJS } from '@/lib/emailjs';

useEffect(() => {
  // Initialize EmailJS
  initEmailJS();
  console.log('EmailJS initialized');
}, []);
```

### 2. Debug Email Sending

Add detailed logging to track email sending:

```javascript
// In Checkout.tsx handlePaymentSuccess function
// Send confirmation email
try {
  console.log('Preparing to send confirmation email with data:', bookingWithPayment);
  
  // Add a slight delay to ensure storage operations complete first
  setTimeout(async () => {
    try {
      const emailResponse = await submitBookingData(bookingWithPayment);
      console.log('Email response:', emailResponse);
    } catch (delayedEmailError) {
      console.error('Delayed email sending error:', delayedEmailError);
    }
  }, 500);
} catch (emailError) {
  console.error('Email sending preparation error:', emailError);
}
```

### 3. Check Environment Variables

Verify that your environment variables are correctly set in `.env`:

```
VITE_EMAILJS_USER_ID=your_user_id_here
VITE_EMAILJS_SERVICE_ID_BOOKING=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID_BOOKING=your_booking_template_id_here
```

### 4. Verify Template Variables

Make sure the variables in your EmailJS template match exactly what's being sent from the code:

- For booking confirmation, check these variables:
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

## Storage and Email Combined Solution

For a robust solution that addresses both storage issues and email sending:

```javascript
// In src/pages/Checkout.tsx
const handlePaymentSuccess = async (response: any) => {
  try {
    console.log('Payment successful, response:', response);
    
    // Add payment details to booking data
    const bookingWithPayment = {
      ...bookingData,
      paymentId: response.razorpay_payment_id,
      amountPaid: totalPrice,
      discountApplied: promoDiscount,
      paymentStatus: 'completed'
    };
    
    console.log('bookingWithPayment:', bookingWithPayment);
    
    // Create payment success data object
    const paymentSuccessData = {
      bookingData: bookingWithPayment,
      paymentId: response.razorpay_payment_id
    };
    
    // Store data with fallback
    console.log('Attempting to store payment data...');
    try {
      sessionStorage.setItem('paymentSuccess', JSON.stringify(paymentSuccessData));
      console.log('Payment data stored in sessionStorage');
    } catch (storageError) {
      console.error('Error storing in sessionStorage:', storageError);
      try {
        localStorage.setItem('paymentSuccess', JSON.stringify(paymentSuccessData));
        console.log('Payment data stored in localStorage as fallback');
      } catch (localStorageError) {
        console.error('Error storing in localStorage:', localStorageError);
      }
    }
    
    // Send confirmation email with delay to ensure storage operations complete
    setTimeout(async () => {
      try {
        console.log('Sending confirmation email...');
        const emailResponse = await submitBookingData(bookingWithPayment);
        console.log('Email response:', emailResponse);
      } catch (emailError) {
        console.error('Delayed email sending error:', emailError);
      }
      
      // Navigate after both storage and email operations
      console.log('Navigating to success page');
      navigate('/payment-success');
    }, 500);
    
  } catch (error) {
    console.error('Error processing payment:', error);
    setIsLoading(false);
    navigate('/payment-success');
  } finally {
    setIsLoading(false);
  }
};
```

## Payment Modal Not Appearing

If the Razorpay payment modal isn't showing up:

1. Check if the Razorpay script is loading correctly:
   ```javascript
   // Add this to see if script loaded
   script.onload = () => {
     console.log('Razorpay script loaded successfully');
     // Rest of the code...
   };
   ```

2. Verify the API key is correct and accessible:
   ```javascript
   console.log('Using Razorpay key:', import.meta.env.VITE_RAZORPAY_KEY_ID || 'fallback_key');
   ```

3. If the script can't load, implement a fallback payment page.

## Debugging the Full Flow

To debug the entire checkout flow:

1. Add a debug parameter to track the process:
   ```javascript
   // In Checkout.tsx
   const [debugInfo, setDebugInfo] = useState([]);
   
   const logDebug = (message) => {
     console.log(message);
     setDebugInfo(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
   };
   
   // Use throughout the code
   logDebug('Payment initiated');
   ```

2. Add a hidden debug panel (development only):
   ```jsx
   {process.env.NODE_ENV === 'development' && (
     <div className="mt-8 p-4 bg-gray-100 rounded text-xs">
       <h4 className="font-bold">Debug Info:</h4>
       <pre>{debugInfo.join('\n')}</pre>
     </div>
   )}
   ```

## Quick Fixes

If you need immediate workarounds:

1. **Hardcoded Success Page**: Create a version of the success page that doesn't rely on sessionStorage.

2. **Local Data Storage**: Use localStorage instead of sessionStorage as it persists across page reloads.

3. **URL Parameters**: Pass minimal payment data via URL parameters:
   ```javascript
   navigate(`/payment-success?id=${response.razorpay_payment_id}&amount=${totalPrice}`);
   ```

4. **Disable Redirects**: If the issue persists, show success information on the checkout page instead of redirecting.

## Additional Resources

- [Razorpay Documentation](https://razorpay.com/docs/)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [React Router Documentation](https://reactrouter.com/en/main)