import { LitElement, css, html, unsafeCSS } from 'lit';
import {cache} from 'lit/directives/cache.js';
import { customElement, query, property, state } from 'lit/decorators.js';

import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import { Geolocation } from 'ol';
import { Zoom, ScaleLine, FullScreen } from 'ol/control';

import GelolocaliseCenter from './components/geolicalise-center';
import Drawer from './components/drawer';
import GeojsonLoader from './components/geojson-loader';
import WFSLoader from './components/wfs-loader';

import styles from '../node_modules/ol/ol.css?inline';
//import WMTSLoader from './components/wmts-loader';


/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('openlayers-element')
export class OpenLayersElement extends LitElement {
  @query('div')
  public mapElement!: HTMLDivElement;

  @state() view:View | undefined;;
  @state() geolocation:Geolocation | undefined;

  @property({type: Object, attribute: 'options'}) options = {
    zoom: 15,
    minZoom: 1,
    maxZoom: 18,
    displayZoom: true,
    displayScaleLine: true,
    fullscreen: true,
    defaultCenter: [739867.251358, 5905800.079386],
    enableGeolocation: false,
    enableCenterButton: false,
    enableDraw: false,
    geojson: {
      url: "",
    },
    wfs: {
      url: "https://mapnv.ch/mapserv_proxy?ogcserver=source+for+image%2Fpng&SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAMES=mf_ste_equipements_publics_poubelle",
      projection: "EPSG:2056",
      projectionDefinition: "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs"
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated() {
    // useGeographic(); To USE LONG and LAT
    this.view = new View({
      center: this.options.defaultCenter,
      zoom: this.options.zoom,
      minZoom: this.options.minZoom,
      maxZoom: this.options.maxZoom,
    });
    if (this.options.enableGeolocation) {
      this.geolocation = new Geolocation({
        trackingOptions: {
          enableHighAccuracy: true,
        },
        projection: this.view.getProjection(),
      });
      this.geolocation.setTracking(true);
    }
    const map = new Map({
      target: this.mapElement,
      controls: [],
      layers: [
        new TileLayer({
          source: new OSM(),
          visible: true,
        }),
      ],
      view: this.view,
    });
    const controls = [];
    if (this.options.displayZoom) controls.push(new Zoom())
    if (this.options.enableCenterButton) controls.push(new GelolocaliseCenter(map, this.view, this.geolocation));
    controls.forEach(control => map.addControl(control));
    if (this.options.displayScaleLine) map.addControl(new ScaleLine({units: 'metric'}));
    if (this.options.fullscreen) map.addControl(new FullScreen())
    if (this.options.enableDraw) new Drawer(map, this.renderRoot);
    if (this.options.geojson.url != "") new GeojsonLoader(map, this.options.geojson.url)
    if (this.options.wfs.url != "") new WFSLoader(map, this.options.wfs.url , this.options.wfs.projection, this.options.wfs.projectionDefinition);
    //new WMTSLoader(map);
  }

  render() {
    return html`
      <div id="map"></div>
      ${cache(this.options.enableDraw ? html`<form>
        <label for="drawer">Geometry type &nbsp;</label>
        <select id="drawer" class="drawer">
          <option value="Point">Point</option>
          <option value="LineString">LineString</option>
          <option value="Polygon">Polygon</option>
          <option value="Circle">Circle</option>
        </select>
      </form>` : ``)}
    `;
  }

  static styles = [unsafeCSS(styles), css`
    html,
    body {
      margin: 0;
      height: 100%;
    }

    #map {
      position: absolute;
      top: 20%;
      bottom: 0;
      width: 100%;
      height: 80%;
    }

    .center-control {
      top: 95%;
      left: 0.5em;
    }
  `];
}

declare global {
  interface HTMLElementTagNameMap {
    'openlayers-element': OpenLayersElement;
  }
}
