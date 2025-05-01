import React from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/HeroSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Layout>
      <HeroSection
        title="About CalmSpace"
        subtitle="Your sanctuary for mental clarity, emotional strength, and authentic self-discovery."
        imageSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
      />

      {/* Our Story Section */}
      <section className="py-16 bg-calm-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-calm-gray mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg text-calm-gray/80 max-w-none">
              <p className="mb-4">
                CalmSpace is your sanctuary for mental clarity, emotional strength, and self-discovery.
                We offer a warm, welcoming space where you can pause, reflect, and reconnect with yourself.
                Whether you're facing stress, burnout, or emotional overwhelm—we're here for you.
                Every voice is valued, and every journey is honored with care and compassion.
              </p>
              
              <p className="mb-4">
                Our mission is to help you feel safe, supported, and seen at every stage of healing.
                Through expert resources, compassionate listening, and proven wellness practices,
                we create an environment where growth feels gentle, natural, and empowering.
                You don't have to go through it alone—we walk with you toward peace.
              </p>
              
              <p className="mb-4">
                Inspired by rooted traditions and mindful innovation, CalmSpace blends the old and new.
                We draw from ancient wisdom and modern science to nurture emotional resilience.
                From guided sessions to community care, every touchpoint is designed to uplift.
                It's not just healing—it's becoming whole, from the inside out.
              </p>
              
              <p className="mb-0">
                At CalmSpace, your well-being comes first—always.
                We believe in a calmer world, one person at a time, beginning with you.
                Together, we're building a kinder, more conscious way to live and feel.
                Come as you are, stay as long as you need—your calm begins here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-calm-gray mb-12 text-center">Our Core Principles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-calm-blue shadow-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-calm-gray mb-4">Compassionate Care</h3>
              <p className="text-calm-gray/80">
                We honor every journey with genuine empathy and understanding, creating a safe space where healing and growth can naturally unfold.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#9595E9] shadow-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-calm-gray mb-4">Mindful Innovation</h3>
              <p className="text-calm-gray/80">
                We blend ancient wisdom with modern science, crafting thoughtful approaches that nurture emotional resilience and authentic well-being.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#6DCFD6] shadow-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-calm-gray mb-4">Inclusive Support</h3>
              <p className="text-calm-gray/80">
                We create an accessible environment where everyone feels valued, supported, and seen at every stage of their unique wellness journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-calm-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-calm-gray mb-6 text-center">Our Team</h2>
          <p className="text-lg text-calm-gray/80 mb-10 text-center max-w-3xl mx-auto">
            Meet our dedicated team of mental wellness professionals committed to your wellbeing journey.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Team Member 1 - Akanksha */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 h-full flex flex-col">
              <div className="flex justify-center pt-8 pb-4">
                <div className="relative w-40 h-40 overflow-hidden rounded-full border-4 border-calm-blue/20">
                  <img
                    src="/assets/ak.jpg"
                    alt="Akanksha"
                    className="absolute w-full h-full object-cover object-center transition-transform hover:scale-110 duration-500"
                  />
                </div>
              </div>
              <div className="p-5 flex-grow text-center">
                <h3 className="text-lg font-bold text-calm-gray">Divya Akanksha</h3>
                <p className="text-calm-blue font-medium text-sm mb-3">Content Specialist</p>
                <p className="text-calm-gray/80 text-sm">
                  Creates engaging and informative mental wellness content that resonates with our audience. Skilled in translating complex concepts into accessible, compassionate resources.
                </p>
              </div>
            </div>
            
            {/* Team Member 2 - Neha */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 h-full flex flex-col">
              <div className="flex justify-center pt-8 pb-4">
                <div className="relative w-40 h-40 overflow-hidden rounded-full border-4 border-[#6DCFD6]/20">
                  <img
                    src="/assets/neha.jpg"
                    alt="Neha"
                    className="absolute w-full h-full object-cover object-center transition-transform hover:scale-110 duration-500"
                  />
                </div>
              </div>
              <div className="p-5 flex-grow text-center">
                <h3 className="text-lg font-bold text-calm-gray">Subha Laxmi</h3>
                <p className="text-calm-blue font-medium text-sm mb-3">Partnership Manager</p>
                <p className="text-calm-gray/80 text-sm">
                  Builds meaningful connections with wellness organizations and mental health advocates. Creates collaborative opportunities that expand our supportive community and resources.
                </p>
              </div>
            </div>
            {/* Team Member 3 - Bushan */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 h-full flex flex-col">
              <div className="flex justify-center pt-8 pb-4">
                <div className="relative w-40 h-40 overflow-hidden rounded-full border-4 border-[#9595E9]/20">
                  <img
                    src="/assets/Bushan.jpg"
                    alt="Bushan"
                    className="absolute w-full h-full object-cover object-center transition-transform hover:scale-110 duration-500"
                  />
                </div>
              </div>
              <div className="p-5 flex-grow text-center">
                <h3 className="text-lg font-bold text-calm-gray">Bushan Ravindran</h3>
                <p className="text-calm-blue font-medium text-sm mb-3">SEO Specialist</p>
                <p className="text-calm-gray/80 text-sm">
                  Ensures our mental wellness resources reach those who need them most through strategic optimization. Dedicated to making emotional support accessible through enhanced online visibility.
                </p>
              </div>
            </div>
            

            {/* Team Member 4 - Aishwarya */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 h-full flex flex-col">
              <div className="flex justify-center pt-8 pb-4">
                <div className="relative w-40 h-40 overflow-hidden rounded-full border-4 border-calm-lavender/20">
                  <img
                    src="/assets/aish.jpg"
                    alt="Aishwarya"
                    className="absolute w-full h-full object-cover object-center transition-transform hover:scale-110 duration-500"
                  />
                </div>
              </div>
              <div className="p-5 flex-grow text-center">
                <h3 className="text-lg font-bold text-calm-gray">Aishwarya Laneesan</h3>
                <p className="text-calm-blue font-medium text-sm mb-3">Customer Support Specialist</p>
                <p className="text-calm-gray/80 text-sm">
                  Provides compassionate and responsive assistance to everyone seeking mental wellness support. Dedicated to creating a safe, welcoming experience for all CalmSpace visitors.
                </p>
              </div>
            </div>

            {/* Team Member 5 - Kevin */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 h-full flex flex-col">
              <div className="flex justify-center pt-8 pb-4">
                <div className="relative w-40 h-40 overflow-hidden rounded-full border-4 border-calm-blue/20">
                  <img
                    src="/assets/kevin.jpg"
                    alt="Kevin"
                    className="absolute w-full h-full object-cover object-center transition-transform hover:scale-110 duration-500"
                  />
                </div>
              </div>
              <div className="p-5 flex-grow text-center">
                <h3 className="text-lg font-bold text-calm-gray">Kevin Mario</h3>
                <p className="text-calm-blue font-medium text-sm mb-3">Community Manager</p>
                <p className="text-calm-gray/80 text-sm">
                  Fosters a supportive and engaging environment for our mental wellness community. Facilitates meaningful connections and ensures every member feels heard and valued.
                </p>
              </div>
            </div>

            {/* Team Member 6 - Samrat */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 h-full flex flex-col">
              <div className="flex justify-center pt-8 pb-4">
                <div className="relative w-40 h-40 overflow-hidden rounded-full border-4 border-[#9595E9]/20">
                  <img
                    src="/assets/samrat.jpg"
                    alt="Samrat"
                    className="absolute w-full h-full object-cover object-center transition-transform hover:scale-110 duration-500"
                  />
                </div>
              </div>
              <div className="p-5 flex-grow text-center">
                <h3 className="text-lg font-bold text-calm-gray">Samrat Roy</h3>
                <p className="text-calm-blue font-medium text-sm mb-3">Marketing Coordinator</p>
                <p className="text-calm-gray/80 text-sm">
                  Develops thoughtful campaigns that spread awareness about mental wellness resources. Combines creativity and compassion to reach those who can benefit from CalmSpace's supportive environment.
                </p>
              </div>
            </div>
          </div>

          {/* Team CTA Section */}
          <div className="mt-12 text-center">
            <p className="text-lg text-calm-gray/80 mb-6 max-w-2xl mx-auto">
              Our compassionate team is here to walk with you toward peace and well-being, every step of the way.
            </p>
            <Link to="/book">
              <Button className="bg-calm-lavender hover:bg-calm-blue text-calm-gray font-medium transition-colors">
                Begin Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications & Accreditations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-calm-gray mb-12 text-center">Our Accreditations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="h-24 w-32 bg-white shadow-sm rounded-lg flex items-center justify-center mb-4 p-3 border border-gray-100">
                <img 
                  src="https://indianpsychiatricsociety.org/wp-content/uploads/2019/12/IPS-logo-only-small.png" 
                  alt="Indian Psychiatric Association" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="text-sm text-center font-medium text-calm-gray">Indian Psychiatric Association</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-24 w-32 bg-white shadow-sm rounded-lg flex items-center justify-center mb-4 p-3 border border-gray-100">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Nimhans_logo.png/250px-Nimhans_logo.png" 
                  alt="NIMHANS" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="text-sm text-center font-medium text-calm-gray">NIMHANS Certified</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-24 w-32 bg-white shadow-sm rounded-lg flex items-center justify-center mb-4 p-3 border border-gray-100">
                <img 
                  src="https://i0.wp.com/iacp.in/wp-content/uploads/2022/01/Copy-of-Add-a-subheading-1.png?fit=500%2C500&ssl=1" 
                  alt="IACP" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="text-sm text-center font-medium text-calm-gray">Indian Association of Clinical Psychologists</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-24 w-32 bg-white shadow-sm rounded-lg flex items-center justify-center mb-4 p-3 border border-gray-100">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/7/78/Rehabilitation_Council_of_India_logo.png" 
                  alt="RCI" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="text-sm text-center font-medium text-calm-gray">Rehabilitation Council of India</span>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default About;
