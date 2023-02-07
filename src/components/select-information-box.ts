import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Control } from 'ol/control';
import { useStore } from '../composable/store';

import boxStyle from '../styles/select-box-information.css?inline';
import themeStyle from '../styles/theme.css?inline';

@customElement('select-information-box-element')
class SelectInformationBoxElement extends LitElement {

  @property() currentPosition = [0,0];

  connectedCallback() {
    super.connectedCallback();
  }

  constructor() {
    super();
  }

  static styles = [unsafeCSS(boxStyle), unsafeCSS(themeStyle)];

  render() {
    return html`
      <div class="information-box-${useStore().getTheme()} box-element">
        <div class="box-text-container">
            <div class="box-element-title">
            <div class="box-element-title-text">Éclairage signalé</div>
            </div>
            <div class="box-element-content">${this.currentPosition[0].toFixed(6)}, ${this.currentPosition[1].toFixed(6)}</div>
        </div>
      </div>
    `;
  }
}

export default class SelectInformationBoxController extends Control {
  constructor(currentPosition: Array<number>) {
    const box = document.createElement('select-information-box-element') as SelectInformationBoxElement;
    box.currentPosition = currentPosition;
    super({ element: box });
  }
}
