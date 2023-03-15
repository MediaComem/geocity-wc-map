import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

import Control from 'ol/control/Control';

import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import SVGCreator from '../../utils/svg-creator';
import { GeocityEvent } from '../../utils/geocity-event';
import layerStyle from '../../styles/layer-selection.css?inline';
import { useStore } from '../../composable/store';
import wmtsLayerConfiguration from '../mapView/wmts-loader';

@customElement('layer-list')
// @ts-ignore
class LayerList extends LitElement {
  @state() _currentSelectedIndex = 0;

  selectLayer(layer: wmtsLayerConfiguration, index: number) {
    GeocityEvent.sendEvent('layer-selected', layer)
    this._currentSelectedIndex = index
  }

  static styles = [unsafeCSS(layerStyle)];

  render() {
    return html`
                <ul>
                  ${useStore().getOptions().wmts.map((wmts: wmtsLayerConfiguration, index: number) =>
                    html`<li tabindex="0" @click=${() => this.selectLayer(wmts, index)}>
                          <div class="image-container">
                            <img class=${classMap({"selected-layer": this._currentSelectedIndex === index})} src="${wmts.thumbnail}"/>
                          </div>
                          <p>${wmts.name}</p>
                        </li>`
                  )}
                </ul>
              `;
  }
}

@customElement('layer-selection')
class LayerSectionElement extends LitElement {
  static styles = [unsafeCSS(layerStyle)];

  render() {
    return html`<div class="layer-container">
                  <div class="layer-title-container">
                      <p class="layer-text">Affichage de la carte</p>
                      <div class="layer-svg-container">
                        <div class="cross-div" @click="${this.closeBox}">
                          ${unsafeSVG(SVGCreator.cross)}
                        </div>
                      </div>
                  </div>
                  <layer-list />
              </div>`;
  }

  closeBox() {
    GeocityEvent.sendEvent('layer-selection-closed', undefined);
  }
}

export default class LayerSelectionControl extends Control {

  constructor() {
    const box = document.createElement('layer-selection') as LayerSectionElement;
    super({ element: box });
    this.element.classList.add('layer-container-position')
  }

  public disable() {
    this.element.classList.add('disabled');
  }

  public show() {
    this.element.classList.remove('fade-out');
    this.element.classList.remove('disabled');
    this.element.classList.add('fade-in');
  }

  public hide() {
    this.element.classList.remove('fade-in');
    this.element.classList.add('fade-out');
  }
}