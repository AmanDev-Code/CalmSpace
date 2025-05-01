import React from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/HeroSection';
import { ResourceCard } from '@/components/ResourceCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileText, Music } from 'lucide-react';

const Resources = () => {
  const guides = [
    {
      title: "Understanding Anxiety",
      description: "A comprehensive guide to recognizing anxiety symptoms and effective coping strategies.",
      downloadUrl: "/downloads/understanding-anxiety-guide.pdf",
      fileType: "PDF",
      imageSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    },
    {
      title: "Mindfulness for Beginners",
      description: "Learn the basics of mindfulness meditation and how to incorporate it into your daily routine.",
      downloadUrl: "/downloads/mindfulness-beginners-guide.pdf",
      fileType: "PDF",
      imageSrc: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
    },
    {
      title: "Building Healthy Relationships",
      description: "Practical advice for creating and maintaining fulfilling relationships in all areas of life.",
      downloadUrl: "/downloads/healthy-relationships-guide.pdf",
      fileType: "PDF",
      imageSrc: "https://images.unsplash.com/photo-1500673922987-e212871fec22"
    }
  ];

  const worksheets = [
    {
      title: "Thought Record Worksheet",
      description: "Track and challenge negative thought patterns with this CBT-based worksheet.",
      downloadUrl: "/downloads/thought-record-worksheet.pdf",
      fileType: "PDF",
      imageSrc: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
    },
    {
      title: "Weekly Mood Tracker",
      description: "Monitor your emotional wellbeing and identify patterns over time.",
      downloadUrl: "/downloads/weekly-mood-tracker.pdf",
      fileType: "PDF",
      imageSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      title: "Stress Management Plan",
      description: "Create a personalized plan to manage stress effectively in your daily life.",
      downloadUrl: "/downloads/stress-management-plan.pdf",
      fileType: "PDF",
      imageSrc: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    }
  ];

  const audioResources = [
    {
      title: "Guided Relaxation",
      description: "A 15-minute guided relaxation exercise to help reduce stress and promote calm.",
      downloadUrl: "/downloads/guided-relaxation-15min.mp3",
      fileType: "MP3",
      imageSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    },
    {
      title: "Sleep Meditation",
      description: "A gentle meditation designed to help you unwind and prepare for restful sleep.",
      downloadUrl: "/downloads/sleep-meditation.mp3",
      fileType: "MP3",
      imageSrc: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
    },
    {
      title: "Anxiety Relief Breathing",
      description: "A guided breathing exercise to help manage anxiety in challenging moments.",
      downloadUrl: "/downloads/anxiety-relief-breathing.mp3",
      fileType: "MP3",
      imageSrc: "https://images.unsplash.com/photo-1500673922987-e212871fec22"
    }
  ];

  // Custom resource card component for adding a download button
  const EnhancedResourceCard = ({ title, description, downloadUrl, fileType, imageSrc }) => {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-sm h-full flex flex-col transition-all hover:shadow-md">
        <div className="h-48 overflow-hidden">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-lg font-bold text-calm-gray mb-2">{title}</h3>
          <p className="text-calm-gray/80 mb-4 flex-grow text-sm">{description}</p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center text-calm-blue text-sm font-medium">
              {fileType === "PDF" ? (
                <FileText className="h-4 w-4 mr-1" />
              ) : (
                <Music className="h-4 w-4 mr-1" />
              )}
              {fileType} File
            </div>
            <a 
              href={downloadUrl} 
              download
              className="flex items-center bg-calm-blue hover:bg-calm-blue/80 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <HeroSection
        title="Wellness Resources"
        subtitle="Free resources to support your mental wellness journey between therapy sessions."
        imageSrc="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
      />

      {/* Resources Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold text-calm-gray mb-6">Self-Help Resources</h2>
            <p className="text-lg text-calm-gray/80">
              We've created these resources to support your mental wellness between sessions. All materials are informed by evidence-based practices and developed by our experienced therapists.
            </p>
          </div>

          <Tabs defaultValue="guides" className="w-full max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="guides" className="text-calm-gray data-[state=active]:bg-calm-lavender">Guides</TabsTrigger>
              <TabsTrigger value="worksheets" className="text-calm-gray data-[state=active]:bg-calm-lavender">Worksheets</TabsTrigger>
              <TabsTrigger value="audio" className="text-calm-gray data-[state=active]:bg-calm-lavender">Audio Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {guides.map((resource, index) => (
                  <EnhancedResourceCard
                    key={index}
                    title={resource.title}
                    description={resource.description}
                    downloadUrl={resource.downloadUrl}
                    fileType={resource.fileType}
                    imageSrc={resource.imageSrc}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="worksheets">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {worksheets.map((resource, index) => (
                  <EnhancedResourceCard
                    key={index}
                    title={resource.title}
                    description={resource.description}
                    downloadUrl={resource.downloadUrl}
                    fileType={resource.fileType}
                    imageSrc={resource.imageSrc}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="audio">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {audioResources.map((resource, index) => (
                  <EnhancedResourceCard
                    key={index}
                    title={resource.title}
                    description={resource.description}
                    downloadUrl={resource.downloadUrl}
                    fileType={resource.fileType}
                    imageSrc={resource.imageSrc}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Recommended Reading */}
      <section className="py-16 bg-calm-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-calm-gray mb-10 text-center">Recommended Reading</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Book 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm h-full flex flex-col transition-all hover:shadow-md">
              <div className="p-5 flex flex-col h-full">
                <div className="aspect-[2/3] mb-4 overflow-hidden rounded-md">
                  <img 
                    src="https://rukminim2.flixcart.com/image/850/1000/xif0q/book/v/b/f/the-gifts-of-imperfection-original-imah2apwxhhkce69.jpeg?q=90&crop=false"
                    alt="The Gifts of Imperfection" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-calm-gray mb-1">The Gifts of Imperfection</h3>
                <p className="text-calm-blue font-medium text-sm mb-2">By Brené Brown</p>
                <p className="text-calm-gray/80 text-sm mb-4 flex-grow">
                  Let go of who you think you're supposed to be and embrace who you are. A guide to wholehearted living.
                </p>
                <a 
                  href="https://dl.flipkart.com/s/qe46HBNNNN" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto block w-full"
                >
                  <Button className="w-full bg-calm-blue hover:bg-calm-blue/80 text-white text-sm">
                    Purchase Book
                  </Button>
                </a>
              </div>
            </div>
            
            {/* Book 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm h-full flex flex-col transition-all hover:shadow-md">
              <div className="p-5 flex flex-col h-full">
                <div className="aspect-[2/3] mb-4 overflow-hidden rounded-md">
                  <img 
                    src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR2rak8VqMzVQms3rvO39Pn8Dt3NqLRpvZQIaZWqiqjBuOy9qBJMQrqIonFP8LolWtXDAqd315TY34q3kQ9q1htltPcMmMi7_0oCdjjTZguvz5_L-IgD_qzSw"
                    alt="Atomic Habits" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-calm-gray mb-1">Atomic Habits</h3>
                <p className="text-calm-blue font-medium text-sm mb-2">By James Clear</p>
                <p className="text-calm-gray/80 text-sm mb-4 flex-grow">
                  A practical guide to building good habits and breaking bad ones for lasting change.
                </p>
                <a 
                  href="https://www.flipkart.com/atomic-habits-good-bad-new-york-book/p/itmfcyurt9pfakjh?pid=9781847941831&lid=LSTBOK9781847941831IXYBXE&marketplace=FLIPKART&cmpid=content_book_8965229628_gmc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto block w-full"
                >
                  <Button className="w-full bg-calm-blue hover:bg-calm-blue/80 text-white text-sm">
                    Purchase Book
                  </Button>
                </a>
              </div>
            </div>
            
            {/* Book 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm h-full flex flex-col transition-all hover:shadow-md">
              <div className="p-5 flex flex-col h-full">
                <div className="aspect-[2/3] mb-4 overflow-hidden rounded-md">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT2pJJ89HYNalD7wGyXFIkRTq8mKij-WLILJ7RnPItatzrp3CnjFO0AAUIf1E9OHkjtVoxoDCbR6yTXRNp36sqaNXJO3WrKcVsyM7Tp24o"
                    alt="The Body Keeps the Score" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-calm-gray mb-1">The Body Keeps the Score</h3>
                <p className="text-calm-blue font-medium text-sm mb-2">By Bessel van der Kolk</p>
                <p className="text-calm-gray/80 text-sm mb-4 flex-grow">
                  An insightful look at how trauma affects the body and mind, with paths to healing.
                </p>
                <a 
                  href="https://www.amazon.in/Body-Keeps-Score-Bessel-Kolk/dp/0141978619?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A1WYWER0W24N8S" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto block w-full"
                >
                  <Button className="w-full bg-calm-blue hover:bg-calm-blue/80 text-white text-sm">
                    Purchase Book
                  </Button>
                </a>
              </div>
            </div>
            
            {/* Book 4 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm h-full flex flex-col transition-all hover:shadow-md">
              <div className="p-5 flex flex-col h-full">
                <div className="aspect-[2/3] mb-4 overflow-hidden rounded-md">
                  <img 
                    src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTnqBKYf63LqaCdBtmh3Mtr0dTyz5mIBopmOFLlbSAu4gyktSCzSoCghyPWclpEefyT2DJUN-HQOpvIcA3JEuh2ikHq_k_YJ9rFFfiw8dk"
                    alt="Mindfulness in Plain English" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-calm-gray mb-1">Feeling Good</h3>
                <p className="text-calm-blue font-medium text-sm mb-2">By David D. Burns</p>
                <p className="text-calm-gray/80 text-sm mb-4 flex-grow">
                  A clear, practical guide to meditation and mindfulness for practitioners of all levels.
                </p>
                <a 
                  href="https://dl.flipkart.com/s/DhB8sIuuuN" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto block w-full"
                >
                  <Button className="w-full bg-calm-blue hover:bg-calm-blue/80 text-white text-sm">
                    Purchase Book
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-calm-blue/10 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-calm-gray mb-6 text-center">Crisis Resources</h2>
            <p className="text-calm-gray/80 mb-6 text-center">
              If you're experiencing a mental health emergency, please use these resources for immediate support:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-calm-gray mb-3">National Suicide Prevention Lifeline</h3>
                <p className="text-xl font-bold text-calm-blue mb-2">+91 9152987821</p>
                <p className="text-calm-gray/80 text-sm">
                  Available 24 hours a day, 7 days a week. Provides free and confidential support for people in distress.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-calm-gray mb-3">Crisis Text Line</h3>
                <p className="text-xl font-bold text-calm-blue mb-2">Text HOME to 741741</p>
                <p className="text-calm-gray/80 text-sm">
                  Connect with a Crisis Counselor 24/7 for support with any type of crisis.
                </p>
              </div>
            </div>
            
            <p className="text-center mt-6 text-calm-gray/80">
              <strong>Note:</strong> These resources are not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with questions about a medical condition.
            </p>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Resources;
