import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { isValidEmail } from '@/lib/formUtils';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BookingForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    therapistPreference: '',
    concerns: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user selects
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!date) {
      newErrors.date = 'Please select a date';
    }
    
    if (!formData.serviceType) {
      newErrors.serviceType = 'Please select a revenue stream or service type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Combine form data with selected date
      const fullFormData = {
        ...formData,
        appointmentDate: date ? format(date, 'PPP') : '',
      };
      
      // Instead of submitting the form data directly, store it in sessionStorage and navigate to checkout
      sessionStorage.setItem('bookingData', JSON.stringify(fullFormData));
      
      // Redirect to checkout page
      navigate('/checkout');
      
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred. Please try again later.',
      });
      console.error('Booking submission error:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-calm-gray">Your Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Ananya Sharma"
              value={formData.name}
              onChange={handleChange}
              className={`border-calm-gray/30 focus-visible:ring-calm-blue ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-calm-gray">Your Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="ananya@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`border-calm-gray/30 focus-visible:ring-calm-blue ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-calm-gray">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+91 9876543210"
            value={formData.phone}
            onChange={handleChange}
            className={`border-calm-gray/30 focus-visible:ring-calm-blue ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="serviceType" className="text-calm-gray">Revenue Stream / Service Type</Label>
            <Select value={formData.serviceType} onValueChange={(value) => handleSelectChange(value, 'serviceType')}>
              <SelectTrigger className={`border-calm-gray/30 focus-visible:ring-calm-blue ${errors.serviceType ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select a revenue stream or service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="subscription-based-model">Subscription-Based Model</SelectItem>
                <SelectItem value="pay-per-session-model">Pay-Per-Session Model</SelectItem>
                <SelectItem value="corporate-wellness-programs">Corporate Wellness Programs</SelectItem>
                <SelectItem value="workshops-webinars">Workshops & Webinars</SelectItem>
                <SelectItem value="affiliate-marketing">Affiliate Marketing</SelectItem>
                <SelectItem value="freemium-model">Freemium Model</SelectItem>
                <SelectItem value="sponsored-content-ads">Sponsored Content & Ads</SelectItem>
                <SelectItem value="e-books-online-courses">E-Books & Online Courses</SelectItem>
                <SelectItem value="donations-crowdfunding">Donations & Crowdfunding</SelectItem>
                <SelectItem value="licensing-platform">Licensing Platform</SelectItem>
              </SelectContent>
            </Select>
            {errors.serviceType && <p className="text-red-500 text-xs">{errors.serviceType}</p>}
            
            {/* Service Pricing Information */}
            {formData.serviceType && (
              <div className="mt-2 text-sm bg-calm-cream/30 p-3 rounded-md border border-calm-lavender/20">
                <p className="font-medium text-calm-gray mb-1">Fee Structure:</p>
                {formData.serviceType === 'subscription-based-model' && (
                  <p className="text-calm-gray/80">Basic: ₹500/month | Premium: ₹1,500/month | Family Plan: ₹3,000/month (4 users)</p>
                )}
                {formData.serviceType === 'pay-per-session-model' && (
                  <p className="text-calm-gray/80">Standard Session: ₹1,000–₹2,500 per session</p>
                )}
                {formData.serviceType === 'corporate-wellness-programs' && (
                  <p className="text-calm-gray/80">Enterprise Package: ₹50,000–₹200,000 annually per company</p>
                )}
                {formData.serviceType === 'workshops-webinars' && (
                  <p className="text-calm-gray/80">Per Attendee: ₹500–₹2,000 per attendee</p>
                )}
                {formData.serviceType === 'affiliate-marketing' && (
                  <p className="text-calm-gray/80">Performance-based: Commission-based</p>
                )}
                {formData.serviceType === 'freemium-model' && (
                  <p className="text-calm-gray/80">Premium Features: In-app purchases</p>
                )}
                {formData.serviceType === 'sponsored-content-ads' && (
                  <p className="text-calm-gray/80">Campaign Pricing: ₹10,000–₹50,000 per campaign</p>
                )}
                {formData.serviceType === 'e-books-online-courses' && (
                  <p className="text-calm-gray/80">Digital Products: ₹500–₹2,000 per product</p>
                )}
                {formData.serviceType === 'donations-crowdfunding' && (
                  <p className="text-calm-gray/80">Voluntary Contribution: User-determined</p>
                )}
                {formData.serviceType === 'licensing-platform' && (
                  <p className="text-calm-gray/80">Custom Licensing: Fee-based</p>
                )}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="therapistPreference" className="text-calm-gray">Therapist Preference (Optional)</Label>
            <Select value={formData.therapistPreference} onValueChange={(value) => handleSelectChange(value, 'therapistPreference')}>
              <SelectTrigger className="border-calm-gray/30 focus-visible:ring-calm-blue">
                <SelectValue placeholder="No preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-preference">No Preference</SelectItem>
                <SelectItem value="dr-sharma">Dr. Priya Sharma (Mindfulness Specialist)</SelectItem>
                <SelectItem value="dr-mehta">Dr. Rajiv Mehta (Sleep & Anxiety Expert)</SelectItem>
                <SelectItem value="dr-das">Dr. Priyanka Das (Workplace Wellness Consultant)</SelectItem>
                <SelectItem value="dr-kapoor">Dr. Arjun Kapoor (Depression & Public Health)</SelectItem>
                <SelectItem value="dr-reddy">Dr. Arjun Reddy (Digital Wellness Specialist)</SelectItem>
                <SelectItem value="dr-patel">Dr. Anjali Patel (Relationship Therapist)</SelectItem>
                <SelectItem value="dr-krishnan">Dr. Maya Krishnan (Burnout Prevention Expert)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-calm-gray">Preferred Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal border-calm-gray/30",
                  !date && "text-muted-foreground",
                  errors.date && "border-red-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Select a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today;
                }}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="concerns" className="text-calm-gray">Brief Description of Your Concerns (Optional)</Label>
          <Textarea
            id="concerns"
            name="concerns"
            placeholder="Please share anything you'd like us to know before your session..."
            rows={4}
            value={formData.concerns}
            onChange={handleChange}
            className="border-calm-gray/30 focus-visible:ring-calm-blue"
          />
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-calm-lavender hover:bg-calm-blue text-calm-gray font-semibold"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Continue to Checkout'
          )}
        </Button>
        
        <p className="text-xs text-calm-gray/70 text-center">
          By proceeding to checkout, you agree to our terms and cancellation policy.
        </p>
      </form>
    </>
  );
};
