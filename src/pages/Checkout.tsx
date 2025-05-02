import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { submitBookingData } from '@/lib/formUtils';
import { initEmailJS } from '@/lib/emailjs';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/lib/emailjs';

interface BookingData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  therapistPreference: string;
  concerns: string;
  appointmentDate: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [basePrice, setBasePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Initialize EmailJS
    console.log('Initializing EmailJS in Checkout component');
    initEmailJS();
    
    // Test EmailJS connection - just for debugging
    const testEmailConnection = async () => {
      try {
        console.log('Testing EmailJS connection...');
        // Simple test to see if EmailJS is working
        const testResponse = await emailjs.send(
          EMAILJS_CONFIG.bookingConfirmation.serviceId,
          EMAILJS_CONFIG.bookingConfirmation.templateId,
          {
            name: 'Test User',
            email: 'test@example.com',
            phone: '1234567890',
            service_type: 'Test Service',
            appointment_date: 'Test Date',
            therapist: 'Test Therapist',
            payment_id: 'test_payment_123',
            amount_paid: '₹1500.00',
            discount_applied: '₹0.00',
            concerns: 'Test concerns'
          }
        );
        console.log('Test email response:', testResponse);
      } catch (error) {
        console.error('Test email failed:', error);
      }
    };
    
    // Uncomment the next line to run a test email
    // testEmailConnection(); 
    
    // Retrieve booking data from sessionStorage
    const storedData = sessionStorage.getItem('bookingData');
    if (!storedData) {
      navigate('/book');
      return;
    }

    try {
      const parsedData = JSON.parse(storedData) as BookingData;
      setBookingData(parsedData);
      
      // Set the base price based on the service type
      let price = 0;
      switch(parsedData.serviceType) {
        case 'subscription-based-model':
          price = 1500; // Premium monthly plan
          break;
        case 'pay-per-session-model':
          price = 1500; // Standard session
          break;
        case 'corporate-wellness-programs':
          price = 5000; // Per employee
          break;
        case 'workshops-webinars':
          price = 1000; // Per attendee
          break;
        case 'e-books-online-courses':
          price = 1200; // Digital product
          break;
        default:
          price = 1500; // Default price
      }
      
      setBasePrice(price);
      setTotalPrice(price);
    } catch (error) {
      console.error('Error parsing booking data:', error);
      navigate('/book');
    }
  }, [navigate]);

  const applyPromoCode = () => {
    if (!promoCode) return;
    
    // Mock promo code validation
    const validPromoCodes = {
      'WELCOME10': 10,
      'CALM20': 20,
      'FIRSTTIME15': 15
    };
    
    const codeUpperCase = promoCode.toUpperCase();
    if (codeUpperCase in validPromoCodes) {
      const discountPercent = validPromoCodes[codeUpperCase as keyof typeof validPromoCodes];
      const discountAmount = (basePrice * discountPercent) / 100;
      setPromoDiscount(discountAmount);
      setTotalPrice(basePrice - discountAmount);
      setPromoApplied(true);
      toast({ title: 'Promo code applied!', description: `${discountPercent}% discount applied to your booking.` });
    } else {
      toast({ 
        variant: 'destructive', 
        title: 'Invalid promo code', 
        description: 'The promo code you entered is invalid or expired.'
      });
    }
  };

  const handlePayment = async () => {
    if (!bookingData) return;
    
    setIsLoading(true);
    
    try {
      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
      
      script.onload = () => {
        // Create Razorpay options
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || '', // Use environment variable or fallback
          amount: totalPrice * 100, // Amount in paise
          currency: 'INR',
          name: 'CalmSpace',
          description: `Booking for ${bookingData.serviceType.replace(/-/g, ' ')}`,
          image: '/logo.svg', // Replace with your logo URL
          prefill: {
            name: bookingData.name,
            email: bookingData.email,
            contact: bookingData.phone
          },
          theme: {
            color: '#A288E3' // CalmSpace lavender color
          },
          handler: function(response: any) {
            // Handle successful payment
            handlePaymentSuccess(response);
          },
          modal: {
            ondismiss: function() {
              // When payment modal is dismissed/cancelled, navigate to failure page
              setIsLoading(false);
              navigate('/payment-failure');
            },
            escape: false, // Prevent closing by pressing ESC key
            backdropclose: false // Prevent closing by clicking outside
          },
          notes: {
            service_type: bookingData.serviceType,
            appointment_date: bookingData.appointmentDate
          }
        };
        
        // @ts-ignore - Razorpay is loaded dynamically
        const razorpay = new window.Razorpay(options);
        
        // Add event for payment failure
        razorpay.on('payment.failed', function(response: any){
          console.error('Payment failed:', response.error);
          setIsLoading(false);
          navigate('/payment-failure');
        });
        
        razorpay.open();
      };
      
      script.onerror = () => {
        toast({
          variant: 'destructive',
          title: 'Payment Error',
          description: 'Failed to load payment gateway. Please try again later.'
        });
        setIsLoading(false);
        navigate('/payment-failure');
      };
      
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast({
        variant: 'destructive',
        title: 'Payment Error',
        description: 'Failed to initialize payment. Please try again later.'
      });
      setIsLoading(false);
      navigate('/payment-failure');
    }
  };

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
      
      // Send confirmation email and navigate with a delay
      // This ensures storage operations complete before navigation
      setTimeout(async () => {
        try {
          console.log('Sending confirmation email...');
          const emailResponse = await submitBookingData(bookingWithPayment);
          console.log('Email response:', emailResponse);
          
          // Add a small additional delay after email is sent before navigating
          setTimeout(() => {
            console.log('Navigating to success page after email sent');
            navigate('/payment-success');
          }, 1000); // Wait an additional 1 second after email is sent
          
        } catch (emailError) {
          console.error('Email sending error:', emailError);
          console.log('Navigating to success page despite email error');
          navigate('/payment-success');
        }
      }, 1000); // Increased to 1000ms (1 second) to give more time for storage operations
      
    } catch (error) {
      console.error('Error processing payment:', error);
      setIsLoading(false);
      navigate('/payment-success');
    } finally {
      setIsLoading(false);
    }
  };

  const getServiceTypeDisplay = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getTherapistDisplay = (preference: string) => {
    switch(preference) {
      case 'dr-sharma': return 'Dr. Priya Sharma (Mindfulness Specialist)';
      case 'dr-mehta': return 'Dr. Rajiv Mehta (Sleep & Anxiety Expert)';
      case 'dr-das': return 'Dr. Priyanka Das (Workplace Wellness Consultant)';
      case 'dr-kapoor': return 'Dr. Arjun Kapoor (Depression & Public Health)';
      case 'dr-reddy': return 'Dr. Arjun Reddy (Digital Wellness Specialist)';
      case 'dr-patel': return 'Dr. Anjali Patel (Relationship Therapist)';
      case 'dr-krishnan': return 'Dr. Maya Krishnan (Burnout Prevention Expert)';
      case 'no-preference': return 'No Preference';
      default: return preference || 'No Preference';
    }
  };

  if (!bookingData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-calm-lavender" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-calm-gray mb-8">Checkout</h1>
          
          {/* Debug section - only visible in development */}
          {import.meta.env.DEV && (
            <div className="mb-6 p-4 border border-dashed border-red-300 bg-red-50 rounded-md">
              <h3 className="text-lg font-semibold text-red-600 mb-2">Debug Tools</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      console.log('Testing EmailJS connection...');
                      const testResponse = await emailjs.send(
                        EMAILJS_CONFIG.bookingConfirmation.serviceId,
                        EMAILJS_CONFIG.bookingConfirmation.templateId,
                        {
                          name: 'Test User',
                          email: 'test@example.com', // Replace with your email for testing
                          phone: '1234567890',
                          service_type: 'Test Service',
                          appointment_date: 'Test Date',
                          therapist: 'Test Therapist',
                          payment_id: 'test_payment_123',
                          amount_paid: '₹1500.00',
                          discount_applied: '₹0.00',
                          concerns: 'Test concerns'
                        }
                      );
                      console.log('Test email response:', testResponse);
                      toast({
                        title: 'Test Email Sent',
                        description: 'Check the console for details and your inbox for the email',
                      });
                    } catch (error) {
                      console.error('Test email failed:', error);
                      toast({
                        variant: 'destructive',
                        title: 'Test Email Failed',
                        description: 'Check the console for error details',
                      });
                    }
                  }}
                  className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-800 rounded-md"
                >
                  Send Test Email
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    console.log('EmailJS Config:', EMAILJS_CONFIG);
                    toast({
                      title: 'EmailJS Config',
                      description: 'Check the console for details',
                    });
                  }}
                  className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md"
                >
                  Log EmailJS Config
                </button>
              </div>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Booking Summary */}
            <div className="w-full md:w-7/12 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-calm-gray mb-4 pb-2 border-b border-calm-gray/10">Booking Summary</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-calm-gray/70">Service</p>
                  <p className="text-calm-gray font-medium">{getServiceTypeDisplay(bookingData.serviceType)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-calm-gray/70">Appointment Date</p>
                  <p className="text-calm-gray font-medium">{bookingData.appointmentDate}</p>
                </div>
                
                {bookingData.therapistPreference && (
                  <div>
                    <p className="text-sm text-calm-gray/70">Therapist Preference</p>
                    <p className="text-calm-gray font-medium">{getTherapistDisplay(bookingData.therapistPreference)}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-calm-gray/70">Contact Information</p>
                  <p className="text-calm-gray">{bookingData.name}</p>
                  <p className="text-calm-gray">{bookingData.email}</p>
                  <p className="text-calm-gray">{bookingData.phone}</p>
                </div>
                
                {bookingData.concerns && (
                  <div>
                    <p className="text-sm text-calm-gray/70">Additional Notes</p>
                    <p className="text-calm-gray text-sm">{bookingData.concerns}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Payment Details */}
            <div className="w-full md:w-5/12 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-calm-gray mb-4 pb-2 border-b border-calm-gray/10">Payment Details</h2>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  {/* Promo Code */}
                  <Label htmlFor="promoCode" className="text-calm-gray">Promo Code</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="promoCode"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      className="border-calm-gray/30 focus-visible:ring-calm-blue"
                    />
                    <Button 
                      onClick={applyPromoCode} 
                      disabled={promoApplied || !promoCode}
                      className="bg-calm-blue hover:bg-calm-lavender text-black"
                    >
                      Apply
                    </Button>
                  </div>
                  {promoApplied && (
                    <div className="flex items-center text-green-600 text-sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span>Promo code applied!</span>
                    </div>
                  )}
                </div>
                
                {/* Price Breakdown */}
                <div className="space-y-2 pt-2 border-t border-calm-gray/10">
                  <div className="flex justify-between text-calm-gray">
                    <span>Base Price</span>
                    <span>₹{basePrice.toFixed(2)}</span>
                  </div>
                  
                  {promoApplied && promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-calm-gray font-semibold text-lg pt-2 border-t border-calm-gray/10 mt-2">
                    <span>Total</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Checkout Button */}
                <Button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full bg-calm-lavender hover:bg-calm-blue text-black font-semibold py-6 mt-4"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Payment'
                  )}
                </Button>
                
                <div className="text-xs text-calm-gray/70 text-center mt-4">
                  <p>Secure payment powered by Razorpay</p>
                  <p className="mt-1">You will receive a confirmation email after successful payment</p>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/book')}
            className="text-calm-lavender hover:text-calm-blue text-sm mt-6 flex mx-auto"
          >
            &larr; Return to booking
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout; 