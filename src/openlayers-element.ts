import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, query, property, state } from 'lit/decorators.js';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { Geolocation } from 'ol';
import { ScaleLine } from 'ol/control';
import SingleSelect from './components/mode/select';

import WMTSLoader from './components/mapView/wmts-loader';

import styles from '../node_modules/ol/ol.css?inline';
import mapStyle from './styles/map.css?inline';
import controlsStyle from './styles/controls.css?inline';
import notificationStyle from './styles/notification.css?inline';
import NotificationManager from './components/controller/notification-manager';
import theme from './styles/theme.css?inline';
import animationStyle from './styles/animation.css?inline';

import Options from './utils/options';
import IOption from './utils/options';
import GeolocationInformation from './types/geolocation-information';

import { useStore } from './composable/store';
import InclusionArea from './components/constraint/inclusion-area';
import ControlIconManager from './utils/control-icon-manager';

import TargetController from './components/mode/target';
import TargetInformationBoxElement from './components/notification/target-information-box';
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4.js';
import SingleCreate from './components/mode/create';
import SearchLocationControl from './components/control/search-location';
import Border from './components/constraint/border';
import GeolocationManager from './components/controller/geolocation-manager';
import EventManager from './utils/event-manager';

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
    } else if (options.search.displaySearch) {
      useStore().setTargetBoxSize('small');
      useStore().setCustomDisplay(true);
    } else {
      useStore().setTargetBoxSize('no-box');
      useStore().setCustomDisplay(false);
    }  
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
    Options.getOptions(this.options as IOption);
    const options = useStore().getOptions()
    this.setupTheme(options);
    this.setupCustomDisplay(options);
    proj4.defs('EPSG:2056', '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs');
    register(proj4);
    
    this.view = new View({
      projection: 'EPSG:2056',
      center: options.defaultCenter,
      zoom: options.zoom,
      minZoom: options.minZoom,
      maxZoom: options.maxZoom,
      enableRotation: options.enableRotation
    });

    useStore().setMap(new Map({
      target: this.mapElement,
      controls: [],
      layers: [],
      view: this.view,
    }));
    ControlIconManager.setupIcon();
    if (options.enableGeolocation) {
      useStore().setGeolocation(new Geolocation({
        trackingOptions: {
          enableHighAccuracy: true,
        },
        projection: this.view.getProjection(),
      }));
      new GeolocationManager();
    } 
    if (options.search.displaySearch && options.mode.type !== 'target') useStore().getMap().addControl(new SearchLocationControl());
    if (options.mode.type === 'target') {
      useStore().getMap().addControl(new TargetController());
      if (options.geolocationInformation.displayBox)
        useStore().getMap().addControl(
          new TargetInformationBoxElement()
        );
    }
    if (options.wmts.length > 0) new WMTSLoader();
    if (options.displayScaleLine) useStore().getMap().addControl(new ScaleLine({units: 'metric'}));
    if (options.border.url !== '') new Border();
    if (options.inclusionArea.url !== '') new InclusionArea();
    if (options.mode.type === 'select' && options.wfs.url != '') new SingleSelect();
    if (options.mode.type === 'create') new SingleCreate(this.mapElement);
    if (options.mode.type === 'mix' && options.wfs.url != '') {
      new SingleCreate(this.mapElement);
      new SingleSelect();
    } else if (options.mode.type === 'mix') new SingleCreate(this.mapElement);
    new NotificationManager();
    EventManager.setCursorEvent();    
  }

  render() {
    return html`
    <div id="map" class="${useStore().getTargetBoxSize()} ${useStore().getTheme()}">
    </div>
    `
  }

  static styles = [unsafeCSS(styles), unsafeCSS(mapStyle), unsafeCSS(controlsStyle), unsafeCSS(notificationStyle), unsafeCSS(theme), unsafeCSS(animationStyle)];
}

declare global {
  interface HTMLElementTagNameMap {
    'openlayers-element': OpenLayersElement;
  }
}
