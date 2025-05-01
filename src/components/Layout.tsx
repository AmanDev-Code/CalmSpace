import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppButton } from './WhatsAppButton';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen text-slate-800 bg-white overflow-x-hidden">
      <Navbar />
      <div className="flex-grow relative z-0 isolate">
        <main>{children}</main>
      </div>
      <Footer className="relative z-0" />
      <WhatsAppButton />
    </div>
  );
};
