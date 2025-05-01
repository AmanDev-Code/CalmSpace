
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  downloadUrl: string;
  fileType: string;
  imageSrc?: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  downloadUrl,
  fileType,
  imageSrc,
}) => {
  return (
    <Card className="bg-white border-calm-blue/10 shadow-sm overflow-hidden h-full flex flex-col">
      {imageSrc && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl font-playfair text-calm-gray">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-calm-gray/80">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="border-t border-calm-blue/10 pt-4">
        <Button 
          className="w-full bg-calm-lavender hover:bg-calm-blue text-calm-gray flex items-center justify-center gap-2"
          onClick={() => window.open(downloadUrl, '_blank')}
        >
          <Download size={16} />
          <span>Download {fileType}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
