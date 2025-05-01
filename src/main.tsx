import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

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
