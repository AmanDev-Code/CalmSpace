import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/android-fixes.css'
import { registerSW } from 'virtual:pwa-register'

// Detect platform and add appropriate class to body
const detectPlatform = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isAndroid = /android/.test(userAgent);
  
  if (isIOS) {
    document.body.classList.add('ios');
    console.log('iOS platform detected');
  } else if (isAndroid) {
    document.body.classList.add('android');
    console.log('Android platform detected');
  } else {
    document.body.classList.add('desktop');
    console.log('Desktop platform detected');
  }
  
  // Log status bar height for debugging
  console.log('Status bar height CSS variable:', 
    getComputedStyle(document.documentElement).getPropertyValue('--status-bar-height'));
};

// Run platform detection when DOM is loaded
document.addEventListener('DOMContentLoaded', detectPlatform);

// Register the service worker for PWA
const updateSW = registerSW({
  onNeedRefresh() {
    // You can show a UI notification here if you want
    if (confirm('New content available. Reload?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    // You can show a UI notification here if you want
    console.log('App ready to work offline')
  },
})

createRoot(document.getElementById("root")!).render(<App />);
