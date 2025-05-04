import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute = ({ children, requireAuth = false }: ProtectedRouteProps) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  const [isMobileApp, setIsMobileApp] = useState(false);

  useEffect(() => {
    // Simple user agent detection for mobile devices
    const checkPlatform = () => {
      try {
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isAndroid = /android/.test(userAgent);
        const isIOS = /iphone|ipad|ipod/.test(userAgent);
        
        const isMobile = isAndroid || isIOS;
        console.log("Is mobile environment in ProtectedRoute:", isMobile);
        
        setIsMobileApp(isMobile);
        
        if (isMobile) {
          console.log("Running in mobile browser - ProtectedRoute");
          document.body.classList.add('mobile-app');
        }
      } catch (error) {
        console.error("Error detecting platform in ProtectedRoute:", error);
        setIsMobileApp(false);
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