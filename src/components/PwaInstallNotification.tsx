import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, X } from 'lucide-react';
import { usePwaInstall } from '@/hooks/usePwaInstall';

const PwaInstallNotification: React.FC = () => {
  const { isInstalled, isDismissed } = usePwaInstall();
  const [showNotification, setShowNotification] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only show on desktop devices
    const checkDesktop = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|iphone|ipad|ipod/.test(userAgent);
      setIsDesktop(!isMobile);
    };

    // Check if the notification has been dismissed in the last 7 days
    const checkDismissed = () => {
      const dismissedTime = localStorage.getItem('pwa-notification-dismissed');
      if (dismissedTime) {
        const now = new Date().getTime();
        const dismissed = parseInt(dismissedTime, 10);
        // If less than 7 days have passed, don't show
        if (now - dismissed < 7 * 24 * 60 * 60 * 1000) {
          return true;
        }
      }
      return false;
    };

    // Only show if:
    // 1. On desktop
    // 2. Not already installed
    // 3. Not recently dismissed
    checkDesktop();
    if (isDesktop && !isInstalled && !isDismissed && !checkDismissed()) {
      // Show notification after a delay
      const timer = setTimeout(() => {
        setShowNotification(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isDesktop, isInstalled, isDismissed]);

  const handleDismiss = () => {
    setShowNotification(false);
    localStorage.setItem('pwa-notification-dismissed', new Date().getTime().toString());
  };

  if (!showNotification) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 max-w-xs bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-50 animate-fadeIn">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <Download className="h-5 w-5 text-calm-blue mr-2" />
          <p className="text-sm font-medium text-calm-gray">
            Did you know you can install CalmSpace as an app?
          </p>
        </div>
        <button 
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-500"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="mt-3">
        <Link
          to="/install"
          className="block w-full text-center bg-calm-blue hover:bg-calm-lavender text-white text-sm py-2 px-4 rounded transition-colors"
        >
          Learn How to Install
        </Link>
      </div>
    </div>
  );
};

export default PwaInstallNotification; 