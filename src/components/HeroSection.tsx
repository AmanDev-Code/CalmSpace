import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  imageSrc?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  buttonText = "Get Started",
  buttonLink = "/book",
  imageSrc = "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
}) => {
  return (
    <div className="relative overflow-hidden bg-calm-gradient py-16 md:py-24">
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src={imageSrc}
          alt="Calm background"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 relative z-1">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight drop-shadow-sm">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-slate-800 mb-8 max-w-2xl mx-auto font-medium drop-shadow-sm">
              {subtitle}
            </p>
          )}
          {buttonText && (
            <Link to={buttonLink}>
              <Button className="bg-calm-blue hover:bg-calm-lavender text-slate-800 text-lg px-8 py-6 rounded-md transition-all transform hover:scale-105 font-semibold">
                {buttonText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
