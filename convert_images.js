const { execSync } = require('child_process');
const fs = require('fs');

if (!fs.existsSync('media/webp')) fs.mkdirSync('media/webp');
if (!fs.existsSync('media/webp/antes-e-depois')) fs.mkdirSync('media/webp/antes-e-depois');

const images = {
  "media/IMAGEM 1.png": "media/webp/hero-smileshift-v34.webp",
  "media/IMAGEM 2.png": "media/webp/produto-smileshift.webp",
  "media/3omin-1.jpg": "media/webp/acao-v34-30-minutos.webp",
  "media/seguro (1).png": "media/webp/compra-segura-smileshift.webp",
  "media/Antes e depois/1.png": "media/webp/antes-e-depois/manchas-amarelas-antes-1.webp",
  "media/Antes e depois/2.png": "media/webp/antes-e-depois/dentes-brancos-depois-1.webp",
  "media/Antes e depois/3.png": "media/webp/antes-e-depois/manchas-amarelas-antes-2.webp",
  "media/Antes e depois/4.png": "media/webp/antes-e-depois/dentes-brancos-depois-2.webp"
};

for (const [orig, dest] of Object.entries(images)) {
  if (fs.existsSync(orig)) {
    try {
      execSync(`cwebp -q 80 "${orig}" -o "${dest}"`, { stdio: 'ignore' });
      const w = execSync(`sips -g pixelWidth "${dest}" | grep -Eo '[0-9]+$'`).toString().trim();
      const h = execSync(`sips -g pixelHeight "${dest}" | grep -Eo '[0-9]+$'`).toString().trim();
      console.log(`Converted ${orig} -> ${dest} (${w} x ${h})`);
    } catch (e) {
      console.error(`Failed ${orig}`);
    }
  }
}

for (let i = 1; i <= 6; i++) {
  const files = fs.readdirSync('media');
  const origName = files.find(f => f.startsWith(`portrait_${i}_`) && f.endsWith('.png'));
  if (origName) {
    const orig = `media/${origName}`;
    const dest = `media/webp/cliente-smileshift-${i}.webp`;
    try {
      execSync(`cwebp -q 75 "${orig}" -o "${dest}"`, { stdio: 'ignore' });
      const w = execSync(`sips -g pixelWidth "${dest}" | grep -Eo '[0-9]+$'`).toString().trim();
      const h = execSync(`sips -g pixelHeight "${dest}" | grep -Eo '[0-9]+$'`).toString().trim();
      console.log(`Converted ${orig} -> ${dest} (${w} x ${h})`);
    } catch (e) {
      console.error(`Failed ${orig}`);
    }
  }
}
