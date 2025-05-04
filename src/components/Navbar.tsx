import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Download, LogIn, LogOut, User, Settings, Key } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { downloadApk } from './ApkDownloader';
import { NavbarAuth } from './NavbarAuth';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { currentUser, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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
    downloadApk('/CalmSpace.apk', 'CalmSpace.apk')
      .then(() => {
        // Close the menu after successful download
        setIsMenuOpen(false);
      })
      .catch((error: unknown) => {
        console.error('Download failed:', error);
        alert('Failed to download the app. Please try again or contact support.');
      });
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'CS';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged Out Successfully",
        description: "You have been signed out of your account."
      });
      setIsMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "An error occurred while signing out. Please try again."
      });
    }
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
    <header className={`sticky top-0 w-full  bg-white/80 backdrop-blur-md shadow-sm ${isAndroid ? 'android-header-minimal-gap' : ''}`}>
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
                    
                    <SheetTitle className="text-center text-calm-gray text-2xl font-playfair font-bold">
                      CalmSpace
                    </SheetTitle>
                    <SheetClose className="absolute top-4 right-4">
                      <X className="h-6 w-6 text-calm-gray" />
                    </SheetClose>
                  </SheetHeader>
                  
                  <div className="flex-1 overflow-auto bg-white">
                    {/* User profile section if logged in */}
                    {currentUser && (
                      <div className="px-6 py-4 border-b border-gray-100 bg-white">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12 border-2 border-calm-blue">
                            <AvatarImage src={currentUser.photoURL || ''} alt={currentUser.displayName || 'User'} />
                            <AvatarFallback className="bg-calm-lavender text-calm-gray">
                              {getInitials(currentUser.displayName)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-lg font-medium text-calm-gray">{currentUser.displayName || 'User'}</p>
                            <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full text-red-500 hover:text-red-500 hover:border-red-500"
                            onClick={handleLogout}
                          >
                            <LogOut className="h-4 w-4 mr-1" />
                            Sign Out
                          </Button>
                        </div>
                      </div>
                    )}
                    
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
                      
                      {/* Auth links for mobile */}
                      {!currentUser && (
                        <>
                          <Link
                            to="/login"
                            className="text-calm-gray hover:text-calm-blue py-4 px-6 transition-colors duration-200 text-xl font-medium border-b border-gray-100 bg-white flex items-center"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <LogIn className="h-5 w-5 mr-2" />
                            Sign In
                          </Link>
                          <Link
                            to="/signup"
                            className="text-calm-gray hover:text-calm-blue py-4 px-6 transition-colors duration-200 text-xl font-medium border-b border-gray-100 bg-white"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Create Account
                          </Link>
                        </>
                      )}
                      
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
          <div className="hidden md:flex items-center space-x-2">
            <nav className="flex items-center space-x-6 mr-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-calm-gray hover:text-calm-blue transition-colors duration-200 text-lg"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            
            {/* Auth component for desktop */}
            <NavbarAuth />
            
            <Link to="/book">
              <Button className="bg-calm-lavender hover:bg-calm-blue text-calm-gray font-medium rounded-md transition-colors text-lg px-6 py-2 ml-2">
                Book a Session
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
