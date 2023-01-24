import { unsafeCSS, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Control } from 'ol/control';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import style from '../../styles/notification.css?inline';
import theme from '../../styles/theme.css?inline';

import SVGCreator from '../../utils/svg-creator';
import NotificationElement from '../../types/notification-element';

@customElement('notification-box')
class NotificationBox extends LitElement {
  @property()
  notification: NotificationElement = { type: '', message: '', rule: {} };
  @property()
  mode: string = 'light';

  @state() icon = '';
  @state() theme = '';

  static styles = [unsafeCSS(theme), unsafeCSS(style)];

  constructor() {
    super();
  }

  firstUpdated(): void {
    switch (this.notification.type) {
      case 'info':
        this.icon = SVGCreator.info;
        this.theme = this.mode === 'light' ? 'notification-element-info-light' : 'notification-element-info-dark';
        break;
      case 'warning':
        this.icon = SVGCreator.warning;
        this.theme = this.mode === 'light' ? 'notification-element-warning-light' : 'notification-element-warning-dark';
        break;
      case 'error':
        this.icon = SVGCreator.error;
        this.theme = this.mode === 'light' ? 'notification-element-error-light' : 'notification-element-error-dark';
        break;
    }
  }

  render() {
    return html`
      <div class="notification-element ${this.theme}">
        <div class="notification-title">
          ${unsafeSVG(this.icon)}
          <div class="notification-title-text">${this.notification.message}</div>
        </div>  
      </div>
    `;
  }
}

export default class NotificationBoxControl extends Control {
  constructor(notification: NotificationElement, mode:string) {
    const notificationBox = document.createElement(
      'notification-box'
    ) as NotificationBox;
    notificationBox.notification = notification;
    notificationBox.mode = mode;
    super({ element: notificationBox });
  }
}
