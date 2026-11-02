// JobMatch Pro - Production Packaging Script for Chrome Web Store
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8'));
const version = manifest.version || '1.0.0';
const zipName = `jobmatch-pro-v${version}.zip`;
const zipPath = path.join(distDir, zipName);

console.log(`Packaging JobMatch Pro v${version} for Chrome Web Store...`);

const filesToInclude = [
  'manifest.json',
  'popup.html',
  'popup.js',
  'content.js',
  'background.js',
  'styles.css',
  'skills-db.js',
  'license-validator.js',
  'icons',
  'legal'
];

try {
  // Use PowerShell Compress-Archive for reliable zip creation on Windows
  const filesList = filesToInclude.map(f => `"${f}"`).join(', ');
  const psCmd = `powershell -Command "Compress-Archive -Path ${filesList} -DestinationPath '${zipPath}' -Force"`;
  execSync(psCmd, { stdio: 'inherit' });

  const stats = fs.statSync(zipPath);
  console.log(`\n🎉 Package successfully created:`);
  console.log(`📁 File: ${zipPath}`);
  console.log(`📦 Size: ${(stats.size / 1024).toFixed(1)} KB`);
  console.log(`\nReady to upload to the Chrome Web Store Developer Console!`);
} catch (err) {
  console.error('Packaging failed:', err);
}
