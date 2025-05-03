import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const FirebaseTest = () => {
  const { currentUser, loading, loginWithGoogle } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsAuthLoading(true);
    try {
      await loginWithGoogle();
      toast({
        title: "Login Successful",
        description: "You've successfully logged in with Google!",
      });
    } catch (error: any) {
      console.error('Google login error:', error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Failed to sign in with Google",
      });
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-calm-blue" />
        <span className="ml-2">Loading authentication status...</span>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Firebase Authentication Test</CardTitle>
        <CardDescription className="text-center">
          Test Firebase authentication functionality
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {currentUser ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-medium text-green-800 mb-2">Successfully Authenticated!</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Display Name:</span> {currentUser.displayName || 'Not set'}</p>
              <p><span className="font-semibold">Email:</span> {currentUser.email}</p>
              <p><span className="font-semibold">User ID:</span> {currentUser.uid}</p>
              {currentUser.photoURL && (
                <div className="mt-2">
                  <img 
                    src={currentUser.photoURL} 
                    alt="Profile" 
                    className="h-16 w-16 rounded-full border-2 border-calm-blue"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-blue-800">You are not signed in. Test authentication by clicking the button below.</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-3">
        {!currentUser ? (
          <Button
            onClick={handleGoogleLogin}
            disabled={isAuthLoading}
            className="w-full"
          >
            {isAuthLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign in with Google'
            )}
          </Button>
        ) : (
          <div className="space-y-3 w-full">
            <Button onClick={() => handleNavigation('/profile')} className="w-full bg-calm-blue">
              Go to Profile
            </Button>
            <Button onClick={() => handleNavigation('/')} variant="outline" className="w-full">
              Back to Home
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default FirebaseTest; 