import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { usePwaInstall } from '@/hooks/use-pwa-install';

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

export const PWAInstallPrompt: React.FC = () => {
  const {
    installPrompt,
    isInstalled,
    isDismissed,
    handleInstallClick,
    handleDismiss,
    resetInstallState
  } = usePwaInstall();

  // Only show the install button if:
  // 1. The app is not already installed
  // 2. The install prompt is available
  // 3. The user hasn't dismissed the prompt
  if (isInstalled || !installPrompt || isDismissed) {
    // For development, we can provide a way to reset the dismissed/installed state
    if (process.env.NODE_ENV === 'development') {
      return (
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2 text-xs"
          onClick={resetInstallState}
        >
          <Download className="h-4 w-4" />
          Reset Install State
        </Button>
      );
    }
    return null;
  }

  return (
    <div className="mb-4 p-3 bg-calm-cream rounded-lg">
      <div className="flex flex-col space-y-3">
        <div>
          <h4 className="font-medium text-sm text-calm-gray">Install CalmSpace</h4>
          <p className="text-xs text-calm-gray/70">Add to your home screen for easy access</p>
        </div>
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={handleDismiss}
          >
            Not now
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="bg-calm-lavender hover:bg-calm-blue text-slate-800 text-xs flex items-center gap-1"
            onClick={handleInstallClick}
          >
            <Download className="h-3 w-3" />
            Install
          </Button>
        </div>
      </div>
    </div>
  );
};

// This is a separate component that can be placed anywhere in the UI
// for mobile users to install the app from the sidebar
export const PWASidebarInstallButton: React.FC = () => {
  const {
    installPrompt,
    isInstalled,
    handleInstallClick
  } = usePwaInstall();

  // Only show the button if the app can be installed and we're on mobile
  if (isInstalled || !installPrompt) {
    return null;
  }

  return (
    <Button 
      variant="ghost" 
      className="w-full justify-start text-calm-gray hover:text-calm-blue hover:bg-calm-cream/50 flex items-center gap-2 text-sm mb-2"
      onClick={handleInstallClick}
    >
      <Download className="h-4 w-4" />
      Install App
    </Button>
  );
}; 