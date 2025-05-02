/**
 * Enhanced APK downloader with multiple fallback mechanisms
 * to ensure proper downloads across different browsers
 */

/**
 * Downloads an APK file with the proper MIME type
 * @param {string} url - The URL of the APK file to download
 * @param {string} filename - The filename to save as
 * @returns {Promise} A promise that resolves when download is initiated
 */
export function downloadApk(url, filename) {
  return new Promise((resolve, reject) => {
    try {
      // Method 1: Using fetch API (modern browsers)
      if ('fetch' in window) {
        console.log('Trying fetch method for APK download');
        
        fetch(url)
          .then(response => response.blob())
          .then(blob => {
            // Override the MIME type forcefully
            const modifiedBlob = new Blob([blob], { 
              type: 'application/vnd.android.package-archive' 
            });
            
            triggerDownload(URL.createObjectURL(modifiedBlob));
            resolve();
          })
          .catch(error => {
            console.error('Fetch method failed:', error);
            fallbackToXhr();
          });
      } else {
        fallbackToXhr();
      }
    } catch (error) {
      console.error('Initial download attempt failed:', error);
      fallbackToXhr();
    }
    
    // XMLHttpRequest fallback method
    function fallbackToXhr() {
      console.log('Trying XHR method for APK download');
      
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      
      xhr.onload = function() {
        if (this.status === 200) {
          // Create blob with the correct MIME type
          const blob = new Blob([this.response], { 
            type: 'application/vnd.android.package-archive' 
          });
          
          triggerDownload(URL.createObjectURL(blob));
          resolve();
        } else {
          console.error('XHR failed, status:', this.status);
          tryDirectDownload();
        }
      };
      
      xhr.onerror = function() {
        console.error('XHR network error');
        tryDirectDownload();
      };
      
      xhr.send();
    }
    
    // Final fallback - direct URL approach
    function tryDirectDownload() {
      console.log('Trying direct link method for APK download');
      
      try {
        triggerDownload(url);
        
        // Alert the user about possible .zip extension
        setTimeout(() => {
          alert("If the file downloads with a .zip extension, please rename it to remove the .zip part before installing.");
        }, 1000);
        
        resolve();
      } catch (error) {
        console.error('All download methods failed:', error);
        reject(new Error('Download failed. Please try using a different browser.'));
      }
    }
    
    // Helper function to trigger the download
    function triggerDownload(downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      link.setAttribute('type', 'application/vnd.android.package-archive');
      link.setAttribute('target', '_blank'); // Helps in some browsers
      
      // Some browsers need the element to be in the DOM
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        if (downloadUrl.startsWith('blob:')) {
          URL.revokeObjectURL(downloadUrl);
        }
      }, 100);
    }
  });
} 