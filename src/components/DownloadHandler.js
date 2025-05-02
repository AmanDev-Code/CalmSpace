/**
 * Helper function to download APK files with proper MIME type to prevent .zip extension
 * @param {string} url - URL of the APK file to download
 * @param {string} filename - Name to save the file as
 * @returns {Promise} - Promise that resolves when download completes or rejects on error
 */
export function downloadApkFile(url, filename) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    
    xhr.onload = function() {
      if (this.status === 200) {
        // Create blob with the correct MIME type
        const blob = new Blob([this.response], { 
          type: 'application/vnd.android.package-archive' 
        });
        
        // Create URL and trigger download
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.setAttribute('type', 'application/vnd.android.package-archive');
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 100);
        
        resolve();
      } else {
        console.error('Error downloading APK, status:', this.status);
        reject(new Error(`Failed to download file: ${this.status}`));
      }
    };
    
    xhr.onerror = function() {
      console.error('Network error occurred while downloading APK');
      reject(new Error('Network error occurred'));
    };
    
    xhr.send();
  });
} 