"""
GTM Container Builder - SmileShift
Builds GTM Web and Server containers COMPLETELY FROM SCRATCH
No legacy JSON inheritance - pure schema generation
"""
import json
from datetime import datetime

# ─── CREDENTIALS ──────────────────────────────────────────────────────────────
GA4_ID       = "G-EJR5P2BTSF"
FB_PIXEL     = "961216382957947"
META_TOKEN   = "EAAYZAWIRiuyUBRCxlvVbZAtDPnzpe5iPKQb1ZBn8vZCnoSx6qDZC8wf74PrSFsK8eC9qy9F7rY8kpZCl5hpX2wLL086bSAhFqqhAmDKZCSuZAV17do1TA0kIKcB42SQOiGH4If6kQZAXDOPzUhRNOXz4AUD59kIcTOOhOqxV4ndx0qkhHYVzQZCBfrrZCWZCpAUui7xc4gZDZD"
VISITOR_PID  = "qbsriOdZ1DXSqEr4zsAr"
TRANSPORT    = "https://api.smileshift.co"

WEB_ACCOUNT_ID   = "6195173806"
WEB_CONTAINER_ID = "222121935"
WEB_PUBLIC_ID    = "GTM-KLC8LQ3J"

SRV_ACCOUNT_ID   = "6256174278"
SRV_CONTAINER_ID = "222149281"
SRV_PUBLIC_ID    = "GTM-M95DPD78"

TS = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.000Z")

# ─── HELPERS ──────────────────────────────────────────────────────────────────
def const(var_id, name, value, acc, cid):
    return {
        "accountId": acc,
        "containerId": cid,
        "variableId": str(var_id),
        "name": name,
        "type": "c",
        "parameter": [{"type": "TEMPLATE", "key": "value", "value": value}],
        "fingerprint": str(var_id)
    }

def dlv(var_id, name, dl_key, acc, cid):
    return {
        "accountId": acc,
        "containerId": cid,
        "variableId": str(var_id),
        "name": name,
        "type": "v",
        "parameter": [
            {"type": "INTEGER", "key": "dataLayerVersion", "value": "2"},
            {"type": "BOOLEAN", "key": "setDefaultValue", "value": "false"},
            {"type": "TEMPLATE",  "key": "name",             "value": dl_key}
        ],
        "fingerprint": str(var_id)
    }

def cookie_var(var_id, name, cookie_name, acc, cid):
    return {
        "accountId": acc,
        "containerId": cid,
        "variableId": str(var_id),
        "name": name,
        "type": "k",
        "parameter": [{"type": "TEMPLATE", "key": "name", "value": cookie_name}],
        "fingerprint": str(var_id)
    }

def dom_ready_trigger(trigger_id, acc, cid):
    return {
        "accountId": acc,
        "containerId": cid,
        "triggerId": str(trigger_id),
        "name": "DOM Ready - Page View",
        "type": "DOM_READY",
        "fingerprint": str(trigger_id)
    }

def custom_event_trigger(trigger_id, name, event_name, acc, cid):
    return {
        "accountId": acc,
        "containerId": cid,
        "triggerId": str(trigger_id),
        "name": name,
        "type": "CUSTOM_EVENT",
        "customEventFilter": [
            {
                "type": "EQUALS",
                "parameter": [
                    {"type": "TEMPLATE", "key": "arg0", "value": "{{_event}}"},
                    {"type": "TEMPLATE", "key": "arg1", "value": event_name}
                ]
            }
        ],
        "fingerprint": str(trigger_id)
    }

def pageview_trigger(trigger_id, name, acc, cid):
    return {
        "accountId": acc,
        "containerId": cid,
        "triggerId": str(trigger_id),
        "name": name,
        "type": "PAGEVIEW",
        "fingerprint": str(trigger_id)
    }

def tag_base(tag_id, name, tag_type, params, firing_ids, firing_option, acc, cid):
    return {
        "accountId": acc,
        "containerId": cid,
        "tagId": str(tag_id),
        "name": name,
        "type": tag_type,
        "parameter": params,
        "fingerprint": str(tag_id),
        "firingTriggerId": [str(t) for t in firing_ids],
        "tagFiringOption": firing_option,
        "monitoringMetadata": {"type": "MAP"},
        "consentSettings": {"consentStatus": "NOT_SET"}
    }

