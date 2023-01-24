import { unsafeCSS, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Control } from 'ol/control';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';

import style from '../../styles/notification.css?inline';
import SVGCreator from '../../utils/svg-creator';

@customElement('notification-box')
class NotificationBox extends LitElement {

  @state() icon = "";

  static styles = [unsafeCSS(style)];

  constructor() {
    super();
    this.icon = SVGCreator.warning;
  }

  render() {
    return html`
      <div style="top: 50%; position: absolute">${unsafeSVG(this.icon)}≠</div>
    `
  }
}

export default class NotificationBoxControl extends Control {
  constructor() {
    const notificationBox = document.createElement('notification-box') as NotificationBox;
    super({ element: notificationBox});
  }
}

