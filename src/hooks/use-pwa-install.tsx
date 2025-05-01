import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

// Define BeforeInstallPromptEvent type since it's not in the standard TypeScript definitions
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

declare global {
  interface WindowEventMap {
    'beforeinstallprompt': BeforeInstallPromptEvent;
    'appinstalled': Event;
  }
}

interface UsePwaInstallReturn {
  installPrompt: BeforeInstallPromptEvent | null;
  isInstalled: boolean;
  isDismissed: boolean;
  handleInstallClick: () => Promise<void>;
  handleDismiss: () => void;
  resetInstallState: () => void;
}

export function usePwaInstall(): UsePwaInstallReturn {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    return !!dismissed;
  });
  const { toast } = useToast();

  useEffect(() => {
    // Function to handle the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Store the event for later use
      setInstallPrompt(e);
    };

    // Function to handle the appinstalled event
    const handleAppInstalled = () => {
      // App has been installed
      setIsInstalled(true);
      setInstallPrompt(null);
      localStorage.setItem('pwa-installed', 'true');
      
      toast({
        title: "App Installed!",
        description: "CalmSpace has been successfully installed on your device.",
      });
    };

    // Check if the app is already installed
    const checkIfInstalled = () => {
      // Check if running as a PWA
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
      }
      
      // Also check localStorage in case the user has installed it before
      if (localStorage.getItem('pwa-installed') === 'true') {
        setIsInstalled(true);
      }
    };

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    
    // Check if installed on mount
    checkIfInstalled();

    // Cleanup event listeners
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [toast]);

  // Function to handle the install prompt
  const handleInstallClick = async () => {
    if (!installPrompt) {
      // If the install prompt is not available, show a message
      toast({
        title: "Installation not available",
        description: "Your browser doesn't support installation or the app is already installed.",
        variant: "destructive",
      });
      return;
    }

    // Show the installation prompt
    await installPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const choiceResult = await installPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      // User accepted the installation
      setIsInstalled(true);
      localStorage.setItem('pwa-installed', 'true');
      
      toast({
        title: "Installing...",
        description: "CalmSpace is being installed on your device.",
      });
    } else {
      // User dismissed the installation
      setIsDismissed(true);
      localStorage.setItem('pwa-install-dismissed', 'true');
    }
    
    // Clear the saved prompt
    setInstallPrompt(null);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  const resetInstallState = () => {
    localStorage.removeItem('pwa-install-dismissed');
    localStorage.removeItem('pwa-installed');
    setIsDismissed(false);
    setIsInstalled(false);
  };

  return {
    installPrompt,
    isInstalled,
    isDismissed,
    handleInstallClick,
    handleDismiss,
    resetInstallState
  };
} 