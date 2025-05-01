import React from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/HeroSection';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';

// Define the complete revenue stream data with expanded Indian context
const revenueStreamData = {
  "subscription-based-model": {
    id: 1,
    title: "Subscription-Based Model",
    heroImage: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2070",
    description: "Our tiered subscription plans provide ongoing access to therapy sessions, self-help tools, and wellness resources designed specifically for the Indian context.",
    fullDescription: `
      <p>The subscription model offers Indian users flexible access to mental wellness resources through affordable monthly plans. Understanding the diverse economic landscape of India, we've created tiered pricing that makes mental healthcare accessible across various income brackets.</p>
      
      <p>Our Basic plan at ₹500/month is designed for individuals seeking foundational support, while our Premium offering at ₹1,500/month includes priority scheduling and expanded resource access. For families, our ₹3,000/month plan supports up to 4 users, acknowledging the importance of family structures in Indian society.</p>
      
      <p>All subscription plans include culturally sensitive content that addresses unique stressors in the Indian context, from academic pressure and career expectations to family dynamics and urban living challenges. Our resources incorporate traditional wisdom alongside modern psychological approaches, creating a holistic approach to mental wellness that resonates with Indian values.</p>
    `,
    benefits: [
      "Consistent access to mental health support at predictable costs",
      "Culturally-adapted resources addressing uniquely Indian challenges",
      "Flexibility to upgrade or downgrade based on changing needs",
      "Family plans that honor the importance of collective well-being in Indian households",
      "Regular new content addressing seasonal stressors (exam periods, festivals, etc.)"
    ],
    pricingDetails: [
      { name: "Basic Plan", price: "₹500/month", features: ["Weekly guided meditation sessions", "Access to self-help library", "Monthly group workshops", "24/7 text-based support"] },
      { name: "Premium Plan", price: "₹1,500/month", features: ["Everything in Basic", "2 therapy sessions per month", "Personalized wellness plan", "Priority scheduling", "Progress tracking tools"] },
      { name: "Family Plan", price: "₹3,000/month", features: ["Access for up to 4 family members", "4 therapy sessions to share", "Family dynamics resources", "Joint and individual session options", "Family wellness challenges"] }
    ],
    indiaSpecific: "All our content is created with input from leading Indian mental health professionals who understand the unique cultural, social, and economic factors affecting mental health in India. We address region-specific challenges and incorporate traditional Indian wellness concepts alongside evidence-based modern approaches."
  },
  "pay-per-session-model": {
    id: 2,
    title: "Pay-Per-Session Model",
    heroImage: "https://images.unsplash.com/photo-1573497492026-cc1c2ba5a0c8?q=80&w=2070",
    description: "Flexible one-time bookings for therapy sessions with licensed Indian professionals who understand local contexts and challenges.",
    fullDescription: `
      <p>Our Pay-Per-Session model provides flexibility for users who prefer not to commit to a subscription. This approach particularly suits the Indian market, where many first-time therapy seekers want to experience professional mental health support without a long-term commitment.</p>
      
      <p>Sessions range from ₹1,000–₹2,500, based on therapist experience and specialization. This pricing structure was developed after extensive market research across major Indian cities and smaller towns, ensuring accessibility while maintaining quality of care.</p>
      
      <p>All therapists in our network are licensed Indian professionals with deep understanding of cultural contexts, family dynamics, and societal pressures unique to India. Many are bilingual or multilingual, offering sessions in Hindi, English, and regional languages to ensure comfort and clear communication.</p>
    `,
    benefits: [
      "No commitment required—pay only for sessions you need",
      "Choose from therapists who speak your preferred language (Hindi, English, and regional languages)",
      "Flexible scheduling that works around Indian work hours and family commitments",
      "Access to specialists in India-specific challenges like academic pressure, arranged marriages, joint family dynamics",
      "Option to try different therapists to find your best match"
    ],
    pricingDetails: [
      { name: "Standard Session (50 minutes)", price: "₹1,000–₹2,500", features: ["One-on-one therapy with licensed professional", "Post-session resource recommendations", "Session notes access", "Follow-up check-in"] }
    ],
    indiaSpecific: "Our network includes professionals trained at prestigious Indian institutions like NIMHANS and TISS, with expertise in issues affecting modern Indians, from work-life balance in tech hubs like Bangalore and Hyderabad to family pressures in more traditional communities. We offer sessions during hours that accommodate the Indian working schedule, including early morning and late evening slots."
  },
  "corporate-wellness-programs": {
    id: 3,
    title: "Corporate Wellness Programs",
    heroImage: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070",
    description: "Comprehensive mental health packages for Indian companies of all sizes, designed to enhance workplace wellbeing and productivity.",
    fullDescription: `
      <p>Our Corporate Wellness Programs are designed to address the unique mental health challenges facing the Indian workforce. From multinational corporations in major metros to growing startups and traditional businesses, we create customized mental wellness solutions that align with each organization's culture and needs.</p>
      
      <p>Packages range from ₹50,000 for smaller companies to ₹200,000+ annually for larger enterprises with comprehensive needs. These programs address India-specific workplace stressors such as extended work hours, complex hierarchical structures, and the blending of traditional and modern workplace expectations.</p>
      
      <p>We collaborate with HR departments to ensure programs align with existing employee benefit structures while introducing innovative approaches to mental wellness that reduce stigma and encourage participation across all levels of the organization.</p>
    `,
    benefits: [
      "Reduced employee absenteeism and improved productivity",
      "Customized workshops addressing India-specific workplace stressors",
      "Anonymous employee mental health assessments with cultural sensitivity",
      "Manager training for mental health awareness in the Indian workplace context",
      "Measurable outcomes with quarterly impact reports"
    ],
    pricingDetails: [
      { name: "Starter Package", price: "₹50,000–₹75,000 annually", features: ["Quarterly workshops", "Monthly webinars", "Basic resource library", "Crisis support line"] },
      { name: "Professional Package", price: "₹75,000–₹120,000 annually", features: ["Monthly workshops", "Bi-weekly webinars", "Expanded resource library", "Limited 1:1 sessions for employees", "Basic manager training"] },
      { name: "Enterprise Package", price: "₹120,000–₹200,000+ annually", features: ["Comprehensive wellness program", "Weekly events", "Complete resource access", "Dedicated account manager", "Advanced data analytics", "Customized content creation"] }
    ],
    indiaSpecific: "Our programs acknowledge the unique aspects of Indian corporate culture, including the importance of hierarchy, festival celebrations, and family responsibilities. We incorporate concepts from traditional Indian wellness practices alongside modern approaches, creating programs that resonate with both traditional and progressive Indian workplaces."
  },
  "workshops-webinars": {
    id: 4,
    title: "Workshops & Webinars",
    heroImage: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?q=80&w=2070",
    description: "Interactive online events focused on practical stress management, mindfulness, and coping strategies relevant to the Indian context.",
    fullDescription: `
      <p>Our workshops and webinars offer accessible, focused learning experiences on mental wellness topics particularly relevant to Indian audiences. Led by experienced facilitators who understand the Indian context, these events provide practical tools that participants can immediately apply to their daily lives.</p>
      
      <p>Priced between ₹500–₹2,000 per attendee, our events are designed to be accessible while delivering high-quality, actionable content. Topics range from managing family expectations and work pressure to incorporating traditional Indian mindfulness practices into modern lifestyles.</p>
      
      <p>We schedule our live events to accommodate Indian time zones and work patterns, with recordings available for those unable to attend. All materials are culturally sensitive and include examples and scenarios that resonate with Indian participants' experiences.</p>
    `,
    benefits: [
      "Learn practical techniques from experts in Indian mental health",
      "Interactive format allowing for questions and personalized guidance",
      "Connect with others facing similar challenges in a supportive environment",
      "Receive resources customized for Indian contexts and challenges",
      "Corporate group bookings available with customization options"
    ],
    pricingDetails: [
      { name: "Standard Webinar (90 minutes)", price: "₹500 per attendee", features: ["Live participation", "Q&A session", "Downloadable resources", "30-day replay access"] },
      { name: "Intensive Workshop (3 hours)", price: "₹1,200 per attendee", features: ["Extended learning experience", "Interactive exercises", "Comprehensive workbook", "Follow-up resources", "Community discussion"] },
      { name: "Workshop Series (4 sessions)", price: "₹2,000 per attendee", features: ["Progressive skill building", "Homework and practice assignments", "Personalized feedback", "Accountability group", "Certificate of completion"] }
    ],
    indiaSpecific: "Our workshops address challenges specific to Indian society, such as balancing modern career demands with traditional family expectations, navigating multi-generational households, and managing stress during culturally significant times like wedding seasons or exam periods. We incorporate traditional Indian wisdom alongside contemporary psychological approaches."
  },
  "affiliate-marketing": {
    id: 5,
    title: "Affiliate Marketing",
    heroImage: "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2070",
    description: "Partner with trusted Indian wellness brands and service providers to offer complementary resources to our community.",
    fullDescription: `
      <p>Our affiliate marketing program creates a responsible ecosystem of mental wellness support by connecting our users with trusted, vetted products and services that complement therapeutic approaches. We focus on ethical partnerships with Indian wellness brands that align with our values and meet our quality standards.</p>
      
      <p>Partners include Indian publishers of mental health literature, yoga and meditation apps developed in India, nutritional supplements with Ayurvedic foundations, and wellness retreat centers across the country. We carefully select partners whose offerings are evidence-based or rooted in authentic traditional practices.</p>
      
      <p>Commissions are based on performance, with transparent disclosure to users about our affiliate relationships. This revenue stream allows us to maintain affordable access to our core mental health services while introducing users to complementary wellness resources.</p>
    `,
    benefits: [
      "Access to vetted, high-quality Indian wellness products and services",
      "Holistic support beyond therapy sessions",
      "Exclusive discounts for CalmSpace users on partner products",
      "Seamless integration with your existing mental wellness journey",
      "Support for local Indian wellness entrepreneurs and businesses"
    ],
    pricingDetails: [
      { name: "Partnership Model", price: "Commission-based", features: ["Transparent affiliate relationship disclosure", "Quality assurance verification", "Ethical marketing standards", "Regular partnership reviews", "User feedback incorporation"] }
    ],
    indiaSpecific: "We prioritize partnerships with Indian brands that understand local needs and contexts. This includes Ayurvedic wellness products, mindfulness apps with content in multiple Indian languages, and services that respect and incorporate traditional Indian approaches to wellbeing while maintaining scientific integrity."
  },
  "freemium-model": {
    id: 6,
    title: "Freemium Model",
    heroImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070",
    description: "Access basic mental wellness resources for free, with premium features available through affordable in-app purchases.",
    fullDescription: `
      <p>Our Freemium Model democratizes access to mental wellness support, particularly important in the Indian context where mental health services have traditionally been limited to urban areas and higher income brackets. Basic resources are available to all users without cost, creating an entry point to mental wellness for millions of Indians.</p>
      
      <p>Free resources include foundational articles, basic mood tracking, guided meditation sessions, and community forums moderated by professionals. These tools provide genuine value while introducing users to the benefits of mental wellness practices.</p>
      
      <p>Premium features available through in-app purchases include personalized wellness plans, advanced analytics, specialized guided programs, and priority content access. This tiered approach ensures basic support is available to all while allowing those who need or desire more comprehensive tools to access them affordably.</p>
    `,
    benefits: [
      "Try basic mental wellness tools without financial commitment",
      "Upgrade only for features that meet your specific needs",
      "Flexible pay-as-you-go model for specialized content",
      "Gradual introduction to mental wellness practices",
      "Community support even at the free tier"
    ],
    pricingDetails: [
      { name: "Free Tier", price: "₹0", features: ["Basic articles and resources", "Simple mood tracking", "Limited guided meditations", "Community forums access", "Weekly wellness tips"] },
      { name: "Premium Features", price: "In-app purchases starting at ₹99", features: ["Personalized wellness plans", "Advanced mood and habit analytics", "Full meditation library", "Goal setting and tracking", "Specialized content for specific challenges"] }
    ],
    indiaSpecific: "Our free tier includes content addressing common mental health challenges in India, with resources available in multiple Indian languages. We've designed the app for optimal performance on a wide range of devices, including older smartphones common in many parts of India, with offline functionality to accommodate varying internet connectivity."
  },
  "sponsored-content-ads": {
    id: 7,
    title: "Sponsored Content & Ads",
    heroImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070",
    description: "Thoughtfully integrated advertising from ethical brands that align with our mental wellness mission in the Indian market.",
    fullDescription: `
      <p>Our approach to sponsored content and advertising prioritizes user experience and ethical partnerships. We collaborate exclusively with brands whose products and services genuinely complement mental wellness goals and resonate with the values of our Indian audience.</p>
      
      <p>Campaigns range from ₹10,000 for targeted placements to ₹50,000 for comprehensive sponsored content series. All sponsored content is clearly labeled, maintaining transparency with our users while providing value through informative, relevant material.</p>
      
      <p>We work closely with Indian and international brands to develop content that addresses real mental wellness needs while naturally introducing their offerings. This includes wellness products, educational resources, and services that support balanced living in the Indian context.</p>
    `,
    benefits: [
      "Exposure to relevant products and services that enhance your wellness journey",
      "Transparently labeled sponsored content with genuine informational value",
      "Strict ethical guidelines for all advertising partners",
      "Ad experiences designed to be non-disruptive to your wellness practice",
      "Discover Indian brands and services aligned with mental wellness goals"
    ],
    pricingDetails: [
      { name: "Targeted Placement", price: "₹10,000–₹25,000 per campaign", features: ["Strategic ad placement", "Demographic targeting", "Performance analytics", "Basic brand integration"] },
      { name: "Sponsored Content Series", price: "₹25,000–₹50,000 per campaign", features: ["Custom content creation", "Multi-platform distribution", "Expert collaboration", "Comprehensive analytics", "Brand storytelling opportunities"] }
    ],
    indiaSpecific: "We collaborate with brands that understand the Indian market and cultural context, ensuring advertising feels relevant and appropriate. Our sponsored content addresses India-specific wellness challenges and opportunities, from navigating work-life balance in rapidly growing urban centers to incorporating traditional practices into contemporary lifestyles."
  },
  "e-books-online-courses": {
    id: 8,
    title: "E-Books & Online Courses",
    heroImage: "https://images.unsplash.com/photo-1544776193-52d3932d8b37?q=80&w=2070",
    description: "Comprehensive digital resources on mental health topics, including self-help guides and guided meditation programs tailored for Indian audiences.",
    fullDescription: `
      <p>Our digital products provide in-depth exploration of mental wellness topics with specific relevance to Indian contexts and challenges. Created by experienced mental health professionals with deep understanding of Indian cultural dynamics, these resources offer accessible, self-paced learning options.</p>
      
      <p>E-books and courses range from ₹500 for focused guides to ₹2,000 for comprehensive courses. Topics include managing family expectations in modern India, workplace mental health, relationship dynamics in Indian contexts, and adapting traditional mindfulness practices for contemporary lifestyles.</p>
      
      <p>All digital products are designed for various comfort levels with technology, with responsive formats that work well on smartphones, tablets, and computers. Content is available in English and Hindi, with selected resources in other regional languages.</p>
    `,
    benefits: [
      "Learn at your own pace with lifetime access to purchased materials",
      "Practical, actionable content designed for Indian contexts and challenges",
      "Professional guidance without the commitment of live sessions",
      "Resources specifically addressing challenges faced by Indians at home and abroad",
      "Multimedia formats catering to different learning preferences"
    ],
    pricingDetails: [
      { name: "Self-Help E-Books", price: "₹500–₹800 per title", features: ["Comprehensive guides on specific topics", "Practical exercises and worksheets", "Available in multiple formats", "Regular content updates"] },
      { name: "Guided Meditation Programs", price: "₹800–₹1,200 per program", features: ["Sequential audio sessions", "Supporting materials", "Progress tracking", "Integration guidelines"] },
      { name: "Comprehensive Online Courses", price: "₹1,500–₹2,000 per course", features: ["Video lectures", "Interactive exercises", "Community discussion", "Expert Q&A recordings", "Completion certificate"] }
    ],
    indiaSpecific: "Our content acknowledges the unique social dynamics of Indian society, addressing topics like balancing individual aspirations with family expectations, managing intergenerational households, and navigating workplace stress in Indian professional environments. We incorporate case studies and examples that resonate with Indian experiences across different regions and socioeconomic backgrounds."
  },
  "donations-crowdfunding": {
    id: 9,
    title: "Donations & Crowdfunding",
    heroImage: "https://images.unsplash.com/photo-1608319294852-d87309c8a5f1?q=80&w=2070",
    description: "Support our mission to make mental healthcare accessible to underprivileged communities across India through voluntary contributions.",
    fullDescription: `
      <p>Our donation and crowdfunding initiatives address the critical gap in mental health support for underserved communities across India. Contributions directly fund therapy sessions, resources, and outreach programs for those who would otherwise lack access to mental health support.</p>
      
      <p>The user-determined contribution model allows supporters to give according to their means, creating an inclusive community of mental health advocates. Every donation, regardless of size, contributes to expanding access to quality mental healthcare.</p>
      
      <p>We maintain complete transparency about how funds are used, with regular reports detailing the impact of donations. Programs funded include therapy scholarships for low-income individuals, mental health awareness camps in rural areas, and crisis support for vulnerable populations.</p>
    `,
    benefits: [
      "100% of donations go directly to providing mental health services to those in need",
      "Regular impact reports showing how your contribution makes a difference",
      "Tax benefits available under Section 80G for Indian taxpayers",
      "Option to direct your donation to specific initiatives or regions",
      "Contribute to reducing mental health stigma in underserved communities"
    ],
    pricingDetails: [
      { name: "One-Time Donation", price: "User-determined", features: ["Flexible contribution amount", "Immediate impact", "Receipt for tax purposes", "Impact updates"] },
      { name: "Monthly Giving Program", price: "User-determined", features: ["Recurring support", "Special impact reports", "Community of regular contributors", "Enhanced tax benefits"] },
      { name: "Sponsored Therapy Program", price: "₹2,500 per session sponsored", features: ["Fund specific therapy sessions", "Recipient updates (with privacy maintained)", "Community impact stories"] }
    ],
    indiaSpecific: "Our initiatives focus on communities with limited mental health resources, including rural areas, urban slums, and regions affected by natural disasters or socioeconomic challenges. We collaborate with local organizations and train community health workers to ensure culturally appropriate support that addresses region-specific needs across India's diverse landscape."
  },
  "licensing-platform": {
    id: 10,
    title: "Licensing Platform",
    heroImage: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2070",
    description: "Share our innovative mental wellness technology and content with healthcare providers and organizations across India.",
    fullDescription: `
      <p>Our licensing model extends the reach of our mental wellness platform by allowing other organizations to utilize our technology and content. This approach is particularly valuable in the Indian context, where existing healthcare and educational institutions can integrate digital mental wellness tools without developing them from scratch.</p>
      
      <p>License fees are customized based on organization size, usage scope, and customization requirements. Partners include healthcare systems, educational institutions, corporate wellness programs, and NGOs working in mental health across India.</p>
      
      <p>Licensed components can include our assessment tools, guided self-help modules, therapist matching algorithms, and content libraries. All can be white-labeled and customized to align with the partner organization's branding and specific community needs.</p>
    `,
    benefits: [
      "Access proven mental wellness technology without development costs",
      "Customizable to reflect your organization's brand and unique needs",
      "Regular updates incorporating latest research and best practices",
      "Technical support and implementation assistance",
      "Data analytics to measure impact and optimize programs"
    ],
    pricingDetails: [
      { name: "Content Licensing", price: "Fee-based, customized pricing", features: ["Access to educational resources", "Regular content updates", "Customization options", "Multiple language support"] },
      { name: "Technology Licensing", price: "Fee-based, customized pricing", features: ["White-labeled platform solutions", "API access", "Technical implementation support", "Ongoing maintenance"] },
      { name: "Full Solution Licensing", price: "Fee-based, customized pricing", features: ["Comprehensive platform access", "Customization and branding", "Staff training", "Ongoing support", "Analytics dashboard"] }
    ],
    indiaSpecific: "Our licensing solutions are designed with awareness of technological infrastructure across different Indian settings, from major urban centers to smaller towns. We provide options that work with varying levels of connectivity and technical capability, ensuring solutions are implementable across diverse Indian contexts. Content can be adapted for regional languages and cultural contexts."
  }
};

