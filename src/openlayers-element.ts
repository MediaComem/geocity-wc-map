import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, query, property, state } from 'lit/decorators.js';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { Geolocation } from 'ol';
import { Zoom, ScaleLine, FullScreen } from 'ol/control';

import GeolocationCenter from './components/geolocation-center';
import Drawer from './components/drawer';
import GeojsonLoader from './components/geojson-loader';
import WFSLoader from './components/wfs-loader';

import GeolocationMarker from './components/geolocation-marker';
import ResetRotationControl from './components/reset-rotation-control';
import WMTSLoader from './components/wmts-loader';
import InformationControl from './components/information-control';

import styles from '../node_modules/ol/ol.css?inline';
import mapStyle from './styles/map.css?inline';
import controlsStyle from './styles/controls.css?inline';
import notificationStyle from './styles/notification.css?inline';
//import NotificationBoxControl from './components/notification/notification';
import TargetController from './components/target';
import TargetInformationBoxElement from './components/target-information-box';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('openlayers-element')
export class OpenLayersElement extends LitElement {
  @query('#map')
  public mapElement!: HTMLDivElement;

  @state() mode:string = "";
  @state() view:View | undefined;
  @state() geolocation:Geolocation | undefined;

  @property({type: Object, attribute: 'options'}) options = {
    zoom: 15,
    minZoom: 1,
    maxZoom: 20,
    displayZoom: true,
    displayScaleLine: false,
    fullscreen: true,
    defaultCenter: [739867.251358, 5905800.079386],
    enableGeolocation: false,
    enableCenterButton: false,
    enableDraw: false,
    drawElement: 'Point',
    maxNbDraw: 3,
    enableRotation: true,
    mode: {
      type: 'target',
      radius: 40
    },
    information: {
      duration: 5,
      title: "This is a title",
      content: "This is a content",
    },
    notification: [
      {
        type: "warning",
        message: "Veuillez zoomer davantage avant de pouvoir sélectionner un emplacement.",
        rule: {
          type: "ZOOM_CONSTRAINT",
          minZoom: 16
        }
      }
    ],
    geojson: {
      url: "",
    },
    cluster: {
      distance: 30,
      minDistance: 20,
    },
    wfs: {
      url: "https://mapnv.ch/mapserv_proxy?ogcserver=source+for+image%2Fpng&SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAMES=ELE_tragwerk_gesco",
      projection: "EPSG:2056",
      projectionDefinition: "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs"
    },
    wmts: {
      capability: "https://wmts.geo.admin.ch/EPSG/3857/1.0.0/WMTSCapabilities.xml",
      layer: "ch.swisstopo.swissimage",
      projection: "EPSG:3857"
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  getTheme(options:any) {
    if (options.darkMode) {
      return 'dark';
    }
    else if (options.lightMode) {
      return 'light';
    }
    else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) { 
      return 'dark';
    }
    else {
      return 'light';
    }
  }

  firstUpdated() {
    this.mode = this.getTheme(this.options);
    this.view = new View({
      center: this.options.defaultCenter,
      zoom: this.options.zoom,
      minZoom: this.options.minZoom,
      maxZoom: this.options.maxZoom,
      enableRotation: this.options.enableRotation
    });
    const map = new Map({
      target: this.mapElement,
      controls: [],
      layers: [],
      view: this.view,
    });
    if (this.options.enableGeolocation) {
      this.geolocation = new Geolocation({
        trackingOptions: {
          enableHighAccuracy: true,
        },
        projection: this.view.getProjection(),
      });
      this.geolocation.setTracking(true);
      new GeolocationMarker(map, this.geolocation);
    }
    const controls = [];
    if (this.options.wmts.capability != "") new WMTSLoader(map, this.options.wmts);
    if (this.options.displayZoom)
      controls.push(new Zoom({
        className: this.options.mode.type === 'target' ? 'ol-zoom-custom' : 'ol-zoom'
      }))
    if (this.options.enableCenterButton) controls.push(new GeolocationCenter(this.geolocation));
    if (this.options.enableRotation) this.view.on('change:rotation', (event) => {
      map.getControls().forEach((control) => {
        if (control instanceof ResetRotationControl) {
          map.removeControl(control);
        }
      });
      if (event.target.getRotation() !== 0) {
        map.addControl(new ResetRotationControl());
      }
    });
    controls.push(new InformationControl(map, this.options.information, this.options.mode.type === 'target'))
    if (this.options.mode.type === 'target') {
      controls.push(new TargetController(map))
      controls.push(new TargetInformationBoxElement(this.options.defaultCenter));
    }
    //controls.push(new NotificationBoxControl(this.options.notification[0], this.mode));
    controls.forEach(control => map.addControl(control));
    if (this.options.displayScaleLine) map.addControl(new ScaleLine({units: 'metric'}));
    if (this.options.fullscreen) map.addControl(new FullScreen({
      className: this.options.mode.type === 'target' ? 'ol-full-screen-custom' : 'ol-full-screen'
    }))
    if (this.options.geojson.url != "") new GeojsonLoader(map, this.options.geojson.url)
    if (this.options.wfs.url != "") new WFSLoader(map, this.options.wfs.url , this.options.wfs.projection, this.options.wfs.projectionDefinition, this.options.cluster, this.options.mode.radius);
    if (this.options.enableDraw) new Drawer(map, this.options.drawElement, this.options.maxNbDraw);
  }

  render() {
    return html`
    <div id="map">
    </div>   
    `
  }

  static styles = [unsafeCSS(styles), unsafeCSS(mapStyle), unsafeCSS(controlsStyle), unsafeCSS(notificationStyle)];
}

declare global {
  interface HTMLElementTagNameMap {
    'openlayers-element': OpenLayersElement;
  }
}
