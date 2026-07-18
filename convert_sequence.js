const { execSync } = require('child_process');
const fs = require('fs');

if (!fs.existsSync('media/webp/sequence')) {
  fs.mkdirSync('media/webp/sequence', { recursive: true });
}

for (let i = 1; i <= 192; i++) {
  const padded = i.toString().padStart(4, '0');
  const orig = `media/sequence/${padded}.jpg`;
  const dest = `media/webp/sequence/${padded}.webp`;
  
  if (fs.existsSync(orig)) {
    try {
      // quality 80 is good for sequence animation to balance weight/quality
      execSync(`cwebp -q 80 "${orig}" -o "${dest}"`, { stdio: 'ignore' });
    } catch (e) {
      console.error(`Failed to convert ${orig}`);
    }
  }
}
console.log('Sequence conversion complete.');
