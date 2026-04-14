const fs = require('fs');

function sanitizeNames(obj) {
    if (Array.isArray(obj)) {
        obj.forEach(item => sanitizeNames(item));
    } else if (typeof obj === 'object' && obj !== null) {
        for (let key in obj) {
            if (key === 'name' && typeof obj[key] === 'string') {
                obj[key] = obj[key].replace(/:/g, ' -');
            }
            sanitizeNames(obj[key]);
        }
    }
}

// Fix WEB
let webData = JSON.parse(fs.readFileSync('GTM-KLC8LQ3J-WEB.JSON', 'utf8'));
sanitizeNames(webData);
fs.writeFileSync('GTM-KLC8LQ3J-WEB.JSON', JSON.stringify(webData, null, 4));

// Fix SERVER
let serveData = JSON.parse(fs.readFileSync('GTM-M95DPD78-SERVE.JSON', 'utf8'));
sanitizeNames(serveData);
fs.writeFileSync('GTM-M95DPD78-SERVE.JSON', JSON.stringify(serveData, null, 4));

// The user apparently renamed the file to GTMKLC8LQ3JWEB.JSON locally? Let's check if the file with no dashes exists.
if (fs.existsSync('GTMKLC8LQ3JWEB.JSON')) {
    let altData = JSON.parse(fs.readFileSync('GTMKLC8LQ3JWEB.JSON', 'utf8'));
    sanitizeNames(altData);
    fs.writeFileSync('GTMKLC8LQ3JWEB.JSON', JSON.stringify(altData, null, 4));
}
