import { Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Vite plugin to serve technical files like .well-known during development
 * This ensures files like assetlinks.json are properly served in dev mode
 */
export function technicalFilesMiddleware(): Plugin {
  return {
    name: 'technical-files-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Check if this is a .well-known request
        if (req.url?.startsWith('/.well-known/')) {
          // Get the file path - extract file name from URL
          const fileName = req.url.split('/').pop();
          if (!fileName) {
            next();
            return;
          }

          // Construct the path to the file in public folder
          const filePath = path.resolve(process.cwd(), 'public', '.well-known', fileName);
          
          try {
            // Check if file exists
            if (fs.existsSync(filePath)) {
              // Read the file
              const content = fs.readFileSync(filePath, 'utf-8');
              
              // Set appropriate headers
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.statusCode = 200;
              
              // Send the file content
              res.end(content);
              return;
            }
          } catch (error) {
            console.error(`Error serving ${filePath}:`, error);
          }
        }

        // Handle manifest.webmanifest
        if (req.url === '/manifest.webmanifest') {
          const filePath = path.resolve(process.cwd(), 'public', 'manifest.webmanifest');
          
          try {
            if (fs.existsSync(filePath)) {
              const content = fs.readFileSync(filePath, 'utf-8');
              res.setHeader('Content-Type', 'application/manifest+json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.statusCode = 200;
              res.end(content);
              return;
            }
          } catch (error) {
            console.error(`Error serving manifest:`, error);
          }
        }

        // Continue to next middleware for other requests
        next();
      });
    }
  };
} 