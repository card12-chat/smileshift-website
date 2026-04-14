const fs = require('fs');
let data = JSON.parse(fs.readFileSync('TRACKEAMENTO/Server-Yampi.json', 'utf8'));

let tagNames = data.containerVersion.tag ? data.containerVersion.tag.map(t => t.name) : [];
let triggerNames = data.containerVersion.trigger ? data.containerVersion.trigger.map(t => t.name) : [];

console.log("=== SERVITags ===");
console.log(tagNames.join("\n"));
console.log("=== SERVITriggers ===");
console.log(triggerNames.join("\n"));
