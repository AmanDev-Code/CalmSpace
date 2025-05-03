import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { initEmailJS } from '@/lib/emailjs';
import { signUpWithEmail } from '@/lib/firebase';
import { sendOTPEmail } from '@/lib/otpService';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { loginWithGoogle } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize EmailJS when component mounts
  useEffect(() => {
    // Initialize both general EmailJS and OTP-specific EmailJS
    initEmailJS();
    console.log('General EmailJS initialized in Signup component');
    
    // Initialize the OTP-specific EmailJS service for verification emails
    import('@/lib/otpEmailService').then(({ initOtpEmailJS }) => {
      initOtpEmailJS();
      console.log('OTP-specific EmailJS initialized in Signup component');
    }).catch(error => {
      console.error('Failed to initialize OTP-specific EmailJS:', error);
    });
  }, []);

  // If there's a "from" path in location state, use it for redirection after signup
  const from = (location.state as any)?.from?.pathname || '/';

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
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
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    console.log('Starting signup process for:', email);
    
    try {
      // Ensure the OTP EmailJS service is initialized before sending the OTP
      const { initOtpEmailJS, sendOtpEmail } = await import('@/lib/otpEmailService');
      initOtpEmailJS();
      console.log('OTP EmailJS service initialized before sending OTP');
      
      // First try sending OTP directly with the dedicated OTP service
      console.log('Attempting to send OTP directly via otpEmailService...');
      const otpParams = {
        to_name: name,
        to_email: email,
        expiry_minutes: 15
      };
      
      // Try with the direct service first
      try {
        console.log('Sending OTP with direct service for:', email);
        const directResult = await sendOtpEmail(otpParams);
        
        if (directResult.success) {
          console.log('OTP sent successfully with direct service');
          
          // Navigate to verification page
          navigate('/verify-email', { 
            state: { 
              email,
              name,
              password
            } 
          });
          
          toast({
            title: "Verification Code Sent",
            description: "Please check your email for the verification code.",
          });
          
          setIsLoading(false);
          return;
        } else {
          console.warn('Direct OTP service failed:', directResult.message);
        }
      } catch (directError) {
        console.error('Error using direct OTP service:', directError);
      }
      
      // Fall back to the original OTP service if direct method fails
      console.log('Falling back to main OTP service...');
      const otpResult = await sendOTPEmail(email, name);
      
      if (!otpResult.success) {
        throw new Error(otpResult.message || 'Failed to send verification code');
      }
      
      console.log('OTP sent successfully with fallback service. Navigating to verification page.');
      
      // Navigate to verification page
      navigate('/verify-email', { 
        state: { 
          email,
          name,
          password
        } 
      });
      
      toast({
        title: "Verification Code Sent",
        description: "Please check your email for the verification code.",
      });
      
    } catch (error: any) {
      console.error("Signup error:", error);
      let errorMessage = "Failed to send verification code. Please try again.";
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    
    try {
      const user = await loginWithGoogle();
      
      // For web flow, user will be returned directly
      if (user) {
        toast({
          title: "Account Created",
          description: `Welcome to CalmSpace${user.displayName ? ', ' + user.displayName : ''}!`,
        });
        navigate(from, { replace: true });
      } else {
        // For native apps using redirect flow, we don't navigate here
        // The authentication state will be handled when app restarts after redirect
        toast({
          title: "Google Sign-Up",
          description: "Please complete the Google sign-in process",
        });
        // Don't navigate - the redirect will handle it
      }
    } catch (error: any) {
      console.error("Google signup error:", error);
      let errorMessage = "Error signing up with Google. Please try again.";
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = "Sign-up was cancelled. Please try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        variant: "destructive",
        title: "Signup Failed",
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
              <CardTitle className="text-3xl font-bold text-calm-gray">Create Account</CardTitle>
              <CardDescription className="text-calm-gray/70 text-lg">
                Join us on your wellness journey
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-calm-gray font-medium">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-calm-gray/50 h-5 w-5" />
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) {
                          const newErrors = { ...errors };
                          delete newErrors.name;
                          setErrors(newErrors);
                        }
                      }}
                      placeholder="John Doe"
                      className={`pl-10 py-6 bg-gray-50 border-gray-200 ${errors.name ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
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
                  <Label htmlFor="password" className="text-calm-gray font-medium">
                    Password
                  </Label>
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
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-calm-gray font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-calm-gray/50 h-5 w-5" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) {
                          const newErrors = { ...errors };
                          delete newErrors.confirmPassword;
                          setErrors(newErrors);
                        }
                      }}
                      placeholder="••••••••"
                      className={`pl-10 py-6 bg-gray-50 border-gray-200 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-calm-gray/50 hover:text-calm-gray"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
                
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-calm-blue hover:bg-calm-lavender text-white py-6 rounded-lg shadow-md transition-all duration-300 text-lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending Verification...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </div>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-calm-gray/70 mb-4">Or sign up with</p>
                
                <Button
                  type="button"
                  onClick={handleGoogleSignup}
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
              </div>
              
              <p className="text-xs text-calm-gray/60 text-center mt-4">
                By creating an account, you agree to our{" "}
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
                Already have an account?{" "}
                <Link to="/login" className="text-calm-blue font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Signup; 