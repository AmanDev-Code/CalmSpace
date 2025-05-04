import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { ArrowLeft, Smartphone, Chrome, Globe, Download, Info, Android } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { usePwaInstall } from '@/hooks/usePwaInstall';

const InstallPwa: React.FC = () => {
  const { handleInstallClick, downloadAndroidApk, isAndroid, resetInstallState } = usePwaInstall();
  const [browser, setBrowser] = useState<'chrome' | 'safari' | 'other'>('other');
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detect browser
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('chrome') > -1) {
      setBrowser('chrome');
    } else if (userAgent.indexOf('safari') > -1) {
      setBrowser('safari');
    }

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true);
    }
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-calm-gray hover:text-calm-blue transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Smartphone className="h-16 w-16 mx-auto text-calm-blue mb-4" />
            <h1 className="text-3xl font-bold text-calm-gray">Install CalmSpace</h1>
            <p className="text-calm-gray/70">
              Get the best experience by installing our app on your device
            </p>
          </div>

          {isStandalone ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <p className="text-green-800 font-medium">
                ✅ You're already using the installed app! Enjoy the full experience.
              </p>
              <p className="text-green-700 text-sm mt-2">
                If you're seeing this message in error, you can reset the installation state below.
              </p>
              {process.env.NODE_ENV === 'development' && (
                <Button 
                  variant="outline" 
                  className="mt-4 text-xs"
                  onClick={resetInstallState}
                >
                  Reset Installation State (Dev Only)
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Android Direct Download Button - Prominently displayed for Android users */}
              {isAndroid && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <h3 className="flex items-center text-lg font-medium text-green-800 mb-2">
                    <Smartphone className="h-5 w-5 mr-2 text-green-600" />
                    Recommended: Direct Download for Android
                  </h3>
                  <p className="text-green-700 mb-4">
                    For the most reliable installation on Android, we recommend downloading our app directly:
                  </p>
                  <Button
                    onClick={downloadAndroidApk}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg mb-2 flex items-center justify-center"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download CalmSpace Android App
                  </Button>
                  <p className="text-xs text-green-700 text-center">
                    After downloading, open the APK file to install. You may need to allow installation from unknown sources.
                  </p>
                </div>
              )}
              
              <Button
                onClick={handleInstallClick}
                className="w-full bg-calm-blue hover:bg-calm-lavender text-white py-3 rounded-lg mb-8 flex items-center justify-center"
              >
                <Download className="h-5 w-5 mr-2" />
                Install CalmSpace Now
              </Button>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-calm-gray mb-4">Manual Installation</h2>
                
                {browser === 'chrome' && (
                  <div className="space-y-4">
                    <h3 className="flex items-center text-lg font-medium text-calm-gray">
                      <Chrome className="h-5 w-5 mr-2 text-[#4285F4]" />
                      Chrome Installation
                    </h3>
                    <ol className="list-decimal pl-6 space-y-3 text-calm-gray/80">
                      <li>Tap the <strong>menu icon</strong> (three dots) in the upper right corner</li>
                      <li>Select <strong>Install App</strong> or <strong>Add to Home Screen</strong></li>
                      <li>Confirm by tapping <strong>Install</strong></li>
                    </ol>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <img src="/install-guide/chrome-1.png" alt="Chrome step 1" className="rounded-md border" />
                      <img src="/install-guide/chrome-2.png" alt="Chrome step 2" className="rounded-md border" />
                      <img src="/install-guide/chrome-3.png" alt="Chrome step 3" className="rounded-md border" />
                    </div>
                  </div>
                )}
                
                {browser === 'safari' && (
                  <div className="space-y-4">
                    <h3 className="flex items-center text-lg font-medium text-calm-gray">
                      <Globe className="h-5 w-5 mr-2 text-[#0076FF]" />
                      Safari Installation
                    </h3>
                    <ol className="list-decimal pl-6 space-y-3 text-calm-gray/80">
                      <li>Tap the <strong>share icon</strong> at the bottom of the screen</li>
                      <li>Scroll down and select <strong>Add to Home Screen</strong></li>
                      <li>Tap <strong>Add</strong> in the upper right corner</li>
                    </ol>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <img src="/install-guide/safari-1.png" alt="Safari step 1" className="rounded-md border" />
                      <img src="/install-guide/safari-2.png" alt="Safari step 2" className="rounded-md border" />
                      <img src="/install-guide/safari-3.png" alt="Safari step 3" className="rounded-md border" />
                    </div>
                  </div>
                )}
                
                {browser === 'other' && (
                  <div className="space-y-4">
                    <h3 className="flex items-center text-lg font-medium text-calm-gray">
                      Installation Instructions
                    </h3>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-amber-800">
                        For the best installation experience, we recommend using Chrome or Safari.
                      </p>
                    </div>
                    <ol className="list-decimal pl-6 space-y-3 text-calm-gray/80">
                      <li>Look for an <strong>"Install"</strong> or <strong>"Add to Home Screen"</strong> option in your browser's menu</li>
                      <li>Follow the on-screen instructions to complete installation</li>
                    </ol>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold text-calm-gray mb-2">Benefits of Installing</h2>
            <ul className="text-calm-gray/80 space-y-2">
              <li>✓ Faster access to CalmSpace</li>
              <li>✓ Works offline or with poor connectivity</li>
              <li>✓ Full-screen experience</li>
              <li>✓ App icon on your home screen</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 bg-calm-cream rounded-lg p-6 text-calm-gray">
          <h2 className="text-xl font-semibold mb-3">Still having trouble?</h2>
          <p className="mb-4">If you're still having difficulty installing the app, our diagnostic tool can help identify the issue.</p>
          <Link 
            to="/pwa-debug" 
            className="inline-flex items-center px-4 py-2 bg-calm-blue text-white rounded-md hover:bg-calm-blue/80 transition-colors"
          >
            <Info className="h-5 w-5 mr-2" />
            Run PWA Diagnostics
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default InstallPwa; 