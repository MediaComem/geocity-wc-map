import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { cache } from 'lit/directives/cache.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { Control } from 'ol/control';
import { EventTypes } from 'ol/Observable';
import { Store } from '../../composable/store';

import boxStyle from '../../styles/select-box-information.css?inline';
import EventManager from '../../utils/event-manager';
import { GeocityEvent } from '../../utils/geocity-event';
import SearchApi from '../../utils/search-api';
import SVGCreator from '../../utils/svg-creator';

@customElement('select-information-box-element')
class SelectCreateInformationBoxElement extends LitElement {

  @property() currentPosition = [0,0];

  @state() _isRecenterButton: boolean = true;
  @state() _currentPosition = '';

  store: Store;

  setCenterChange() {
    const feature = this.store.getSelectedFeature(this.store.getCurrentItemId());
      if (feature) {
        const geometry = feature.get('geom');
        this._isRecenterButton = geometry.intersectsExtent(this.store.getMap()?.getView().calculateExtent(this.store.getMap()?.getSize()));
      }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  constructor(store: Store) {
    super();
    this.store = store;
    const map = this.store.getMap();
    const options = this.store.getOptions();
    if (!map || !options) {
      throw new Error("invalid map or options");
    }

    EventManager.registerBorderConstaintMapEvent('change:center' as EventTypes, () => this.setCenterChange(), map, options)
    window.addEventListener('open-select-create-box', ((event: CustomEvent) => {
      SearchApi.getAddressFromCoordinate(event.detail).then((data) => {
        this._currentPosition = data.results.length > 0 ? `À proximité de ${data.results[0].attributes.strname_deinr}` : 'Aucune adresse proche reconnue';
      });
      this.setCenterChange();
    }) as EventListener)
  }

  static styles = [unsafeCSS(boxStyle)];

  render() {
    return html`
      <div class="information-box-${Store.getTheme()} box-element">
        <div class="box-text-container">
            <div class="box-element-title">
            <div class="box-element-title-text">${this.store.getOptions()?.selectionTargetBoxMessage}</div>
            </div>
            <div class="box-element-content">${this._currentPosition}</div>
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
    const options = this.store.getOptions();
    let type = '';
    if (options?.mode.type === 'mix') type = this.store.getCurrentFeatureType(this.store.getCurrentItemId());
    else type = options?.mode.type ?? ''

    switch(type) {
      case 'select': GeocityEvent.sendEvent('icon-clicked', this.store.getCurrentItemId()); break;
      case 'create': GeocityEvent.sendEvent('icon-removed', undefined); break;
    }
  }
}

export default class SelectCreateInformationBoxController extends Control {

  div: HTMLElement;

  constructor(store: Store) {
    const box = new SelectCreateInformationBoxElement(store);
    super({ element: box });
    this.div = box;
    const map = store.getMap();
    if (!map) {
      throw new Error("missing map");
    }
    EventManager.setResizeEvent(this.div, '--select-box-width', map);
  }

  public disable() {
    this.div.classList.add('disabled');
  }

  public show() {
    this.div.classList.remove('fade-out');
    this.div.classList.remove('disabled');
    this.div.classList.add('fade-in');
  }

  public hide() {
    this.div.classList.remove('fade-in');
    this.div.classList.add('fade-out');
  }
}
