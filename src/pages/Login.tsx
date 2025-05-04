import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { isEmailVerified } from '@/lib/otpService';

// Simple replacement for isNativeApp
const isNativeApp = () => false;

interface LocationState {
  verifiedEmail?: string;
  password?: string;
  message?: string;
  from?: { pathname: string };
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login, loginWithGoogle, signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Extract state from location
  const state = location.state as LocationState;
  const from = state?.from?.pathname || '/';
  
  // Check if user came from email verification
  useEffect(() => {
    if (state?.verifiedEmail) {
      setEmail(state.verifiedEmail);
      
      // Also set password if provided (from OTP verification)
      if (state.password) {
        setPassword(state.password);
      }
      
      if (state.message) {
        toast({
          title: "Email Verified",
          description: state.message,
        });
      }
      
      // If we have both email and password from verification, automatically try to sign up
      if (state.verifiedEmail && state.password) {
        handleVerifiedLogin();
      }
      
      // Clear location state to prevent showing the message again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [state]);

  const handleVerifiedLogin = async () => {
    if (!state?.verifiedEmail || !state?.password) return;
    
    setIsLoading(true);
    
    try {
      // Check if email is verified by OTP
      if (!isEmailVerified(state.verifiedEmail)) {
        toast({
          variant: "destructive",
          title: "Email Not Verified",
          description: "Please verify your email before logging in.",
        });
        setIsLoading(false);
        return;
      }
      
      // Create the account after successful OTP verification
      const userName = state.verifiedEmail.split('@')[0]; // Create a basic username from email
      await signup(state.verifiedEmail, state.password, userName);
      
      toast({
        title: "Account Created",
        description: "Your account has been created successfully. You are now logged in.",
      });
      
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error("Auto login after verification failed:", error);
      
      // If the error is because account already exists, try logging in
      if (error.code === 'auth/email-already-in-use') {
        try {
          await login(state.verifiedEmail, state.password);
          toast({
            title: "Login Successful",
            description: "Welcome back to CalmSpace!",
          });
          navigate(from, { replace: true });
        } catch (loginError: any) {
          console.error("Login error after signup failed:", loginError);
          let errorMessage = "Failed to log in. Please try again.";
          
          if (loginError.code === 'auth/wrong-password') {
            errorMessage = "Incorrect password for existing account. Please enter your password manually.";
          }
          
          toast({
            variant: "destructive",
            title: "Login Failed",
            description: errorMessage,
          });
        }
      } else {
        // Display other signup errors
        let errorMessage = "Failed to create account. Please try again.";
        
        if (error.code === 'auth/invalid-email') {
          errorMessage = "Invalid email address.";
        } else if (error.code === 'auth/weak-password') {
          errorMessage = "Password is too weak. Please choose a stronger password.";
        }
        
        toast({
          variant: "destructive",
          title: "Account Creation Failed",
          description: errorMessage,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Check if email is verified by OTP if it matches a previously verified email
      if (state?.verifiedEmail === email && !isEmailVerified(email)) {
        toast({
          variant: "destructive",
          title: "Email Not Verified",
          description: "Please verify your email before logging in.",
        });
        setIsLoading(false);
        return;
      }
      
      // Normal login flow
      await login(email, password);
      toast({
        title: "Login Successful",
        description: "Welcome back to CalmSpace!",
      });
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error("Login error:", error);
      let errorMessage = "Failed to log in. Please check your credentials.";
      
      // Handle different Firebase auth error codes
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = "Invalid email or password.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many failed login attempts. Please try again later.";
      } else if (error.message === 'auth/email-not-verified') {
        errorMessage = "Email not verified. Please check your email for verification instructions.";
      }
      
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      const user = await loginWithGoogle();
      
      // For web flow, user will be returned directly
      if (user) {
        toast({
          title: "Login Successful",
          description: `Welcome to CalmSpace${user.displayName ? ', ' + user.displayName : ''}!`,
        });
        navigate(from, { replace: true });
      } else {
        // For native apps using redirect flow, we don't navigate here
        // The authentication state will be handled when app restarts after redirect
        toast({
          title: "Google Sign-In",
          description: "Please complete the Google sign-in process",
        });
        // Don't navigate - the redirect will handle it
      }
    } catch (error: any) {
      console.error("Google login error:", error);
      let errorMessage = "Failed to sign in with Google. Please try again.";
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = "Sign-in was cancelled. Please try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-16 min-h-screen flex items-center justify-center bg-calm-cream/30">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="shadow-xl border-none bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4">
                <img 
                  src="/assets/brandLogo.png" 
                  alt="CalmSpace Logo" 
                  className="h-24 w-auto" 
                />
              </div>
              <CardTitle className="text-3xl font-bold text-calm-gray">Welcome Back</CardTitle>
              <CardDescription className="text-calm-gray/70 text-lg">
                Sign in to continue your journey
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-calm-gray font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-calm-gray/50 h-5 w-5" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) {
                          const newErrors = { ...errors };
                          delete newErrors.email;
                          setErrors(newErrors);
                        }
                      }}
                      placeholder="example@email.com"
                      className={`pl-10 py-6 bg-gray-50 border-gray-200 ${errors.email ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-calm-gray font-medium">
                      Password
                    </Label>
                    <Link to="/forgot-password" className="text-calm-blue hover:underline text-sm">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-calm-gray/50 h-5 w-5" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) {
                          const newErrors = { ...errors };
                          delete newErrors.password;
                          setErrors(newErrors);
                        }
                      }}
                      placeholder="••••••••"
                      className={`pl-10 py-6 bg-gray-50 border-gray-200 ${errors.password ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-calm-gray/50 hover:text-calm-gray"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-calm-blue hover:bg-calm-lavender text-white py-6 rounded-lg shadow-md transition-all duration-300 text-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-calm-gray/70 mb-4">Or sign in with</p>
                
                <Button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-6 rounded-lg shadow-sm transition-all duration-300 text-lg mb-4"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <img src="/assets/google-icon.svg" alt="Google" className="h-5 w-5 mr-3" />
                      Continue with Google
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  disabled={true}
                  className="w-full bg-black hover:bg-gray-900 text-white border border-gray-800 py-6 rounded-lg shadow-sm transition-all duration-300 text-lg mb-4"
                >
                  <img src="/assets/apple-icon.svg" alt="Apple" className="h-5 w-5 mr-3" />
                  Continue with Apple
                </Button>
                <p className="text-center text-xs text-calm-gray/50 italic mb-6">
                  Apple login coming soon
                </p>
              </div>
                
              <div className="mt-4 text-center">
                <Button 
                  variant="outline" 
                  className="w-full bg-transparent text-gray-500 border border-gray-300 py-6 hover:bg-gray-50"
                  onClick={() => navigate('/')}
                >
                  Continue as Guest
                </Button>
                <p className="text-xs text-calm-gray/60 text-center mt-2">
                  (Desktop mode only - Mobile requires login)
                </p>
              </div>
              
              <p className="text-xs text-calm-gray/60 text-center mt-4">
                By signing in, you agree to our{" "}
                <Link to="/terms" className="text-calm-blue hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-calm-blue hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </CardContent>
            
            <CardFooter className="flex justify-center border-t border-gray-100 pt-6">
              <p className="text-calm-gray">
                Don't have an account?{" "}
                <Link to="/signup" className="text-calm-blue font-semibold hover:underline">
                  Sign Up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Login; 