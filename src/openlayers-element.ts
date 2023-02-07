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
import InclusionArea from './components/inclusion-area';

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
    if (options.mode.type === 'target') {
      useStore().setCustomDisplay(options.geolocationInformation.displayBox);
      this.setupTargetBoxSize(options.geolocationInformation);
    } else if (options.mode.type === 'select') {
      useStore().setCustomDisplay(true);
      this.setupSelectBoxSize();
    } else {
      useStore().setCustomDisplay(false);
    }  
  }

  setupSelectBoxSize() {
    useStore().setTargetBoxSize('medium');
  }

  /*
    Some boxes are under the control button and some should be under it. We know the size of the box (currently the information of the target box) via an option
    There are three cases:
      - geolocationInformation.reverseLocation and geolocationInformation.currentLocation is set to true. This means that there are two lines under the title (maximum size)
      - geolocationInformation.reverseLocation or geolocationInformation.currentLocation is set to true. This means that there is one line under the title (medium size).
      - geolocationInformation.reverseLocation and geolocationInformation.currentLocation have the value false. This means that there is no line under the title (small size).
  */
  setupTargetBoxSize(geolocationInformation: GeolocationInformation) {
    if (geolocationInformation.currentLocation && geolocationInformation.reverseLocation) useStore().setTargetBoxSize('large');
    else if (geolocationInformation.currentLocation || geolocationInformation.reverseLocation) useStore().setTargetBoxSize('medium');
    else useStore().setTargetBoxSize('small');
  }

  firstUpdated() {
    const options = Options.getOptions(this.options as IOption);
    this.setupTheme(options);
    this.setupCustomDisplay(options);
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
      if (options.geolocationInformation.displayBox) controls.push(new TargetInformationBoxElement(options.defaultCenter, options.geolocationInformation, options.targetBoxMessage));
    }
    if (options.wmts.capability != "") new WMTSLoader(map, options.wmts);
    if (options.displayZoom)
      controls.push(new Zoom({
        zoomInLabel: SVGCreator.zoomInLabel(),
        zoomOutLabel: SVGCreator.zoomOutLabel(),
        className: useStore().isCustomDisplay() ? `ol-zoom-custom-${useStore().getTargetBoxSize()}` : `ol-zoom`
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
    new NotificationManager(map, options.notifications, options.mode.type);
    controls.forEach(control => map.addControl(control));
    if (options.displayScaleLine) map.addControl(new ScaleLine({units: 'metric'}));
    if (options.fullscreen) map.addControl(new FullScreen({
      label: SVGCreator.fullScreenLabel(),
      labelActive: SVGCreator.fullScreenLabelActive(),
      className: useStore().isCustomDisplay() ? `ol-full-screen-custom-${useStore().getTargetBoxSize()}` : `ol-full-screen`
    }))
    if (options.geojson.url != "") new GeojsonLoader(map, options.geojson.url)
    if (options.wfs.url != "") new WFSLoader(map, options.wfs.url , options.wfs.projection, options.wfs.projectionDefinition, options.cluster, options.mode);
    if (options.enableDraw) new Drawer(map, options.drawElement, options.maxNbDraw);
    if (options.inclusionArea) new InclusionArea(map, 'https://mapnv.ch/mapserv_proxy?ogcserver=source+for+image%2Fpng&SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&typeName=MO_bf_bien_fonds&FILTER=<Filter><And><PropertyIsEqualTo><ValueReference>commune</ValueReference><Literal>Yverdon-les-Bains</Literal></PropertyIsEqualTo><PropertyIsNotEqualTo><ValueReference>genre</ValueReference><Literal>Parcelle privée</Literal></PropertyIsNotEqualTo></And></Filter>',options.wfs.projection, options.wfs.projectionDefinition);
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
