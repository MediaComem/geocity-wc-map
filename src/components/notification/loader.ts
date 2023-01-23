import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import Control from 'ol/control/Control';

import style from '../../styles/loader.css?inline';

@customElement('loader-box')
class LoaderBox extends LitElement {
  @state() message = '';

  constructor(message: string) {
    super();
    this.message = message;
  }

  static styles = [unsafeCSS(style)];

  render() {
    return html`
      <div class="loader-element" style="pointer-events: auto;">
        <div class="loader-container">
          <span class="loader"></span>
        </div>
        <div class="loader-text">${this.message}</div>
      </div>
    `;
  }
}

export default class LoaderBoxControl extends Control {
  constructor(message: string) {
    const loadingBox = document.createElement('loader-box') as LoaderBox;
    loadingBox.message = message;

    super({
      element: loadingBox,
    });
  }
}
