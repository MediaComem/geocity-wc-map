import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import Control from "ol/control/Control";

import style from '../../styles/svg-control.css?inline';
import control from '../../styles/controls.css?inline';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import SVGCreator from '../../utils/svg-creator';

import { useStore } from '../../composable/store';

@customElement('geolocation-control-button')
class GeolocationControlButton extends LitElement {

  static styles = [unsafeCSS(style), unsafeCSS(control)];

  constructor() {
    super();
  }

  render() {
    return html`<div class="ol-unselectable ol-control center-control" tabindex="0">
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
    constructor(target: HTMLElement) {

      const element = document.createElement('geolocation-control-button') as GeolocationControlButton;
  
      super({
        element: element,
      });

      element.addEventListener('click', this.centerMap.bind(this), false);
      this.setTarget(target);
    }
  
    centerMap() {
      const geolocation = useStore().getGeolocation();
      if (geolocation) {
        const coordinate = geolocation.getPosition();
        const map = this.getMap();
        if (map) {
          const view = map.getView();
          if (coordinate) view.setCenter(coordinate);
        }
        
      }
    }
  }