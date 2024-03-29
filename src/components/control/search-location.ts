import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { Control } from "ol/control";
import style from '../../styles/search.css?inline';

import { Map as olMap } from 'ol';
import * as olProj from 'ol/proj';
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import SVGCreator from "../../utils/svg-creator";
import { cache } from "lit/directives/cache.js";
import { GeocityEvent } from "../../utils/geocity-event";
import EventManager from "../../utils/event-manager";
import { Store } from "../../composable/store";

interface SearchLocationElement {
  address: string;
  coordinate: number[];
}

@customElement('location-list')
// @ts-ignore
class LocationList extends LitElement {
  @property({type: Object}) locations: { results: string | any[]; } | undefined;
  @property({type: Object}) map: olMap | undefined;

  @state() _results: Array<SearchLocationElement> = [];

  static styles = [unsafeCSS(style)];

  firstUpdated() {
    this.map?.addEventListener('click', () => {
      this._results = [];
    })
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('locations')) {
      if (this.locations && this.locations.results && this.locations.results.length > 0) {
        const maxDisplayedLocation = this.locations.results.length > 5 ? 5 : this.locations.results.length;
        this._results = [];
        for (let i = 0; i < maxDisplayedLocation; i++){
          let label = '';
          if (this.locations.results[i].attrs.origin == 'address') {
              if (this.locations.results[i].attrs.label.trim().startsWith("<b>")){
                continue;
              }
              label = this.locations.results[i].attrs.label.replace("<b>", " - ").replace("</b>", "");
            } else if (this.locations.results[i].attrs.origin == 'parcel') {
              label = "Parcelle: " + this.locations.results[i].attrs.label.replace("<b>", "").replace("</b>", "").split("(CH")[0];
            }
          this._results.push({coordinate: [this.locations.results[i].attrs.lon, this.locations.results[i].attrs.lat], address: label})
        }
      } else {
        this._results = [];
      }
    }
  }

  selectAddress(coordinate: number[], address: string) {
    this.map?.getView().setCenter(olProj.fromLonLat([coordinate[0], coordinate[1]], 'EPSG:2056'))
    this._results = [];
    GeocityEvent.sendEvent('address_selected', address)
  }

  render() {
    return html`
                <ul>
                  ${this._results.map((location: SearchLocationElement) =>
                    html`<li tabindex="0" @click=${() => this.selectAddress(location.coordinate, location.address)}>${location.address}</li>`
                  )}
                </ul>
              `;
  }
}


@customElement('search-location')
class SearchLocation extends LitElement {
  @query('#search')
  public inputElement!: HTMLInputElement;
  @query('#location-result')
  public locationElements!: LocationList;

  @state() results: Object = {};

  @state() _hasSearch: boolean = false;
  @state() _hasSelected: boolean = false;

  static styles = [unsafeCSS(style)];
  store: Store;
  map: olMap;

  constructor(store: Store) {
    super();
    this.store = store;
    const map = store.getMap();
    if (!map) {
      throw new Error("Missing map!");
    }
    this.map = map;
    window.addEventListener('address_selected', ((e: CustomEvent) => {
      this.inputElement.value = e.detail;
      this._hasSearch = false;
      this._hasSelected = true;
    }) as EventListener)
    
  }

  firstUpdated() {
    this.locationElements.map = this.map;
    this.inputElement.oninput = () => {
        if (this.inputElement.value.length > 1) {
            this._hasSearch = true;
            const options = this.store.getOptions();
            if (!options) {
              return;
            }
            let url = `${options.search.requestWithoutCustomValue}&searchText=${this.inputElement.value}`
            if (options.search.bboxRestiction !== '') url += `&bbox=${options.search.bboxRestiction}`;
            fetch(url).then((result) => result.json()).then((json) => {
                this.results = json;
            });
        } else {
          this._hasSearch = false;
          this.results = {};
        }
    }
  }

  clear() {
    this.inputElement.value = '';
    this.results = {};
    this._hasSearch = false;
    this._hasSelected = false;
  }

  render() {
    return html`<div class="search-container">
                    <div class="search-input-container">
                        <input id="search" type="text" class="search-input">
                        <div class="search-svg-container">
                        ${cache(this._hasSearch || this._hasSelected
                            ? html`<div class="cross-div" @click="${this.clear}">
                                        ${unsafeSVG(SVGCreator.cross)}
                                    </div>`
                            : html `${unsafeSVG(SVGCreator.search)}`
                          )}
                        </div>
                    </div>
                    <location-list id="location-result" locations='${JSON.stringify(this.results)}'/>
                </div>`;
  }
}

export default class SearchLocationControl extends Control {

    public div: HTMLElement;

    constructor(store: Store, map: olMap) {
      const box = new SearchLocation(store);
      super({ element: box });
      this.div = box;
      EventManager.setResizeEvent(this.div, '--search-width', map);
    }
  }