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
import containerStyle from './styles/container.css?inline';

import Options from './utils/options';
import IOption from './utils/options';
import GeolocationInformation from './types/geolocation-information';

import { Store } from './composable/store';
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
import States from './utils/states';
import IStates from './utils/states';
import TargetRenderer from './components/mapView/target.renderer';
import { Render } from './utils/render';
import SelectCreateInformationBoxController from './components/notification/select-create-information-box';

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
  @state() modeControllers: Array<SingleCreate | SingleSelect | TargetRenderer> = [];
  @state() renderUtils: Render;
  @state() inclusionArea: InclusionArea | undefined = undefined;

  @property({type: Object, attribute: 'options'}) options = {}

  @property({type: Object, attribute: 'states'}) states = {}

  store: Store;

  constructor() {
    super();
    this.store = new Store();
    this.renderUtils = new Render(this.store)
;  }

  connectedCallback() {
    super.connectedCallback();
  }

  setupTheme(options:any) {
    if (options.darkMode) {
      Store.setTheme('dark');
    }
    else if (options.lightMode) {
      Store.setTheme('light');
    }
    else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      Store.setTheme('light');
    }
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) { 
      Store.setTheme('dark');
    }
    else {
      Store.setTheme('light');
    }
  }

  setupCustomDisplay(options: IOption) {
    if (options.mode.type === 'target') {
      this.store.setCustomDisplay(options.geolocationInformation.displayBox);
      this.setupTargetBoxSize(options.geolocationInformation);
    } else if (options.search.displaySearch) {
      this.store.setTargetBoxSize('small');
      this.store.setCustomDisplay(true);
    } else {
      this.store.setTargetBoxSize('no-box');
      this.store.setCustomDisplay(false);
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
    if (geolocationInformation.currentLocation && geolocationInformation.reverseLocation) this.store.setTargetBoxSize('large');
    else if (geolocationInformation.currentLocation || geolocationInformation.reverseLocation) this.store.setTargetBoxSize('medium');
    else this.store.setTargetBoxSize('small');
  }

  firstUpdated() {
    const options = Options.webComponentOptions(this.options as IOption);
    this.store.setOptions(options)
    const states = States.getStates(this.states as IStates);
    if(!options) {
      return;
    }
    const readonly = states.readonly;
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
      enableRotation: options.interaction.enableRotation
    });

    const map = new Map({
      target: this.mapElement,
      controls: [],
      layers: [],
      view: this.view,
    });
    this.store.setMap(map);
    ControlIconManager.setupIcon(states, this.store);
    if (options.interaction.enableGeolocation && !readonly) {
      Store.setGeolocation(new Geolocation({
        trackingOptions: {
          enableHighAccuracy: true,
        },
        projection: this.view.getProjection(),
      }));
      new GeolocationManager(map);
    }
    if (options.search.displaySearch && options.mode.type !== 'target' && !readonly) { 
      map.addControl(new SearchLocationControl(this.store, map));
    }
    if (options.mode.type === 'target') {
      this.modeControllers.push(new TargetRenderer(this.renderUtils))
      if (!readonly) {
        map.addControl(new TargetController(this.store));
        if (options.geolocationInformation.displayBox)
          map.addControl(
            new TargetInformationBoxElement(this.store)
          );
      }
    }
    if (options.wmts.length > 0) new WMTSLoader(this.store);
    if (options.interaction.displayScaleLine) map.addControl(new ScaleLine({units: 'metric'}));
    if (options.border.url !== '') new Border(this.store);
    if (options.inclusionArea.url !== '') this.inclusionArea = new InclusionArea(this.store);
    if (options.mode.type === 'select' && options.wfs.url != '') {
      this.modeControllers.push(new SingleSelect(this.renderUtils, states, this.store));
    }
    if (options.mode.type === 'create') {
      this.modeControllers.push(new SingleCreate(this.mapElement, this.inclusionArea, this.renderUtils, states, this.store));
    }
    if (options.mode.type === 'mix' && options.wfs.url != '') {
      this.modeControllers.push( new SingleSelect(this.renderUtils, states, this.store));
      this.modeControllers.push(new SingleCreate(this.mapElement, this.inclusionArea, this.renderUtils, states, this.store));
    }
    if (!readonly) new NotificationManager(this.store);
    EventManager.setCursorEvent(map);
  }

  updated(changedProperties: any) {
    if (changedProperties.has('states'))
      if (this.states) {
        const states = States.getStates(this.states as IStates);
        if (states.currentSelections.length > 0) {
          switch(this.store.getOptions()?.mode.type) {
            case 'target': this.modeControllers[0]?.renderCurrentSelection(states); break;
            case 'select': this.modeControllers[0]?.renderCurrentSelection(states); break;
            case 'create': this.modeControllers[0]?.renderCurrentSelection(states); break;
            case 'mix': this.renderUtils.displayMixMode(this.modeControllers[0]?.vectorSource, this.modeControllers[1]?.vectorSource, states);; 
                        break;
          }
          this.store.getMap()?.updateSize();
        } else {
          this.modeControllers.forEach((controller) => controller.removeCurrentSelection())
          this.store.removeAllSelectedFeatures();
          this.store.getMap()?.getControls().forEach(control => {
            if (control instanceof SelectCreateInformationBoxController) {
              control.disable();
            }
          })
        }
      }
  }

  render() {
    return html`
    <div id="map" class="${this.store.getTargetBoxSize()} ${Store.getTheme()}">
    </div>
    `
  }

  static styles = [unsafeCSS(styles), unsafeCSS(mapStyle), unsafeCSS(controlsStyle), unsafeCSS(notificationStyle), unsafeCSS(theme), unsafeCSS(animationStyle), unsafeCSS(containerStyle)];
}

declare global {
  interface HTMLElementTagNameMap {
    'openlayers-element': OpenLayersElement;
  }
}
