import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import Control from "ol/control/Control";
import Geolocation from 'ol/Geolocation';

import style from '../styles/svg-control.css?inline';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import SVGCreator from '../utils/svg-creator';

@customElement('geolocation-control-button')
class GeolocationControlButton extends LitElement {

  static styles = [unsafeCSS(style)];

  render() {
    return html`${unsafeSVG(SVGCreator.geolocation)}`;
  }
}

export default class GeolocationCenter extends Control {
    geolocaliseElement: Geolocation | undefined;

    constructor(geolociliseElement:Geolocation | undefined, customPosition: boolean) {
      const button = document.createElement('div');

      const icon = document.createElement('geolocation-control-button') as GeolocationControlButton;
      button.appendChild(icon);
  
      const element = document.createElement('div');
      element.className = customPosition ? 'center-control-custom ol-unselectable ol-control' : 'center-control ol-unselectable ol-control';
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