import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Control } from 'ol/control';
import { Store } from '../../composable/store';

import boxStyle from '../../styles/target-box-information.css?inline';
import EventManager from '../../utils/event-manager';
import IOption from '../../utils/options';
import SearchApi from '../../utils/search-api';

@customElement('target-information-box-element')
class TargetInformationBoxElement extends LitElement {
  @property()
  defaultPosition: Array<number> = [0, 0];

  @state() _currentPosition: string = '';
  @state() _reversePosition: string = '';
  @state() _lastPosition: number[];

  options: IOption;

  connectedCallback() {
    super.connectedCallback();
  }

  searchAddress(coordiante: number[]) {
    SearchApi.getAddressFromCoordinate(coordiante).then((data) => {
      this._reversePosition = data.results.length > 0 ? `À proximité de ${data.results[0].attributes.strname_deinr}` : 'Aucune adresse proche reconnue';
    });
  }

  constructor(store: Store) {
    super();
    const options = store.getOptions();
    if (!options) {
      throw new Error("invalid options");
    }
    this.options = options;
    this._lastPosition = this.defaultPosition;
    const minCoordinateMoveBeforeSearchAddress = 20;

    window.addEventListener('current-center-position', ((event: CustomEvent) => {
      if (this.options?.geolocationInformation.reverseLocation) {
        if (Math.abs(this._lastPosition[0] - event.detail[0]) > minCoordinateMoveBeforeSearchAddress || Math.abs(this._lastPosition[1] - event.detail[1]) > minCoordinateMoveBeforeSearchAddress) {
          this._lastPosition = event.detail; 
          this.searchAddress(event.detail);
        }
      }
      else  this._reversePosition = '';
      this._currentPosition = this.options?.geolocationInformation.currentLocation ? `${event.detail[0].toFixed(6)}, ${event.detail[1].toFixed(6)}` : '';
    }) as EventListener);
  }

  protected firstUpdated(): void {
    if (this.options?.geolocationInformation.reverseLocation) this.searchAddress(this.defaultPosition)
    else  this._reversePosition = '';
    this._currentPosition = this.options?.geolocationInformation.currentLocation ? `${this.defaultPosition[0].toFixed(6)}, ${this.defaultPosition[1].toFixed(6)}` : '';
  }

  static styles = [unsafeCSS(boxStyle)];

  render() {
    return html`
      <div class="information-box-${Store.getTheme()} box-element">
        <div class="box-element-title">
          <div class="box-element-title-text">${this.options?.selectionTargetBoxMessage}</div>
        </div>
        <div class="box-element-content">${this._reversePosition}</div>
        <div class="box-element-content">${this._currentPosition}</div>
      </div>
    `;
  }
}

export default class TargetInformationBoxController extends Control {
  constructor(store: Store) {
    const box = new TargetInformationBoxElement(store);
    box.defaultPosition = store.getOptions()?.defaultCenter ?? [];
    super({ element: box });
    const map = store.getMap();
    if (!map) {
      throw new Error("invalid map");
    }
    EventManager.setResizeEvent(this.element, '--target-box-width', map);
  }
}