const RevenueStreamDetail = () => {
  const { streamId } = useParams();
  const stream = revenueStreamData[streamId as keyof typeof revenueStreamData];

  if (!stream) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-calm-gray mb-6">Revenue Stream Not Found</h1>
            <p className="text-calm-gray/80 mb-8">The information you're looking for doesn't exist or has been moved.</p>
            <Link to="/services">
              <Button className="bg-calm-blue hover:bg-calm-blue/80 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services Offered
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <HeroSection
        title={stream.title}
        subtitle={stream.description}
        imageSrc={stream.heroImage}
      />

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-start mb-8">
              <Link to="/services">
                <Button variant="outline" className="border-calm-blue/20 text-calm-gray/90 hover:bg-calm-blue/10">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Services Offered
                </Button>
              </Link>
            </div>
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: stream.fullDescription }} />
              
              <h2 className="text-2xl font-bold text-calm-gray mt-10 mb-6">Key Benefits</h2>
              <ul className="space-y-2">
                {stream.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-calm-blue mr-2 mt-1 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-calm-gray mt-10 mb-6">Pricing Details</h2>
              {stream.pricingDetails.map((pricing, index) => (
                <div key={index} className="bg-calm-cream/30 p-6 rounded-lg mb-6">
                  <div className="flex flex-wrap justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-calm-gray">{pricing.name}</h3>
                    <span className="text-calm-blue font-bold text-lg">{pricing.price}</span>
                  </div>
                  <ul className="space-y-2">
                    {pricing.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-calm-blue/60 mr-2 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <h2 className="text-2xl font-bold text-calm-gray mt-10 mb-6">Indian Context</h2>
              <div className="bg-white p-6 border border-calm-blue/20 rounded-lg shadow-sm">
                <p className="text-calm-gray/90">{stream.indiaSpecific}</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold text-calm-gray mb-6">Ready to Learn More?</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <Button className="bg-calm-blue hover:bg-calm-blue/80 text-white px-8 py-6">
                    Contact Our Team
                  </Button>
                </Link>
                <Link to="/book">
                  <Button variant="outline" className="border-calm-blue text-calm-blue hover:bg-calm-blue/10 px-8 py-6">
                    Book a Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Reading Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-calm-gray mb-6 text-center">Recommended Reading</h2>
          <p className="text-lg text-calm-gray/80 mb-10 text-center max-w-3xl mx-auto">
            Explore these insightful books to deepen your understanding of mental wellness and business practices.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Book 1 */}
            <div className="bg-calm-cream/30 rounded-lg overflow-hidden shadow-sm h-full flex flex-col transition-all hover:shadow-md">
              <div className="p-6 flex flex-col h-full">
                <div className="flex-shrink-0 h-64 mb-4 overflow-hidden rounded-md">
                  <img 
                    src="https://rukminim2.flixcart.com/image/850/1000/xif0q/book/v/b/f/the-gifts-of-imperfection-original-imah2apwxhhkce69.jpeg?q=90&crop=false"
                    alt="The Gifts of Imperfection" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-calm-gray mb-1">The Gifts of Imperfection</h3>
                <p className="text-calm-blue font-medium text-sm mb-3">By Brené Brown</p>
                <p className="text-calm-gray/80 text-sm mb-4 flex-grow">
                  Let go of who you think you're supposed to be and embrace who you are. A guide to wholehearted living that helps cultivate authenticity, self-compassion, and resilience.
                </p>
                <a 
                  href="https://dl.flipkart.com/s/qe46HBNNNN" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto block w-full"
                >
                  <Button className="w-full bg-calm-blue hover:bg-calm-blue/80 text-white">
                    Purchase Book
                  </Button>
                </a>
              </div>
            </div>
            
            {/* Book 2 */}
            <div className="bg-calm-cream/30 rounded-lg overflow-hidden shadow-sm h-full flex flex-col transition-all hover:shadow-md">
              <div className="p-6 flex flex-col h-full">
                <div className="flex-shrink-0 h-64 mb-4 overflow-hidden rounded-md">
                  <img 
                    src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR2rak8VqMzVQms3rvO39Pn8Dt3NqLRpvZQIaZWqiqjBuOy9qBJMQrqIonFP8LolWtXDAqd315TY34q3kQ9q1htltPcMmMi7_0oCdjjTZguvz5_L-IgD_qzSw"
                    alt="Atomic Habits" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-calm-gray mb-1">Atomic Habits</h3>
                <p className="text-calm-blue font-medium text-sm mb-3">By James Clear</p>
                <p className="text-calm-gray/80 text-sm mb-4 flex-grow">
                  An easy and proven way to build good habits and break bad ones. Practical strategies to form good habits, break bad ones, and master tiny behaviors that lead to remarkable results.
                </p>
                <a 
                  href="https://www.flipkart.com/atomic-habits-good-bad-new-york-book/p/itmfcyurt9pfakjh?pid=9781847941831&lid=LSTBOK9781847941831IXYBXE&marketplace=FLIPKART&cmpid=content_book_8965229628_gmc"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto block w-full"
                >
                  <Button className="w-full bg-calm-blue hover:bg-calm-blue/80 text-white">
                    Purchase Book
                  </Button>
                </a>
              </div>
            </div>
            
            {/* Book 3 */}
            <div className="bg-calm-cream/30 rounded-lg overflow-hidden shadow-sm h-full flex flex-col transition-all hover:shadow-md">
              <div className="p-6 flex flex-col h-full">
                <div className="flex-shrink-0 h-64 mb-4 overflow-hidden rounded-md">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT2pJJ89HYNalD7wGyXFIkRTq8mKij-WLILJ7RnPItatzrp3CnjFO0AAUIf1E9OHkjtVoxoDCbR6yTXRNp36sqaNXJO3WrKcVsyM7Tp24o"
                    alt="The Body Keeps the Score" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-calm-gray mb-1">The Body Keeps the Score</h3>
                <p className="text-calm-blue font-medium text-sm mb-3">By Bessel van der Kolk</p>
                <p className="text-calm-gray/80 text-sm mb-4 flex-grow">
                  Explores how trauma affects the body and mind, offering powerful approaches to healing. Essential reading for understanding the physical impact of psychological distress.
                </p>
                <a 
                  href="https://www.amazon.in/Body-Keeps-Score-Bessel-Kolk/dp/0141978619?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A1WYWER0W24N8S" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto block w-full"
                >
                  <Button className="w-full bg-calm-blue hover:bg-calm-blue/80 text-white">
                    Purchase Book
                  </Button>
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8">
            {/* Book 4 */}
            <div className="bg-calm-cream/30 rounded-lg overflow-hidden shadow-sm h-full flex flex-col transition-all hover:shadow-md">
              <div className="p-6 flex flex-col h-full">
                <div className="flex-shrink-0 h-64 mb-4 overflow-hidden rounded-md">
                  <img 
                    src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTnqBKYf63LqaCdBtmh3Mtr0dTyz5mIBopmOFLlbSAu4gyktSCzSoCghyPWclpEefyT2DJUN-HQOpvIcA3JEuh2ikHq_k_YJ9rFFfiw8dk"
                    alt="Mindfulness in Plain English" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-calm-gray mb-1">Mindfulness in Plain English</h3>
                <p className="text-calm-blue font-medium text-sm mb-3">By Bhante Henepola Gunaratana</p>
                <p className="text-calm-gray/80 text-sm mb-4 flex-grow">
                  A clear, practical guide to meditation and mindfulness. Perfect for beginners and experienced practitioners alike, with simple instructions for cultivating awareness.
                </p>
                <a 
                  href="https://dl.flipkart.com/s/DhB8sIuuuN" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto block w-full"
                >
                  <Button className="w-full bg-calm-blue hover:bg-calm-blue/80 text-white">
                    Purchase Book
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Streams */}
      <section className="py-16 bg-calm-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-calm-gray mb-10 text-center">Other Services Offered</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {Object.entries(revenueStreamData)
              .filter(([key]) => key !== streamId)
              .slice(0, 3)
              .map(([key, relatedStream]) => (
                <Link to={`/revenue-streams/${key}`} key={key} className="group">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm h-full flex flex-col transition-all hover:shadow-md">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={
                          key === "subscription-based-model" 
                            ? "https://images.unsplash.com/photo-1590650153855-d9e808231d41?q=80&w=2070"
                            : key === "pay-per-session-model"
                              ? "https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=2070"
                              : key === "corporate-wellness-programs"
                                ? "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2070"
                                : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070"
                        }
                        alt={relatedStream.title} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex-grow">
                      <h3 className="text-xl font-bold text-calm-gray mb-2 group-hover:text-calm-blue transition-colors">
                        {relatedStream.id}. {relatedStream.title}
                      </h3>
                      <p className="text-calm-gray/70 text-sm line-clamp-3">
                        {relatedStream.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RevenueStreamDetail; 