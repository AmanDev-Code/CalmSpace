import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name correctly in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define Android icon sizes
const androidIcons = [
  { size: 36, density: 'mdpi', folder: 'mipmap-mdpi' },
  { size: 48, density: 'hdpi', folder: 'mipmap-hdpi' },
  { size: 72, density: 'xhdpi', folder: 'mipmap-xhdpi' },
  { size: 96, density: 'xxhdpi', folder: 'mipmap-xxhdpi' },
  { size: 144, density: 'xxxhdpi', folder: 'mipmap-xxxhdpi' },
];

// Path to source image
const sourceImagePath = path.join(__dirname, 'public', 'assets', 'appicon.png');

// Base directory for Android resources
const androidResDir = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');

// Validation
console.log('Starting icon generation process...');
if (!fs.existsSync(sourceImagePath)) {
  console.error(`ERROR: Source image not found at ${sourceImagePath}`);
  process.exit(1);
}

console.log('Generating Android app icons...');
console.log(`Source image: ${sourceImagePath}`);
console.log(`Target directory: ${androidResDir}`);

async function generateAndroidIcons() {
  for (const icon of androidIcons) {
    try {
      const targetDir = path.join(androidResDir, icon.folder);
      const targetIconPath = path.join(targetDir, 'ic_launcher.png');
      const targetRoundIconPath = path.join(targetDir, 'ic_launcher_round.png');
      
      console.log(`Creating directory: ${targetDir}`);
      // Make sure the directory exists
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      // Generate standard icon
      console.log(`Generating standard icon: ${targetIconPath}`);
      await sharp(sourceImagePath)
        .resize(icon.size, icon.size)
        .toFile(targetIconPath);
      
      // Generate round icon (same as regular for now)
      console.log(`Generating round icon: ${targetRoundIconPath}`);
      await sharp(sourceImagePath)
        .resize(icon.size, icon.size)
        .toFile(targetRoundIconPath);
      
      console.log(`Generated ${icon.density} icons (${icon.size}x${icon.size})`);
    } catch (error) {
      console.error(`Error generating ${icon.density} icon:`, error);
      throw error; // Re-throw to stop the process
    }
  }
  
  // Also create foreground layer for adaptive icons
  try {
    const adaptiveDir = path.join(androidResDir, 'mipmap-anydpi-v26');
    console.log(`Creating adaptive icon directory: ${adaptiveDir}`);
    if (!fs.existsSync(adaptiveDir)) {
      fs.mkdirSync(adaptiveDir, { recursive: true });
    }
    
    // Create ic_launcher.xml and ic_launcher_round.xml
    const iconXml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>`;
    
    const launcherXmlPath = path.join(adaptiveDir, 'ic_launcher.xml');
    console.log(`Writing: ${launcherXmlPath}`);
    fs.writeFileSync(launcherXmlPath, iconXml);
    
    const roundXmlPath = path.join(adaptiveDir, 'ic_launcher_round.xml');
    console.log(`Writing: ${roundXmlPath}`);
    fs.writeFileSync(roundXmlPath, iconXml);
    
    console.log('Generated adaptive icon XML files');
    
    // Generate foreground layer for all densities
    for (const icon of androidIcons) {
      const targetDir = path.join(androidResDir, icon.folder);
      const targetForegroundPath = path.join(targetDir, 'ic_launcher_foreground.png');
      
      // Foreground should be 72% of the full icon size
      const foregroundSize = Math.floor(icon.size * 1.5);
      const padding = Math.floor((foregroundSize - icon.size) / 2);
      
      console.log(`Generating foreground: ${targetForegroundPath}`);
      await sharp(sourceImagePath)
        .resize(icon.size, icon.size)
        .extend({
          top: padding,
          bottom: padding,
          left: padding,
          right: padding,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .toFile(targetForegroundPath);
      
      console.log(`Generated ${icon.density} foreground (${foregroundSize}x${foregroundSize})`);
    }
  } catch (error) {
    console.error('Error generating adaptive icons:', error);
    throw error; // Re-throw to stop the process
  }
}

// Make sure the ic_launcher_background color is defined
try {
  const valuesDir = path.join(androidResDir, 'values');
  console.log(`Ensuring values directory exists: ${valuesDir}`);
  if (!fs.existsSync(valuesDir)) {
    fs.mkdirSync(valuesDir, { recursive: true });
  }
  
  const colorsFile = path.join(valuesDir, 'ic_launcher_background.xml');
  console.log(`Checking for background color file: ${colorsFile}`);
  if (!fs.existsSync(colorsFile)) {
    const colorXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#FFFFFF</color>
</resources>`;
    
    console.log(`Creating background color file: ${colorsFile}`);
    fs.writeFileSync(colorsFile, colorXml);
    console.log('Created ic_launcher_background.xml');
  }
} catch (error) {
  console.error('Error ensuring background color:', error);
  process.exit(1);
}

// Execute the icon generation
try {
  console.log('Starting icon generation...');
  generateAndroidIcons()
    .then(() => {
      console.log('All Android app icons generated successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error in icon generation process:', error);
      process.exit(1);
    });
} catch (error) {
  console.error('Unexpected error in script execution:', error);
  process.exit(1);
} 