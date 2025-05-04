import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import SplashScreen from './SplashScreen';

interface MobileAppWrapperProps {
  children: React.ReactNode;
}

const MobileAppWrapper: React.FC<MobileAppWrapperProps> = ({ children }) => {
  const [isMobileApp, setIsMobileApp] = useState(false);
  const [showSplash, setShowSplash] = useState(false); // Initialize as false until we check path
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // List of technical paths that should be accessible without authentication or splash screen
  const technicalPaths = [
    '/.well-known',
    '/manifest.webmanifest',
    '/sw.js',
    '/workbox-',
    '/assets/'
  ];
  
  // Check if current path is a technical path that should bypass auth/splash
  const isTechnicalPath = () => {
    return technicalPaths.some(path => location.pathname.startsWith(path));
  };
  
  // Check if we're running in a mobile environment - simple user agent detection
  useEffect(() => {
    // Skip setup for technical paths
    if (isTechnicalPath()) {
      console.log("Technical path detected, skipping mobile app wrapper:", location.pathname);
      setShowSplash(false);
      return;
    }
    
    const checkPlatform = () => {
      try {
        // Use user agent detection
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isAndroid = /android/.test(userAgent);
        const isIOS = /iphone|ipad|ipod/.test(userAgent);
        
        const isMobile = isAndroid || isIOS;
        console.log("Is mobile environment:", isMobile);
        
        setIsMobileApp(isMobile);
        
        if (isMobile) {
          console.log("Mobile browser detected");
          document.body.classList.add('mobile-app');
          
          // Force enabling the splash screen in mobile mode
          setShowSplash(true);
        }
      } catch (error) {
        console.error("Error detecting platform:", error);
        setIsMobileApp(false);
      }
    };
    
    checkPlatform();
  }, [location.pathname]);

  // Handle authentication and redirection after the app loads or restarts
  useEffect(() => {
    // Skip for technical paths
    if (isTechnicalPath()) return;
    
    // Only run this effect once loading is complete
    if (loading) return;

    const isAuthRoute = ['/login', '/signup', '/verify-email', '/forgot-password'].includes(location.pathname);
    
    // If logged in and on an auth route, redirect to home
    if (currentUser && isAuthRoute) {
      console.log("User already authenticated, redirecting to home");
      navigate('/', { replace: true });
    }
    
    // If not logged in and not on an auth route on mobile, redirect to login
    // ONLY for mobile devices, not for desktop
    if (!currentUser && !isAuthRoute && isMobileApp) {
      console.log("User not authenticated on mobile, redirecting to login");
      navigate('/login', { state: { from: location } }, { replace: true });
    }
  }, [currentUser, loading, location.pathname, isMobileApp, navigate, location]);
  
  // When splash screen finishes, handle navigation appropriately
  const handleSplashFinish = () => {
    setShowSplash(false);
    
    // Authentication redirection will be handled by the useEffect above
    console.log("Splash screen finished, authentication status:", currentUser ? "Authenticated" : "Not authenticated");
  };
  
  // For technical paths, just render the children without splash or protection
  if (isTechnicalPath()) {
    return <>{children}</>;
  }
  
  // Show splash screen in mobile mode at startup (if not a technical path)
  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }
  
  // After splash screen, render the app content
  return <>{children}</>;
};

export default MobileAppWrapper; 