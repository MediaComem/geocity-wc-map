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
import WarningNotification from './components/notification/warning-notification';

import styles from '../node_modules/ol/ol.css?inline';
import popupStyle from './styles/popup-information.css?inline';
import mapStyle from './styles/map.css?inline';
import controlsStyle from './styles/controls.css?inline';
import notificationStyle from './styles/notification.css?inline';
import loaderStyle from './styles/loader.css?inline';

import ErrorNotification from './components/notification/error-notification';
import InfoNotification from './components/notification/info-notification';
import Loader from './components/notification/loader';

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

  @state() view:View | undefined;
  @state() geolocation:Geolocation | undefined;

  @property({type: Object, attribute: 'options'}) options = {
    zoom: 15,
    minZoom: 1,
    maxZoom: 18,
    displayZoom: true,
    displayScaleLine: false,
    fullscreen: true,
    defaultCenter: [739867.251358, 5905800.079386],
    enableGeolocation: true,
    enableCenterButton: false,
    enableDraw: true,
    drawElement: 'Point',
    onlyOneDraw: true,
    enableRotation: true,
    information: {
      duration: 5,
      title: "This is a title",
      content: "This is a content",
    },
    info: {
      configuration: {
        textColor: '#1D4ED8',
        backgroundColor: '#DBEAFE',
      },
      message: "Veuillez zoomer davantage avant de pouvoir pointer l'emplacement",
    },
    warning: {
      configuration: {
        textColor: '#B45309',
        backgroundColor: '#FEF3C7',
      },
      message: "Veuillez zoomer davantage avant de pouvoir pointer l'emplacement",
    },
    error: {
      configuration: {
        textColor: '#B91C1C',
        backgroundColor: '#FEE2E2',
      },
      message: "Une erreur est survenue lors du chargement de votre positiont",
    },
    geojson: {
      url: "",
    },
    wfs: {
      url: "https://mapnv.ch/mapserv_proxy?ogcserver=source+for+image%2Fpng&SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAMES=mf_ste_equipements_publics_poubelle",
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

  firstUpdated() {
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
      map.addControl(new Loader("Chargement des données GPS"));
      const waitGeolocation = setInterval(() => {
        if (this.geolocation?.getPosition()) {
          clearInterval(waitGeolocation);
          map.getControls().forEach((control) => {
            if (control instanceof Loader) {
              map.removeControl(control);
            }
        });
        }
      }, 200)
      
    }
    const controls = [];
    if (this.options.wmts.capability != "") new WMTSLoader(map, this.options.wmts);
    if (this.options.displayZoom) controls.push(new Zoom())
    if (this.options.enableCenterButton) controls.push(new GeolocationCenter(map, this.view, this.geolocation));
    if (this.options.enableRotation) controls.push(new ResetRotationControl(map, this.view));
    controls.push(new InformationControl(map, this.options.information))
    if (false) controls.push(new InfoNotification(this.options.info));
    if (false) controls.push(new WarningNotification(this.options.warning));
    if (false) controls.push(new ErrorNotification(this.options.error));
    controls.forEach(control => map.addControl(control));
    if (this.options.displayScaleLine) map.addControl(new ScaleLine({units: 'metric'}));
    if (this.options.fullscreen) map.addControl(new FullScreen())
    if (this.options.geojson.url != "") new GeojsonLoader(map, this.options.geojson.url)
    if (this.options.wfs.url != "") new WFSLoader(map, this.options.wfs.url , this.options.wfs.projection, this.options.wfs.projectionDefinition);
    if (this.options.enableDraw) new Drawer(map, this.options.drawElement, this.options.onlyOneDraw);
  }

  render() {
    return html`
    <div id="map">
    </div>   
    `
  }

  static styles = [
    unsafeCSS(styles), 
    unsafeCSS(popupStyle), 
    unsafeCSS(mapStyle), 
    unsafeCSS(controlsStyle), 
    unsafeCSS(notificationStyle), 
    unsafeCSS(loaderStyle)];
}

declare global {
  interface HTMLElementTagNameMap {
    'openlayers-element': OpenLayersElement;
  }
}
