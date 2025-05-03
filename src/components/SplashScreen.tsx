import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { hideSplashScreen, isNativeApp, getGoogleAuthResult, showSplashScreen, getPlatform } from '@/lib/capacitorUtils';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { App as CapacitorApp } from '@capacitor/app';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [showLoader, setShowLoader] = useState(true);
  const { toast } = useToast();
  const { currentUser } = useAuth();
  
  // Listen for app URL opens (deep links)
  useEffect(() => {
    // Only setup deep link handler if in a native app
    if (isNativeApp()) {
      const setupUrlOpenListener = async () => {
        try {
          // Listen for URL open events (triggered when app opens from a deep link)
          CapacitorApp.addListener('appUrlOpen', async (data: { url: string }) => {
            console.log('App opened with URL:', data.url);
            
            // Check if this is an auth callback URL
            if (data.url.includes('auth-callback')) {
              console.log('Detected auth callback URL:', data.url);
              console.log('Attempting to process Google auth result from deep link');
              
              // Check auth result
              try {
                console.log('Calling getGoogleAuthResult');
                const result = await getGoogleAuthResult();
                console.log('Auth result after deep link:', result ? 'Got result' : 'No result');
                
                if (result && result.user) {
                  console.log('Google auth successful via deep link redirect');
                  console.log('User info:', result.user.displayName, result.user.email);
                  toast({
                    title: "Login Successful",
                    description: `Welcome to CalmSpace${result.user.displayName ? ', ' + result.user.displayName : ''}!`,
                  });
                } else {
                  console.log('No auth result found after deep link redirect');
                  console.log('This might mean the auth callback URL was opened but no pending auth operation exists');
                  console.log('Or the user might have denied permission in the Google auth flow');
                }
              } catch (error) {
                console.error('Error checking auth result after deep link:', error);
                console.error('Error details:', JSON.stringify(error));
              }
            }
          });
          
          console.log('App URL open listener set up successfully');
        } catch (error) {
          console.error('Error setting up app URL open listener:', error);
        }
      };
      
      setupUrlOpenListener();
      
      // Cleanup listener on unmount
      return () => {
        CapacitorApp.removeAllListeners();
      };
    }
  }, [toast]);
  
  useEffect(() => {
    // Handle the transition from native splash to our custom splash
    const handleSplashTransition = async () => {
      try {
        console.log("Custom splash screen mounted, platform:", getPlatform());
        
        // If we're in a native app, handle the native splash screen
        if (isNativeApp()) {
          // First check if we already have a user (might be from a deep link redirect)
          if (currentUser) {
            console.log("User already authenticated on splash screen:", 
              currentUser.displayName || currentUser.email);
          }
          
          // First try to explicitly show the splash screen (in case it wasn't shown automatically)
          try {
            await showSplashScreen();
            console.log("Native splash screen shown explicitly");
          } catch (showError) {
            console.warn("Could not explicitly show native splash screen:", showError);
          }
          
          // Then wait a moment before hiding it
          setTimeout(async () => {
            try {
              await hideSplashScreen();
              console.log("Native splash screen hidden successfully");
            } catch (hideError) {
              console.warn("Error hiding native splash screen:", hideError);
            }
            
            // Check for Google Auth redirect result during splash
            try {
              const result = await getGoogleAuthResult();
              if (result && result.user) {
                console.log("User authenticated during splash:", result.user.displayName || result.user.email);
                
                // Show success toast when user is set after redirect in native app
                toast({
                  title: "Login Successful",
                  description: `Welcome to CalmSpace${result.user.displayName ? ', ' + result.user.displayName : ''}!`,
                });
              }
            } catch (authError) {
              console.warn("Error checking auth redirect result:", authError);
            }
          }, 500);
        }
        
        // Add a small delay to make sure the splash screen is visible for a reasonable time
        setTimeout(() => {
          setShowLoader(false);
          setTimeout(onFinish, 500); // Short delay for animation to complete
        }, 3000); // Extended time to show splash screen to ensure visibility
      } catch (error) {
        console.error("Error handling splash screen:", error);
        // Ensure we continue even if there's an error, but with a delay
        setTimeout(() => {
          setShowLoader(false);
          setTimeout(onFinish, 500);
        }, 2000);
      }
    };
    
    handleSplashTransition();
  }, [onFinish, toast, currentUser]);
  
  return (
    <div className={`fixed inset-0 bg-calm-cream z-50 flex items-center justify-center transition-opacity duration-500 ${showLoader ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center">
        <img 
          src="/assets/brandLogo.png" 
          alt="CalmSpace Logo" 
          className="h-40 w-auto mb-8 animate-pulse" 
        />
        <h1 className="text-3xl font-bold text-calm-gray mb-4">CalmSpace</h1>
        <p className="text-calm-gray/70 mb-8">Find peace within. One step at a time.</p>
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-calm-blue" />
      </div>
    </div>
  );
};

export default SplashScreen; 