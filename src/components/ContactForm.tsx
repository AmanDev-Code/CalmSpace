import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { isValidEmail, submitFormData } from '@/lib/formUtils';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { initEmailJS } from '@/lib/emailjs';

export const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS on component mount
  useEffect(() => {
    initEmailJS();
  }, []);

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
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
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
      const response = await submitFormData(formData);
      
      if (response.success) {
        toast({
          title: 'Success!',
          description: 'Thank you for your message. We will get back to you shortly!',
        });
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
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
        <Label htmlFor="phone" className="text-calm-gray">Phone (Optional)</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+91 9876543210"
          value={formData.phone}
          onChange={handleChange}
          className="border-calm-gray/30 focus-visible:ring-calm-blue"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message" className="text-calm-gray">Your Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="How can we help you?"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`border-calm-gray/30 focus-visible:ring-calm-blue ${errors.message ? 'border-red-500' : ''}`}
        />
        {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
      </div>
      
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-calm-lavender hover:bg-calm-blue text-slate-800 font-semibold"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  );
};
