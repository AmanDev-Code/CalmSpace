import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { ArrowLeft, Download, AlertCircle, CheckCircle, XCircle, RefreshCw, Info, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { usePwaInstall } from '@/hooks/usePwaInstall';

interface CheckResult {
  name: string;
  status: 'success' | 'warning' | 'error' | 'info';
  message: string;
  details?: string;
}

const PwaDebug: React.FC = () => {
  const { 
    installPrompt, 
    handleInstallClick, 
    downloadAndroidApk,
    resetInstallState, 
    installationStatus,
    isAndroid
  } = usePwaInstall();
  const [checks, setChecks] = useState<CheckResult[]>([]);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    setIsRunning(true);
    const results: CheckResult[] = [];

    // Check 1: Service Worker Support
    if ('serviceWorker' in navigator) {
      results.push({
        name: 'Service Worker Support',
        status: 'success',
        message: 'Your browser supports Service Workers'
      });
    } else {
      results.push({
        name: 'Service Worker Support',
        status: 'error',
        message: 'Your browser does not support Service Workers',
        details: 'Service workers are required for PWA functionality. Try using Chrome, Edge, Firefox, or Safari.'
      });
    }

    // Check 2: Service Worker Registration
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      if (registrations.length > 0) {
        const activeWorker = registrations.find(reg => reg.active);
        if (activeWorker) {
          results.push({
            name: 'Service Worker Registration',
            status: 'success',
            message: 'Service worker is registered and active',
            details: `Scope: ${activeWorker.scope}`
          });
        } else {
          results.push({
            name: 'Service Worker Registration',
            status: 'warning',
            message: 'Service worker is registered but not active',
            details: 'This might be because the page just loaded. Try refreshing.'
          });
        }
      } else {
        results.push({
          name: 'Service Worker Registration',
          status: 'error',
          message: 'No service worker is registered',
          details: 'Try refreshing the page or clearing your browser cache.'
        });
      }
    } catch (e) {
      results.push({
        name: 'Service Worker Registration',
        status: 'error',
        message: 'Error checking service worker registration',
        details: e instanceof Error ? e.message : String(e)
      });
    }

    // Check 3: Manifest File
    try {
      const manifestLinks = document.querySelectorAll('link[rel="manifest"]');
      if (manifestLinks.length > 0) {
        const manifestUrl = manifestLinks[0].getAttribute('href');
        try {
          const response = await fetch(manifestUrl || '/manifest.webmanifest');
          if (response.ok) {
            const manifest = await response.json();
            results.push({
              name: 'Web App Manifest',
              status: 'success',
              message: 'Web App Manifest is available and valid',
              details: `Name: ${manifest.name}, Display: ${manifest.display}, Icons: ${manifest.icons?.length || 0}`
            });
          } else {
            results.push({
              name: 'Web App Manifest',
              status: 'error',
              message: `Manifest file returned HTTP ${response.status}`,
              details: 'The manifest file could not be loaded. Check your server configuration.'
            });
          }
        } catch (e) {
          results.push({
            name: 'Web App Manifest',
            status: 'error',
            message: 'Error loading manifest file',
            details: e instanceof Error ? e.message : String(e)
          });
        }
      } else {
        results.push({
          name: 'Web App Manifest',
          status: 'error',
          message: 'No manifest link found in the document',
          details: 'The <link rel="manifest"> tag is missing in the HTML.'
        });
      }
    } catch (e) {
      results.push({
        name: 'Web App Manifest',
        status: 'error',
        message: 'Error checking manifest',
        details: e instanceof Error ? e.message : String(e)
      });
    }

    // Check 4: HTTPS
    const isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
    results.push({
      name: 'HTTPS',
      status: isSecure ? 'success' : 'error',
      message: isSecure 
        ? 'Using secure connection (HTTPS or localhost)' 
        : 'Not using HTTPS',
      details: isSecure 
        ? undefined 
        : 'PWAs require HTTPS except on localhost. Deploy to a secure host or use a local development server.'
    });

    // Check 5: Installation Prompt
    if (installPrompt) {
      results.push({
        name: 'Installation Prompt',
        status: 'success',
        message: 'Installation prompt is available',
        details: 'You can install the app using the "Install Now" button.'
      });
    } else {
      // Check if already installed
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                          (window.navigator as any).standalone === true;
      
      if (isStandalone) {
        results.push({
          name: 'Installation Prompt',
          status: 'info',
          message: 'App is already installed',
          details: 'You are currently using the app in standalone mode.'
        });
      } else {
        const userAgent = navigator.userAgent.toLowerCase();
        const isIOS = /iphone|ipad|ipod/.test(userAgent);
        
        if (isIOS) {
          results.push({
            name: 'Installation Prompt',
            status: 'info',
            message: 'iOS requires manual installation',
            details: 'On iOS, you need to use the Share button and select "Add to Home Screen".'
          });
        } else {
          results.push({
            name: 'Installation Prompt',
            status: 'warning',
            message: 'Installation prompt not available',
            details: 'This might be because:\n• The app is already installed\n• You haven\'t interacted with the site enough\n• Your browser has other requirements for installation'
          });
        }
      }
    }

    // Check 6: Browser Compatibility
    const userAgent = navigator.userAgent.toLowerCase();
    const isChrome = /chrome/.test(userAgent) && !/edge|edg/.test(userAgent);
    const isFirefox = /firefox/.test(userAgent);
    const isEdge = /edge|edg/.test(userAgent);
    const isSafari = /safari/.test(userAgent) && !isChrome;
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    
    let browserStatus: 'success' | 'warning' | 'error' = 'success';
    let browserMessage = '';
    let browserDetails = '';
    
    if (isChrome || isEdge) {
      browserStatus = 'success';
      browserMessage = `Using ${isChrome ? 'Chrome' : 'Edge'} - Excellent PWA support`;
    } else if (isFirefox) {
      browserStatus = 'success';
      browserMessage = 'Using Firefox - Good PWA support';
    } else if (isSafari) {
      browserStatus = 'warning';
      browserMessage = 'Using Safari - Limited PWA support';
      browserDetails = 'Safari has some limitations with PWAs. Manual installation is required via the Share menu.';
    } else {
      browserStatus = 'warning';
      browserMessage = 'Using an uncommon browser';
      browserDetails = 'PWA support may be limited. Consider using Chrome, Edge, Firefox, or Safari.';
    }
    
    results.push({
      name: 'Browser Compatibility',
      status: browserStatus,
      message: browserMessage,
      details: browserDetails
    });

    // Check 7: Current Installation Status
    results.push({
      name: 'Installation Status',
      status: 'info',
      message: `Current status: ${installationStatus || 'Not started'}`,
      details: 'This shows the current status of the installation process.'
    });

    setChecks(results);
    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-calm-gray hover:text-calm-blue transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-calm-gray">PWA Diagnostics</h1>
            <p className="text-calm-gray/70">
              This page will help you understand why PWA installation may not be working
            </p>
          </div>

          <div className="mb-6 flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={runDiagnostics}
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
              {isRunning ? 'Running Checks...' : 'Run Diagnostics'}
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="default"
                onClick={handleInstallClick}
                disabled={!installPrompt}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Install Now
              </Button>
              
              {isAndroid && (
                <Button
                  variant="default"
                  onClick={downloadAndroidApk}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  <Smartphone className="h-4 w-4" />
                  Download APK
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {checks.map((check, index) => (
              <div 
                key={index} 
                className={`border rounded-lg p-4 ${
                  check.status === 'success' ? 'border-green-200 bg-green-50' :
                  check.status === 'warning' ? 'border-amber-200 bg-amber-50' :
                  check.status === 'error' ? 'border-red-200 bg-red-50' :
                  'border-blue-200 bg-blue-50'
                }`}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    {getStatusIcon(check.status)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-calm-gray">{check.name}</h3>
                    <p className="text-sm text-calm-gray/80">{check.message}</p>
                    {check.details && (
                      <p className="mt-2 text-xs bg-white/50 p-2 rounded border border-current/10 whitespace-pre-line">
                        {check.details}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-calm-gray mb-4">Troubleshooting Steps</h2>
            <ol className="list-decimal ml-6 space-y-3 text-calm-gray/80">
              <li>
                <strong>Clear your browser cache</strong> and reload the page to ensure you have the latest service worker.
              </li>
              <li>
                <strong>Try using Chrome or Edge</strong> for the best PWA installation experience.
              </li>
              <li>
                <strong>Make sure you're on a secure connection</strong> (HTTPS or localhost) - PWAs require this.
              </li>
              <li>
                <strong>iOS users:</strong> Use Safari and tap the share icon, then "Add to Home Screen".
              </li>
              <li>
                <strong>Interact with the site more</strong> before trying to install - some browsers require this.
              </li>
              <li>
                <button 
                  onClick={resetInstallState} 
                  className="text-calm-blue hover:underline"
                >
                  Reset the installation state
                </button> and try again.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PwaDebug; 