import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { cache } from 'lit/directives/cache.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { Control } from 'ol/control';
import { EventTypes } from 'ol/Observable';
import { useStore } from '../../composable/store';

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

  setCenterChange() {
    const feature = useStore().getSelectedFeature(useStore().getCurrentItemId());
      if (feature) {
        const geometry = feature.get('geom');
        this._isRecenterButton = geometry.intersectsExtent(useStore().getMap().getView().calculateExtent(useStore().getMap().getSize()));
      }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  constructor() {
    super();
    EventManager.registerBorderConstaintMapEvent('change:center' as EventTypes, () => this.setCenterChange())
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
      <div class="information-box-${useStore().getTheme()} box-element">
        <div class="box-text-container">
            <div class="box-element-title">
            <div class="box-element-title-text">${useStore().getOptions().selectionTargetBoxMessage}</div>
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
    const options = useStore().getOptions();
    let type = '';
    if (options.mode.type === 'mix') type = useStore().getCurrentFeatureType(useStore().getCurrentItemId());
    else type = options.mode.type
    
    switch(type) {
      case 'select': GeocityEvent.sendEvent('icon-clicked', useStore().getCurrentItemId()); break;
      case 'create': GeocityEvent.sendEvent('icon-removed', undefined); break;
    } 
  }
}

export default class SelectCreateInformationBoxController extends Control {

  div: HTMLElement;

  constructor() {
    const box = document.createElement('select-information-box-element') as SelectCreateInformationBoxElement;
    super({ element: box });
    this.div = box;
    EventManager.setResizeEvent(this.div, '--select-box-width');
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
