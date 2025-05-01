import React from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/HeroSection';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CreditCard, Users, Tag, BookOpen, Gift, DollarSign, BookMarked, LucideIcon, PieChart, ArrowRightCircle } from 'lucide-react';

// Map each revenue stream to its correct slug for the detail page
const getStreamSlug = (id: number, title: string) => {
  const slugMap: Record<number, string> = {
    1: "subscription-based-model",
    2: "pay-per-session-model",
    3: "corporate-wellness-programs",
    4: "workshops-webinars",
    5: "affiliate-marketing",
    6: "freemium-model",
    7: "sponsored-content-ads",
    8: "e-books-online-courses",
    9: "donations-crowdfunding",
    10: "licensing-platform"
  };
  
  return slugMap[id] || title.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-');
};

const Services = () => {
  // Services Offered based on the provided image
  const revenueStreams = [
    {
      id: 1,
      title: "Subscription-Based Model",
      icon: CreditCard,
      description: "Tiered plans for therapy sessions, self-help tools, and wellness resources.",
      pricing: [
        { name: "Basic", price: "₹500/month" },
        { name: "Premium", price: "₹1,500/month" },
        { name: "Family Plan", price: "₹3,000/month (4 users)" }
      ],
    },
    {
      id: 2,
      title: "Pay-Per-Session Model",
      icon: DollarSign,
      description: "One-time bookings for therapy sessions with licensed professionals.",
      pricing: [
        { name: "Standard Session", price: "₹1,000–₹2,500 per session" }
      ],
    },
    {
      id: 3,
      title: "Corporate Wellness Programs",
      icon: Users,
      description: "Customized mental health packages for companies (workshops, group therapy, etc.).",
      pricing: [
        { name: "Enterprise Package", price: "₹50,000–₹200,000 annually per company" }
      ],
    },
    {
      id: 4,
      title: "Workshops & Webinars",
      icon: BookOpen,
      description: "Paid online events on stress management, mindfulness, and coping strategies.",
      pricing: [
        { name: "Per Attendee", price: "₹500–₹2,000 per attendee" }
      ],
    },
    {
      id: 5,
      title: "Affiliate Marketing",
      icon: Tag,
      description: "Earn commissions by recommending trusted wellness products and services.",
      pricing: [
        { name: "Performance-based", price: "Commission-based" }
      ],
    },
    {
      id: 6,
      title: "Freemium Model",
      icon: PieChart,
      description: "Free basic resources; charge for premium features (personalized plans, analytics).",
      pricing: [
        { name: "Premium Features", price: "In-app purchases" }
      ],
    },
    {
      id: 7,
      title: "Sponsored Content & Ads",
      icon: ArrowRightCircle,
      description: "Allow brands to advertise on the platform (banners, sponsored articles).",
      pricing: [
        { name: "Campaign Pricing", price: "₹10,000–₹50,000 per campaign" }
      ],
    },
    {
      id: 8,
      title: "E-Books & Online Courses",
      icon: BookMarked,
      description: "Sell digital products like self-help e-books and guided meditation programs.",
      pricing: [
        { name: "Digital Products", price: "₹500–₹2,000 per product" }
      ],
    },
    {
      id: 9,
      title: "Donations & Crowdfunding",
      icon: Gift,
      description: "Accept donations to fund free therapy for underprivileged individuals.",
      pricing: [
        { name: "Voluntary Contribution", price: "User-determined" }
      ],
    },
    {
      id: 10,
      title: "Licensing Platform",
      icon: CreditCard,
      description: "License platform technology/content to other organizations or healthcare providers.",
      pricing: [
        { name: "Custom Licensing", price: "Fee-based" }
      ],
    }
  ];

  return (
    <Layout>
      <HeroSection
        title="Services Offered"
        subtitle="Explore our diverse monetization strategies designed to sustain our mental wellness platform while providing maximum value."
        imageSrc="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
      />

      {/* Services Offered Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {revenueStreams.map((stream) => (
              <Card key={stream.id} className="bg-white border-calm-blue/10 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-2 bg-calm-mint/20 rounded-full">
                    <stream.icon className="h-6 w-6 text-calm-gray" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-calm-gray">
                      {stream.id}. {stream.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow">
                  <CardDescription className="text-calm-gray/80 mb-4 text-base">
                    {stream.description}
                  </CardDescription>
                </CardContent>

                <CardFooter className="flex flex-col mt-auto">
                  <div className="w-full mb-4">
                    {stream.pricing.map((price, idx) => (
                      <div key={idx} className="flex justify-between items-center border-t border-gray-100 pt-2">
                        <span className="text-calm-gray font-medium">{price.name}:</span>
                        <span className="text-calm-blue font-semibold">{price.price}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={`/revenue-streams/${getStreamSlug(stream.id, stream.title)}`} className="w-full">
                    <Button className="w-full bg-calm-lavender hover:bg-calm-blue text-calm-gray">
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-calm-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-calm-gray mb-10 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-calm-gray mb-2">How do subscription plans work?</h3>
              <p className="text-calm-gray/80">
                Our subscription plans provide access to a range of mental wellness services at a fixed monthly cost. Each tier offers different levels of access to therapy sessions, resources, and tools. You can upgrade, downgrade, or cancel your subscription at any time.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-calm-gray mb-2">Are there any discounts for corporate clients?</h3>
              <p className="text-calm-gray/80">
                Yes, we offer customized packages for corporate clients with volume discounts. Our corporate wellness programs can be tailored to your company's specific needs and budget. Contact our corporate team for a personalized quote.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-calm-gray mb-2">How is my donation used?</h3>
              <p className="text-calm-gray/80">
                100% of donations go directly to providing free therapy services for those in need. We maintain complete transparency with quarterly reports that show how donations are allocated and the impact they make on our community.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-calm-gray mb-2">Can I try before I subscribe?</h3>
              <p className="text-calm-gray/80">
                Absolutely! We offer a 7-day free trial for all new users. This gives you access to our basic features and one trial session with a therapist, allowing you to experience the platform before committing to a subscription.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-calm-gray mb-2">What payment methods do you accept?</h3>
              <p className="text-calm-gray/80">
                We accept all major credit/debit cards, UPI payments, net banking, and digital wallets. All transactions are processed securely, and your payment information is never stored on our servers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-calm-blue">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore Our Services?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Whether you're an individual seeking support or a business looking for wellness solutions, we have options designed for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/book">
              <Button className="bg-white text-calm-blue hover:bg-calm-cream">
                Start Your Free Trial
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-transparent text-white border border-white hover:bg-white/10">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
