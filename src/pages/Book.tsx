import React from 'react';
import { Layout } from '@/components/Layout';
import { BookingForm } from '@/components/BookingForm';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

const Book = () => {
  return (
    <Layout>
      {/* Hero Section with Quote */}
      <section className="bg-calm-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Book a Session</h1>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <div className="text-calm-blue mb-4">
                <Heart className="h-8 w-8 mx-auto" />
              </div>
              <p className="text-xl italic text-slate-800 mb-2">
                "You are not alone. Help is just a click away."
              </p>
              <p className="text-slate-700/70">
                Taking the first step toward healing is an act of courage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main Content - Booking Form */}
            <div className="w-full lg:w-2/3">
              <Card className="border-calm-blue/10 shadow-md">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Schedule Your Appointment</h2>
                  <BookingForm />
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar with Information */}
            <div className="w-full lg:w-1/3">
              {/* What to Expect */}
              <Card className="border-calm-blue/10 shadow-sm mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">What to Expect</h3>
                  <ul className="space-y-3 text-calm-gray/80">
                    <li className="flex items-start">
                      <span className="bg-calm-mint/30 text-calm-blue rounded-full p-1 mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      <span>After submitting your request, we'll respond within 24 hours to confirm your appointment.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-calm-mint/30 text-calm-blue rounded-full p-1 mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      <span>Initial sessions typically last 50-60 minutes and focus on understanding your needs and goals.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-calm-mint/30 text-calm-blue rounded-full p-1 mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      <span>Sessions can take place in-person at our Bangalore office or via secure video conferencing.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              {/* Pricing Information - Updated with INR */}
              <Card className="border-calm-blue/10 shadow-sm mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Service Fees</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-calm-blue/10">
                      <span className="text-calm-gray">Subscription-Based Model</span>
                      <div className="text-right">
                        <span className="font-semibold text-calm-gray block">₹500 - ₹3,000</span>
                        <span className="text-xs text-calm-gray/70">per month</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-calm-blue/10">
                      <span className="text-calm-gray">Pay-Per-Session Model</span>
                      <div className="text-right">
                        <span className="font-semibold text-calm-gray">₹1,000 - ₹2,500</span>
                        <span className="text-xs text-calm-gray/70 block">per session</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-calm-blue/10">
                      <span className="text-calm-gray">Corporate Wellness</span>
                      <div className="text-right">
                        <span className="font-semibold text-calm-gray">₹50,000 - ₹200,000</span>
                        <span className="text-xs text-calm-gray/70 block">annually per company</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-calm-blue/10">
                      <span className="text-calm-gray">Workshops & Webinars</span>
                      <div className="text-right">
                        <span className="font-semibold text-calm-gray">₹500 - ₹2,000</span>
                        <span className="text-xs text-calm-gray/70 block">per attendee</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-calm-blue/10">
                      <span className="text-calm-gray">Affiliate Marketing</span>
                      <span className="font-semibold text-calm-gray">Commission-based</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-calm-blue/10">
                      <span className="text-calm-gray">Freemium Model</span>
                      <span className="font-semibold text-calm-gray">In-app purchases</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-calm-blue/10">
                      <span className="text-calm-gray">Sponsored Content</span>
                      <div className="text-right">
                        <span className="font-semibold text-calm-gray">₹10,000 - ₹50,000</span>
                        <span className="text-xs text-calm-gray/70 block">per campaign</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-calm-blue/10">
                      <span className="text-calm-gray">E-Books & Courses</span>
                      <div className="text-right">
                        <span className="font-semibold text-calm-gray">₹500 - ₹2,000</span>
                        <span className="text-xs text-calm-gray/70 block">per product</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-calm-blue/10">
                      <span className="text-calm-gray">Donations</span>
                      <span className="font-semibold text-calm-gray">User-determined</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-calm-gray">Licensing Platform</span>
                      <span className="font-semibold text-calm-gray">Fee-based</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-calm-gray/70">
                    We offer flexible payment options and customized pricing for specific needs. Contact us for details.
                  </p>
                </CardContent>
              </Card>
              
              {/* Insurance - Updated with Indian providers */}
              <Card className="border-calm-blue/10 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Insurance</h3>
                  <p className="text-calm-gray/80 mb-4">
                    We currently accept the following insurance providers:
                  </p>
                  <ul className="space-y-1 text-calm-gray/80">
                    <li>HDFC ERGO Health Insurance</li>
                    <li>Star Health Insurance</li>
                    <li>Max Bupa Health Insurance</li>
                    <li>ICICI Lombard</li>
                    <li>Religare Health Insurance</li>
                  </ul>
                  <p className="mt-4 text-sm text-calm-gray/70">
                    If you don't see your insurance listed, please contact us to discuss options.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Book;
