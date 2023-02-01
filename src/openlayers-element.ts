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
import Options from './utils/options';
import IOption from './utils/options';
import SVGCreator from './utils/svg-creator';
import NotificationBoxControl from './components/notification/notification';

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

  firstUpdated() {
    const options = Options.getOptions(this.options as IOption);
    this.mode = this.getTheme(options);
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
    if (options.wmts.capability != "") new WMTSLoader(map, options.wmts);
    if (options.displayZoom)
      controls.push(new Zoom({
        zoomInLabel: SVGCreator.zoomInLabel(),
        zoomOutLabel: SVGCreator.zoomOutLabel(),
        className: options.mode.type === 'target' ? 'ol-zoom-custom' : 'ol-zoom'
      }))
    if (options.enableCenterButton) controls.push(new GeolocationCenter(this.geolocation, options.mode.type === 'target'));
    if (options.enableRotation) map.addControl(new ResetRotationControl(options.mode.type === 'target'));/*this.view.on('change:rotation', (event) => {
      map.getControls().forEach((control) => {
        if (control instanceof ResetRotationControl) {
          map.removeControl(control);
        }
      });
      if (event.target.getRotation() !== 0) {
        map.addControl(new ResetRotationControl());
      }
    });*/
    controls.push(new InformationControl(map, options.information, options.mode.type === 'target'))
    if (options.mode.type === 'target') {
      controls.push(new TargetController(map))
      controls.push(new TargetInformationBoxElement(options.defaultCenter));
    }
    controls.push(new NotificationBoxControl(options.notification[0], this.mode));
    controls.forEach(control => map.addControl(control));
    if (options.displayScaleLine) map.addControl(new ScaleLine({units: 'metric'}));
    if (options.fullscreen) map.addControl(new FullScreen({
      label: SVGCreator.fullScreenLabel(),
      labelActive: SVGCreator.fullScreenLabelActive(),
      className: options.mode.type === 'target' ? 'ol-full-screen-custom' : 'ol-full-screen'
    }))
    if (options.geojson.url != "") new GeojsonLoader(map, options.geojson.url)
    if (options.wfs.url != "") new WFSLoader(map, options.wfs.url , options.wfs.projection, options.wfs.projectionDefinition, options.cluster, options.mode.radius);
    if (options.enableDraw) new Drawer(map, options.drawElement, options.maxNbDraw);
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
