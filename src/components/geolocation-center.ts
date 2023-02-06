import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import Control from "ol/control/Control";
import Geolocation from 'ol/Geolocation';

import style from '../styles/svg-control.css?inline';
import themeStyle from '../styles/theme.css?inline';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import SVGCreator from '../utils/svg-creator';

import { useStore } from '../composable/store';

@customElement('geolocation-control-button')
class GeolocationControlButton extends LitElement {

  static styles = [unsafeCSS(style), unsafeCSS(themeStyle)];

  render() {
    return html`<div class="control-${useStore().getTheme()}">${unsafeSVG(SVGCreator.geolocation)}</div>`;
  }
}

export default class GeolocationCenter extends Control {
    geolocaliseElement: Geolocation | undefined;

    constructor(geolociliseElement:Geolocation | undefined) {
      const button = document.createElement('div');

      const icon = document.createElement('geolocation-control-button') as GeolocationControlButton;
      button.appendChild(icon);
  
      const element = document.createElement('div');
      element.className = useStore().isCustomDisplay() ? `center-control-custom-${useStore().getTargetBoxSize()} ol-unselectable ol-control` : 'center-control ol-unselectable ol-control';
      element.className += useStore().getTheme() === 'light' ? ' control-light' : ' control-dark';
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