# ─── WEB CONTAINER ────────────────────────────────────────────────────────────
def build_web():
    acc = WEB_ACCOUNT_ID
    cid = WEB_CONTAINER_ID

    # VARIABLES
    variables = [
        # Constants
        const(1, "0 | GA4 - ID",                GA4_ID,      acc, cid),
        const(2, "0 | FB - Pixel",               FB_PIXEL,    acc, cid),
        const(3, "0 | transport_url",            TRANSPORT,   acc, cid),
        const(4, "0 | Visitor API Project ID",   VISITOR_PID, acc, cid),

        # Data Layer Variables
        dlv(10, "event_id",     "event_id",     acc, cid),
        dlv(11, "value",        "value",        acc, cid),
        dlv(12, "currency",     "currency",     acc, cid),
        dlv(13, "content_ids",  "content_ids",  acc, cid),
        dlv(14, "page_location","page_location",acc, cid),
        dlv(15, "page_title",   "page_title",   acc, cid),
        dlv(16, "page_path",    "page_path",    acc, cid),
    ]

    # TRIGGERS
    # 1001 = DOM Ready (page_view)
    # 1002 = Custom Event begin_checkout
    # 1003 = All Pages (Visitor API)
    triggers = [
        dom_ready_trigger(1001, acc, cid),
        custom_event_trigger(1002, "Custom Event - begin_checkout", "begin_checkout", acc, cid),
        pageview_trigger(1003, "All Pages - Visitor API", acc, cid),
    ]

    # TAGS
    # ── Google Config Tag ──
    tag_google_config = tag_base(
        44, "0 - Tag de Configuração", "googtag",
        [
            {"type": "TEMPLATE", "key": "tagId", "value": "{{0 | GA4 - ID}}"},
            {
                "type": "LIST",
                "key": "configSettingsTable",
                "list": [
                    {
                        "type": "MAP",
                        "map": [
                            {"type": "TEMPLATE", "key": "parameter",      "value": "send_page_view"},
                            {"type": "TEMPLATE", "key": "parameterValue", "value": "false"}
                        ]
                    }
                ]
            }
        ],
        [1001], "ONCE_PER_LOAD", acc, cid
    )

    # ── 01 | GA4 | page_view ──
    tag_ga4_pv = tag_base(
        53, "01 | GA4 | page_view", "gaawe",
        [
            {"type": "BOOLEAN",  "key": "sendEcommerceData",    "value": "false"},
            {"type": "BOOLEAN",  "key": "enhancedUserId",       "value": "false"},
            {"type": "TEMPLATE", "key": "eventName",            "value": "page_view"},
            {"type": "TEMPLATE", "key": "measurementIdOverride","value": "{{0 | GA4 - ID}}"}
        ],
        [1001], "ONCE_PER_LOAD", acc, cid
    )

    # ── 01 | API | page_view (GA4 Event com transport_url e event_id) ──
    tag_api_pv = tag_base(
        28, "01 | API | page_view", "gaawe",
        [
            {"type": "BOOLEAN", "key": "sendEcommerceData", "value": "false"},
            {"type": "BOOLEAN", "key": "enhancedUserId",    "value": "false"},
            {"type": "TEMPLATE","key": "eventName",         "value": "page_view"},
            {"type": "TEMPLATE","key": "measurementIdOverride", "value": "{{0 | GA4 - ID}}"},
            {
                "type": "LIST",
                "key": "eventSettingsTable",
                "list": [
                    {
                        "type": "MAP",
                        "map": [
                            {"type": "TEMPLATE", "key": "parameter",      "value": "event_id"},
                            {"type": "TEMPLATE", "key": "parameterValue", "value": "{{event_id}}"}
                        ]
                    },
                    {
                        "type": "MAP",
                        "map": [
                            {"type": "TEMPLATE", "key": "parameter",      "value": "transport_url"},
                            {"type": "TEMPLATE", "key": "parameterValue", "value": "{{0 | transport_url}}"}
                        ]
                    }
                ]
            }
        ],
        [1001], "ONCE_PER_LOAD", acc, cid
    )

    # ── 01 | FB | PageView — Custom HTML (native, no cvt_*) ──
    fb_pv_html = """<script>
if (typeof fbq === 'function') {
  fbq('trackCustom', 'PageView', {}, {eventID: '{{event_id}}' });
} else {
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '{{0 | FB - Pixel}}');
  fbq('track', 'PageView', {}, {eventID: '{{event_id}}' });
}
</script>"""
    tag_fb_pv = tag_base(
        40, "01 | FB | PageView", "html",
        [
            {"type": "TEMPLATE", "key": "html",            "value": fb_pv_html},
            {"type": "BOOLEAN",  "key": "supportDocumentWrite", "value": "false"}
        ],
        [1001], "ONCE_PER_LOAD", acc, cid
    )

    # ── 02 | GA4 | begin_checkout ──
    tag_ga4_bc = tag_base(
        38, "02 | GA4 | begin_checkout", "gaawe",
        [
            {"type": "BOOLEAN",  "key": "sendEcommerceData",    "value": "false"},
            {"type": "TEMPLATE", "key": "eventName",            "value": "begin_checkout"},
            {"type": "TEMPLATE", "key": "measurementIdOverride","value": "{{0 | GA4 - ID}}"}
        ],
        [1002], "ONCE_PER_EVENT", acc, cid
    )

    # ── 02 | API | begin_checkout ──
    tag_api_bc = tag_base(
        37, "02 | API | begin_checkout", "gaawe",
        [
            {"type": "BOOLEAN",  "key": "sendEcommerceData",    "value": "false"},
            {"type": "TEMPLATE", "key": "eventName",            "value": "begin_checkout"},
            {"type": "TEMPLATE", "key": "measurementIdOverride","value": "{{0 | GA4 - ID}}"},
            {
                "type": "LIST",
                "key": "eventSettingsTable",
                "list": [
                    {
                        "type": "MAP",
                        "map": [
                            {"type": "TEMPLATE", "key": "parameter",      "value": "event_id"},
                            {"type": "TEMPLATE", "key": "parameterValue", "value": "{{event_id}}"}
                        ]
                    },
                    {
                        "type": "MAP",
                        "map": [
                            {"type": "TEMPLATE", "key": "parameter",      "value": "transport_url"},
                            {"type": "TEMPLATE", "key": "parameterValue", "value": "{{0 | transport_url}}"}
                        ]
                    },
                    {
                        "type": "MAP",
                        "map": [
                            {"type": "TEMPLATE", "key": "parameter",      "value": "value"},
                            {"type": "TEMPLATE", "key": "parameterValue", "value": "{{value}}"}
                        ]
                    },
                    {
                        "type": "MAP",
                        "map": [
                            {"type": "TEMPLATE", "key": "parameter",      "value": "currency"},
                            {"type": "TEMPLATE", "key": "parameterValue", "value": "{{currency}}"}
                        ]
                    }
                ]
            }
        ],
        [1002], "ONCE_PER_EVENT", acc, cid
    )

    # ── 02 | FB | InitiateCheckout — Custom HTML (native, no cvt_*) ──
    fb_ic_html = """<script>
if (typeof fbq === 'function') {
  fbq('track', 'InitiateCheckout', {
    value: {{value}},
    currency: '{{currency}}',
    content_ids: ['{{content_ids}}']
  }, {eventID: '{{event_id}}' });
}
</script>"""
    tag_fb_bc = tag_base(
        52, "02 | FB | InitiateCheckout", "html",
        [
            {"type": "TEMPLATE", "key": "html",            "value": fb_ic_html},
            {"type": "BOOLEAN",  "key": "supportDocumentWrite", "value": "false"}
        ],
        [1002], "ONCE_PER_EVENT", acc, cid
    )

    # ── 00 | Visitor API — Custom HTML (native) ──
    visitor_html = """<script src="https://visitor.stape.io/visitor.js" data-project-id="{{0 | Visitor API Project ID}}" async></script>"""
    tag_visitor_api = tag_base(
        50, "00 | Visitor API", "html",
        [
            {"type": "TEMPLATE", "key": "html",            "value": visitor_html},
            {"type": "BOOLEAN",  "key": "supportDocumentWrite", "value": "false"}
        ],
        [1003], "ONCE_PER_EVENT", acc, cid
    )

    tags = [
        tag_google_config,
        tag_ga4_pv,
        tag_api_pv,
        tag_fb_pv,
        tag_ga4_bc,
        tag_api_bc,
        tag_fb_bc,
        tag_visitor_api,
    ]

    container = {
        "exportFormatVersion": 2,
        "exportTime": TS,
        "containerVersion": {
            "path": f"accounts/{acc}/containers/{cid}/versions/0",
            "accountId": acc,
            "containerId": cid,
            "containerVersionId": "0",
            "name": "SmileShift WEB Clean",
            "container": {
                "path": f"accounts/{acc}/containers/{cid}",
                "accountId": acc,
                "containerId": cid,
                "name": "[WEB] SMILESHIFT CLEAN",
                "publicId": WEB_PUBLIC_ID,
                "usageContext": ["WEB"],
                "fingerprint": "1",
                "tagManagerUrl": f"https://tagmanager.google.com/#/container/accounts/{acc}/containers/{cid}/workspaces?apiLink=container",
                "features": {
                    "supportUserPermissions": True,
                    "supportEnvironments": True,
                    "supportWorkspaces": True,
                    "supportGtagConfigs": False,
                    "supportBuiltInVariables": True,
                    "supportClients": False,
                    "supportFolders": True,
                    "supportTags": True,
                    "supportTemplates": True,
                    "supportTriggers": True,
                    "supportVariables": True,
                    "supportVersions": True,
                    "supportZones": True,
                    "supportTransformations": False
                }
            },
            "tag": tags,
            "trigger": triggers,
            "variable": variables,
            "builtInVariable": [
                {"accountId": acc, "containerId": cid, "type": "PAGE_URL",      "name": "Page URL"},
                {"accountId": acc, "containerId": cid, "type": "PAGE_HOSTNAME", "name": "Page Hostname"},
                {"accountId": acc, "containerId": cid, "type": "PAGE_PATH",     "name": "Page Path"},
                {"accountId": acc, "containerId": cid, "type": "REFERRER",      "name": "Referrer"},
            ],
            "fingerprint": "1"
        }
    }

    out = "/Users/vitorcardoso/Desktop/Smileshift/GTM-KLC8LQ3J-WEB.JSON"
    with open(out, "w") as f:
        json.dump(container, f, indent=4, ensure_ascii=False)
    print("WEB OK ->", out)
    return container

