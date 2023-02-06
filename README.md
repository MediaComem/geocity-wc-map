# Geocity Map Web Component

## Develop locally

- Install dependencies:

  - Run `npm ci` on a fresh clone

- Run the application:

  - Run `npm run dev` to start the server once
  - Then visit http://localhost:port, the port is provided in the console

- Build Web Component:

  - Run `npm run build` to build the Web Component

- Demos on static HTML page:
  - Run `npm run demo`
  - Run `[demo-name].html` with a local server (e.g. _live-server_ or _vite_)

## Web Component Parameters

### General parameters

| Parameter          | Description                                                                                                                | Type             | Default                                                                                                     |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------- |
| zoom               | Zoom level applied when opening the map                                                                                    | number           | 15                                                                                                          |
| minZoom            | Minimum zoom value available for the openlayers instance. You cannot zoom below this value                                 | number           | 1                                                                                                           |
| maxZoom            | Maximum zoom value available for the openlayers instance. You can't zoom more than this value                              | number           | 18                                                                                                          |
| displayZoom        | Display and activate the zoom buttons on the map                                                                           | boolean          | true                                                                                                        |
| displayScaleLine   |                                                                                                                            | boolean          | false                                                                                                       |
| defaultCenter      | The center position of the map when it is open. Requires the parameter in the correct projection                           | Array of number  | [739867.251358, 5905800.079386]                                                                             |
| enableGeolocation  | Activates geolocation and displays a position marker.                                                                      | boolean          | true                                                                                                        |
| enableCenterButton | Displays and activates a button to refocus the map on your current position. The parameter enableGeolocation must be true. | boolean          | true                                                                                                        |
| enableRotation     | If this parameter is true, rotation of the map is possible; otherwise, the map is always in the north position.            | boolean          | true                                                                                                        |
| information        | Description of what needs to be done and how                                                                               | Object           | Look at Information parameters table for more details [Information parameters](#information-parameters)     |
| mode               | Information related to the interaciton with the map                                                                        | Object           | Look at Information parameters table for more details [Mode parameters](#mode-parameters)                   |
| cluster            | Data clustering information                                                                                                | Object           | Look at Information parameters table for more details [Cluster parameters](#cluster-parameters)             |
| geojson            | Information needed to import data via a geojson file                                                                       | Object           | Look at Information parameters table for more details [Geojson parameters](#geojson-parameters)             |
| wfs                | Information needed to import data via a WFS service                                                                        | Object           | Look at Information parameters table for more details [WFS parameters](#wfs-parameters)                     |
| wmts               | Information needed to use WMTS layer                                                                                       | Object           | Look at Information parameters table for more details [WMTS parameters](#wmts-parameters)                   |
| notifications      | Information and rules for notification. All rules must be respected to send data.                                          | Array of Objects | Look at Information parameters table for more details [Notification parameters](#notification-parameters)   |
|                    |                                                                                                                            |                  |                                                                                                             |

### Information parameters

| Parameter | Description                              | Type   | Default           |
| --------- | ---------------------------------------- | ------ | ----------------- |
| duration  | The duration display time in millisecond | number | 5                 |
| title     | Title of the information                 | string | This is a title   |
| content   | Content of the information block         | string | This is a content |
|           |                                          |        |                   |

### Mode parameters

| Parameter | Description                                                              | Type   | Default |
| --------- | ------------------------------------------------------------------------ | ------ | ------- |
| type      | Mode type: target means a target in the center of the map                | string | target  |
| radius    | Distance between the center and another point to detect a nearby element | number | 40      |
|           |                                                                          |        |         |

### Cluster parameters

| Parameter   | Description                                                         | Type   | Default |
| ----------- | ------------------------------------------------------------------- | ------ | ------- |
| distance    | Distance in pixels within which features will be clustered together | number | 40      |
| minDistance | Minimum distance in pixels between clusters.                        | number | 30      |
|             |                                                                     |        |         |

### Geojson parameters

| Parameter | Description                     | Type   | Default |
| -------- | ------------------------------- | ------ | ------- |
| url      | URL where the geojson is stored | string | ''      |
|          |                                 |        |         |

### WFS parameters

| Parameter             | Description                         | Type   | Default                                                                                                                                                                 |
| -------------------- | ----------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url                  | URL of the WFS service              | string | https://mapnv.ch/mapserv_proxy?ogcserver=source+for+image%2Fpng&SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAMES=mf_ste_equipements_publics_poubelle              |
| projection           | Target geographic projection        | string | EPSG:2056                                                                                                                                                               |
| projectionDefinition | Definition of the target projection | string | +proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs |
|                      |                                     |        |                                                                                                                                                                         |

### WMTS parameters

| Parameter  | Description                                       | Type   | Default                                                        |
| ---------- | ------------------------------------------------- | ------ | -------------------------------------------------------------- |
| capability | URL of the WMTS capability                        | string | https://wmts.geo.admin.ch/EPSG/3857/1.0.0/WMTSCapabilities.xml |
| layer      | Layer name as advertised in the WMTS capabilities | string | ch.swisstopo.swissimage                                        |
| projection | Target geographic projection                      | string | EPSG:2056                                                      |
|            |                                                   |        |                                                                |

### Notification parameters

The notification setting is a special case and depends on the notification level and associated rules. There are two parts. The first one is the same for all rules and the rule part. The latter is specific to the rule. In this section, the first table explains the first part and then there is a specific part for the rule description.

| Parameter | Description                         | Type   | Possible value                                                                  |
| --------- | ----------------------------------- | ------ | ------------------------------------------------------------------------------- |
| type      | Type of notification                | string | 'info', 'warning', 'error'                                                      |
| message   | Message display in the notification | string | 'This is a notification message'                                                |
| rule      | Description of the rule             | Object | Look at rule section for more details [Rule specification](#rule-specification) |
|           |                                     |        |                                                                                 |

#### Rule specification

- A minimum zoom level. This is a `warning` type notification. This rule contains two parameters:
  - type: for this rule, the value is `ZOOM_CONSTRAINT`
  - minZoom: The minimum zoom level to allow creation or selection.
- Information about the target mode. This is a `info` type of notification. This rule contains only one paramter.
  - type: for this rule, the value is `MOVE_TARGET`

## Street lamp: Target Mode

To activate this mode, add in your HTML code the web component with the following parameters:

```
<openlayers-element
    options='{
        "enableDraw": false, 
        "information": {
            "duration": 7,
            "title": "Signaler un éclairage public",
            "content": "Sélectionnez un lampadaire défectueux présent dans l’espace public de la ville. Ceux déjà signalés sont indiqués en orange." },
            "enableGeolocation": true,
            "enableCenterButton": true,
            "enableRotation": true,
            "mode": {
                "type": "target",
                "radius": 40
            },
            "notifications": [
                {
                    "type": "warning",
                    "message": "Veuillez zoomer davantage avant de pouvoir sélectionner un emplacement.",
                    "rule": {
                        "type": "ZOOM_CONSTRAINT",
                        "minZoom": 16
                    }
                },
                {
                    "type": "info",
                    "message": "Déplacez la carte pour que l’endroit désiré soit au centre de la cible",
                        "rule": {
                        "type": "MOVE_TARGET"
                    }
                }
            ],
            "wfs": {
                "url": "https://mapnv.ch/mapserv_proxy?ogcserver=source+for+image%2Fpng&SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAMES=mf_ste_equipements_publics_poubelle",
                "projection": "EPSG:2056",
                "projectionDefinition":
                  "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs"
            },
            "wmts": {
                "capability": "https://wmts.geo.admin.ch/EPSG/3857/1.0.0/WMTSCapabilities.xml",
                "layer": "ch.swisstopo.swissimage",
                "projection": "EPSG:3857"
            }
            
/>
```

### Validation events

For this scenario, there are two events to listen:

- `valid-event`: This event is sent when all the rules are met and the position is available. The position is stored in an array in event.detail.
- `invalid-event`: This event is sent when all the rules are not respected.
