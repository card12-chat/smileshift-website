"""
SmileShift GTM Builder — Final Clean Version
Generates Smileshift-Web.JSON and Smileshift-Serve.JSON
100% native GTM types, zero cvt_*, zero empty params
"""
import json
from datetime import datetime

# ─── CREDENTIALS ─────────────────────────────────────────────────────────────
GA4_ID      = "G-EJR5P2BTSF"
FB_PIXEL    = "961216382957947"
META_TOKEN  = "EAAYZAWIRiuyUBRCxlvVbZAtDPnzpe5iPKQb1ZBn8vZCnoSx6qDZC8wf74PrSFsK8eC9qy9F7rY8kpZCl5hpX2wLL086bSAhFqqhAmDKZCSuZAV17do1TA0kIKcB42SQOiGH4If6kQZAXDOPzUhRNOXz4AUD59kIcTOOhOqxV4ndx0qkhHYVzQZCBfrrZCWZCpAUui7xc4gZDZD"
VISITOR_PID = "qbsriOdZ1DXSqEr4zsAr"
TRANSPORT   = "https://api.smileshift.co"

WEB_ACC  = "6195173806"
WEB_CID  = "222121935"
WEB_PID  = "GTM-KLC8LQ3J"

SRV_ACC  = "6256174278"
SRV_CID  = "222149281"
SRV_PID  = "GTM-M95DPD78"

TS = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.000Z")

