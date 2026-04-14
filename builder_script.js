const fs = require('fs');

// 1. WEB CONFIG
let webData = JSON.parse(fs.readFileSync('TRACKEAMENTO/Web-Yampi.json', 'utf8'));

// Change container ID
webData.containerVersion.container.publicId = "GTM-KLC8LQ3J";
webData.containerVersion.container.name = "[WEB] SMILESHIFT CLEAN";
webData.exportTime = new Date().toISOString();

// Erase irrelevant tags
const keepWebTags = [
    "0 | Tag de Configuração",
    "01 | GA4 | page_view",
    "02 | GA4 | begin_checkout",
    "01 | FB | PageView",
    "02 | FB | InitiateCheckout",
    "01 | API | page_view",
    "02 | API | begin_checkout",
    "00 | Visitor API",
    "00 | cHTML | setCookie | GeoLoc"
];
webData.containerVersion.tag = webData.containerVersion.tag.filter(t => keepWebTags.includes(t.name));

// Rebuild Triggers
const domReadyTrigger = {
    "accountId": webData.containerVersion.container.accountId,
    "containerId": webData.containerVersion.container.containerId,
    "triggerId": "1001",
    "name": "DOM Ready (Page View)",
    "type": "DOM_READY",
    "fingerprint": Date.now().toString()
};

const beginCheckoutTrigger = {
    "accountId": webData.containerVersion.container.accountId,
    "containerId": webData.containerVersion.container.containerId,
    "triggerId": "1002",
    "name": "Custom Event: begin_checkout",
    "type": "CUSTOM_EVENT",
    "customEventFilter": [
        {
            "type": "EQUALS",
            "parameter": [
                { "type": "TEMPLATE", "key": "arg0", "value": "{{_event}}" },
                { "type": "TEMPLATE", "key": "arg1", "value": "begin_checkout" }
            ]
        }
    ],
    "fingerprint": Date.now().toString()
};

const visitorApiTrigger = {
    "accountId": webData.containerVersion.container.accountId,
    "containerId": webData.containerVersion.container.containerId,
    "triggerId": "1003",
    "name": "All Pages (Load Visitor API)",
    "type": "PAGEVIEW",
    "fingerprint": Date.now().toString()
};

const visitorApiSuccessTrigger = {
    "accountId": webData.containerVersion.container.accountId,
    "containerId": webData.containerVersion.container.containerId,
    "triggerId": "1004",
    "name": "Custom Event: visitor-api-success",
    "type": "CUSTOM_EVENT",
    "customEventFilter": [
        {
            "type": "EQUALS",
            "parameter": [
                { "type": "TEMPLATE", "key": "arg0", "value": "{{_event}}" },
                { "type": "TEMPLATE", "key": "arg1", "value": "visitor-api-success" }
            ]
        }
    ],
    "fingerprint": Date.now().toString()
};

webData.containerVersion.trigger = [domReadyTrigger, beginCheckoutTrigger, visitorApiTrigger, visitorApiSuccessTrigger];

// Remap Tags to Triggers
webData.containerVersion.tag.forEach(t => {
    // Unpause Visitor API if it was paused
    if(t.name === "00 | Visitor API") {
        delete t.paused;
        t.firingTriggerId = ["1003"];
    }
    else if(t.name === "00 | cHTML | setCookie | GeoLoc") {
        t.firingTriggerId = ["1004"];
    }
    else if(t.name.includes("page_view") || t.name.includes("PageView") || t.name === "0 | Tag de Configuração") {
        t.firingTriggerId = ["1001"];
    }
    else if(t.name.includes("begin_checkout") || t.name.includes("InitiateCheckout")) {
        t.firingTriggerId = ["1002"];
    }
});

// Remove unused variables
const keepWebVars = [
    "0 | GA4 - ID", "0 | FB - Pixel", "0 | Visitor API Project ID", "0 | transport_url", "event_id",
    "UTM'S", "cookie - LeadState", "cookie - LeadCountry", "cookie - LeadCity", "jsc - city (dlv|cookie)", 
    "jsc - state (dlv|cookie)", "jsc - country (dlv|cookie)", "dlv - visitorApiCity", "dlv - visitorApiRegion",
    "dlv - visitorApiCountryCode", "Cookie - __gtm_campaign_url", "utm_source", "utm_medium", "utm_campaign",
    "utm_content", "utm_term", "jsc - city (fb)"
];
webData.containerVersion.variable = webData.containerVersion.variable.filter(v => keepWebVars.includes(v.name));

