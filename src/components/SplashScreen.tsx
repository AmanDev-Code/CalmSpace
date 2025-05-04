import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [showLoader, setShowLoader] = useState(true);
  const { toast } = useToast();
  const { currentUser } = useAuth();
  
  useEffect(() => {
    // Handle the transition from splash to main UI
    const handleSplashTransition = async () => {
      try {
        console.log("Custom splash screen mounted");
        
        // If we already have a user, show a welcome toast
        if (currentUser) {
          console.log("User already authenticated on splash screen:", 
            currentUser.displayName || currentUser.email);
            
          toast({
            title: "Welcome Back",
            description: `Welcome to CalmSpace${currentUser.displayName ? ', ' + currentUser.displayName : ''}!`,
          });
        }
        
        // Add a small delay to make sure the splash screen is visible for a reasonable time
        setTimeout(() => {
          setShowLoader(false);
          setTimeout(onFinish, 500); // Short delay for animation to complete
        }, 2000); // Show splash screen for 2 seconds
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