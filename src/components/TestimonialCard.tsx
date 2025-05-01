
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  imageSrc?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  quote, 
  author, 
  role,
  imageSrc 
}) => {
  return (
    <Card className="bg-white border border-calm-lavender/20 shadow-md h-full">
      <CardContent className="p-6 text-center flex flex-col items-center">
        <div className="mb-4 text-calm-blue">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
          </svg>
        </div>
        
        {imageSrc && (
          <Avatar className="w-16 h-16 mb-4 border-2 border-calm-lavender/30">
            <AvatarImage src={imageSrc} alt={author} />
            <AvatarFallback>{author.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
        
        <p className="mb-4 italic text-slate-700">{quote}</p>
        <p className="font-semibold text-slate-800">{author}</p>
        {role && <p className="text-sm text-calm-gray/70">{role}</p>}
      </CardContent>
    </Card>
  );
};
