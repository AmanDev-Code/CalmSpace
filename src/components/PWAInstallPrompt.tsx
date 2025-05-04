import React, { useState, useEffect } from 'react';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { Download, X, Info, ChevronDown, ChevronUp, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PWAInstallPrompt: React.FC = () => {
  const {
    installPrompt,
    isInstalled,
    isDismissed,
    installationStatus,
    isAndroid,
    handleInstallClick,
    downloadAndroidApk,
    handleDismiss,
    resetInstallState
  } = usePwaInstall();

  const [showDebug, setShowDebug] = useState(false);

  // Only show the install prompt if:
  // 1. The app is not already installed
  // 2. The user hasn't dismissed the prompt
  if (isInstalled || isDismissed) {
    return null;
  }

  // Get browser information for better guidance
  const userAgent = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isChrome = /chrome/.test(userAgent) && !/edge|edg/.test(userAgent);
  const isSafari = /safari/.test(userAgent) && !isChrome;
  
  // Determine if manual installation is needed
  const needsManualInstall = !installPrompt || isIOS;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-95 shadow-lg p-4 z-50 animate-slideUp">
      <div className="max-w-xl mx-auto">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-lg flex items-center">
              <Download className="h-5 w-5 mr-2 text-calm-blue" />
              Install CalmSpace App
            </h3>
            <p className="text-sm text-gray-600">Add to Home Screen for the best experience</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowDebug(!showDebug)}
              className="text-gray-400 hover:text-gray-600 p-1"
              aria-label="Debug Info"
            >
              <Info className="h-4 w-4" />
            </button>
            <button 
              onClick={handleDismiss} 
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Debug information (only shown when clicked) */}
        {showDebug && (
          <div className="bg-gray-100 p-3 rounded-md mb-3 text-xs font-mono">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-bold">Installation Debug Info</h4>
              <button 
                onClick={() => setShowDebug(false)}
                className="text-gray-500"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
            </div>
            <div>Status: <span className="text-blue-600">{installationStatus || 'unknown'}</span></div>
            <div>Browser: {isIOS ? 'iOS' : (isChrome ? 'Chrome' : (isSafari ? 'Safari' : 'Other'))}</div>
            <div>Android: {isAndroid ? 'Yes' : 'No'}</div>
            <div>Prompt Available: {installPrompt ? 'Yes' : 'No'}</div>
            <div>Service Worker: {navigator.serviceWorker?.controller ? 'Active' : 'Inactive'}</div>
            <div>Display Mode: {window.matchMedia('(display-mode: standalone)').matches ? 'Standalone' : 'Browser'}</div>
            <button 
              onClick={resetInstallState}
              className="mt-2 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-xs"
            >
              Reset Installation State
            </button>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-2">
          {needsManualInstall ? (
            // For browsers that require manual installation (like iOS Safari)
            <>
              <Link 
                to="/install" 
                className="flex-1 bg-calm-blue text-white px-4 py-2.5 rounded-md text-center font-medium flex items-center justify-center"
              >
                View Installation Guide
              </Link>
              
              {/* For Android, show direct download option */}
              {isAndroid && (
                <button 
                  onClick={downloadAndroidApk} 
                  className="flex-1 bg-green-600 text-white px-4 py-2.5 rounded-md font-medium flex items-center justify-center"
                >
                  <Smartphone className="h-5 w-5 mr-2" />
                  Download Android App
                </button>
              )}
            </>
          ) : (
            // For browsers that support automatic installation
            <>
              <button 
                onClick={handleInstallClick} 
                className="flex-1 bg-calm-blue text-white px-4 py-2.5 rounded-md font-medium flex items-center justify-center"
              >
                <Download className="h-5 w-5 mr-2" />
                Install Now
              </button>
              
              {/* Always show direct download for Android as an alternative */}
              {isAndroid && (
                <button 
                  onClick={downloadAndroidApk} 
                  className="flex-1 bg-green-600 text-white px-4 py-2.5 rounded-md font-medium flex items-center justify-center"
                >
                  <Smartphone className="h-5 w-5 mr-2" />
                  Download APK
                </button>
              )}
            </>
          )}
          
          {isIOS && (
            <div className="text-xs text-amber-700 bg-amber-50 p-2 rounded-md mt-1">
              iOS users: Tap "Share" icon, then "Add to Home Screen"
            </div>
          )}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/pwa-debug" className="text-xs text-calm-blue/80 hover:text-calm-blue">
              Installation Issues?
            </Link>
          </div>
          {showDebug && (
            <button 
              onClick={() => setShowDebug(false)}
              className="text-xs text-calm-blue/80 hover:text-calm-blue"
            >
              Hide Debug
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;

// This is a separate component that can be placed anywhere in the UI
// for mobile users to install the app from the sidebar
export const PWASidebarInstallButton: React.FC = () => {
  const {
    installPrompt,
    isInstalled,
    isAndroid,
    handleInstallClick,
    downloadAndroidApk
  } = usePwaInstall();

  // Only show the button if the app can be installed
  if (isInstalled) {
    return null;
  }

  return (
    <>
      <Button 
        variant="ghost" 
        className="w-full justify-start text-calm-gray hover:text-calm-blue hover:bg-calm-cream/50 flex items-center gap-2 text-sm mb-2"
        onClick={handleInstallClick}
      >
        <Download className="h-4 w-4" />
        Install App
      </Button>
      
      {isAndroid && (
        <Button 
          variant="ghost" 
          className="w-full justify-start text-calm-gray hover:text-green-600 hover:bg-calm-cream/50 flex items-center gap-2 text-sm mb-2"
          onClick={downloadAndroidApk}
        >
          <Smartphone className="h-4 w-4" />
          Download APK
        </Button>
      )}
    </>
  );
}; 