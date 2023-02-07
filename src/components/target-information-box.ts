import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Control } from 'ol/control';
import { useStore } from '../composable/store';

import boxStyle from '../styles/target-box-information.css?inline';
import themeStyle from '../styles/theme.css?inline';
import GeolocationInformation from '../types/geolocation-information';

@customElement('target-information-box-element')
class TargetInformationBoxElement extends LitElement {
  @property()
  targetBoxMessage: string = '';
  @property()
  defaultPosition: Array<number> = [0, 0];
  @property()
  geolocationInformation: GeolocationInformation = { displayBox: true, reverseLocation: true, currentLocation: true};

  @state() _currentPosition: string = '';
  @state() _reversePosition: string = '';

  connectedCallback() {
    super.connectedCallback();
  }

  constructor() {
    super();
    window.addEventListener('current-center-position', ((event: CustomEvent) => {
      this._reversePosition = event.detail;
      this._currentPosition = event.detail;
    }) as EventListener);
  }

  protected firstUpdated(): void {
    this._reversePosition = this.geolocationInformation.reverseLocation ? `${this.defaultPosition[0]}, ${this.defaultPosition[1]}` : '';
    this._currentPosition = this.geolocationInformation.currentLocation ? `${this.defaultPosition[0]}, ${this.defaultPosition[1]}` : '';
    console.log(this.targetBoxMessage);
  }

  static styles = [unsafeCSS(boxStyle), unsafeCSS(themeStyle)];

  render() {
    return html`
      <div class="information-box-${useStore().getTheme()} box-element">
        <div class="box-element-title">
          <div class="box-element-title-text">${this.targetBoxMessage}</div>
        </div>
        <div class="box-element-content">${this._reversePosition}</div>
        <div class="box-element-content">${this._currentPosition}</div>
      </div>
    `;
  }
}

export default class TargetInformationBoxController extends Control {
  constructor(defaultPosition: Array<number>, geolocationInformation: GeolocationInformation, targetBoxMessage: string) {
    console.log(targetBoxMessage)
    const box = document.createElement('target-information-box-element') as TargetInformationBoxElement;
    box.defaultPosition = defaultPosition;
    box.geolocationInformation = geolocationInformation;
    box.targetBoxMessage = targetBoxMessage
    super({ element: box });
  }
}
