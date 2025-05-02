import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface PaymentData {
  bookingData: {
    name: string;
    email: string;
    phone: string;
    serviceType: string;
    therapistPreference: string;
    concerns: string;
    appointmentDate: string;
    paymentId: string;
    amountPaid: number;
    discountApplied: number;
    paymentStatus: string;
  };
  paymentId: string;
}

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  useEffect(() => {
    // Try to get data from sessionStorage first
    let storedData = sessionStorage.getItem('paymentSuccess');
    console.log('PaymentSuccess: sessionStorage data:', storedData);
    
    // If not found in sessionStorage, try localStorage
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
      // Instead of redirecting, show a message
      setPaymentData(null);
      return;
    }

    try {
      const parsedData = JSON.parse(storedData) as PaymentData;
      console.log('PaymentSuccess: parsed data:', parsedData);
      setPaymentData(parsedData);
      
      // Clean up booking data
      sessionStorage.removeItem('bookingData');
    } catch (error) {
      console.error('PaymentSuccess: Error parsing payment data:', error);
      setPaymentData(null);
    }
  }, [navigate]);

  // Simplified version of the component
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg p-8">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
            
            {paymentData ? (
              <div>
                <p className="mb-4">Your booking has been confirmed.</p>
                <p className="mb-2">Transaction ID: {paymentData.paymentId}</p>
                <p className="mb-4">Amount: ₹{paymentData.bookingData.amountPaid.toFixed(2)}</p>
                
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-calm-lavender hover:bg-calm-blue text-black"
                >
                  Return to Home
                </Button>
              </div>
            ) : (
              <div>
                <p className="mb-4">Processing your payment confirmation...</p>
                <p className="text-sm text-gray-500">
                  If you were charged but don't see confirmation, please contact support.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess; 