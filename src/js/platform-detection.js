// Platform detection script
document.addEventListener('DOMContentLoaded', function() {
  // Detect iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  // Detect Android
  const isAndroid = /Android/.test(navigator.userAgent);
  
  if (isIOS) {
    document.body.classList.add('ios-device');
    document.documentElement.classList.add('ios');
  } else if (isAndroid) {
    document.body.classList.add('android-device');
    document.documentElement.classList.add('android');
    // Add fullscreen class for Android
    document.documentElement.classList.add('android-fullscreen');
  }
  
  // Log the platform for debugging
  console.log('Platform:', isIOS ? 'iOS' : (isAndroid ? 'Android' : 'Other'));
  
  // Read status bar height from CSS variable (will be set by native code)
  const statusBarHeight = getComputedStyle(document.documentElement).getPropertyValue('--status-bar-height');
  console.log('Status bar height from CSS variable:', statusBarHeight);
  
  // Apply minimal gap class to header/navbar if needed
  if (isAndroid) {
    // Find header elements
    const headers = document.querySelectorAll('header, .navbar, .navbar-fixed');
    headers.forEach(function(header) {
      header.classList.add('android-header-minimal-gap');
    });
  }
  
  // Enable debugging outlines if needed
  // Uncomment to debug layout issues:
  /*
  if (isAndroid) {
    document.body.classList.add('debug-layout');
  }
  */
}); 