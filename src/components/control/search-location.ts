import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { Control } from "ol/control";
import { useStore } from "../../composable/store";
import style from '../../styles/search.css?inline';

import * as olProj from 'ol/proj';
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import SVGCreator from "../../utils/svg-creator";
import { cache } from "lit/directives/cache.js";
import { GeocityEvent } from "../../utils/geocity-event";

interface SearchLocationElement {
  address: string;
  coordinate: number[];
}

@customElement('location-list')
// @ts-ignore
class LocationList extends LitElement {
  
  @property({type: Object}) locations: { results: string | any[]; } | undefined;

  @state() _results: Array<SearchLocationElement> = [];

  static styles = [unsafeCSS(style)];

  constructor() {
    super();
    useStore().getMap().addEventListener('click', () => {
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
    useStore().getMap().getView().setCenter(olProj.fromLonLat([coordinate[0], coordinate[1]], 'EPSG:2056'))
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
  @state() results: Object = {};

  @state() _hasSearch: boolean = false;

  static styles = [unsafeCSS(style)];

  constructor() {
    super();
    window.addEventListener('address_selected', ((e: CustomEvent) => {
      this.inputElement.value = e.detail;
      this._hasSearch = false;
    }) as EventListener)
  }

  firstUpdated() {
    this.inputElement.oninput = () => {
        if (this.inputElement.value.length > 1) {
            this._hasSearch = true;
            const options = useStore().getOptions();
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
  }
 
  render() {
    return html`<div class="search-container">
                    <div class="search-input-container">
                        <input id="search" type="text" class="search-input">
                        <div class="search-svg-container">
                        ${cache(this._hasSearch
                            ? html`<div class="cross-div" @click="${this.clear}">
                                        ${unsafeSVG(SVGCreator.cross)}
                                    </div>`
                            : html `${unsafeSVG(SVGCreator.search)}`
                          )}
                        </div>
                    </div>
                    <location-list locations='${JSON.stringify(this.results)}'/>
                </div>`;
  }
}

export default class SearchLocationControl extends Control {

    public div: HTMLElement;
  
    constructor() {
      const box = document.createElement('search-location') as SearchLocation;
      super({ element: box });
      this.div = box;
    }
  }