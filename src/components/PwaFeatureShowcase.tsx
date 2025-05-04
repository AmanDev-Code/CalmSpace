import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Wifi, Clock, Download } from 'lucide-react';
import { usePwaInstall } from '@/hooks/usePwaInstall';

interface PwaFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PwaFeatureShowcase: React.FC = () => {
  const { handleInstallClick, isInstalled } = usePwaInstall();

  const features: PwaFeature[] = [
    {
      icon: <Smartphone className="h-8 w-8 text-calm-blue" />,
      title: 'App-Like Experience',
      description: 'Enjoy a full-screen experience without browser navigation bars'
    },
    {
      icon: <Wifi className="h-8 w-8 text-calm-blue" />,
      title: 'Works Offline',
      description: 'Access CalmSpace even when you have poor or no internet connection'
    },
    {
      icon: <Clock className="h-8 w-8 text-calm-blue" />,
      title: 'Fast Loading',
      description: 'Loads instantly without waiting for the browser to start up'
    },
    {
      icon: <Download className="h-8 w-8 text-calm-blue" />,
      title: 'Easy Installation',
      description: 'No app store required, install directly from your browser'
    }
  ];

  return (
    <div className="bg-calm-cream/60 py-12 px-4 rounded-lg">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-calm-gray mb-3">
            Get the CalmSpace App
          </h2>
          <p className="text-calm-gray/70 max-w-2xl mx-auto">
            Install CalmSpace on your device for a better experience, faster access, and offline functionality
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-calm-gray mb-2">{feature.title}</h3>
                <p className="text-calm-gray/70 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {isInstalled ? (
            <div className="bg-green-50 border border-green-200 rounded-lg px-6 py-3 text-green-800 font-medium">
              ✅ You already have the CalmSpace app installed!
            </div>
          ) : (
            <>
              <button 
                onClick={handleInstallClick}
                className="bg-calm-blue hover:bg-calm-lavender text-white px-6 py-3 rounded-lg font-medium flex items-center"
              >
                <Download className="h-5 w-5 mr-2" />
                Install Now
              </button>
              <Link 
                to="/install" 
                className="text-calm-blue hover:text-calm-lavender font-medium"
              >
                View Installation Guide
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PwaFeatureShowcase; 