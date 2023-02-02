import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Control } from 'ol/control';

import boxStyle from '../styles/box-information.css?inline';

@customElement('target-information-box-element')
class TargetInformationBoxElement extends LitElement {
  @property()
  defaultPosition: Array<number> = [0, 0];

  @state() _currentPosition = [0,0];
  @state() _nearestPosition : Array<number> | string = '';

  connectedCallback() {
    super.connectedCallback();
    this._currentPosition = this.defaultPosition;
  }

  constructor() {
    super();
    window.addEventListener('current-center-position', ((event: CustomEvent) => {
      this._currentPosition = event.detail;
    }) as EventListener);
  }

  static styles = [unsafeCSS(boxStyle)];

  render() {
    return html`
      <div class="box-element">
        <div class="box-element-title">
          <div class="box-element-title-text">Éclairage signalé</div>
        </div>
        <div class="box-element-content">${this._currentPosition[0], this._currentPosition[1]}</div>
        <div class="box-element-content">${this._currentPosition[0]}, ${this._currentPosition[1]}</div>
      </div>
    `;
  }
}

export default class LightInformationBoxController extends Control {
  constructor(defaultPosition: Array<number>) {
    const box = document.createElement('target-information-box-element') as TargetInformationBoxElement;
    box.defaultPosition = defaultPosition;
    super({ element: box });
  }
}
