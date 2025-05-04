import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Detect platform and add appropriate class to body
const detectPlatform = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  
  if (isIOS) {
    document.body.classList.add('ios');
    console.log('iOS platform detected');
  } else {
    document.body.classList.add('desktop');
    console.log('Desktop platform detected');
  }
};

// Run platform detection when DOM is loaded
document.addEventListener('DOMContentLoaded', detectPlatform);

// No PWA registration for now - we'll handle this separately
// This avoids build issues with virtual:pwa-register

createRoot(document.getElementById("root")!).render(<App />);
