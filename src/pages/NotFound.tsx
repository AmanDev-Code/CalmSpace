
import React, { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-calm-blue mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-calm-gray mb-6">Page Not Found</h2>
          <p className="text-lg text-calm-gray/80 mb-8 max-w-md mx-auto">
            We couldn't find the page you were looking for. Perhaps you were looking for another section of our website?
          </p>
          <div className="space-x-4">
            <Link to="/">
              <Button className="bg-calm-lavender hover:bg-calm-blue text-calm-gray">
                Return Home
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-calm-gray/30 text-calm-gray hover:bg-calm-lavender/10">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
