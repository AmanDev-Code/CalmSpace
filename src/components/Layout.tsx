import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppButton } from './WhatsAppButton';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Detect Android platform
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsAndroid(/android/.test(userAgent));
    
    // Log status bar height for debugging
    if (/android/.test(userAgent)) {
      console.log('Layout component: Android detected, status bar height:', 
        getComputedStyle(document.documentElement).getPropertyValue('--status-bar-height'));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-slate-800 bg-white overflow-x-hidden">
      <Navbar />
      <div className={`flex-grow relative z-0 isolate ${isAndroid ? 'layout-container' : ''}`}>
        <main>{children}</main>
      </div>
      <Footer className="relative z-0" />
      <WhatsAppButton />
    </div>
  );
};
