import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Control } from 'ol/control';
import { useStore } from '../composable/store';

import boxStyle from '../styles/target-box-information.css?inline';

@customElement('target-information-box-element')
class TargetInformationBoxElement extends LitElement {
  @property()
  defaultPosition: Array<number> = [0, 0];

  @state() _currentPosition: string = '';
  @state() _reversePosition: string = '';

  connectedCallback() {
    super.connectedCallback();
  }

  constructor() {
    super();
    window.addEventListener('current-center-position', ((event: CustomEvent) => {
      this._reversePosition = useStore().getOptions().geolocationInformation.reverseLocation ? `${event.detail[0].toFixed(6)}}, ${event.detail[1].toFixed(6)}}` : '';
      this._currentPosition = useStore().getOptions().geolocationInformation.currentLocation ? `${event.detail[0].toFixed(6)}}, ${event.detail[1].toFixed(6)}}` : '';
    }) as EventListener);
  }

  protected firstUpdated(): void {
    this._reversePosition = useStore().getOptions().geolocationInformation.reverseLocation ? `${this.defaultPosition[0].toFixed(6)}}, ${this.defaultPosition[1].toFixed(6)}}` : '';
    this._currentPosition = useStore().getOptions().geolocationInformation.currentLocation ? `${this.defaultPosition[0].toFixed(6)}}, ${this.defaultPosition[1].toFixed(6)}}` : '';
  }

  static styles = [unsafeCSS(boxStyle)];

  render() {
    return html`
      <div class="information-box-${useStore().getTheme()} box-element">
        <div class="box-element-title">
          <div class="box-element-title-text">${useStore().getOptions().selectionTargetBoxMessage}</div>
        </div>
        <div class="box-element-content">${this._reversePosition}</div>
        <div class="box-element-content">${this._currentPosition}</div>
      </div>
    `;
  }
}

export default class TargetInformationBoxController extends Control {
  constructor() {
    const box = document.createElement('target-information-box-element') as TargetInformationBoxElement;
    box.defaultPosition = useStore().getOptions().defaultCenter;
    super({ element: box });
  }
}
