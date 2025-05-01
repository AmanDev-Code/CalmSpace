import React from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/HeroSection';
import { ServiceCard } from '@/components/ServiceCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { PublicationsMarquee } from '@/components/PublicationsMarquee';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, Book, Calendar, MessageSquare, Star, UserRound, BadgeIndianRupee, DollarSign, BookOpen, Users, CreditCard } from 'lucide-react';

const Home = () => {
  const services = [
    {
      title: 'Subscription-Based Model',
      description: 'Tiered plans for therapy sessions, self-help tools, and wellness resources.',
      icon: CreditCard
    },
    {
      title: 'Pay-Per-Session Model',
      description: 'One-time bookings for therapy sessions with licensed professionals.',
      icon: DollarSign
    },
    {
      title: 'Workshops & Webinars',
      description: 'Paid online events on stress management, mindfulness, and coping strategies.',
      icon: BookOpen
    },
    {
      title: 'Corporate Wellness Programs',
      description: 'Customized mental health packages for companies (workshops, group therapy, etc.).',
      icon: Users
    }
  ];

  const testimonials = [
    {
      quote: "Working with CalmSpace has transformed my approach to stress and anxiety. I've learned techniques that help me every day.",
      author: "Priya Sharma",
      role: "Client for 6 months"
    },
    {
      quote: "The therapists at CalmSpace create such a warm, non-judgmental space. I feel heard and supported in every session.",
      author: "Rahul Kumar",
      role: "Client for 1 year"
    },
    {
      quote: "After struggling for years, I finally found the help I needed. The online resources complement the therapy perfectly.",
      author: "Anjali Patel",
      role: "Client for 3 months"
    }
  ];

  return (
    <Layout>
      <HeroSection
        title="Find peace within. One step at a time."
        subtitle="Professional mental wellness support for your journey to better emotional health and personal growth."
        buttonText="Book a Session"
        buttonLink="/book"
      />

      {/* Key Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-calm-gray mb-4">Why Choose CalmSpace?</h2>
            <p className="text-lg text-calm-gray/80 max-w-2xl mx-auto">
              We're committed to providing exceptional mental wellness care through our unique approach.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg border border-calm-blue/20 shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-calm-blue shadow-md rounded-full flex items-center justify-center mb-5">
                <UserRound className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-calm-gray mb-3">Expert Therapists</h3>
              <p className="text-calm-gray/90">
                Our team consists of highly qualified professionals with specialized training in various therapy approaches.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg border border-calm-lavender/30 shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-[#9595E9] shadow-md rounded-full flex items-center justify-center mb-5">
                <BadgeIndianRupee className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-calm-gray mb-3">Affordable Care</h3>
              <p className="text-calm-gray/90">
                We offer flexible payment options and sliding scale fees to make mental healthcare accessible.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg border border-calm-mint/30 shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-[#6DCFD6] shadow-md rounded-full flex items-center justify-center mb-5">
                <Calendar className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-calm-gray mb-3">Flexible Scheduling</h3>
              <p className="text-calm-gray/90">
                Choose between in-person or online sessions at times that work with your busy schedule.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg border border-calm-blue/20 shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-[#F08080] shadow-md rounded-full flex items-center justify-center mb-5">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-calm-gray mb-3">Holistic Approach</h3>
              <p className="text-calm-gray/90">
                We address mental, emotional, and physical aspects of wellness for complete healing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-calm-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-calm-gray mb-4">How We Can Help</h2>
            <p className="text-lg text-calm-gray/80 max-w-2xl mx-auto">
              Our range of mental wellness services are designed to support you through life's challenges with compassion and expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/services">
              <Button className="bg-calm-lavender hover:bg-calm-blue text-calm-gray">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section - New */}
      <section className="py-16 bg-calm-blue relative z-0">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
              <p className="text-white/80">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">2+</div>
              <p className="text-white/80">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">7</div>
              <p className="text-white/80">Therapists</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <p className="text-white/80">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
                alt="Peaceful mountain view"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
                style={{ maxHeight: '500px' }}
              />
            </div>
            
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-calm-gray mb-6">Our Approach to Mental Wellness</h2>
              <p className="text-calm-gray/80 mb-6">
                At CalmSpace, we believe in a holistic approach to mental health. Our experienced therapists work with you to create a personalized path to wellness, drawing from evidence-based practices and compassionate care.
              </p>
              <p className="text-calm-gray/80 mb-8">
                Whether you're dealing with anxiety, depression, relationship issues, or simply seeking personal growth, we provide a safe, nurturing environment for your journey.
              </p>
              <Link to="/about">
                <Button className="bg-calm-blue hover:opacity-90 text-white">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - New */}
      <section className="py-16 bg-calm-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-calm-gray mb-4">How It Works</h2>
            <p className="text-lg text-calm-gray/80 max-w-2xl mx-auto">
              Your journey to better mental health is just four simple steps away
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center h-full">
                <div className="w-12 h-12 bg-calm-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="text-xl font-bold text-calm-gray mb-3">Book a Session</h3>
                <p className="text-calm-gray/80">
                  Fill out our simple booking form to schedule your first appointment.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 left-full w-8 h-2 bg-calm-blue/30 -translate-y-1/2 -ml-4"></div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center h-full">
                <div className="w-12 h-12 bg-calm-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="text-xl font-bold text-calm-gray mb-3">Initial Assessment</h3>
                <p className="text-calm-gray/80">
                  Meet with a therapist who will understand your needs and create a personalized plan.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 left-full w-8 h-2 bg-calm-blue/30 -translate-y-1/2 -ml-4"></div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center h-full">
                <div className="w-12 h-12 bg-calm-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="text-xl font-bold text-calm-gray mb-3">Regular Sessions</h3>
                <p className="text-calm-gray/80">
                  Attend therapy sessions and learn practical tools to improve your mental wellbeing.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 left-full w-8 h-2 bg-calm-blue/30 -translate-y-1/2 -ml-4"></div>
            </div>
            
            <div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center h-full">
                <div className="w-12 h-12 bg-calm-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                <h3 className="text-xl font-bold text-calm-gray mb-3">Growth & Healing</h3>
                <p className="text-calm-gray/80">
                  Experience transformative changes as you implement new skills in your daily life.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/book">
              <Button className="bg-calm-lavender hover:bg-calm-blue text-calm-gray">
                Start Your Journey Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-calm-mint/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-calm-gray mb-4">Client Stories</h2>
            <p className="text-lg text-calm-gray/80 max-w-2xl mx-auto">
              Hear from people who have transformed their lives through our support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured In Section - Updated with marquee */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-calm-gray text-center mb-2">Featured In</h2>
          <p className="text-calm-gray/60 text-center max-w-lg mx-auto text-sm mb-8">
            Our mental wellness experts have been featured in leading publications across India
          </p>
        </div>
        <PublicationsMarquee />
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-calm-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-calm-gray mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-lg text-calm-gray/80 mb-8 max-w-2xl mx-auto">
            Take the first step toward better mental health today. Our compassionate team is here to support you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book">
              <Button className="bg-calm-lavender hover:bg-calm-blue text-calm-gray text-lg px-8 py-6">
                Book a Session
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-calm-gray/30 text-calm-gray hover:bg-white/20 text-lg px-8 py-6">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
