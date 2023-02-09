import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { cache } from 'lit/directives/cache.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { Control } from 'ol/control';
import { useStore } from '../composable/store';

import boxStyle from '../styles/select-box-information.css?inline';
import { GeocityEvent } from '../utils/geocity-event';
import SVGCreator from '../utils/svg-creator';

@customElement('select-information-box-element')
class SelectInformationBoxElement extends LitElement {

  @property() currentPosition = [0,0];

  @state() _isRecenterButton: boolean = true;

  connectedCallback() {
    super.connectedCallback();
  }

  constructor() {
    super();
    useStore().getMap().getView().on('change:center', () => {
      const feature = useStore().getSelectedFeature();
      if (feature) {
        const geometry = feature.get('geometry');
        this._isRecenterButton = geometry.intersectsExtent(useStore().getMap().getView().calculateExtent(useStore().getMap().getSize()));
      }
    });
  }

  static styles = [unsafeCSS(boxStyle)];

  render() {
    return html`
      <div class="information-box-${useStore().getTheme()} box-element">
        <div class="box-text-container">
            <div class="box-element-title">
            <div class="box-element-title-text">${useStore().getOptions().selectionTargetBoxMessage}</div>
            </div>
            <div class="box-element-content">${this.currentPosition[0].toFixed(6)}, ${this.currentPosition[1].toFixed(6)}</div>
        </div>
        <div class="box-icon-container">
          <div class="position-icon">
          ${cache(this._isRecenterButton
            ? html``
            : html `<div class="icon-container" @click="${this.recenter}">
                      ${unsafeSVG(SVGCreator.iconRecenter)}
                    </div>`
          )}
          </div>
          <div class="position-icon">
            <div class="icon-container" @click="${this.unselect}">
              ${unsafeSVG(SVGCreator.iconRemoveSelection)}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  recenter() {
    GeocityEvent.sendEvent('recenter-selected-element', undefined)
  }

  unselect() {
    GeocityEvent.sendEvent('icon-clicked', undefined)
  }
}

export default class SelectInformationBoxController extends Control {
  constructor(currentPosition: Array<number>) {
    const box = document.createElement('select-information-box-element') as SelectInformationBoxElement;
    box.currentPosition = currentPosition;
    super({ element: box });
  }
}
