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

## Web Component Parameters

### General parameters

| Parameter          | Description                                                                                                                | Type             | Default                                                                                                     |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------- |
| zoom               | Zoom level applied when opening the map                                                                                    | number           | 15                                                                                                          |
| minZoom            | Minimum zoom value available for the openlayers instance. You cannot zoom below this value                                 | number           | 1                                                                                                           |
| maxZoom            | Maximum zoom value available for the openlayers instance. You can't zoom more than this value                              | number           | 18                                                                                                          |                                                                                                |
| defaultCenter      | The center position of the map when it is open. Requires the parameter in the correct projection                           | Array of number  | [739867.251358, 5905800.079386]                                                                             |
| interaction               | Information needed for map interaction                                                                              | Array of Object  | Look at Information parameters table for more details [Interaction parameters](#interaction-parameters)                   |                                                                                                  |
| information        | Description of what needs to be done and how                                                                               | Object           | Look at Information parameters table for more details [Information parameters](#information-parameters)     |
| mode               | Information related to the interaciton with the map                                                                        | Object           | Look at Information parameters table for more details [Mode parameters](#mode-parameters)                   |
| cluster            | Data clustering information                                                                                                | Object           | Look at Information parameters table for more details [Cluster parameters](#cluster-parameters)             |
| wfs                | Information needed to import data via a WFS service                                                                        | Object           | Look at Information parameters table for more details [WFS parameters](#wfs-parameters)                     |
| wmts               | Information needed to use WMTS layer                                                                                       | Array of Object  | Look at Information parameters table for more details [WMTS parameters](#wmts-parameters)                   |
| notifications      | Information and rules for notification. All rules must be respected to send data.                                          | Array of Objects | Look at Information parameters table for more details [Notification parameters](#notification-parameters)   |
| geolocationInformation    | Display options for the geolocation information box   | Object                  |    Look at Information parameters table for more details [geolocation information parameters](#geolocation-information-parameters)                                                                                                         |
| search    | Display options for the search address or parcel search   | Object                  |    Look at Information parameters table for more details [search parameters](#search-parameters)                                                                                                         |
| inclusionArea    | URL to a WFS server containing the inclusion area information   | Object                  | Look at Inclusion parameters table for more details [Inclusion parameters](#inclusion-parameters)     |
| selectionTargetBoxMessage    |  Title of the target or selection box  | string                  |   '' |
| outputFormat    |  Possible output format: GeometryCollection or FeatureCollection  | string                  |   'GeometryCollection' |
| border            | Data border information                                                                                                     | Object           | Look at Information parameters table for more details [Border parameters](#border-parameters)     
|                    |                                                                                                                            |                  |                                                                                                             |

### Interaction parameters
| Parameter | Description                              | Type   | Default           |
| --------- | ---------------------------------------- | ------ | ----------------- |
| displayZoom  | Display and activate the zoom buttons on the map | boolean | true |
| displayScaleLine     |                  | boolean | false   |
| enableGeolocation   | Activates geolocation and displays a position marker. | boolean | true |
| enableCenterButton   | Displays and activates a button to refocus the map on your current position. The parameter enableGeolocation must be true. | boolean | true |
| enableRotation   | If this parameter is true, rotation of the map is possible; otherwise, the map is always in the north position.  | boolean | true |
| fullscreen   | Display and activate the fullscreen buttons on the map | boolean | true |
|           |                                          |        |                   |
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
|           |                                                                          |        |         |

### Cluster parameters

| Parameter   | Description                                                         | Type   | Default |
| ----------- | ------------------------------------------------------------------- | ------ | ------- |
| distance    | Distance in pixels within which features will be clustered together | number | 40      |
| minDistance | Minimum distance in pixels between clusters.                        | number | 30      |
|             |                                                                     |        |         |

### Border parameters

| Parameter    | Description                                                         | Type   | Default |
| ------------ | ------------------------------------------------------------------- | ------ | ------- |
| url          | Url where the Geojson is located with border information            | string | ''      |
| notification | Message displayed if you try to add element outside of border       | string | ''      |
|              |                                                                     |        |         |

### WFS parameters

| Parameter             | Description                         | Type   | Default                                                                                                                                                                 |
| -------------------- | ----------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url                  | URL of the WFS service              | string | https://mapnv.ch/mapserv_proxy?ogcserver=source+for+image%2Fpng&SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAMES=mf_ste_equipements_publics_poubelle              |
|                      |                                     |        |                                                                                                                                                                         |

### WMTS parameters

| Parameter  | Description                                       | Type   | Default                                                        |
| ---------- | ------------------------------------------------- | ------ | -------------------------------------------------------------- |
| capability | URL of the WMTS capability                        | string | https://wmts.geo.admin.ch/EPSG/2056/1.0.0/WMTSCapabilities.xml |
| layer      | Layer name as advertised in the WMTS capabilities | string | ch.swisstopo.pixelkarte-grau                                   |
| projection | Target geographic projection                      | string | EPSG:2056                                                      |
| name       | Name of the layer displayed for selection         | string |                                                                |
| thumbnail  | Url where the thumbnail image is located          | string |                                                                |
|            |                                                   |        |                                                                |

### Notification parameters

The notification setting is a special case and depends on the notification level and associated rules. There are two parts. The first one is the same for all rules and the rule part. The latter is specific to the rule. In this section, the first table explains the first part and then there is a specific part for the rule description.

| Parameter | Description                         | Type   | Possible value                                                                  |
| --------- | ----------------------------------- | ------ | ------------------------------------------------------------------------------- |
| type      | Type of notification                | string | 'info', 'warning', 'error'                                                      |
| message   | Message display in the notification | string | 'This is a notification message'                                                |
| rule      | Description of the rule             | Object | Look at rule section for more details [Rule specification](#rule-specification) |
|           |                                     |        |                                                                                 |

### Geolocation Information parameters

These settings allow you to display or not
- the box containing the current location
- the address based on the current location
- the current position
 
according to the settings table below:

| Parameter | Description                         | Type   | Possible value                                                                  |
| --------- | ----------------------------------- | ------ | ------------------------------------------------------------------------------- |
| displayBox      | Display or not the box                | boolean | true                                                      |
| reverseLocation   | Display or not the address according to the current position | boolean | true                                      |
| currentLocation      | Display or not the current coordinate            | boolean | true |
|           |                                     |        |                                                                                 |

### Search parameters

| Parameter  | Description                                       | Type   | Default                                                        |
| --------- | ----------------------------------- | ------ | ------------------------------------------------------------------------------- |
| displaySearch | Display or not the search field                  | boolean | false |
| requestWithoutCustomValue      | URL without text search value and without bbox restriction. | string | https://api3.geo.admin.ch/rest/services/api/SearchServer?limit=5&&type=locations&sr=2056&lang=fr&origins=address%2Cparcel&searchText=                                        |
| bboxRestiction | Bounding box of the search area  | string | 2523099.818000,1167985.282000,2549752.141000,1192697.773000                                                     |
|           |                                     |        |                                                                                 |

### Inclusion parameters

| Parameter             | Description                         | Type   | Default                                                                                                                                                                 |
| -------------------- | ----------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url                  | URL of the WFS service              | string | ''             |
| filter               | WFS service filter, the filter must be a GeometryOperands and must contain the ```<BBOX>``` pattern | string | ''                                                                                                                                                                      |
|                      |                                     |        |                                                                                                                                                                         |

The ```<BBOX>``` is mandatory in case of you add a filter because during the process, this pattern is replaced by the actual BBOX of the zoom level and loads only the necessary data.
* Example of url: ```https://mapnv.ch/mapserv_proxy?ogcserver=source+for+image%2Fpng&SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&typeName=MO_bf_bien_fonds```
* Example of filter: ```GeometryOperands=urn:ogc:def:crs:EPSG::2056&FILTER=<Filter><And><PropertyIsEqualTo><ValueReference>commune</ValueReference><Literal>Yverdon-les-Bains</Literal></PropertyIsEqualTo><PropertyIsNotEqualTo><ValueReference>genre</ValueReference><Literal>Parcelle privée</Literal></PropertyIsNotEqualTo><BBOX></And></Filter>```

otherwise, only the url is requested:
* Example of url: ```https://mapnv.ch/mapserv_proxy?ogcserver=source+for+image%2Fpng&SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&typeName=MO_bf_bien_fonds```
                                       

#### Rule specification

- A minimum zoom level. This is a `warning` type notification. This rule contains two parameters:
  - type: for this rule, the value is `ZOOM_CONSTRAINT`
  - minZoom: The minimum zoom level to allow creation or selection.
- An inclusion area. This is a `warning` type of notification. This rule contains two paramters:
  - type: for this rule, the value is `AREA_CONSTRAINT`
  - couldBypass: Allowed to bypass the rule. If the value is false or undefined, to validate, the user must be in the inclusion zone.
- A maximum number of selected/created elements. This is a `warning` type notification. This rule contains two parameters:
  - type: for this rule, the value is `MAX_SELECTION`
  - maxElement: The maximum number of element you can select (-1 or no rules means no limit)
- Information about the target mode. This is a `info` type of notification. This rule contains only one paramter.
  - type: for this rule, the value is `MOVE_TARGET`

## Street lamp: Select Mode

To activate this mode, add in your HTML code the web component with the following parameters:

```
<openlayers-element
        options='{
                                        "information": { "duration": 5000, "title": "Signaler un éclairage public", "content": "Sélectionnez un lampadaire défectueux présent dans l’espace public de la ville." },
                                        "interaction": {
                                          "displayZoom": true,
                                          "displayScaleLine": false,
                                          "fullscreen": true,
                                          "enableGeolocation": true,
                                          "enableCenterButton": true,
                                          "enableRotation": true
                                      },
                                        "mode": {
                                            "type": "select"
                                        },
                                        "geolocationInformation": {
                                            "displayBox": true,
                                            "reverseLocation": true,
                                            "currentLocation": false
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
                                            "type": "warning",
                                            "message": "Le maximum de sélection est limité à {x}.",
                                            "rule": {
                                                "type": "MAX_SELECTION",
                                                "maxElement": 1
                                            }
                                          },
                                        {
                                            "type": "info",
                                            "message": "Sélectionnez un marqueur sur la carte.",
                                                "rule": {
                                                "type": "MOVE_TARGET"
                                            }
                                        }
                                        ],
                                        "wfs": {
                                            "url": "https://mapnv.ch/mapserv_proxy?ogcserver=source+for+image%2Fpng&SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAMES=ELE_tragwerk_gesco"
                                        },
                                        "wmts": [{
                                            "capability": "https://wmts.asit-asso.ch/wmts?&Service=WMTS&Version=1.0.0&Request=GetCapabilities",
                                            "layer": "asitvd.fond_cadastral",
                                            "projection": "EPSG:2056",
                                            "name": "Carte de base",
                                            "thumbnail": "https://localhost:5173/base.svg"
                                        },
                                        {
                                            "capability": "https://wmts.geo.admin.ch/EPSG/2056/1.0.0/WMTSCapabilities.xml",
                                            "layer": "ch.swisstopo.swissimage",
                                            "projection": "EPSG:2056",
                                            "name": "Photo aérienne",
                                            "thumbnail": "https://localhost:5173/aerial.svg"
                                        }],
                                        "selectionTargetBoxMessage": "Éclairage signalé"
                                    }'
      />
```

### Validation events

For this scenario, there is one events to listen:

- `position-selected`: This event is sent in two cases:
  - When all the rules are met and the position is available. The information is sent with the configured output format (GeometryCollection or FeatureCollection).
  - When all the rules have been respected and the position is available but after an action, a rule is violated. In this case, the payload of the event is undefined
    - event.detail example: undefined


## Target Mode with inclusion area

To activate this mode, add in your HTML code the web component with the following parameters:

```
<openlayers-element  options='{ 
                                        "information": { "duration": 5000, "title": "Signaler un banc cassé", "content": "Positionner le centre de la cible à l’emplacement du banc cassé dans l’espace public." },
                                        "interaction": {
                                            "displayZoom": true,
                                            "displayScaleLine": false,
                                            "fullscreen": true,
                                            "enableGeolocation": true,
                                            "enableCenterButton": true,
                                            "enableRotation": true
                                        },
                                        "mode": {
                                            "type": "target"
                                        },
                                        "geolocationInformation": {
                                            "displayBox": true,
                                            "reverseLocation": true,
                                            "currentLocation": false
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
                                          "type": "warning",
                                          "message": "L’emplacement sélectionné se situe en dehors des zones autorisées.",
                                          "rule": {
                                              "type": "AREA_CONSTRAINT",
                                              "couldBypass": false
                                          }
                                        },
                                        {
                                            "type": "info",
                                            "message": "Déplacez la carte pour que l’endroit désiré soit au centre de la cible.",
                                                "rule": {
                                                "type": "MOVE_TARGET"
                                            }
                                        }
                                        ],
                                        "wmts": [{
                                            "capability": "https://wmts.asit-asso.ch/wmts?&Service=WMTS&Version=1.0.0&Request=GetCapabilities",
                                            "layer": "asitvd.fond_cadastral",
                                            "projection": "EPSG:2056",
                                            "name": "Carte de base",
                                            "thumbnail": "https://localhost:5173/base.svg"
                                        },
                                        {
                                            "capability": "https://wmts.geo.admin.ch/EPSG/2056/1.0.0/WMTSCapabilities.xml",
                                            "layer": "ch.swisstopo.swissimage",
                                            "projection": "EPSG:2056",
                                            "name": "Photo aérienne",
                                            "thumbnail": "https://localhost:5173/aerial.svg"
                                        }],
                                        "inclusionArea": {
                                            "url": "https://mapnv.ch/mapserv_proxy?ogcserver=source+for+image%2Fpng&SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&typeName=MO_bf_bien_fonds",
                                            "filter": "GeometryOperands=urn:ogc:def:crs:EPSG::2056&FILTER=<Filter><And><PropertyIsEqualTo><ValueReference>commune</ValueReference><Literal>Yverdon-les-Bains</Literal></PropertyIsEqualTo><PropertyIsNotEqualTo><ValueReference>genre</ValueReference><Literal>Parcelle privée</Literal></PropertyIsNotEqualTo><BBOX></And></Filter>"
                                        },
                                        "selectionTargetBoxMessage": "Emplacement du banc"
                                    }'
    />
```

### Validation events

For this scenario, there is one events to listen:

- `position-selected`: This event is sent in two cases:
  - When all the rules are met and the position is available. The information is sent with the configured output format (GeometryCollection or FeatureCollection).
  - When all the rules have been respected and the position is available but after an action, a rule is violated. In this case, the payload of the event is undefined
    - event.detail example: undefined

## Target Mode without inclusion area

To activate this mode, add in your HTML code the web component with the following parameters:

```
 <openlayers-element
        options='{ "
                                        "information": { "duration": 5000, "title": "Signaler un harcèlement", "content": "Positionnez le centre de la cible à l’emplacement où le harcèlement a eu lieu." },
                                        "interaction": {
                                          "displayZoom": true,
                                          "displayScaleLine": false,
                                          "fullscreen": true,
                                          "enableGeolocation": true,
                                          "enableCenterButton": true,
                                          "enableRotation": true
                                        },
                                        "mode": {
                                            "type": "target"
                                        },
                                        "geolocationInformation": {
                                            "displayBox": true,
                                            "reverseLocation": true,
                                            "currentLocation": false
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
                                            "message": "Déplacez la carte pour que l’endroit désiré soit au centre de la cible.",
                                                "rule": {
                                                "type": "MOVE_TARGET"
                                            }
                                        }
                                        ],
                                        "wmts": [{
                                            "capability": "https://wmts.asit-asso.ch/wmts?&Service=WMTS&Version=1.0.0&Request=GetCapabilities",
                                            "layer": "asitvd.fond_cadastral",
                                            "projection": "EPSG:2056",
                                            "name": "Carte de base",
                                            "thumbnail": "https://localhost:5173/base.svg"
                                        },
                                        {
                                            "capability": "https://wmts.geo.admin.ch/EPSG/2056/1.0.0/WMTSCapabilities.xml",
                                            "layer": "ch.swisstopo.swissimage",
                                            "projection": "EPSG:2056",
                                            "name": "Photo aérienne",
                                            "thumbnail": "https://localhost:5173/aerial.svg"
                                        }],
                                        "selectionTargetBoxMessage": "Harcèlement signalé"
                                    }'
      />
```

## Create Mode

To activate this mode, add in your HTML code the web component with the following parameters:

```
<openlayers-element
        options='{
                                        "information": { "duration": 5000, "title": "Signaler un harcèlement", "content": "Positionnez le centre de la cible à l’emplacement où le harcèlement a eu lieu." },
                                        "interaction": {
                                          "displayZoom": true,
                                          "displayScaleLine": false,
                                          "fullscreen": true,
                                          "enableGeolocation": true,
                                          "enableCenterButton": true,
                                          "enableRotation": true
                                        },
                                        "mode": {
                                            "type": "create"
                                        },
                                        "geolocationInformation": {
                                            "displayBox": true,
                                            "reverseLocation": true,
                                            "currentLocation": false
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
                                            "type": "warning",
                                            "message": "Le maximum de sélection est limité à {x}.",
                                            "rule": {
                                                "type": "MAX_SELECTION",
                                                "maxElement": 1
                                            }
                                          },
                                        {
                                            "type": "info",
                                            "message": "Cliquez longuement sur la carte à l’endroit désiré pour qu’un élément soit créé.",
                                                "rule": {
                                                "type": "MOVE_TARGET"
                                            }
                                        }
                                        ],
                                        "wmts": [{
                                            "capability": "https://wmts.asit-asso.ch/wmts?&Service=WMTS&Version=1.0.0&Request=GetCapabilities",
                                            "layer": "asitvd.fond_cadastral",
                                            "projection": "EPSG:2056",
                                            "name": "Carte de base",
                                            "thumbnail": "https://localhost:5173/base.svg"
                                        },
                                        {
                                            "capability": "https://wmts.geo.admin.ch/EPSG/2056/1.0.0/WMTSCapabilities.xml",
                                            "layer": "ch.swisstopo.swissimage",
                                            "projection": "EPSG:2056",
                                            "name": "Photo aérienne",
                                            "thumbnail": "https://localhost:5173/aerial.svg"
                                        }],
                                        "selectionTargetBoxMessage": "Harcèlement signalé"
                                    }'
      />
```

### Validation events

For this scenario, there is one events to listen:

- `position-selected`: This event is sent in two cases:
  - When all the rules are met and the position is available. The information is sent with the configured output format (GeometryCollection or FeatureCollection).
  - When all the rules have been respected and the position is available but after an action, a rule is violated. In this case, the payload of the event is undefined
    - event.detail example: undefined

## Create and Select Mode

To activate this mode, add in your HTML code the web component with the following parameters:

```
<openlayers-element
        options='{
                                        "information": { "duration": 5000, "title": "Signaler un éclairage public", "content": "Sélectionnez un ou plusieurs lampadaire(s) défectueux présent(s) dans l’espace public de la ville." },
                                        "interaction": {
                                          "displayZoom": true,
                                          "displayScaleLine": false,
                                          "fullscreen": true,
                                          "enableGeolocation": true,
                                          "enableCenterButton": true,
                                          "enableRotation": true
                                        },
                                        "mode": {
                                            "type": "mix"
                                        },
                                        "geolocationInformation": {
                                            "displayBox": true,
                                            "reverseLocation": true,
                                            "currentLocation": false
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
                                            "type": "warning",
                                            "message": "Le maximum de sélection est limité à {x}.",
                                            "rule": {
                                                "type": "MAX_SELECTION",
                                                "maxElement": 3
                                            }
                                          },
                                        {
                                            "type": "info",
                                            "message": "Sélectionnez un marqueur ou cliquez longuement sur la carte pour qu’un élément soit créé.",
                                                "rule": {
                                                "type": "MOVE_TARGET"
                                            }
                                        }
                                        ],
                                        "wfs": {
                                            "url": "https://mapnv.ch/mapserv_proxy?ogcserver=source+for+image%2Fpng&SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAMES=ELE_tragwerk_gesco"
                                        },
                                        "wmts": [{
                                            "capability": "https://wmts.asit-asso.ch/wmts?&Service=WMTS&Version=1.0.0&Request=GetCapabilities",
                                            "layer": "asitvd.fond_cadastral",
                                            "projection": "EPSG:2056",
                                            "name": "Carte de base",
                                            "thumbnail": "https://localhost:5173/public/base.svg"
                                        },
                                        {
                                            "capability": "https://wmts.geo.admin.ch/EPSG/2056/1.0.0/WMTSCapabilities.xml",
                                            "layer": "ch.swisstopo.swissimage",
                                            "projection": "EPSG:2056",
                                            "name": "Photo aérienne",
                                            "thumbnail": "https://localhost:5173/aerial.svg"
                                        }],
                                        "selectionTargetBoxMessage": "Éclairage signalé"
                                    }'
      />
```

### Validation events

For this scenario, there is one events to listen:

- `position-selected`: This event is sent in two cases:
  - When all the rules are met and the position is available. The information is sent with the configured output format (GeometryCollection or FeatureCollection).
  - When all the rules have been respected and the position is available but after an action, a rule is violated. In this case, the payload of the event is undefined
    - event.detail example: undefined