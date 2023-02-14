import { LitElement, html, unsafeCSS } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { Control } from "ol/control";
import { useStore } from "../composable/store";
import style from '../styles/search.css?inline';

import * as olProj from 'ol/proj';
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import SVGCreator from "../utils/svg-creator";
import { cache } from "lit/directives/cache.js";

@customElement('search-location')
class SearchLocation extends LitElement {
  @query('#search')
  public inputElement!: HTMLInputElement;
  @query('#results')
  public results!: HTMLUListElement;

  @state() _hasSearch: boolean = false;

  static styles = [unsafeCSS(style)];

  firstUpdated() {
    this.inputElement.oninput = () => {
        if (this.inputElement.value.length > 1) {
            this._hasSearch = true;
            const options = useStore().getOptions();
            let url = `${options.search.requestWithoutCustomValue}&searchText=${this.inputElement.value}`
            if (options.search.bboxRestiction !== '') url += `&bbox=${options.search.bboxRestiction}`;
            fetch(url).then((result) => result.json()).then((json) => {
                if (json && json.results.length > 0) {
                    const maxDisplayedLocation = json.results.length > 5 ? 5 : json.results.length;
                    this.results.innerHTML = '';
                    for (let i = 0; i < maxDisplayedLocation; i++){
               
                        const item = document.createElement('li')
                        let label = '';

                        item.addEventListener('click', () => {
                            this.inputElement.value = label;
                            useStore().getMap().getView().setCenter(olProj.fromLonLat([json.results[i].attrs.lon, json.results[i].attrs.lat], 'EPSG:2056'))
                            this.results.innerHTML = '';
                        })

                        if (i === 0) item.classList.add('first-li')
                        if (i === maxDisplayedLocation - 1) item.classList.add('last-li')

                        if (json.results[i].attrs.origin == 'address') {
                            if (json.results[i].attrs.label.trim().startsWith("<b>")){
                              continue;
                            }
                            label = json.results[i].attrs.label.replace("<b>", " - ").replace("</b>", "");
                          } else if (json.results[i].attrs.origin == 'parcel') {
                            label = "Parcelle: " + json.results[i].attrs.label.replace("<b>", "").replace("</b>", "").split("(CH")[0];
                          }
                
                        const location = document.createTextNode(label)
                        item.appendChild(location)
                        this.results.appendChild(item)
                    }
                }
            });
        } else {
            this.results.innerHTML = '';
            this._hasSearch = false;
        }
    }
  }

  clear() {
    this.inputElement.value = '';
    this.results.innerHTML = '';
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
                    <ul id="results">
                    </ul>
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