import { useState, useCallback } from 'react';

interface UseOtpOptions {
  length?: number;
  onComplete?: (otp: string) => void;
}

export const useOtp = (options: UseOtpOptions = {}) => {
  const { length = 6, onComplete } = options;
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  
  const handleChange = useCallback((value: string, index: number) => {
    if (value.length > 1) {
      // Handle pasting of the full OTP
      const pastedOtp = value.slice(0, length).split('');
      const newOtp = [...otp];
      
      for (let i = 0; i < pastedOtp.length; i++) {
        const targetIndex = index + i;
        if (targetIndex < length) {
          newOtp[targetIndex] = pastedOtp[i];
        }
      }
      
      setOtp(newOtp);
      
      const joinedOtp = newOtp.join('');
      if (joinedOtp.length === length && onComplete) {
        onComplete(joinedOtp);
      }
    } else {
      // Handle normal typing
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      const joinedOtp = newOtp.join('');
      if (joinedOtp.length === length && onComplete) {
        onComplete(joinedOtp);
      }
    }
  }, [otp, length, onComplete]);
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move focus to previous input if current input is empty and backspace is pressed
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  }, [otp]);
  
  const getOtpValue = useCallback(() => {
    return otp.join('');
  }, [otp]);
  
  const clearOtp = useCallback(() => {
    setOtp(Array(length).fill(''));
  }, [length]);
  
  return {
    otp,
    handleChange,
    handleKeyDown,
    getOtpValue,
    clearOtp,
  };
}; 