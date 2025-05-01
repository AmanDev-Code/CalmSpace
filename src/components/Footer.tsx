import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn("bg-calm-cream text-calm-gray relative z-0", className)}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-playfair">CalmSpace</h3>
            <p className="text-sm max-w-xs">
              Providing mental wellness support and resources to help you find peace within, one step at a time.
            </p>
            <div className="flex items-center space-x-1 text-sm">
              <Heart size={16} className="text-calm-blue" />
              <span>With care and compassion</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-calm-blue transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-calm-blue transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-calm-blue transition-colors">Services</Link></li>
              <li><Link to="/resources" className="hover:text-calm-blue transition-colors">Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">More Info</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="hover:text-calm-blue transition-colors">Blog</Link></li>
              <li><Link to="/book" className="hover:text-calm-blue transition-colors">Book a Session</Link></li>
              <li><Link to="/contact" className="hover:text-calm-blue transition-colors">Contact Us</Link></li>
              <li><Link to="/enquiry" className="hover:text-calm-blue transition-colors">Enquiry Form</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-calm-blue" />
                <span>+91 6203789409</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-calm-blue" />
                <span>contact@calmspace.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} CalmSpace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
