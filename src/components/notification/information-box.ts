import { unsafeCSS, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Control } from 'ol/control';
import { GeocityEvent } from '../../utils/geocity-event';

import popupStyle from '../../styles/popup-information.css?inline';
import { Store } from '../../composable/store';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import SVGCreator from '../../utils/svg-creator';

@customElement('information-box')
class InformationBox extends LitElement {
  @state() _width = 100;
  @state() _borderRadiusRight = 0;

  interval: any;

  static styles = [unsafeCSS(popupStyle)];
  store: Store;

  constructor(store: Store) {
    super();
    this.store = store;
    const options = store.getOptions();
    if (!options) {
      throw new Error("Missing options");
    }
    window.addEventListener('clear-information-box-interval', this.clear.bind(this), true);
    window.addEventListener('open-information-box', () => {
      this._width = 100;
      const intervalDuration = options.information.duration / 100;

      this.interval = setInterval(() => {
        if (this._width > 0) {
          if (this._width < 100) {
            this._borderRadiusRight = 0;
          }
          this._width--;
        } else {
          this.closeBox();
        }
      }, intervalDuration);
    });
  }

  render() {
    return html`
      <div class="information-box-${Store.getTheme()} custom-popup-element" style="--progress-width: ${this._width}%; --border-radius-right: ${this._borderRadiusRight}px">
        <div class="custom-popup-title">
          <div class="custom-popup-title-text">${this.store.getOptions()?.information.title}</div>
          <div class="custom-popup-title-svg-container">
            <div class="cross-div" @click="${this.closeBox}">
              ${unsafeSVG(SVGCreator.cross)}
            </div>
          </div>
        </div>
        <div class="custom-popup-content">${this.store.getOptions()?.information.content}</div>
        <div class="custom-progress-element"></div>
      </div>`
  }

  clear() {
    clearInterval(this.interval);
  }

  closeBox() {
    clearInterval(this.interval);
    GeocityEvent.sendEvent('close-information-box', {});
  }

}

export default class InformationBoxControl extends Control {

  public div: HTMLElement;

  constructor(store: Store) {
    const infoBox = new InformationBox(store);
    super({ element: infoBox});
    this.div = infoBox;
    this.div.classList.add('custom-popup-element-position')
  }

  public show() {
    this.div.classList.remove('fade-out');
    this.div.classList.add('fade-in');
  }

  public hide() {
    this.div.classList.remove('fade-in');
    this.div.classList.add('fade-out');
  }
}