import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import Control from "ol/control/Control";
import Geolocation from 'ol/Geolocation';

import style from '../styles/svg-control.css?inline';
import themeStyle from '../styles/theme.css?inline';
import control from '../styles/controls.css?inline';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import SVGCreator from '../utils/svg-creator';

import { useStore } from '../composable/store';

@customElement('geolocation-control-button')
class GeolocationControlButton extends LitElement {

  @state() className: string;

  static styles = [unsafeCSS(style), unsafeCSS(themeStyle), unsafeCSS(control)];

  constructor() {
    super();
    this.className = useStore().isCustomDisplay() ? `center-control-custom-${useStore().getTargetBoxSize()}` : 'information-control';
  }

  render() {
    return html`<div class="ol-unselectable ol-control ${this.className}" style="position: absolute">
                  <div>
                    <div class="control-${useStore().getTheme()}">
                      ${unsafeSVG(SVGCreator.geolocation)}
                    </div>
                  </div>
                </div>
    `;
  }
}

export default class GeolocationCenter extends Control {
    geolocaliseElement: Geolocation | undefined;

    constructor(geolociliseElement:Geolocation | undefined) {

      const element = document.createElement('geolocation-control-button') as GeolocationControlButton;
  
      super({
        element: element,
      });
      this.geolocaliseElement = geolociliseElement;
      element.addEventListener('click', this.centerMap.bind(this), false);
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