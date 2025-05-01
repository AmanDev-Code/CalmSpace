import React from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/HeroSection';
import { BlogCard } from '@/components/BlogCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const featuredPosts = [
    {
      title: "How Daily Mindfulness Can Transform Your Mental Health",
      excerpt: "Discover how just 10 minutes of mindfulness practice can reduce stress, improve focus, and transform your mental wellbeing. Learn simple practices rooted in ancient Indian wisdom.",
      author: "Dr. Priya Sharma",
      date: "June 12, 2023",
      category: "Mindfulness",
      slug: "daily-mindfulness-transform-mental-health",
      imageSrc: "https://images.unsplash.com/photo-1506126613408-eca07ce68773"
    },
    {
      title: "Understanding the Link Between Sleep and Anxiety",
      excerpt: "Poor sleep and anxiety create a vicious cycle that can be hard to break. Explore evidence-based techniques and traditional practices to improve sleep quality and reduce anxiety.",
      author: "Dr. Rajiv Mehta",
      date: "May 28, 2023",
      category: "Anxiety",
      slug: "understanding-link-sleep-anxiety",
      imageSrc: "https://images.unsplash.com/photo-1541199249251-f713e6145474"
    },
    {
      title: "How Childhood Experiences Shape Adult Attachment Styles",
      excerpt: "Discover how your earliest relationships create templates for adult connections. Explore attachment theory through both Western psychology and Indian family dynamics context.",
      author: "Dr. Anjali Patel",
      date: "March 20, 2025",
      category: "Relationships",
      slug: "childhood-adult-attachment",
      imageSrc: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    },
  ];

  const recentPosts = [
    {
      title: "5 Communication Techniques to Transform Your Relationships",
      excerpt: "Learn practical communication tools that help you connect more deeply with loved ones and resolve conflicts peacefully. Blend Western techniques with traditional Indian wisdom.",
      author: "Meera Singh",
      date: "May 15, 2023",
      category: "Relationships",
      slug: "communication-techniques-transform-relationships",
      imageSrc: "https://images.unsplash.com/photo-1516575150278-77136aed6920"
    },
    {
      title: "Breaking the Stigma: Understanding Depression in Modern India",
      excerpt: "Depression affects millions of Indians, yet many suffer in silence due to stigma. Learn about causes, symptoms, and culturally-sensitive approaches to healing.",
      author: "Dr. Arjun Kapoor",
      date: "May 10, 2023",
      category: "Depression",
      slug: "breaking-stigma-depression-modern-india",
      imageSrc: "https://images.unsplash.com/photo-1517463700628-5103184eac47"
    },
    {
      title: "Finding Balance: Juggling Work and Wellbeing in Urban India",
      excerpt: "The pressure to succeed professionally while maintaining personal wellbeing creates unique challenges in India's competitive urban centers. Discover practical strategies for finding balance.",
      author: "Priyanka Das",
      date: "May 5, 2023",
      category: "Work-Life Balance",
      slug: "finding-balance-work-wellbeing-urban-india",
      imageSrc: "https://images.unsplash.com/photo-1485119584289-30ca2b38c67e"
    },
    {
      title: "The Science of Gratitude: How Thankfulness Improves Mental Health",
      excerpt: "Explore how cultivating gratitude transforms not just your mindset but your neurochemistry. Based on both modern research and ancient contemplative traditions.",
      author: "Dr. Priya Sharma",
      date: "April 5, 2025",
      category: "Wellbeing",
      slug: "science-of-gratitude",
      imageSrc: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
    },
    {
      title: "Digital Detox: Reclaiming Mental Space in a Connected World",
      excerpt: "In India's rapidly digitizing society, constant connectivity is creating new mental health challenges. Learn practical strategies for healthy digital boundaries.",
      author: "Rohan Desai",
      date: "April 1, 2025",
      category: "Digital Wellbeing",
      slug: "digital-detox-mental-space",
      imageSrc: "https://images.unsplash.com/photo-1536148935331-408321065b18"
    },
    {
      title: "Finding Meaning: Existential Approaches to Mental Health",
      excerpt: "Beyond symptom management: explore how existential perspectives from both Western and Indian philosophical traditions can transform your approach to psychological wellbeing.",
      author: "Dr. Vikram Singh",
      date: "March 15, 2025",
      category: "Philosophy",
      slug: "existential-approaches-mental-health",
      imageSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    },
    {
      title: "The Psychology of Habits: Breaking and Building Routines",
      excerpt: "Discover the science behind habit formation and practical strategies for change. Learn how to harness both modern behavioral science and traditional wisdom for lasting transformation.",
      author: "Dr. Ananya Sharma",
      date: "February 28, 2025",
      category: "Psychology",
      slug: "psychology-habits-routines",
      imageSrc: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d"
    },
  ];

  const categories = [
    "Mindfulness",
    "Anxiety",
    "Depression",
    "Relationships",
    "Stress Management",
    "Self-improvement",
    "Trauma",
    "Modern Life",
    "Psychology",
    "Wellbeing",
    "Yoga & Meditation",
    "Ayurveda"
  ];

  return (
    <Layout>
      <HeroSection
        title="Mental Wellness Blog"
        subtitle="Insights, tips, and evidence-based information to support your mental health journey in the Indian context."
        imageSrc="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      />

      {/* Featured Posts Carousel */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-calm-gray mb-10 text-center">Featured Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post, index) => (
              <BlogCard
                key={index}
                title={post.title}
                excerpt={post.excerpt}
                author={post.author}
                date={post.date}
                category={post.category}
                slug={post.slug}
                imageSrc={post.imageSrc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 bg-calm-cream">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main Content */}
            <div className="w-full lg:w-2/3">
              <h2 className="text-2xl font-bold text-calm-gray mb-8">Recent Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentPosts.map((post, index) => (
                  <BlogCard
                    key={index}
                    title={post.title}
                    excerpt={post.excerpt}
                    author={post.author}
                    date={post.date}
                    category={post.category}
                    slug={post.slug}
                    imageSrc={post.imageSrc}
                  />
                ))}
              </div>
              
              <div className="mt-10 flex justify-center">
                <Button className="bg-calm-blue hover:bg-calm-blue/80 text-white">
                  Load More Articles
                </Button>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="w-full lg:w-1/3">
              {/* Search */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-bold text-calm-gray mb-4">Search Articles</h3>
                <div className="flex">
                  <Input
                    placeholder="Search..."
                    className="rounded-r-none border-calm-gray/30"
                  />
                  <Button className="rounded-l-none bg-calm-lavender hover:bg-calm-blue text-calm-gray">
                    <Search size={18} />
                  </Button>
                </div>
              </div>
              
              {/* Categories */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-bold text-calm-gray mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-calm-lavender/10 hover:bg-calm-lavender/20 text-calm-gray border-calm-lavender cursor-pointer transition-colors"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Popular Posts */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-bold text-calm-gray mb-4">Popular Posts</h3>
                <ul className="space-y-4">
                  <li>
                    <Link to="/blog/mindfulness-transform-mental-health" className="flex group">
                      <div className="w-20 h-20 mr-3 overflow-hidden rounded">
                        <img 
                          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
                          alt="Article thumbnail" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-calm-gray group-hover:text-calm-blue transition-colors">
                          How Daily Mindfulness Can Transform Your Mental Health
                        </h4>
                        <p className="text-xs text-calm-gray/70 mt-1">April 25, 2025</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog/sleep-anxiety-connection" className="flex group">
                      <div className="w-20 h-20 mr-3 overflow-hidden rounded">
                        <img 
                          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05" 
                          alt="Article thumbnail" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-calm-gray group-hover:text-calm-blue transition-colors">
                          Understanding the Link Between Sleep and Anxiety
                        </h4>
                        <p className="text-xs text-calm-gray/70 mt-1">April 18, 2025</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog/signs-of-burnout" className="flex group">
                      <div className="w-20 h-20 mr-3 overflow-hidden rounded">
                        <img 
                          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                          alt="Article thumbnail" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-calm-gray group-hover:text-calm-blue transition-colors">
                          Recognizing the Signs of Burnout Before It's Too Late
                        </h4>
                        <p className="text-xs text-calm-gray/70 mt-1">March 28, 2025</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Newsletter */}
              <div className="bg-calm-mint/30 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-calm-gray mb-2">Subscribe to our Newsletter</h3>
                <p className="text-calm-gray/80 text-sm mb-4">
                  Get the latest mental wellness tips and insights delivered to your inbox monthly.
                </p>
                <div className="space-y-3">
                  <Input
                    placeholder="Your email address"
                    className="bg-white border-calm-gray/30"
                  />
                  <Button className="w-full bg-calm-blue hover:bg-calm-blue/80 text-white">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-calm-blue">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Professional Support?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Our team of experienced therapists is here to help you on your journey to better mental health.
          </p>
          <Link to="/book">
            <Button className="bg-white text-calm-blue hover:bg-calm-cream">
              Book a Session Today
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
