const fs = require('fs');
let srvData = JSON.parse(fs.readFileSync('GTM-M95DPD78-SERVE.JSON', 'utf8'));

let errors = [];

function checkNames(obj, path) {
    if (Array.isArray(obj)) {
        obj.forEach((item, i) => checkNames(item, path + '[' + i + ']'));
    } else if (typeof obj === 'object' && obj !== null) {
        for (let key in obj) {
            if (key === 'name' && typeof obj[key] === 'string') {
                if (obj[key].includes(':') || obj[key].includes('|')) {
                    errors.push('Invalid char in name: ' + obj[key]);
                }
            }
            checkNames(obj[key], path + '.' + key);
        }
    }
}
checkNames(srvData, 'root');

if (srvData.containerVersion.variable) {
    srvData.containerVersion.variable.forEach(v => {
        if (v.type === 'cvt_6346401329_31' || v.type === 'cvt_6346401329_14') {
            let hasKey = v.parameter && v.parameter.some(p => p.key === 'stapeStoreContainerApiKey');
            if (!hasKey) errors.push('Missing stapeStoreContainerApiKey in var ' + v.name);
        }
    });
}

if (errors.length === 0) {
    console.log('OK! No issues found.');
} else {
    console.log('ISSUES:', errors.join('\n'));
}
