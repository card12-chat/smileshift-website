const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('index.html', 'utf8');
const mediaDir = 'media';

// Find all occurrences of media/ in the HTML
const regex = /(?:src|href|url)\s*=\s*['"]?([^'"\s>]*media\/[^'"\s>]+)['"]?/gi;
const referencedFiles = new Set();
let match;
while ((match = regex.exec(html)) !== null) {
  let filepath = match[1];
  // Remove query params or hashes if any
  filepath = filepath.split('?')[0].split('#')[0];
  // Remove url( ) wrapper if it exists
  filepath = filepath.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
  // Normalize path
  if (filepath.startsWith('/')) filepath = filepath.substring(1);
  referencedFiles.add(filepath);
}

// Special case: The sequence frames are loaded dynamically via JS
// const currentFrame = index => `media/webp/sequence/${(index + 1).toString().padStart(4, '0')}.webp`;
// We know these exist from 0001 to 0192.
for (let i = 1; i <= 192; i++) {
  referencedFiles.add(`media/webp/sequence/${i.toString().padStart(4, '0')}.webp`);
}

// Special case: JSON-LD schema
const schemaMatch = html.match(/"image":\s*"([^"]+)"/g);
if (schemaMatch) {
  schemaMatch.forEach(m => {
    const url = m.match(/"image":\s*"([^"]+)"/)[1];
    if (url.includes('media/')) {
        const p = url.substring(url.indexOf('media/'));
        referencedFiles.add(p);
    }
  });
}


function getAllFiles(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

const allMediaFiles = getAllFiles(mediaDir);
const unusedFiles = [];
const missingFiles = [];

// Check what's referenced vs what exists
allMediaFiles.forEach(file => {
  // Replace backslashes for windows if any
  const normalizedFile = file.replace(/\\/g, '/');
  if (!referencedFiles.has(normalizedFile)) {
    unusedFiles.push(normalizedFile);
  }
});

referencedFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        missingFiles.push(file);
    }
});

fs.writeFileSync('unused_media.json', JSON.stringify({ unused: unusedFiles, referenced: Array.from(referencedFiles), missing: missingFiles }, null, 2));
console.log(`Found ${unusedFiles.length} unused files out of ${allMediaFiles.length} total files.`);