# ─── SERVER CONTAINER ─────────────────────────────────────────────────────────
def build_serve():
    acc = SRV_ACCOUNT_ID
    cid = SRV_CONTAINER_ID

    # VARIABLES - Constants
    variables = [
        const(1, "0 | Pixel Meta",  FB_PIXEL,    acc, cid),
        const(2, "0 | Meta Token",  META_TOKEN,  acc, cid),
    ]

    # Event Data variables (ed type = "eud" for server)
    ed_vars = [
        ("ed - city",       "x-ga-mp1-city",        20),
        ("ed - state",      "x-ga-mp1-st",          21),
        ("ed - country",    "x-ga-mp1-cn",          22),
        ("ed - page_location", "page_location",     23),
        ("ed - ip_override","ip_override",           24),
        ("ed - user_agent", "user_agent",            25),
        # Webhook Yampi fields
        ("ed - (Webhook) resource.customer.data.email",               "resource.customer.data.email",               30),
        ("ed - (Webhook) resource.customer.data.phone.formated_number","resource.customer.data.phone.formated_number",31),
        ("ed - (Webhook) resource.customer.data.first_name",          "resource.customer.data.first_name",          32),
        ("ed - (Webhook) resource.customer.data.last_name",           "resource.customer.data.last_name",           33),
        ("ed - (Webhook) resource.id",                                "resource.id",                                34),
        ("ed - (Webhook) resource.items.data.0.sku.data.product_id",  "resource.items.data.0.sku.data.product_id",  35),
        ("ed - (Webhook) resource.items.data.0.sku.data.title",       "resource.items.data.0.sku.data.title",       36),
        ("ed - (Webhook) resource.value_total",                       "resource.value_total",                       37),
    ]
    for (name, key_path, vid) in ed_vars:
        variables.append({
            "accountId": acc,
            "containerId": cid,
            "variableId": str(vid),
            "name": name,
            "type": "eud",
            "parameter": [
                {"type": "TEMPLATE", "key": "keyPath", "value": key_path}
            ],
            "fingerprint": str(vid)
        })

    # Request Header variable for X-Stape-User-Id
    variables.append({
        "accountId": acc,
        "containerId": cid,
        "variableId": "50",
        "name": "X-Stape-User-Id",
        "type": "hrq",
        "parameter": [
            {"type": "TEMPLATE", "key": "headerName", "value": "x-stape-user-id"}
        ],
        "fingerprint": "50"
    })

    # TRIGGERS
    # Server-side triggers use CUSTOM_EVENT but with filter on _event AND client_name
    def srv_trigger(tid, name, event_val, client_filter_val):
        t = {
            "accountId": acc,
            "containerId": cid,
            "triggerId": str(tid),
            "name": name,
            "type": "CUSTOM_EVENT",
            "customEventFilter": [
                {
                    "type": "EQUALS",
                    "parameter": [
                        {"type": "TEMPLATE", "key": "arg0", "value": "{{_event}}"},
                        {"type": "TEMPLATE", "key": "arg1", "value": event_val}
                    ]
                }
            ],
            "filter": [
                {
                    "type": "CONTAINS",
                    "parameter": [
                        {"type": "TEMPLATE", "key": "arg0", "value": "{{Client Name}}"},
                        {"type": "TEMPLATE", "key": "arg1", "value": client_filter_val}
                    ]
                }
            ],
            "fingerprint": str(tid)
        }
        return t

    triggers = [
        srv_trigger(2001, "page_view - GA4",       "page_view",    "GA4"),
        srv_trigger(2002, "begin_checkout - GA4",  "begin_checkout","GA4"),
        srv_trigger(2003, "Purchase - Yampi",      "order.paid",   "Data Client"),
    ]

    # Common FB CAPI parameters
    def fb_capi_params(event_name_val, extra_user_data=None, extra_server_event=None):
        user_data = [
            {"type": "MAP", "map": [
                {"type": "TEMPLATE", "key": "name",  "value": "em"},
                {"type": "TEMPLATE", "key": "value", "value": "{{ed - (Webhook) resource.customer.data.email}}"}
            ]},
            {"type": "MAP", "map": [
                {"type": "TEMPLATE", "key": "name",  "value": "ph"},
                {"type": "TEMPLATE", "key": "value", "value": "{{ed - (Webhook) resource.customer.data.phone.formated_number}}"}
            ]},
            {"type": "MAP", "map": [
                {"type": "TEMPLATE", "key": "name",  "value": "fn"},
                {"type": "TEMPLATE", "key": "value", "value": "{{ed - (Webhook) resource.customer.data.first_name}}"}
            ]},
            {"type": "MAP", "map": [
                {"type": "TEMPLATE", "key": "name",  "value": "ln"},
                {"type": "TEMPLATE", "key": "value", "value": "{{ed - (Webhook) resource.customer.data.last_name}}"}
            ]},
            {"type": "MAP", "map": [
                {"type": "TEMPLATE", "key": "name",  "value": "client_ip_address"},
                {"type": "TEMPLATE", "key": "value", "value": "{{ed - ip_override}}"}
            ]},
            {"type": "MAP", "map": [
                {"type": "TEMPLATE", "key": "name",  "value": "client_user_agent"},
                {"type": "TEMPLATE", "key": "value", "value": "{{ed - user_agent}}"}
            ]},
            {"type": "MAP", "map": [
                {"type": "TEMPLATE", "key": "name",  "value": "fbc"},
                {"type": "TEMPLATE", "key": "value", "value": "{{X-Stape-User-Id}}"}
            ]},
        ]
        if extra_user_data:
            user_data.extend(extra_user_data)

        params = [
            {"type": "TEMPLATE", "key": "logType",              "value": "debug"},
            {"type": "TEMPLATE", "key": "adStorageConsent",     "value": "optional"},
            {"type": "TEMPLATE", "key": "eventNameStandard",    "value": event_name_val},
            {"type": "BOOLEAN",  "key": "generateFbp",          "value": "true"},
            {"type": "BOOLEAN",  "key": "overrideCookieDomain", "value": "false"},
            {"type": "TEMPLATE", "key": "pixelId",              "value": "{{0 | Pixel Meta}}"},
            {"type": "TEMPLATE", "key": "apiToken",             "value": "{{0 | Meta Token}}"},
            {"type": "LIST",     "key": "userDataList",         "list": user_data},
        ]

        if extra_server_event:
            params.append({"type": "LIST", "key": "serverEventDataList", "list": extra_server_event})

        return params

    # ── 00 | FB | PageView ──
    tag_fb_pv = {
        "accountId": acc,
        "containerId": cid,
        "tagId": "100",
        "name": "00 | FB | PageView",
        "type": "cvt_6346401329_1",
        "parameter": fb_capi_params("PageView"),
        "fingerprint": "100",
        "firingTriggerId": ["2001"],
        "tagFiringOption": "ONCE_PER_EVENT",
        "monitoringMetadata": {"type": "MAP"},
        "consentSettings": {"consentStatus": "NOT_SET"}
    }

    # ── 01 | FB | InitiateCheckout ──
    tag_fb_ic = {
        "accountId": acc,
        "containerId": cid,
        "tagId": "101",
        "name": "01 | FB | InitiateCheckout",
        "type": "cvt_6346401329_1",
        "parameter": fb_capi_params("InitiateCheckout"),
        "fingerprint": "101",
        "firingTriggerId": ["2002"],
        "tagFiringOption": "ONCE_PER_EVENT",
        "monitoringMetadata": {"type": "MAP"},
        "consentSettings": {"consentStatus": "NOT_SET"}
    }

    # ── 02 | FB | Purchase ──
    purchase_server_event = [
        {"type": "MAP", "map": [
            {"type": "TEMPLATE", "key": "name",  "value": "event_id"},
            {"type": "TEMPLATE", "key": "value", "value": "{{ed - (Webhook) resource.id}}"}
        ]},
        {"type": "MAP", "map": [
            {"type": "TEMPLATE", "key": "name",  "value": "value"},
            {"type": "TEMPLATE", "key": "value", "value": "{{ed - (Webhook) resource.value_total}}"}
        ]},
        {"type": "MAP", "map": [
            {"type": "TEMPLATE", "key": "name",  "value": "currency"},
            {"type": "TEMPLATE", "key": "value", "value": "BRL"}
        ]},
        {"type": "MAP", "map": [
            {"type": "TEMPLATE", "key": "name",  "value": "content_ids"},
            {"type": "TEMPLATE", "key": "value", "value": "{{ed - (Webhook) resource.items.data.0.sku.data.product_id}}"}
        ]},
    ]
    tag_fb_purchase = {
        "accountId": acc,
        "containerId": cid,
        "tagId": "102",
        "name": "02 | FB | Purchase",
        "type": "cvt_6346401329_1",
        "parameter": fb_capi_params("Purchase", extra_server_event=purchase_server_event),
        "fingerprint": "102",
        "firingTriggerId": ["2003"],
        "tagFiringOption": "ONCE_PER_EVENT",
        "monitoringMetadata": {"type": "MAP"},
        "consentSettings": {"consentStatus": "NOT_SET"}
    }

    tags = [tag_fb_pv, tag_fb_ic, tag_fb_purchase]

    container = {
        "exportFormatVersion": 2,
        "exportTime": TS,
        "containerVersion": {
            "path": f"accounts/{acc}/containers/{cid}/versions/0",
            "accountId": acc,
            "containerId": cid,
            "containerVersionId": "0",
            "name": "SmileShift SERVER Clean",
            "container": {
                "path": f"accounts/{acc}/containers/{cid}",
                "accountId": acc,
                "containerId": cid,
                "name": "[SERVER] SMILESHIFT CLEAN",
                "publicId": SRV_PUBLIC_ID,
                "usageContext": ["SERVER"],
                "fingerprint": "1",
                "tagManagerUrl": f"https://tagmanager.google.com/#/container/accounts/{acc}/containers/{cid}/workspaces?apiLink=container",
                "features": {
                    "supportUserPermissions": True,
                    "supportEnvironments": True,
                    "supportWorkspaces": True,
                    "supportGtagConfigs": False,
                    "supportBuiltInVariables": False,
                    "supportClients": True,
                    "supportFolders": True,
                    "supportTags": True,
                    "supportTemplates": True,
                    "supportTriggers": True,
                    "supportVariables": True,
                    "supportVersions": True,
                    "supportZones": False,
                    "supportTransformations": False
                }
            },
            "tag": tags,
            "trigger": triggers,
            "variable": variables,
            "fingerprint": "1"
        }
    }

    out = "/Users/vitorcardoso/Desktop/Smileshift/GTM-M95DPD78-SERVE.JSON"
    with open(out, "w") as f:
        json.dump(container, f, indent=4, ensure_ascii=False)
    print("SERVER OK ->", out)
    return container

# ─── RUN ──────────────────────────────────────────────────────────────────────
build_web()
build_serve()
print("\nAmbos os containers gerados com sucesso!")
