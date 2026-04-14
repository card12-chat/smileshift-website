const fs = require('fs');
let srvData = JSON.parse(fs.readFileSync('TRACKEAMENTO/Server-Yampi.json', 'utf8'));

let tag = srvData.containerVersion.tag.find(t => t.name === "02 | FB | Purchase");

console.log(JSON.stringify(tag.parameter.filter(p=>p.key==="userDataList" || p.key==="customDataList" || p.key==="serverEventDataList"), null, 2));

