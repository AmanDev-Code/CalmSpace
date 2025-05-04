/**
 * Utility script to ensure assetlinks.json file is properly copied to right locations
 * for both development and production builds.
 */

import fs from 'fs';
import path from 'path';

// Log with timestamp
const log = (message) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

// Make sure directory exists
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    log(`Creating directory: ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Copy assetlinks.json to the correct location
const copyAssetlinks = () => {
  try {
    const sourcePath = path.resolve(process.cwd(), 'public', '.well-known', 'assetlinks.json');
    
    // Ensure source file exists
    if (!fs.existsSync(sourcePath)) {
      log(`Error: Source file not found at ${sourcePath}`);
      return false;
    }

    // For development server - copy to the root .well-known directory
    const devDirPath = path.resolve(process.cwd(), '.well-known');
    ensureDirectoryExists(devDirPath);
    const devFilePath = path.resolve(devDirPath, 'assetlinks.json');
    
    // Read source file
    const content = fs.readFileSync(sourcePath, 'utf-8');
    
    // Write to dev location
    fs.writeFileSync(devFilePath, content, 'utf-8');
    log(`Copied assetlinks.json to ${devFilePath}`);

    // For production build - make sure dist/.well-known exists if dist exists
    const distPath = path.resolve(process.cwd(), 'dist');
    if (fs.existsSync(distPath)) {
      const distWellKnownPath = path.resolve(distPath, '.well-known');
      ensureDirectoryExists(distWellKnownPath);
      const distFilePath = path.resolve(distWellKnownPath, 'assetlinks.json');
      
      // Write to production location
      fs.writeFileSync(distFilePath, content, 'utf-8');
      log(`Copied assetlinks.json to ${distFilePath}`);
    }

    return true;
  } catch (error) {
    log(`Error copying assetlinks.json: ${error.message}`);
    return false;
  }
};

// Execute the copy
copyAssetlinks(); 