import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import Control from "ol/control/Control";

import style from '../styles/svg-control.css?inline';
import control from '../styles/controls.css?inline';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import SVGCreator from '../utils/svg-creator';

import { useStore } from '../composable/store';

@customElement('geolocation-control-button')
class GeolocationControlButton extends LitElement {

  @state() className: string;

  static styles = [unsafeCSS(style), unsafeCSS(control)];

  constructor() {
    super();
    this.className = 'center-control';
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
    constructor() {

      const element = document.createElement('geolocation-control-button') as GeolocationControlButton;
  
      super({
        element: element,
      });

      element.addEventListener('click', this.centerMap.bind(this), false);
    }
  
    centerMap() {
      const geolocation = useStore().getGeolocation();
      if (geolocation) {
        const coordinate = geolocation.getPosition();
        const map = this.getMap();
        if (map) {
          const size = map.getSize();
          const view = map.getView();
          if (coordinate && size) view.centerOn(coordinate, size, [570, 500]);
        }
        
      }
    }
  }