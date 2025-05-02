import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Download } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { PWAInstallPrompt, PWASidebarInstallButton } from './PWAInstallPrompt';
import { downloadApk } from './ApkDownloader';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect Android platform and mobile device
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsAndroid(/android/.test(userAgent));
    setIsMobile(/android|iphone|ipad|ipod|mobile/i.test(userAgent));
    
    // Apply specific Android class to header for minimal top gap
    if (/android/.test(userAgent)) {
      document.querySelector('header')?.classList.add('android-header-minimal-gap');
      console.log('Android detected in Navbar, applying minimal gap');
    }
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle APK download
  const handleDownloadApk = () => {
    downloadApk('/app-release.apk', 'calmspace.apk')
      .then(() => {
        // Close the menu after successful download
        setIsMenuOpen(false);
      })
      .catch((error) => {
        console.error('Download failed:', error);
        alert('Failed to download the app. Please try again or contact support.');
      });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Resources', path: '/resources' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`sticky top-0 w-full z-[100] bg-white/80 backdrop-blur-md shadow-sm ${isAndroid ? 'android-header-minimal-gap' : ''}`}>
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/assets/brandLogo.png" 
              alt="CalmSpace Logo" 
              className="h-14 w-auto sm:h-16 md:h-20 lg:h-24 transition-all duration-300" 
            />
          </Link>
          
          {/* Mobile menu using shadcn Sheet component */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden" 
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6 text-calm-gray" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 w-4/5 max-w-xs bg-white border-l border-gray-200">
                <div className="flex flex-col h-full">
                  <SheetHeader className="px-6 py-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center justify-center pb-2">
                      <img 
                        src="/assets/brandLogo.png" 
                        alt="CalmSpace Logo" 
                        className="h-16 w-auto" 
                      />
                    </div>
                    <SheetTitle className="text-center text-calm-gray text-2xl font-playfair font-bold">
                      CalmSpace
                    </SheetTitle>
                    <SheetClose className="absolute top-4 right-4">
                      <X className="h-6 w-6 text-calm-gray" />
                    </SheetClose>
                  </SheetHeader>
                  
                  <div className="flex-1 overflow-auto bg-white">
                    {/* Show PWA install prompt at the top of the mobile menu */}
                  
                    
                    {/* Show Android APK download button if on Android mobile */}
                    {isAndroid && isMobile && (
                      <div className="px-6 py-3 border-b border-gray-100 bg-white">
                        <Button 
                          onClick={handleDownloadApk} 
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-md py-4 transition-colors flex items-center justify-center"
                        >
                          <Download className="h-5 w-5 mr-2" />
                          Download Android App
                        </Button>
                        <p className="text-xs text-gray-500 mt-1 text-center">
                          Download our app directly to your device
                        </p>
                      </div>
                    )}
                    
                    <nav className="flex flex-col bg-white">
                      {navLinks.map((link, index) => (
                        <Link
                          key={link.name}
                          to={link.path}
                          className="text-calm-gray hover:text-calm-blue py-4 px-6 transition-colors duration-200 text-xl font-medium border-b border-gray-100 bg-white"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      ))}
                      
                      {/* PWA Sidebar Install Button - always visible for easy access */}
                      <div className="px-6 py-3 border-b border-gray-100 bg-white">
                        <PWASidebarInstallButton />
                      </div>
                      
                      <div className="px-6 py-6 bg-white">
                        <Link to="/book" onClick={() => setIsMenuOpen(false)}>
                          <Button className="w-full bg-calm-blue hover:bg-calm-lavender text-white font-medium rounded-md py-4 transition-colors">
                            Book a Session
                          </Button>
                        </Link>
                      </div>
                    </nav>
                  </div>
                  
                  <SheetFooter className="mt-auto px-6 py-4 border-t border-gray-100 bg-gray-50">
                    <p className="text-calm-gray/80 text-sm w-full text-left">
                      © {new Date().getFullYear()} CalmSpace<br />
                      Your journey to mental wellness
                    </p>
                  </SheetFooter>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-calm-gray hover:text-calm-blue transition-colors duration-200 text-lg"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/book">
              <Button className="bg-calm-lavender hover:bg-calm-blue text-calm-gray font-medium rounded-md transition-colors text-lg px-6 py-2">
                Book a Session
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
