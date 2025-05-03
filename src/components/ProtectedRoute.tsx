import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { isNativeApp, getPlatform } from '@/lib/capacitorUtils';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute = ({ children, requireAuth = false }: ProtectedRouteProps) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  const [isMobileApp, setIsMobileApp] = useState(false);

  useEffect(() => {
    // More robust check for mobile environment
    const checkPlatform = () => {
      try {
        // Get platform from Capacitor
        const platform = getPlatform();
        console.log("Detected platform in ProtectedRoute:", platform);
        
        // Check if running in a native app
        const isNative = isNativeApp();
        console.log("Is native app in ProtectedRoute:", isNative);
        
        // Fallback to user agent detection
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isAndroid = /android/.test(userAgent);
        const isIOS = /iphone|ipad|ipod/.test(userAgent);
        
        // Prioritize Capacitor detection but fallback to user agent
        const isMobile = isNative || isAndroid || isIOS || platform === 'android' || platform === 'ios';
        console.log("Is mobile environment in ProtectedRoute:", isMobile);
        
        setIsMobileApp(isMobile);
        
        if (isMobile) {
          console.log("Running in mobile environment - ProtectedRoute");
          document.body.classList.add('mobile-app');
        }
      } catch (error) {
        console.error("Error detecting platform in ProtectedRoute:", error);
        // Fallback to user agent detection in case of error
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isMobile = /android|iphone|ipad|ipod/.test(userAgent);
        setIsMobileApp(isMobile);
      }
    };
    
    checkPlatform();
  }, []);

  // Show loading state while authentication is being determined
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-calm-cream">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-calm-blue mx-auto mb-4" />
          <p className="text-lg text-calm-gray">Loading...</p>
        </div>
      </div>
    );
  }

  // If authentication is required explicitly OR we're on mobile, enforce login
  // For desktop, don't force authentication unless explicitly required
  if ((requireAuth || isMobileApp) && !currentUser) {
    console.log("Authentication required but user not logged in in ProtectedRoute, redirecting to login");
    // Redirect to login page and save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authentication requirements are met or not required, show the children
  return <>{children}</>;
};

export default ProtectedRoute; 