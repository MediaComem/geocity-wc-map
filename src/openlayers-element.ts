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
import NotificationManager from './components/notification-manager';
import theme from './styles/theme.css?inline';

import TargetController from './components/target';
import TargetInformationBoxElement from './components/target-information-box';
import Options from './utils/options';
import IOption from './utils/options';
import SVGCreator from './utils/svg-creator';
import GeolocationInformation from './types/geolocation-information';

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

  @state() theme:string = "";
  @state() view:View | undefined;
  @state() geolocation:Geolocation | undefined;

  @property({type: Object, attribute: 'options'}) options = {}

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

  getTargetBoxSize(geolocationInformation: GeolocationInformation) {
    if (geolocationInformation.currentLocation && geolocationInformation.reverseLocation) return 'large';
    if (geolocationInformation.currentLocation || geolocationInformation.reverseLocation) return 'medium';
    return 'small';
  }

  firstUpdated() {
    const options = Options.getOptions(this.options as IOption);
    this.theme = this.getTheme(options);
    this.view = new View({
      center: options.defaultCenter,
      zoom: options.zoom,
      minZoom: options.minZoom,
      maxZoom: options.maxZoom,
      enableRotation: options.enableRotation
    });
    const map = new Map({
      target: this.mapElement,
      controls: [],
      layers: [],
      view: this.view,
    });
    if (options.enableGeolocation) {
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
    if (options.mode.type === 'target') {
      controls.push(new TargetController(map))
      if (options.geolocationInformation.displayBox) controls.push(new TargetInformationBoxElement(options.defaultCenter, this.theme, options.geolocationInformation));
    }
    if (options.wmts.capability != "") new WMTSLoader(map, options.wmts);
    if (options.displayZoom)
      controls.push(new Zoom({
        zoomInLabel: SVGCreator.zoomInLabel(),
        zoomOutLabel: SVGCreator.zoomOutLabel(),
        className: options.mode.type === 'target' && options.geolocationInformation.displayBox ? `ol-zoom-custom-${this.getTargetBoxSize(options.geolocationInformation)}` : `ol-zoom`
      }))
    if (options.enableCenterButton) controls.push(new GeolocationCenter(this.geolocation, this.theme, options.mode.type === 'target' && options.geolocationInformation.displayBox, this.getTargetBoxSize(options.geolocationInformation)));
    if (options.enableRotation) this.view.on('change:rotation', (event) => {
      map.getControls().forEach((control) => {
        if (control instanceof ResetRotationControl) {
          map.removeControl(control);
        }
      });
      if (event.target.getRotation() !== 0) {
        map.addControl(new ResetRotationControl(this.theme, options.mode.type === 'target' && options.geolocationInformation.displayBox, this.getTargetBoxSize(options.geolocationInformation)));
      }
    });
    controls.push(new InformationControl(map, options.information, this.theme, options.mode.type === 'target' && options.geolocationInformation.displayBox, this.getTargetBoxSize(options.geolocationInformation)))
    new NotificationManager(map, options.notifications, this.theme);
    controls.forEach(control => map.addControl(control));
    if (options.displayScaleLine) map.addControl(new ScaleLine({units: 'metric'}));
    if (options.fullscreen) map.addControl(new FullScreen({
      label: SVGCreator.fullScreenLabel(),
      labelActive: SVGCreator.fullScreenLabelActive(),
      className: options.mode.type === 'target' && options.geolocationInformation.displayBox ? `ol-full-screen-custom-${this.getTargetBoxSize(options.geolocationInformation)}` : `ol-full-screen`
    }))
    if (options.geojson.url != "") new GeojsonLoader(map, options.geojson.url)
    if (options.wfs.url != "") new WFSLoader(map, options.wfs.url , options.wfs.projection, options.wfs.projectionDefinition, options.cluster, options.mode.radius);
    if (options.enableDraw) new Drawer(map, options.drawElement, options.maxNbDraw);
  }

  render() {
    return html`
    <div id="map" class="control-${this.theme}">
    </div>   
    `
  }

  static styles = [unsafeCSS(styles), unsafeCSS(mapStyle), unsafeCSS(controlsStyle), unsafeCSS(notificationStyle), unsafeCSS(theme)];
}

declare global {
  interface HTMLElementTagNameMap {
    'openlayers-element': OpenLayersElement;
  }
}
