
import React from 'react';
import { Layout } from '@/components/Layout';
import { ContactForm } from '@/components/ContactForm';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-calm-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Contact Us</h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            We're here to help. Reach out with any questions about our services or to schedule an appointment.
          </p>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Contact Form */}
            <div className="w-full lg:w-2/3">
              <Card className="border-calm-blue/10 shadow-md">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Send Us a Message</h2>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Information */}
            <div className="w-full lg:w-1/3">
              {/* Office Information */}
              <Card className="border-calm-blue/10 shadow-sm mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Our Office</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-calm-blue mr-3 mt-1" />
                      <div>
                        <p className="text-calm-gray">44/2/8/5, Mylasandra Rd, next to Eternity Ecstasy, Suraksha nagar, Yelenahalli, Akshayanagar,  </p>
                        <p className="text-calm-gray"> Bengaluru, Karnataka 560068</p>
                        <p className="text-calm-gray"></p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-calm-blue mr-3" />
                      <p className="text-calm-gray">+91 6203789409</p>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-calm-blue mr-3" />
                      <p className="text-calm-gray">contact@calmspace.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Office Hours */}
              <Card className="border-calm-blue/10 shadow-sm mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Office Hours</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-calm-gray">Monday - Friday</span>
                      <span className="text-calm-gray">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-calm-gray">Saturday</span>
                      <span className="text-calm-gray">10:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-calm-gray">Sunday</span>
                      <span className="text-calm-gray">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Emergency Contact */}
              <Card className="bg-calm-lavender/10 border-calm-lavender/20 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Emergency Resources</h3>
                  <p className="text-calm-gray/80 mb-4">
                    If you're experiencing a mental health emergency, please use these resources for immediate support:
                  </p>
                  <div className="space-y-2">
                    <p className="text-calm-gray"><strong>NIMHANS Mental Health Helpline:</strong> 080-26995000</p>
                    <p className="text-calm-gray"><strong>Parivarthan Counselling Helpline:</strong> 080-65333323</p>
                    <p className="text-calm-gray"><strong>Emergency Services:</strong> 108</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Updated with Bangalore reference */}
      <section className="py-16 bg-calm-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Find Us</h2>
          <div className="w-full h-96 bg-calm-blue/10 rounded-lg flex items-center justify-center overflow-hidden">
            <img 
              src="/assets/image.png" 
              alt="Map showing our Bangalore location" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute flex flex-col items-center">
              <MapPin className="h-10 w-10 text-red-500" />
              <p className="text-slate-800 text-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-md">
                123 Wellness Avenue, Koramangala<br />
                <span className="text-sm">Bangalore, Karnataka 560034</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
