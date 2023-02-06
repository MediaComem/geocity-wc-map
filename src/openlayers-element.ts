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

import { useStore } from './composable/store';

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

  @property({type: Object, attribute: 'options'}) options = {}

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  setupTheme(options:any) {
    if (options.darkMode) {
      useStore().setTheme('dark');
    }
    else if (options.lightMode) {
      useStore().setTheme('light');
    }
    else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      useStore().setTheme('light');
    }
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) { 
      useStore().setTheme('dark');
    }
    else {
      useStore().setTheme('light');
    }
  }

  setupCustomDisplay(options: IOption) {
    useStore().setIsCustomDisplay(options.mode.type === 'target' && options.geolocationInformation.displayBox);
  }

  setupTargetBoxSize(geolocationInformation: GeolocationInformation) {
    if (geolocationInformation.currentLocation && geolocationInformation.reverseLocation) useStore().setTargetBoxSize('large');
    else if (geolocationInformation.currentLocation || geolocationInformation.reverseLocation) useStore().setTargetBoxSize('medium');
    else useStore().setTargetBoxSize('small');
  }

  firstUpdated() {
    const options = Options.getOptions(this.options as IOption);
    this.setupTheme(options);
    this.setupCustomDisplay(options);
    this.setupTargetBoxSize(options.geolocationInformation);
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
      if (options.geolocationInformation.displayBox) controls.push(new TargetInformationBoxElement(options.defaultCenter, options.geolocationInformation));
    }
    if (options.wmts.capability != "") new WMTSLoader(map, options.wmts);
    if (options.displayZoom)
      controls.push(new Zoom({
        zoomInLabel: SVGCreator.zoomInLabel(),
        zoomOutLabel: SVGCreator.zoomOutLabel(),
        className: useStore().getIsCustomDisplay() ? `ol-zoom-custom-${useStore().getTargetBoxSize()}` : `ol-zoom`
      }))
    if (options.enableCenterButton) controls.push(new GeolocationCenter(this.geolocation));
    if (options.enableRotation) this.view.on('change:rotation', (event) => {
      map.getControls().forEach((control) => {
        if (control instanceof ResetRotationControl) {
          map.removeControl(control);
        }
      });
      if (event.target.getRotation() !== 0) {
        map.addControl(new ResetRotationControl());
      }
    });
    controls.push(new InformationControl(map, options.information))
    new NotificationManager(map, options.notifications);
    controls.forEach(control => map.addControl(control));
    if (options.displayScaleLine) map.addControl(new ScaleLine({units: 'metric'}));
    if (options.fullscreen) map.addControl(new FullScreen({
      label: SVGCreator.fullScreenLabel(),
      labelActive: SVGCreator.fullScreenLabelActive(),
      className: useStore().getIsCustomDisplay() ? `ol-full-screen-custom-${useStore().getTargetBoxSize()}` : `ol-full-screen`
    }))
    if (options.geojson.url != "") new GeojsonLoader(map, options.geojson.url)
    if (options.wfs.url != "") new WFSLoader(map, options.wfs.url , options.wfs.projection, options.wfs.projectionDefinition, options.cluster, options.mode);
    if (options.enableDraw) new Drawer(map, options.drawElement, options.maxNbDraw);
  }

  render() {
    return html`
    <div id="map" class="control-${useStore().getTheme()}">
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
