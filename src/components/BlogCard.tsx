
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  slug: string;
  imageSrc: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  author,
  date,
  category,
  slug,
  imageSrc,
}) => {
  return (
    <Card className="bg-white border-calm-blue/10 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="w-full h-48 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="bg-calm-mint/20 text-calm-gray border-calm-mint">
            {category}
          </Badge>
          <div className="flex items-center text-xs text-calm-gray/70">
            <Calendar size={12} className="mr-1" />
            {date}
          </div>
        </div>
        <CardTitle className="text-xl font-playfair text-calm-gray">
          <Link to={`/blog/${slug}`} className="hover:text-calm-blue transition-colors">
            {title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-calm-gray/80">
          {excerpt}
        </CardDescription>
      </CardContent>
      <CardFooter className="border-t border-calm-blue/10 pt-4">
        <div className="text-sm text-calm-gray/70">By {author}</div>
        <Link to={`/blog/${slug}`} className="ml-auto text-calm-blue hover:underline text-sm">
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
};
