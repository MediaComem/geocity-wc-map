import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import Control from "ol/control/Control";
import Geolocation from 'ol/Geolocation';

import style from '../styles/svg-control.css?inline';
import themeStyle from '../styles/theme.css?inline';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import SVGCreator from '../utils/svg-creator';

@customElement('geolocation-control-button')
class GeolocationControlButton extends LitElement {

  @property() theme = 'light';

  static styles = [unsafeCSS(style), unsafeCSS(themeStyle)];

  render() {
    return html`<div class="control-${this.theme}">${unsafeSVG(SVGCreator.geolocation)}</div>`;
  }
}

export default class GeolocationCenter extends Control {
    geolocaliseElement: Geolocation | undefined;

    constructor(geolociliseElement:Geolocation | undefined, theme:string, customPosition: boolean, controlSize: string) {
      const button = document.createElement('div');

      const icon = document.createElement('geolocation-control-button') as GeolocationControlButton;
      icon.theme = theme;
      button.appendChild(icon);
  
      const element = document.createElement('div');
      element.className = customPosition ? `center-control-custom-${controlSize} ol-unselectable ol-control` : 'center-control ol-unselectable ol-control';
      element.className += theme === 'light' ? ' control-light' : ' control-dark';
      element.appendChild(button);
  
      super({
        element: element,
      });
      this.geolocaliseElement = geolociliseElement;
      button.addEventListener('click', this.centerMap.bind(this), false);
    }
  
    centerMap() {
      if (this.geolocaliseElement) {
        const coordinate = this.geolocaliseElement.getPosition();
        const map = this.getMap();
        if (map) {
          const size = map.getSize();
          const view = map.getView();
          if (coordinate && size) view.centerOn(coordinate, size, [570, 500]);
        }
        
      }
    }
  }