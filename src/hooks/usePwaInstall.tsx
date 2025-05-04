import { useState, useEffect } from 'react';

// Define the BeforeInstallPromptEvent interface since it's not in standard TypeScript types
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Add the event to the WindowEventMap for better TypeScript support
declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
    appinstalled: Event;
  }
}

export function usePwaInstall() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [installationStatus, setInstallationStatus] = useState<string>('');
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Detect Android
    const userAgent = navigator.userAgent.toLowerCase();
    const androidDetected = /android/.test(userAgent);
    setIsAndroid(androidDetected);
    
    // Check if the app is already installed
    const checkIfInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                          (window.navigator as any).standalone === true;
      
      if (isStandalone) {
        console.log('App is already installed (standalone mode)');
        setIsInstalled(true);
        setInstallationStatus('already-installed');
        return true;
      }
      
      // Check if user has marked the app as installed in localStorage
      if (localStorage.getItem('pwa-installed') === 'true') {
        console.log('App is marked as installed in localStorage');
        setIsInstalled(true);
        setInstallationStatus('marked-installed');
        return true;
      }
      
      return false;
    };

    // Don't proceed with installation setup if already installed
    if (checkIfInstalled()) {
      return;
    }

    // Check if user previously dismissed the install prompt
    const checkIfDismissed = () => {
      const dismissedTimestamp = localStorage.getItem('pwa-install-dismissed');
      if (dismissedTimestamp) {
        const now = new Date().getTime();
        const dismissed = parseInt(dismissedTimestamp, 10);
        
        // Only consider it dismissed if less than 7 days have passed
        if (now - dismissed < 7 * 24 * 60 * 60 * 1000) {
          console.log('Install prompt was previously dismissed within last 7 days');
          setIsDismissed(true);
          setInstallationStatus('recently-dismissed');
          return true;
        } else {
          // Reset dismissed state after 7 days
          localStorage.removeItem('pwa-install-dismissed');
          console.log('Previous dismissal expired, reset');
        }
      }
      return false;
    };

    // Check if prompt has been dismissed
    if (checkIfDismissed()) {
      return;
    }

    // Function to capture the beforeinstallprompt event
    const captureInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Store the event for later use
      setInstallPrompt(e);
      setInstallationStatus('prompt-available');
      console.log('Install prompt event detected and stored', e);
    };

    // Detect when the app is successfully installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
      localStorage.setItem('pwa-installed', 'true');
      setInstallationStatus('installation-successful');
      console.log('PWA was installed successfully');
    };

    // Add event listeners
    window.addEventListener('beforeinstallprompt', captureInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Debug message for troubleshooting
    console.log('PWA installation status at initialization:', {
      isStandalone: window.matchMedia('(display-mode: standalone)').matches,
      iosStandalone: (window.navigator as any).standalone,
      serviceWorkerEnabled: 'serviceWorker' in navigator,
      serviceWorkerRegistration: navigator.serviceWorker?.controller ? 'active' : 'none',
      isAndroid: androidDetected
    });

    return () => {
      // Clean up event listeners on unmount
      window.removeEventListener('beforeinstallprompt', captureInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Download APK directly for Android users
  const downloadAndroidApk = () => {
    setInstallationStatus('downloading-apk');
    // Path to the APK in the public folder
    window.location.href = '/calmspace-twa.apk';
    console.log('Initiating APK download');
    
    // Set a flag to indicate the user chose to download the APK
    localStorage.setItem('apk-download-initiated', 'true');
  };

  // Handle the install button click
  const handleInstallClick = async () => {
    // For Android, if browser prompt fails, offer direct APK download
    if (isAndroid && !installPrompt) {
      setInstallationStatus('fallback-to-apk');
      if (confirm('Would you like to download the Android app directly?')) {
        downloadAndroidApk();
        return;
      }
    }
    
    if (!installPrompt) {
      // For browsers that don't support beforeinstallprompt but might support other installation methods
      const userAgent = navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isChrome = /chrome/.test(userAgent) && !/edge|edg/.test(userAgent);
      const isSafari = /safari/.test(userAgent) && !isChrome;
      
      setInstallationStatus('prompt-not-available');
      
      if (isIOS && isSafari) {
        alert('To install this app on your iOS device:\n\n1. Tap the Share button at the bottom of the screen\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" in the top right corner');
      } else if (isChrome) {
        alert('To install this app:\n\n1. Tap the menu button (three dots) in the top right corner\n2. Tap "Install App" or "Add to Home Screen"\n3. Follow the on-screen instructions');
      } else if (isAndroid) {
        // Offer direct download for Android as a fallback
        if (confirm('Browser installation not available. Would you like to download the Android app directly?')) {
          downloadAndroidApk();
        }
      } else {
        alert('To install this app on your device:\n\n1. Look for "Install" or "Add to Home Screen" in your browser menu\n2. Follow the on-screen instructions to add the app to your home screen');
      }
      
      return;
    }

    try {
      // Show the install prompt
      console.log('Triggering installation prompt...');
      setInstallationStatus('prompting');
      await installPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const choiceResult = await installPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setIsInstalled(true);
        setInstallationStatus('user-accepted');
        localStorage.setItem('pwa-installed', 'true');
      } else {
        console.log('User dismissed the install prompt');
        setIsDismissed(true);
        setInstallationStatus('user-dismissed');
        
        if (isAndroid) {
          // Offer APK as a fallback after browser prompt dismissal
          setTimeout(() => {
            if (confirm('Would you like to try downloading the Android app directly instead?')) {
              downloadAndroidApk();
            }
          }, 500); // Short delay for better UX
        }
        
        // Store the dismissed timestamp
        localStorage.setItem('pwa-install-dismissed', new Date().getTime().toString());
      }
      
      // Clear the saved prompt since it can't be used twice
      setInstallPrompt(null);
    } catch (error) {
      console.error('Error while prompting for install:', error);
      setInstallationStatus('installation-error');
      
      if (isAndroid) {
        // Offer APK as a fallback after error
        if (confirm('Installation failed. Would you like to download the Android app directly?')) {
          downloadAndroidApk();
        }
      } else {
        // Fallback if the prompt fails
        alert('Installation failed. Please try adding this app to your home screen manually through your browser menu.');
      }
    }
  };

  // Handle user dismissing the prompt
  const handleDismiss = () => {
    setIsDismissed(true);
    setInstallationStatus('manually-dismissed');
    localStorage.setItem('pwa-install-dismissed', new Date().getTime().toString());
  };

  // For development purposes, a function to reset the installation state
  const resetInstallState = () => {
    localStorage.removeItem('pwa-installed');
    localStorage.removeItem('pwa-install-dismissed');
    localStorage.removeItem('apk-download-initiated');
    setIsDismissed(false);
    setIsInstalled(false);
    setInstallationStatus('reset');
    console.log('Installation state has been reset');
    window.location.reload();
  };

  return {
    installPrompt,
    isInstalled,
    isDismissed,
    installationStatus,
    isAndroid,
    handleInstallClick,
    downloadAndroidApk,
    handleDismiss,
    resetInstallState
  };
} 