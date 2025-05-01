
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { isValidEmail, submitFormData, sendConfirmationEmail } from '@/lib/formUtils';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export const EnquiryForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    preferredContact: 'email',
    availability: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, preferredContact: value }));
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
    
    if (formData.preferredContact === 'phone' && !formData.phone.trim()) {
      newErrors.phone = 'Phone is required for phone contact preference';
    }
    
    if (!formData.serviceType) {
      newErrors.serviceType = 'Please select a service type';
    }
    
    if (!formData.availability) {
      newErrors.availability = 'Please select your availability';
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
      // Submit the form data
      const response = await submitFormData(formData);
      
      if (response.success) {
        // Send confirmation email to the user
        await sendConfirmationEmail(formData.email, formData.name);
        
        setIsSuccess(true);
        
        toast({
          title: 'Enquiry Submitted!',
          description: 'Thank you for your enquiry. We will get back to you shortly!',
        });
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceType: '',
          preferredContact: 'email',
          availability: '',
          message: '',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: 'Failed to submit the form. Please try again later.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred. Please try again later.',
      });
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6">
          <h3 className="text-lg font-medium">Thank You!</h3>
          <p>Your enquiry has been submitted successfully. We've sent you a confirmation email and will get back to you shortly.</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-calm-gray">Your Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
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
              placeholder="john@example.com"
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
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={handleChange}
            className={`border-calm-gray/30 focus-visible:ring-calm-blue ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="serviceType" className="text-calm-gray">Service Type</Label>
          <Select value={formData.serviceType} onValueChange={(value) => handleSelectChange(value, 'serviceType')}>
            <SelectTrigger className={`border-calm-gray/30 focus-visible:ring-calm-blue ${errors.serviceType ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual-therapy">Individual Therapy</SelectItem>
              <SelectItem value="couples-therapy">Couples Therapy</SelectItem>
              <SelectItem value="group-therapy">Group Therapy</SelectItem>
              <SelectItem value="workshops">Workshops</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.serviceType && <p className="text-red-500 text-xs">{errors.serviceType}</p>}
        </div>
        
        <div className="space-y-2">
          <Label className="text-calm-gray">Preferred Contact Method</Label>
          <RadioGroup value={formData.preferredContact} onValueChange={handleRadioChange} className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email-contact" />
              <Label htmlFor="email-contact">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="phone" id="phone-contact" />
              <Label htmlFor="phone-contact">Phone</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="availability" className="text-calm-gray">Your Availability</Label>
          <Select value={formData.availability} onValueChange={(value) => handleSelectChange(value, 'availability')}>
            <SelectTrigger className={`border-calm-gray/30 focus-visible:ring-calm-blue ${errors.availability ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Select your availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekday-morning">Weekdays (Morning)</SelectItem>
              <SelectItem value="weekday-afternoon">Weekdays (Afternoon)</SelectItem>
              <SelectItem value="weekday-evening">Weekdays (Evening)</SelectItem>
              <SelectItem value="weekend">Weekends</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
          {errors.availability && <p className="text-red-500 text-xs">{errors.availability}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message" className="text-calm-gray">Additional Information</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Please share any additional details about your enquiry..."
            rows={4}
            value={formData.message}
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
              Submitting...
            </>
          ) : (
            'Submit Enquiry'
          )}
        </Button>
        
        <p className="text-xs text-calm-gray/70 text-center">
          By submitting this form, you agree to our privacy policy. We'll never share your information without your consent.
        </p>
      </form>
    </>
  );
};
