import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Control } from 'ol/control';
import DataTile from 'ol/DataTile';
import InformationElement from '../types/information-element';
import { GeocityEvent } from '../utils/geocity-event';

@customElement('information-box')
class InformationBox extends LitElement {
  @property()
  information: InformationElement = { duration: 0, title: '', content: ''};

  @state() _width = 100;

  interval: any;

  static styles = css`
    .custom-popup-element {
      position: absolute;
      top: 5px;
      background-color: white;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
      padding: 15px;
      border-radius: 10px;
      border: 1px solid #cccccc;
      z-index: 10;
      margin-left: 5px;
      margin-right: 5px;
      max-width: 302px;
      width: 100%;
    }

    .custom-popup-element:after {
      content: '';
      width: var(--progress-width);
      height: 4px;
      background: green;
      position: absolute;
      bottom: -1px;
      left: 0;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    .custom-popup-title {
      display: flex;
    }

    .custom-popup-title-text {
      width: 90%;
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
    }

    .custom-popup-title-svg {
      width: 10%;
      justify-content: flex-end;
      display: flex;
    }

    .custom-popup-content {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
    }`

  firstUpdated(): void {
    const intervalDuration = this.information.duration / 100;
    this._width = 100;
    this.interval = setInterval(() => {
      console.log(new Date());
      if (this._width > 0) {
        this._width--;
      } else {
        this.closeBox();
      }
    }, intervalDuration * 1000);
  }

  constructor() {
    super();
    window.addEventListener('clear-information-box-interval', this.clear.bind(this), true);
  }

  render() {
    return html`
      <div class="custom-popup-element" style="--progress-width: ${this._width}%">
        <div class="custom-popup-title">
          <div class="custom-popup-title-text">${this.information.title}</div>
          <svg _width="20" height="20" fill="none" viewBox="0 0 20 20" class="custom-popup-title-svg" @click="${this.closeBox}">
            <path d="M15.4 4.59998L4.60004 15.4" stroke="#1E293B" stroke-_width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M15.4 15.4L4.60004 4.59998" stroke="#1E293B" stroke-_width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </div>
        <div class="custom-popup-content">${this.information.content}</div>
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
  constructor(information: InformationElement) {
    const infoBox = document.createElement('information-box') as InformationBox;
    infoBox.information = information;
    const test = document.createElement('div')
    test.style.setProperty('background', 'red');
    test.style.width = '100px';
    test.style.height = '100px';
    super({ element: infoBox});
  }
}

