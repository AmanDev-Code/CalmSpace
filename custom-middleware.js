const path = require('path');
const fs = require('fs');

/**
 * Custom middleware to handle APK file downloads
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function handleApkDownload(req, res, next) {
  // Check if the request is for an APK file
  if (req.url.endsWith('.apk')) {
    const apkPath = path.resolve(__dirname, req.url.substring(1));
    
    // Check if the file exists
    if (fs.existsSync(apkPath)) {
      console.log(`Serving APK file: ${apkPath}`);
      
      // Set proper headers for APK download
      res.setHeader('Content-Type', 'application/vnd.android.package-archive');
      res.setHeader('Content-Disposition', 'attachment; filename="calmspace.apk"');
      
      // Stream the file to the client
      fs.createReadStream(apkPath).pipe(res);
      return;
    }
  }
  
  // Continue with other middleware if not an APK request
  next();
}

module.exports = handleApkDownload; 