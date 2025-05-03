import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { 
  signInWithEmail as firebaseSignInWithEmail,
  signUpWithEmail as firebaseSignUpWithEmail,
  updateUserProfile,
  signOutUser,
  signInWithGoogle as firebaseSignInWithGoogle,
  onAuthStateChange,
  getGoogleAuthResult
} from '@/lib/firebase';
import { isNativeApp } from '@/lib/capacitorUtils';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (email: string, password: string, displayName: string) => Promise<User>;
  loginWithGoogle: () => Promise<User | null>;
  logout: () => Promise<void>;
  updateName: (displayName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkRedirectResult = async () => {
      if (isNativeApp()) {
        console.log("Checking for Google Auth redirect result in native app...");
        try {
          const result = await getGoogleAuthResult();
          if (result && result.user) {
            console.log("User authenticated via redirect:", result.user.displayName || result.user.email);
            
            // Show success toast when user is set after redirect in native app
            toast({
              title: "Login Successful",
              description: `Welcome to CalmSpace${result.user.displayName ? ', ' + result.user.displayName : ''}!`,
            });
          }
        } catch (error) {
          console.error("Error checking redirect result:", error);
        }
      }
    };

    // Check for redirect results when the component mounts
    checkRedirectResult();

    // Set up the auth state listener
    const unsubscribe = onAuthStateChange((user) => {
      console.log("Auth state changed. User:", user ? `${user.email} (${user.displayName || 'no name'})` : 'None');
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [toast]);

  // Sign in with email and password
  const login = async (email: string, password: string) => {
    try {
      const result = await firebaseSignInWithEmail(email, password);
      return result.user;
    } catch (error) {
      throw error;
    }
  };

  // Sign up with email, password and display name
  const signup = async (email: string, password: string, displayName: string) => {
    try {
      const result = await firebaseSignUpWithEmail(email, password);
      await updateUserProfile(result.user, displayName);
      return result.user;
    } catch (error) {
      throw error;
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    try {
      const result = await firebaseSignInWithGoogle();
      if (result && result.user) {
        return result.user;
      }
      
      if (isNativeApp()) {
        // In native apps with redirect, the user will be set by onAuthStateChanged
        console.log("Google sign-in initiated with redirect flow");
        return null;
      }
      
      throw new Error("Google login failed: No user returned");
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      throw error;
    }
  };

  // Update user display name
  const updateName = async (displayName: string) => {
    try {
      if (currentUser) {
        await updateUserProfile(currentUser, displayName);
        // Force refresh the current user object
        setCurrentUser({ ...currentUser, displayName });
      } else {
        throw new Error('No user is signed in');
      }
    } catch (error) {
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    loginWithGoogle,
    logout,
    updateName
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 