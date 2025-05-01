
import React from 'react';
import { Layout } from '@/components/Layout';
import { EnquiryForm } from '@/components/EnquiryForm';
import { Card, CardContent } from '@/components/ui/card';

const Enquiry = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-calm-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-calm-gray mb-4">Service Enquiry</h1>
          <p className="text-lg text-calm-gray/80 max-w-2xl mx-auto">
            Interested in our services? Fill out this form and we'll contact you with more information.
          </p>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Enquiry Form */}
            <div className="w-full lg:w-2/3">
              <Card className="border-calm-blue/10 shadow-md">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-calm-gray mb-6">Tell Us About Your Interest</h2>
                  <EnquiryForm />
                </CardContent>
              </Card>
            </div>
            
            {/* Additional Information */}
            <div className="w-full lg:w-1/3">
              {/* What Happens Next */}
              <Card className="border-calm-blue/10 shadow-sm mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-calm-gray mb-4">What Happens Next?</h3>
                  <ol className="space-y-4">
                    <li className="flex">
                      <span className="bg-calm-mint/50 text-calm-gray rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 font-semibold">1</span>
                      <p className="text-calm-gray/80">
                        We'll review your enquiry and match you with the most suitable therapist or service.
                      </p>
                    </li>
                    <li className="flex">
                      <span className="bg-calm-mint/50 text-calm-gray rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 font-semibold">2</span>
                      <p className="text-calm-gray/80">
                        You'll receive a confirmation email immediately after submitting this form.
                      </p>
                    </li>
                    <li className="flex">
                      <span className="bg-calm-mint/50 text-calm-gray rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 font-semibold">3</span>
                      <p className="text-calm-gray/80">
                        A member of our team will contact you within 24-48 hours to discuss your needs in more detail.
                      </p>
                    </li>
                    <li className="flex">
                      <span className="bg-calm-mint/50 text-calm-gray rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 font-semibold">4</span>
                      <p className="text-calm-gray/80">
                        We'll provide personalized recommendations and guide you through the next steps.
                      </p>
                    </li>
                  </ol>
                </CardContent>
              </Card>
              
              {/* Testimonials */}
              <Card className="border-calm-blue/10 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-calm-gray mb-4">Client Experiences</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="italic text-calm-gray/80 mb-2">
                        "The team at CalmSpace made the initial process so easy and comfortable. They really took the time to understand what I needed."
                      </p>
                      <p className="text-right text-calm-gray font-medium">— Jamie L.</p>
                    </div>
                    
                    <div>
                      <p className="italic text-calm-gray/80 mb-2">
                        "I was nervous about reaching out, but the response was so warm and non-judgmental. I felt supported from the very first contact."
                      </p>
                      <p className="text-right text-calm-gray font-medium">— Michael K.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Enquiry;
