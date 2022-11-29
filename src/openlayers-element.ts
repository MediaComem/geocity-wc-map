import { LitElement, css, html } from 'lit'
import { customElement, query } from 'lit/decorators.js'

import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('openlayers-element')
export class OpenLayersElement extends LitElement {

  @query('div')
  public mapElement!: HTMLDivElement

  constructor() {
    super();
  }

  firstUpdated() {
    new Map({
      target: this.mapElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  }

  render() {
    return html`
      <div id="map"></div>
    `
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
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'openlayers-element': OpenLayersElement
  }
}
