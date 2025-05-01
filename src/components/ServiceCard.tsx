
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon: Icon,
  link = "/book" 
}) => {
  return (
    <Card className="bg-white border-calm-blue/10 shadow-sm hover:shadow-md transition-all">
      <CardHeader>
        <div className="mb-4 p-3 bg-calm-mint rounded-full w-fit">
          <Icon className="h-6 w-6 text-calm-gray" />
        </div>
        <CardTitle className="text-xl font-playfair text-calm-gray">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-calm-gray/80 min-h-[80px]">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Link to={link} className="w-full">
          <Button variant="outline" className="w-full border-calm-lavender text-calm-gray hover:bg-calm-lavender">
            Learn More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