// Inject credentials into variables
webData.containerVersion.variable.forEach(v => {
    if (v.name === "0 | GA4 - ID") v.parameter.find(p => p.key === "value").value = "G-EJR5P2BTSF";
    if (v.name === "0 | FB - Pixel") v.parameter.find(p => p.key === "value").value = "961216382957947";
    if (v.name === "0 | Visitor API Project ID") v.parameter.find(p => p.key === "value").value = "qbsriOdZ1DXSqEr4zsAr";
    if (v.name === "0 | transport_url") v.parameter.find(p => p.key === "value").value = "https://api.smileshift.co";
});

fs.writeFileSync('GTM-KLC8LQ3J-WEB.JSON', JSON.stringify(webData, null, 4));
console.log("Wrote GTM-KLC8LQ3J-WEB.JSON");

// 2. SERVER CONFIG
let srvData = JSON.parse(fs.readFileSync('TRACKEAMENTO/Server-Yampi.json', 'utf8'));

srvData.containerVersion.container.publicId = "GTM-M95DPD78";
srvData.containerVersion.container.name = "[SERVER] SMILESHIFT CLEAN";
srvData.exportTime = new Date().toISOString();

// Erase irrelevant tags
const keepSrvTags = [
    "00 | FB | PageView",
    "01 | FB | InitiateCheckout",
    "02 | FB | Purchase"
];
srvData.containerVersion.tag = srvData.containerVersion.tag.filter(t => keepSrvTags.includes(t.name));

// Set up exact Yampi Purchase Trigger
const srvPurchaseTrigger = {
    "accountId": srvData.containerVersion.container.accountId,
    "containerId": srvData.containerVersion.container.containerId,
    "triggerId": "2001",
    "name": "Webhook: order.paid (Yampi Approved)",
    "type": "CUSTOM_EVENT",
    "customEventFilter": [
        {
            "type": "EQUALS",
            "parameter": [
                { "type": "TEMPLATE", "key": "arg0", "value": "{{Event Name}}" },
                { "type": "TEMPLATE", "key": "arg1", "value": "order.paid" }
            ]
        }
    ],
    "fingerprint": Date.now().toString()
};

// Update triggers mapping for Server
let tPageView = srvData.containerVersion.trigger.find(t => t.name.includes("page_view"));
let tBeginChck = srvData.containerVersion.trigger.find(t => t.name.includes("begin_checkout"));
if (tPageView) tPageView.triggerId = "2002";
if (tBeginChck) tBeginChck.triggerId = "2003";

srvData.containerVersion.trigger = srvData.containerVersion.trigger.filter(t => t.name.includes("GA4") || t.name.includes("page_view") || t.name.includes("begin_checkout"));
srvData.containerVersion.trigger.push(srvPurchaseTrigger);

srvData.containerVersion.tag.forEach(t => {
    if(t.name === "00 | FB | PageView") t.firingTriggerId = ["2002"];
    else if(t.name === "01 | FB | InitiateCheckout") t.firingTriggerId = ["2003"];
    else if(t.name === "02 | FB | Purchase") t.firingTriggerId = ["2001"];
});

// Update credentials on Server
srvData.containerVersion.variable.forEach(v => {
    if (v.name === "0 - FB PIXEL ID" && v.parameter) {
        let p = v.parameter.find(p => p.key === "value");
        if (p) p.value = "961216382957947";
    }
    if (v.name === "0 - FB TOKEN" && v.parameter) {
        let p = v.parameter.find(p => p.key === "value");
        if (p) p.value = "EAAYZAWIRiuyUBRCxlvVbZAtDPnzpe5iPKQb1ZBn8vZCnoSx6qDZC8wf74PrSFsK8eC9qy9F7rY8kpZCl5hpX2wLL086bSAhFqqhAmDKZCSuZAV17do1TA0kIKcB42SQOiGH4If6kQZAXDOPzUhRNOXz4AUD59kIcTOOhOqxV4ndx0qkhHYVzQZCBfrrZCWZCpAUui7xc4gZDZD";
    }
    // Handle Stape variables bug if present
    if (v.type === "cvt_6346401329_31" || v.type === "cvt_6346401329_14") {
        if (!v.parameter.some(p => p.key === "stapeStoreContainerApiKey")) {
            v.parameter.push({ "type": "TEMPLATE", "key": "stapeStoreContainerApiKey", "value": "" });
            v.parameter.push({ "type": "BOOLEAN", "key": "useDifferentStapeStore", "value": "false" });
        }
    }
});

// Assure Yampi variables are present to do robust extraction
// We need email, phone, value, order_id from Yampi Webhook Payload
// Yampi sends standard JSON payload, e.g. body.data.order_id or whatever.
// We'll rely on what exists or inject Event Data mappings.
fs.writeFileSync('GTM-M95DPD78-SERVE.JSON', JSON.stringify(srvData, null, 4));
console.log("Wrote GTM-M95DPD78-SERVE.JSON");

