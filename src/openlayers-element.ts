import { LitElement, css, html } from 'lit';
import { customElement, query, property, state } from 'lit/decorators.js';

import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import { Geolocation } from 'ol';
import { Zoom, ScaleLine, FullScreen } from 'ol/control';

import GelolocaliseCenter from './components/geolicalise-center';


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
    minZoom: 5,
    maxZoom: 18,
    displayZoom: true,
    displayScaleLine: true,
    fullscreen: true,
    defaultCenter: [739867.251358, 5905800.079386],
    enableGeolocation: true,
    enableCenterButton: false,
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
    });
    if (this.options.enableGeolocation) {
      this.geolocation = new Geolocation({
        trackingOptions: {
          enableHighAccuracy: true,
        },
        projection: this.view.getProjection(),
      });
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
  }

  render() {
    return html`
      <link rel="stylesheet" href="../node_modules/ol/ol.css" />
      <div id="map"></div>
    `;
  }

  static styles = css`
    html,
    body {
      margin: 0;
      height: 100%;
    }

    #map {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
    }

    .center-control {
      top: 95%;
      left: 0.5em;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'openlayers-element': OpenLayersElement;
  }
}
