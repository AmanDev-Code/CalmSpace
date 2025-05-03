import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import SplashScreen from './SplashScreen';
import { isNativeApp, getGoogleAuthResult, getPlatform } from '@/lib/capacitorUtils';

interface MobileAppWrapperProps {
  children: React.ReactNode;
}

const MobileAppWrapper: React.FC<MobileAppWrapperProps> = ({ children }) => {
  const [isMobileApp, setIsMobileApp] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we're running in a mobile environment - more aggressive detection
  useEffect(() => {
    const checkPlatform = async () => {
      try {
        // Check platform using Capacitor
        const platform = getPlatform();
        console.log("Detected platform:", platform);
        
        // Check if running in a native app
        const isNative = isNativeApp();
        console.log("Is native app:", isNative);
        
        // Fallback to user agent detection if needed
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isAndroid = /android/.test(userAgent);
        const isIOS = /iphone|ipad|ipod/.test(userAgent);
        
        // Prioritize Capacitor detection but fallback to user agent
        const isMobile = isNative || isAndroid || isIOS || platform === 'android' || platform === 'ios';
        console.log("Is mobile environment:", isMobile);
        
        setIsMobileApp(isMobile);
        
        if (isMobile) {
          console.log("Mobile app detected - initializing mobile flow");
          document.body.classList.add('mobile-app');
          
          // Force enabling the splash screen in mobile mode
          setShowSplash(true);
        }
      } catch (error) {
        console.error("Error detecting platform:", error);
        // Fallback to user agent detection in case of error
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isMobile = /android|iphone|ipad|ipod/.test(userAgent);
        setIsMobileApp(isMobile);
      }
    };
    
    checkPlatform();
  }, []);

  // Handle authentication and redirection after the app loads or restarts
  useEffect(() => {
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
  
  // Always show splash screen in mobile mode at startup
  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }
  
  // After splash screen, render the app content
  return <>{children}</>;
};

export default MobileAppWrapper; 