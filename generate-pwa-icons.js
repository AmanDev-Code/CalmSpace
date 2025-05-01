import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from 'canvas';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to generate PWA icons
async function generateIcons() {
  try {
    console.log('Generating PWA icons from brand logo...');
    
    // Sizes for PWA icons
    const sizes = [192, 512];
    
    // Input logo path
    const logoPath = path.join(__dirname, 'public/assets/brandLogo.png');
    
    // Output directory
    const outputDir = path.join(__dirname, 'public/pwa-icons');
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Load the logo image
    const logo = await loadImage(logoPath);
    
    // Generate icons for each size
    for (const size of sizes) {
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext('2d');
      
      // Fill the background (assuming white background, adjust as needed)
      ctx.fillStyle = '#f9f5f2';
      ctx.fillRect(0, 0, size, size);
      
      // Calculate dimensions to maintain aspect ratio
      const aspectRatio = logo.width / logo.height;
      let dWidth, dHeight;
      
      if (aspectRatio > 1) {
        // Wider than tall
        dWidth = size * 0.8;
        dHeight = dWidth / aspectRatio;
      } else {
        // Taller than wide or square
        dHeight = size * 0.8;
        dWidth = dHeight * aspectRatio;
      }
      
      // Center the logo
      const x = (size - dWidth) / 2;
      const y = (size - dHeight) / 2;
      
      // Draw the logo
      ctx.drawImage(logo, x, y, dWidth, dHeight);
      
      // Save the icon
      const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
      const out = fs.createWriteStream(outputPath);
      const stream = canvas.createPNGStream();
      stream.pipe(out);
      
      out.on('finish', () => {
        console.log(`Created icon: ${outputPath}`);
      });
    }
    
    console.log('PWA icon generation process initiated...');
  } catch (error) {
    console.error('Error generating PWA icons:', error);
  }
}

// Run the function
generateIcons(); 