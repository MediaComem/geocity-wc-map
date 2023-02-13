import { unsafeCSS, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Control } from 'ol/control';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import style from '../../styles/notification.css?inline';

import SVGCreator from '../../utils/svg-creator';
import NotificationElement from '../../types/notification-element';
import { useStore } from '../../composable/store';

@customElement('notification-box')
class NotificationBox extends LitElement {
  @property()
  type: string = 'info';
  @property()
  message: string = '';

  @state() icon = '';
  @state() theme = '';

  static styles = [ unsafeCSS(style)];

  constructor() {
    super();
  }

  firstUpdated(): void {
    switch (this.type) {
      case 'info':
        this.icon = SVGCreator.info;
        this.theme = `notification-element-info-${useStore().getTheme()}`;
        break;
      case 'warning':
        this.icon = SVGCreator.warning;
        this.theme = `notification-element-warning-${useStore().getTheme()}`;
        break;
      case 'error':
        this.icon = SVGCreator.error;
        this.theme = `notification-element-error-${useStore().getTheme()}`;
        break;
    }
  }

  render() {
    return html`
      <div class="notification-element ${this.theme}">
        <div class="notification-title">
          ${unsafeSVG(this.icon)}
          <div class="notification-title-text">${this.message}</div>
        </div>  
      </div>
    `;
  }
}

export default class NotificationBoxControl extends Control {
  ruleType: string;
  public div: HTMLElement;

  constructor(target: HTMLElement, notification: NotificationElement, layerPosition: number) {
    const notificationBox = document.createElement(
      'notification-box'
    ) as NotificationBox;
    notificationBox.type = notification.type;
    notificationBox.message = notification.message;
    
    super({ element: notificationBox });
    this.ruleType = notification.rule.type;
    this.div = notificationBox;
    this.div.classList.add('notification-box');
    this.div.style.zIndex = `${layerPosition}`;
    this.setTarget(target);
  }
}
