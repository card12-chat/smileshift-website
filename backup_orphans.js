const fs = require('fs');
const path = require('path');

const backupDir = 'backup-media-before-cleanup';
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
}

// Read the previously identified unused files
const data = JSON.parse(fs.readFileSync('unused_media.json', 'utf8'));
const unusedFiles = data.unused;

const reportData = [];

unusedFiles.forEach(file => {
    // Only process actual files, not directories or non-existent files
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
        const stats = fs.statSync(file);
        const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
        
        // Ensure subdirectories exist in backup
        const relativePath = path.relative('media', file);
        const backupDest = path.join(backupDir, relativePath);
        const backupDestDir = path.dirname(backupDest);
        if (!fs.existsSync(backupDestDir)) {
            fs.mkdirSync(backupDestDir, { recursive: true });
        }
        
        // Copy file
        fs.copyFileSync(file, backupDest);
        
        reportData.push({
            path: file,
            size: `${sizeMb} MB`,
            reason: determineReason(file)
        });
    }
});

function determineReason(filepath) {
    if (filepath.endsWith('.mp4')) return 'Vídeos de scrub descontinuados (migrado para Canvas GSAP).';
    if (filepath.includes('media/sequence/') && filepath.endsWith('.jpg')) return 'Frames da sequência original (migrado para media/webp/sequence).';
    if (filepath.includes('webp/') && !filepath.includes('sequence/')) return 'WebP gerados em otimização revertida (HTML puxa .jpg/.png originais).';
    if (filepath.endsWith('.DS_Store')) return 'Arquivo oculto do sistema operacional macOS (lixo).';
    return 'Sobras de exportação de design ou testes não vinculados ao código base.';
}

fs.writeFileSync('audit_details.json', JSON.stringify(reportData, null, 2));
console.log(`Backed up ${reportData.length} orphan files.`);
