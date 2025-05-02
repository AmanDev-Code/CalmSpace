import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden">
          {/* Failure Header */}
          <div className="bg-red-50 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <XCircle className="h-12 w-12 text-red-600" />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-calm-gray mb-2">Payment Unsuccessful</h1>
            <p className="text-calm-gray/80">
              Your payment could not be processed. No charges have been made to your account.
            </p>
          </div>
          
          {/* Possible Reasons */}
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold text-calm-gray mb-4">Possible Reasons</h2>
            
            <div className="bg-calm-cream/30 p-4 rounded-md border border-calm-lavender/20 mb-6">
              <ul className="text-sm text-calm-gray/80 space-y-2">
                <li>• The payment was declined by your bank or financial institution</li>
                <li>• There was an interruption in the internet connection during payment</li>
                <li>• The payment session timed out</li>
                <li>• You chose to cancel the payment</li>
                <li>• There was a technical issue with the payment gateway</li>
              </ul>
            </div>
            
            <h3 className="font-medium text-calm-gray mb-3">What Would You Like to Do Next?</h3>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate('/checkout')}
                  className="bg-calm-lavender hover:bg-calm-blue text-white font-medium"
                >
                  Try Payment Again
                </Button>
                
                <Button 
                  onClick={() => navigate('/book')}
                  variant="outline"
                  className="border-calm-lavender text-calm-gray hover:bg-calm-lavender/10"
                >
                  Modify Booking Details
                </Button>
              </div>
              
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                className="text-calm-black hover:bg-calm-lavender/10 w-full sm:w-auto"
              >
                Return to Home
              </Button>
            </div>
            
            <div className="mt-8 text-sm text-calm-gray/70 border-t border-calm-gray/10 pt-4">
              <p>Need assistance? Please <a href="/contact" className="text-calm-blue hover:underline">contact our support team</a> for help with your booking or payment.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentFailure; 