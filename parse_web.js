const fs = require('fs');
let data = JSON.parse(fs.readFileSync('TRACKEAMENTO/Web-Yampi.json', 'utf8'));

let tagNames = data.containerVersion.tag ? data.containerVersion.tag.map(t => t.name) : [];
let triggerNames = data.containerVersion.trigger ? data.containerVersion.trigger.map(t => t.name) : [];
let varNames = data.containerVersion.variable ? data.containerVersion.variable.map(t => t.name) : [];

console.log("=== WEBTags ===");
console.log(tagNames.join("\n"));
console.log("=== WEBTriggers ===");
console.log(triggerNames.join("\n"));