# ─── WEB CONTAINER ───────────────────────────────────────────────────────────
def build_web():
    acc, cid = WEB_ACC, WEB_CID

    # VARIABLES
    variables = [
        # Constants
        {"accountId":acc,"containerId":cid,"variableId":"1","name":"0 | GA4 - ID",
         "type":"c","parameter":[{"type":"TEMPLATE","key":"value","value":GA4_ID}],"fingerprint":"1"},
        {"accountId":acc,"containerId":cid,"variableId":"2","name":"0 | FB - Pixel",
         "type":"c","parameter":[{"type":"TEMPLATE","key":"value","value":FB_PIXEL}],"fingerprint":"2"},
        {"accountId":acc,"containerId":cid,"variableId":"3","name":"0 | transport_url",
         "type":"c","parameter":[{"type":"TEMPLATE","key":"value","value":TRANSPORT}],"fingerprint":"3"},
        {"accountId":acc,"containerId":cid,"variableId":"4","name":"0 | Visitor API Project ID",
         "type":"c","parameter":[{"type":"TEMPLATE","key":"value","value":VISITOR_PID}],"fingerprint":"4"},

        # Data Layer Variables
        {"accountId":acc,"containerId":cid,"variableId":"10","name":"event",
         "type":"v","parameter":[{"type":"INTEGER","key":"dataLayerVersion","value":"2"},
                                  {"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                  {"type":"TEMPLATE","key":"name","value":"event"}],"fingerprint":"10"},
        {"accountId":acc,"containerId":cid,"variableId":"11","name":"event_id",
         "type":"v","parameter":[{"type":"INTEGER","key":"dataLayerVersion","value":"2"},
                                  {"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                  {"type":"TEMPLATE","key":"name","value":"event_id"}],"fingerprint":"11"},
        {"accountId":acc,"containerId":cid,"variableId":"12","name":"product",
         "type":"v","parameter":[{"type":"INTEGER","key":"dataLayerVersion","value":"2"},
                                  {"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                  {"type":"TEMPLATE","key":"name","value":"product"}],"fingerprint":"12"},
        {"accountId":acc,"containerId":cid,"variableId":"13","name":"value",
         "type":"v","parameter":[{"type":"INTEGER","key":"dataLayerVersion","value":"2"},
                                  {"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                  {"type":"TEMPLATE","key":"name","value":"value"}],"fingerprint":"13"},
        {"accountId":acc,"containerId":cid,"variableId":"14","name":"currency",
         "type":"v","parameter":[{"type":"INTEGER","key":"dataLayerVersion","value":"2"},
                                  {"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                  {"type":"TEMPLATE","key":"name","value":"currency"}],"fingerprint":"14"},
        {"accountId":acc,"containerId":cid,"variableId":"15","name":"page_location",
         "type":"v","parameter":[{"type":"INTEGER","key":"dataLayerVersion","value":"2"},
                                  {"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                  {"type":"TEMPLATE","key":"name","value":"page_location"}],"fingerprint":"15"},
        {"accountId":acc,"containerId":cid,"variableId":"16","name":"page_title",
         "type":"v","parameter":[{"type":"INTEGER","key":"dataLayerVersion","value":"2"},
                                  {"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                  {"type":"TEMPLATE","key":"name","value":"page_title"}],"fingerprint":"16"},
        {"accountId":acc,"containerId":cid,"variableId":"17","name":"page_path",
         "type":"v","parameter":[{"type":"INTEGER","key":"dataLayerVersion","value":"2"},
                                  {"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                  {"type":"TEMPLATE","key":"name","value":"page_path"}],"fingerprint":"17"},

        # URL Variables — UTMs and click IDs (type "u" = URL variable)
        {"accountId":acc,"containerId":cid,"variableId":"20","name":"utm_source",
         "type":"u","parameter":[{"type":"TEMPLATE","key":"component","value":"QUERY"},
                                  {"type":"TEMPLATE","key":"queryKey","value":"utm_source"}],"fingerprint":"20"},
        {"accountId":acc,"containerId":cid,"variableId":"21","name":"utm_medium",
         "type":"u","parameter":[{"type":"TEMPLATE","key":"component","value":"QUERY"},
                                  {"type":"TEMPLATE","key":"queryKey","value":"utm_medium"}],"fingerprint":"21"},
        {"accountId":acc,"containerId":cid,"variableId":"22","name":"utm_campaign",
         "type":"u","parameter":[{"type":"TEMPLATE","key":"component","value":"QUERY"},
                                  {"type":"TEMPLATE","key":"queryKey","value":"utm_campaign"}],"fingerprint":"22"},
        {"accountId":acc,"containerId":cid,"variableId":"23","name":"utm_content",
         "type":"u","parameter":[{"type":"TEMPLATE","key":"component","value":"QUERY"},
                                  {"type":"TEMPLATE","key":"queryKey","value":"utm_content"}],"fingerprint":"23"},
        {"accountId":acc,"containerId":cid,"variableId":"24","name":"utm_term",
         "type":"u","parameter":[{"type":"TEMPLATE","key":"component","value":"QUERY"},
                                  {"type":"TEMPLATE","key":"queryKey","value":"utm_term"}],"fingerprint":"24"},
        {"accountId":acc,"containerId":cid,"variableId":"25","name":"fbclid",
         "type":"u","parameter":[{"type":"TEMPLATE","key":"component","value":"QUERY"},
                                  {"type":"TEMPLATE","key":"queryKey","value":"fbclid"}],"fingerprint":"25"},
        {"accountId":acc,"containerId":cid,"variableId":"26","name":"gclid",
         "type":"u","parameter":[{"type":"TEMPLATE","key":"component","value":"QUERY"},
                                  {"type":"TEMPLATE","key":"queryKey","value":"gclid"}],"fingerprint":"26"},
    ]

    # TRIGGERS
    triggers = [
        {   # 1001 - DOM Ready for page_view
            "accountId":acc,"containerId":cid,"triggerId":"1001",
            "name":"DOM Ready - page_view","type":"DOM_READY","fingerprint":"1001"
        },
        {   # 1002 - DataLayer begin_checkout
            "accountId":acc,"containerId":cid,"triggerId":"1002",
            "name":"Custom Event - begin_checkout","type":"CUSTOM_EVENT",
            "customEventFilter":[{"type":"EQUALS","parameter":[
                {"type":"TEMPLATE","key":"arg0","value":"{{_event}}"},
                {"type":"TEMPLATE","key":"arg1","value":"begin_checkout"}
            ]}],"fingerprint":"1002"
        },
        {   # 1003 - All Pages for Visitor API (parallel, not blocking)
            "accountId":acc,"containerId":cid,"triggerId":"1003",
            "name":"All Pages - Visitor API","type":"PAGEVIEW","fingerprint":"1003"
        },
    ]

    # ── Google Config Tag ──
    tag_config = {
        "accountId":acc,"containerId":cid,"tagId":"1","name":"0 - Tag de Configuração","type":"googtag",
        "parameter":[
            {"type":"TEMPLATE","key":"tagId","value":"{{0 | GA4 - ID}}"},
            {"type":"LIST","key":"configSettingsTable","list":[
                {"type":"MAP","map":[
                    {"type":"TEMPLATE","key":"parameter","value":"send_page_view"},
                    {"type":"TEMPLATE","key":"parameterValue","value":"false"}
                ]}
            ]}
        ],
        "fingerprint":"1","firingTriggerId":["1001"],"tagFiringOption":"ONCE_PER_LOAD",
        "monitoringMetadata":{"type":"MAP"},"consentSettings":{"consentStatus":"NOT_SET"}
    }

    # ── 01 | GA4 | page_view ──
    tag_ga4_pv = {
        "accountId":acc,"containerId":cid,"tagId":"2","name":"01 | GA4 | page_view","type":"gaawe",
        "parameter":[
            {"type":"BOOLEAN","key":"sendEcommerceData","value":"false"},
            {"type":"BOOLEAN","key":"enhancedUserId","value":"false"},
            {"type":"TEMPLATE","key":"eventName","value":"page_view"},
            {"type":"TEMPLATE","key":"measurementIdOverride","value":"{{0 | GA4 - ID}}"},
            {"type":"LIST","key":"eventSettingsTable","list":[
                {"type":"MAP","map":[{"type":"TEMPLATE","key":"parameter","value":"transport_url"},
                                     {"type":"TEMPLATE","key":"parameterValue","value":"{{0 | transport_url}}"}]},
                {"type":"MAP","map":[{"type":"TEMPLATE","key":"parameter","value":"event_id"},
                                     {"type":"TEMPLATE","key":"parameterValue","value":"{{event_id}}"}]},
                {"type":"MAP","map":[{"type":"TEMPLATE","key":"parameter","value":"page_location"},
                                     {"type":"TEMPLATE","key":"parameterValue","value":"{{page_location}}"}]},
                {"type":"MAP","map":[{"type":"TEMPLATE","key":"parameter","value":"utm_source"},
                                     {"type":"TEMPLATE","key":"parameterValue","value":"{{utm_source}}"}]},
                {"type":"MAP","map":[{"type":"TEMPLATE","key":"parameter","value":"utm_medium"},
                                     {"type":"TEMPLATE","key":"parameterValue","value":"{{utm_medium}}"}]},
                {"type":"MAP","map":[{"type":"TEMPLATE","key":"parameter","value":"utm_campaign"},
                                     {"type":"TEMPLATE","key":"parameterValue","value":"{{utm_campaign}}"}]},
            ]}
        ],
        "fingerprint":"2","firingTriggerId":["1001"],"tagFiringOption":"ONCE_PER_LOAD",
        "monitoringMetadata":{"type":"MAP"},"consentSettings":{"consentStatus":"NOT_SET"}
    }

    # ── 01 | API | page_view (same GA4 event, different name for clarity) ──
    tag_api_pv = {
        "accountId":acc,"containerId":cid,"tagId":"3","name":"01 | API | page_view","type":"gaawe",
        "parameter":[
            {"type":"BOOLEAN","key":"sendEcommerceData","value":"false"},
            {"type":"BOOLEAN","key":"enhancedUserId","value":"false"},
            {"type":"TEMPLATE","key":"eventName","value":"page_view"},
            {"type":"TEMPLATE","key":"measurementIdOverride","value":"{{0 | GA4 - ID}}"},
            {"type":"LIST","key":"eventSettingsTable","list":[
                {"type":"MAP","map":[{"type":"TEMPLATE","key":"parameter","value":"transport_url"},
                                     {"type":"TEMPLATE","key":"parameterValue","value":"{{0 | transport_url}}"}]},
                {"type":"MAP","map":[{"type":"TEMPLATE","key":"parameter","value":"event_id"},
                                     {"type":"TEMPLATE","key":"parameterValue","value":"{{event_id}}"}]},
            ]}
        ],
        "fingerprint":"3","firingTriggerId":["1001"],"tagFiringOption":"ONCE_PER_LOAD",
        "monitoringMetadata":{"type":"MAP"},"consentSettings":{"consentStatus":"NOT_SET"}
    }

    # ── 01 | FB | PageView — Custom HTML with fbq() ──
    fb_pv_html = """<script>
(function(){
  var dl = window.dataLayer = window.dataLayer || [];
  var eid = (Date.now().toString(36) + Math.random().toString(36).substr(2,9)).toUpperCase();
  dl.push({event_id: eid});
  if(typeof fbq === 'function'){
    fbq('track','PageView',{},{eventID: eid});
  } else {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
    n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
    t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window,document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init','{{0 | FB - Pixel}}');
    fbq('track','PageView',{},{eventID: eid});
  }
})();
</script>"""
    tag_fb_pv = {
        "accountId":acc,"containerId":cid,"tagId":"4","name":"01 | FB | PageView","type":"html",
        "parameter":[
            {"type":"TEMPLATE","key":"html","value":fb_pv_html},
            {"type":"BOOLEAN","key":"supportDocumentWrite","value":"false"}
        ],
        "fingerprint":"4","firingTriggerId":["1001"],"tagFiringOption":"ONCE_PER_LOAD",
        "monitoringMetadata":{"type":"MAP"},"consentSettings":{"consentStatus":"NOT_SET"}
    }

    # ── 02 | GA4 | begin_checkout ──
    tag_ga4_bc = {
        "accountId":acc,"containerId":cid,"tagId":"5","name":"02 | GA4 | begin_checkout","type":"gaawe",
        "parameter":[
            {"type":"BOOLEAN","key":"sendEcommerceData","value":"false"},
            {"type":"TEMPLATE","key":"eventName","value":"begin_checkout"},
            {"type":"TEMPLATE","key":"measurementIdOverride","value":"{{0 | GA4 - ID}}"},
            {"type":"LIST","key":"eventSettingsTable","list":[
                {"type":"MAP","map":[{"type":"TEMPLATE","key":"parameter","value":"event_id"},
                                     {"type":"TEMPLATE","key":"parameterValue","value":"{{event_id}}"}]},
                {"type":"MAP","map":[{"type":"TEMPLATE","key":"parameter","value":"value"},
                                     {"type":"TEMPLATE","key":"parameterValue","value":"{{value}}"}]},
                {"type":"MAP","map":[{"type":"TEMPLATE","key":"parameter","value":"currency"},
                                     {"type":"TEMPLATE","key":"parameterValue","value":"{{currency}}"}]},
                {"type":"MAP","map":[{"type":"TEMPLATE","key":"parameter","value":"product"},
                                     {"type":"TEMPLATE","key":"parameterValue","value":"{{product}}"}]},
                {"type":"MAP","map":[{"type":"TEMPLATE","key":"parameter","value":"transport_url"},
                                     {"type":"TEMPLATE","key":"parameterValue","value":"{{0 | transport_url}}"}]},
            ]}
        ],
        "fingerprint":"5","firingTriggerId":["1002"],"tagFiringOption":"ONCE_PER_EVENT",
        "monitoringMetadata":{"type":"MAP"},"consentSettings":{"consentStatus":"NOT_SET"}
    }

    # ── 02 | API | begin_checkout ──
    tag_api_bc = {
        "accountId":acc,"containerId":cid,"tagId":"6","name":"02 | API | begin_checkout","type":"gaawe",
        "parameter":[
            {"type":"BOOLEAN","key":"sendEcommerceData","value":"false"},
            {"type":"TEMPLATE","key":"eventName","value":"begin_checkout"},
            {"type":"TEMPLATE","key":"measurementIdOverride","value":"{{0 | GA4 - ID}}"},
            {"type":"LIST","key":"eventSettingsTable","list":[
                {"type":"MAP","map":[{"type":"TEMPLATE","key":"parameter","value":"transport_url"},
                                     {"type":"TEMPLATE","key":"parameterValue","value":"{{0 | transport_url}}"}]},
                {"type":"MAP","map":[{"type":"TEMPLATE","key":"parameter","value":"event_id"},
                                     {"type":"TEMPLATE","key":"parameterValue","value":"{{event_id}}"}]},
                {"type":"MAP","map":[{"type":"TEMPLATE","key":"parameter","value":"value"},
                                     {"type":"TEMPLATE","key":"parameterValue","value":"{{value}}"}]},
            ]}
        ],
        "fingerprint":"6","firingTriggerId":["1002"],"tagFiringOption":"ONCE_PER_EVENT",
        "monitoringMetadata":{"type":"MAP"},"consentSettings":{"consentStatus":"NOT_SET"}
    }

    # ── 02 | FB | InitiateCheckout — Custom HTML ──
    fb_ic_html = """<script>
(function(){
  if(typeof fbq !== 'function') return;
  fbq('track','InitiateCheckout',{
    value: {{value}},
    currency: '{{currency}}',
    content_name: '{{product}}'
  },{eventID: '{{event_id}}'});
})();
</script>"""
    tag_fb_ic = {
        "accountId":acc,"containerId":cid,"tagId":"7","name":"02 | FB | InitiateCheckout","type":"html",
        "parameter":[
            {"type":"TEMPLATE","key":"html","value":fb_ic_html},
            {"type":"BOOLEAN","key":"supportDocumentWrite","value":"false"}
        ],
        "fingerprint":"7","firingTriggerId":["1002"],"tagFiringOption":"ONCE_PER_EVENT",
        "monitoringMetadata":{"type":"MAP"},"consentSettings":{"consentStatus":"NOT_SET"}
    }

    # ── 00 | Visitor API — Custom HTML ──
    visitor_html = """<script>
(function(){
  var s = document.createElement('script');
  s.src = 'https://visitor.stape.io/visitor.js';
  s.setAttribute('data-project-id','{{0 | Visitor API Project ID}}');
  s.async = true;
  document.head.appendChild(s);
})();
</script>"""
    tag_visitor = {
        "accountId":acc,"containerId":cid,"tagId":"8","name":"00 | Visitor API","type":"html",
        "parameter":[
            {"type":"TEMPLATE","key":"html","value":visitor_html},
            {"type":"BOOLEAN","key":"supportDocumentWrite","value":"false"}
        ],
        "fingerprint":"8","firingTriggerId":["1003"],"tagFiringOption":"ONCE_PER_LOAD",
        "monitoringMetadata":{"type":"MAP"},"consentSettings":{"consentStatus":"NOT_SET"}
    }

    tags = [tag_config, tag_ga4_pv, tag_api_pv, tag_fb_pv,
            tag_ga4_bc, tag_api_bc, tag_fb_ic, tag_visitor]

    container = {
        "exportFormatVersion": 2,
        "exportTime": TS,
        "containerVersion": {
            "path": f"accounts/{acc}/containers/{cid}/versions/0",
            "accountId": acc, "containerId": cid,
            "containerVersionId": "0",
            "name": "SmileShift WEB",
            "container": {
                "path": f"accounts/{acc}/containers/{cid}",
                "accountId": acc, "containerId": cid,
                "name": "[WEB] SmileShift Clean",
                "publicId": WEB_PID,
                "usageContext": ["WEB"],
                "fingerprint": "1",
                "features": {
                    "supportUserPermissions":True,"supportEnvironments":True,
                    "supportWorkspaces":True,"supportGtagConfigs":False,
                    "supportBuiltInVariables":True,"supportClients":False,
                    "supportFolders":True,"supportTags":True,
                    "supportTemplates":True,"supportTriggers":True,
                    "supportVariables":True,"supportVersions":True,
                    "supportZones":True,"supportTransformations":False
                }
            },
            "tag": tags,
            "trigger": triggers,
            "variable": variables,
            "builtInVariable": [
                {"accountId":acc,"containerId":cid,"type":"PAGE_URL","name":"Page URL"},
                {"accountId":acc,"containerId":cid,"type":"PAGE_HOSTNAME","name":"Page Hostname"},
                {"accountId":acc,"containerId":cid,"type":"PAGE_PATH","name":"Page Path"},
                {"accountId":acc,"containerId":cid,"type":"REFERRER","name":"Referrer"},
            ],
            "fingerprint": "1"
        }
    }

    out = "/Users/vitorcardoso/Desktop/Smileshift/Smileshift-Web.JSON"
    with open(out, "w") as f:
        json.dump(container, f, indent=4, ensure_ascii=False)
    print("WEB OK ->", out)


# ─── SERVER CONTAINER ─────────────────────────────────────────────────────────
def build_serve():
    acc, cid = SRV_ACC, SRV_CID

    variables = [
        # Constants
        {"accountId":acc,"containerId":cid,"variableId":"1","name":"0 | Pixel Meta",
         "type":"c","parameter":[{"type":"TEMPLATE","key":"value","value":FB_PIXEL}],"fingerprint":"1"},
        {"accountId":acc,"containerId":cid,"variableId":"2","name":"0 | Meta Token",
         "type":"c","parameter":[{"type":"TEMPLATE","key":"value","value":META_TOKEN}],"fingerprint":"2"},

        # Request Header
        {"accountId":acc,"containerId":cid,"variableId":"3","name":"X-Stape-User-Id",
         "type":"rh","parameter":[{"type":"TEMPLATE","key":"headerName","value":"X-Stape-User-Id"}],
         "fingerprint":"3","formatValue":{}},

        # Event Data variables — type "ed" (verified from real export)
        {"accountId":acc,"containerId":cid,"variableId":"10","name":"ed - city",
         "type":"ed","parameter":[{"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                   {"type":"TEMPLATE","key":"keyPath","value":"city"}],"fingerprint":"10"},
        {"accountId":acc,"containerId":cid,"variableId":"11","name":"ed - state",
         "type":"ed","parameter":[{"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                   {"type":"TEMPLATE","key":"keyPath","value":"region"}],"fingerprint":"11"},
        {"accountId":acc,"containerId":cid,"variableId":"12","name":"ed - country",
         "type":"ed","parameter":[{"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                   {"type":"TEMPLATE","key":"keyPath","value":"country"}],"fingerprint":"12"},
        {"accountId":acc,"containerId":cid,"variableId":"13","name":"ed - ip_override",
         "type":"ed","parameter":[{"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                   {"type":"TEMPLATE","key":"keyPath","value":"ip_override"}],"fingerprint":"13"},
        {"accountId":acc,"containerId":cid,"variableId":"14","name":"ed - user_agent",
         "type":"ed","parameter":[{"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                   {"type":"TEMPLATE","key":"keyPath","value":"user_agent"}],"fingerprint":"14"},
        {"accountId":acc,"containerId":cid,"variableId":"15","name":"ed - page_location",
         "type":"ed","parameter":[{"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                   {"type":"TEMPLATE","key":"keyPath","value":"page_location"}],"fingerprint":"15"},

        # Webhook Yampi fields
        {"accountId":acc,"containerId":cid,"variableId":"20","name":"ed - (Webhook) resource.customer.data.email",
         "type":"ed","parameter":[{"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                   {"type":"TEMPLATE","key":"keyPath","value":"resource.customer.data.email"}],"fingerprint":"20"},
        {"accountId":acc,"containerId":cid,"variableId":"21","name":"ed - (Webhook) resource.customer.data.phone.formated_number",
         "type":"ed","parameter":[{"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                   {"type":"TEMPLATE","key":"keyPath","value":"resource.customer.data.phone.formated_number"}],"fingerprint":"21"},
        {"accountId":acc,"containerId":cid,"variableId":"22","name":"ed - (Webhook) resource.customer.data.first_name",
         "type":"ed","parameter":[{"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                   {"type":"TEMPLATE","key":"keyPath","value":"resource.customer.data.first_name"}],"fingerprint":"22"},
        {"accountId":acc,"containerId":cid,"variableId":"23","name":"ed - (Webhook) resource.customer.data.last_name",
         "type":"ed","parameter":[{"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                   {"type":"TEMPLATE","key":"keyPath","value":"resource.customer.data.last_name"}],"fingerprint":"23"},
        {"accountId":acc,"containerId":cid,"variableId":"24","name":"ed - (Webhook) resource.id",
         "type":"ed","parameter":[{"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                   {"type":"TEMPLATE","key":"keyPath","value":"resource.id"}],"fingerprint":"24"},
        {"accountId":acc,"containerId":cid,"variableId":"25","name":"ed - (Webhook) resource.value_total",
         "type":"ed","parameter":[{"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                   {"type":"TEMPLATE","key":"keyPath","value":"resource.value_total"}],"fingerprint":"25"},
        {"accountId":acc,"containerId":cid,"variableId":"26","name":"ed - (Webhook) resource.items.data.0.sku.data.product_id",
         "type":"ed","parameter":[{"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                   {"type":"TEMPLATE","key":"keyPath","value":"resource.items.data.0.sku.data.product_id"}],"fingerprint":"26"},
        {"accountId":acc,"containerId":cid,"variableId":"27","name":"ed - (Webhook) resource.items.data.0.sku.data.title",
         "type":"ed","parameter":[{"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                   {"type":"TEMPLATE","key":"keyPath","value":"resource.items.data.0.sku.data.title"}],"fingerprint":"27"},
        {"accountId":acc,"containerId":cid,"variableId":"28","name":"ed - (Webhook) resource.utm_source",
         "type":"ed","parameter":[{"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                   {"type":"TEMPLATE","key":"keyPath","value":"resource.utm_source"}],"fingerprint":"28"},
        {"accountId":acc,"containerId":cid,"variableId":"29","name":"ed - (Webhook) resource.utm_medium",
         "type":"ed","parameter":[{"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                   {"type":"TEMPLATE","key":"keyPath","value":"resource.utm_medium"}],"fingerprint":"29"},
        {"accountId":acc,"containerId":cid,"variableId":"30","name":"ed - (Webhook) resource.utm_campaign",
         "type":"ed","parameter":[{"type":"BOOLEAN","key":"setDefaultValue","value":"false"},
                                   {"type":"TEMPLATE","key":"keyPath","value":"resource.utm_campaign"}],"fingerprint":"30"},
    ]

    # TRIGGERS — simple _event match, no extra filters
    triggers = [
        {"accountId":acc,"containerId":cid,"triggerId":"2001","name":"page_view","type":"CUSTOM_EVENT",
         "customEventFilter":[{"type":"EQUALS","parameter":[
             {"type":"TEMPLATE","key":"arg0","value":"{{_event}}"},
             {"type":"TEMPLATE","key":"arg1","value":"page_view"}
         ]}],"fingerprint":"2001"},
        {"accountId":acc,"containerId":cid,"triggerId":"2002","name":"begin_checkout","type":"CUSTOM_EVENT",
         "customEventFilter":[{"type":"EQUALS","parameter":[
             {"type":"TEMPLATE","key":"arg0","value":"{{_event}}"},
             {"type":"TEMPLATE","key":"arg1","value":"begin_checkout"}
         ]}],"fingerprint":"2002"},
        {"accountId":acc,"containerId":cid,"triggerId":"2003","name":"order.paid - Purchase","type":"CUSTOM_EVENT",
         "customEventFilter":[{"type":"EQUALS","parameter":[
             {"type":"TEMPLATE","key":"arg0","value":"{{_event}}"},
             {"type":"TEMPLATE","key":"arg1","value":"order.paid"}
         ]}],"fingerprint":"2003"},
    ]

    # CLIENTS — GA4 native only (portable)
    clients = [
        {
            "accountId":acc,"containerId":cid,"clientId":"1","name":"GA4",
            "type":"gaaw_client",
            "parameter":[
                {"type":"BOOLEAN","key":"activateDefaultPaths","value":"true"},
                {"type":"TEMPLATE","key":"cookieManagement","value":"server"},
                {"type":"TEMPLATE","key":"cookieName","value":"FPID"},
                {"type":"TEMPLATE","key":"cookieDomain","value":"auto"},
                {"type":"TEMPLATE","key":"cookiePath","value":"/"},
                {"type":"TEMPLATE","key":"cookieMaxAgeInSec","value":"63072000"}
            ],
            "fingerprint":"1"
        }
    ]

    # TAGS — empty, must be created manually via Meta CAPI template
    # (no native GTM Server tag type exists for Meta CAPI without template)
    tags = []

    container = {
        "exportFormatVersion": 2,
        "exportTime": TS,
        "containerVersion": {
            "path": f"accounts/{acc}/containers/{cid}/versions/0",
            "accountId": acc, "containerId": cid,
            "containerVersionId": "0",
            "name": "SmileShift SERVER",
            "container": {
                "path": f"accounts/{acc}/containers/{cid}",
                "accountId": acc, "containerId": cid,
                "name": "[SERVER] SmileShift Clean",
                "publicId": SRV_PID,
                "usageContext": ["SERVER"],
                "fingerprint": "1",
                "features": {
                    "supportUserPermissions":True,"supportEnvironments":True,
                    "supportWorkspaces":True,"supportGtagConfigs":False,
                    "supportBuiltInVariables":False,"supportClients":True,
                    "supportFolders":True,"supportTags":True,
                    "supportTemplates":True,"supportTriggers":True,
                    "supportVariables":True,"supportVersions":True,
                    "supportZones":False,"supportTransformations":False
                }
            },
            "tag": tags,
            "trigger": triggers,
            "variable": variables,
            "client": clients,
            "fingerprint": "1"
        }
    }

    out = "/Users/vitorcardoso/Desktop/Smileshift/Smileshift-Serve.JSON"
    with open(out, "w") as f:
        json.dump(container, f, indent=4, ensure_ascii=False)
    print("SERVER OK ->", out)


build_web()
build_serve()
print("\nDone!")
