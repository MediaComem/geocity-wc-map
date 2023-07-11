import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import Control from 'ol/control/Control';

import style from '../../styles/svg-control.css?inline';
import control from '../../styles/controls.css?inline';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import SVGCreator from '../../utils/svg-creator';
import { Map } from 'ol';


import LayerSelectionControl from './layer-selection';
import { Store } from '../../composable/store';
import wmtsLayerConfiguration from '../mapView/wmts-loader';

@customElement('geo-layer-control-button')
class GeoLayerControlButton extends LitElement {
  static styles = [unsafeCSS(style), unsafeCSS(control)];

  render() {
    return html`<div class="ol-unselectable ol-control center-control" tabindex="0">
                  <div>
                    <div class="control-${Store.getTheme()}">
                      ${unsafeSVG(SVGCreator.stack)}
                    </div>
                  </div>
                </div> `;
  }
}

export default class GeoLayerControl extends Control {

  isOpen: Boolean = false;
  layerSelection: LayerSelectionControl;

  constructor(target: HTMLElement, map: Map, wmts: Array<wmtsLayerConfiguration>) {
    const element = document.createElement(
      'geo-layer-control-button'
    ) as GeoLayerControlButton;

    super({
      element: element,
    });

    this.layerSelection = new LayerSelectionControl(wmts);
    this.layerSelection.disable();
    map.addControl(this.layerSelection)

    element.addEventListener('click', () => {
        this.toogleSelection();
    });

    window.addEventListener('layer-selection-closed', () => this.close())

    this.setTarget(target);
  }

  toogleSelection() {
    this.isOpen = !this.isOpen;
    this.isOpen ? this.layerSelection.show() : this.layerSelection.hide();
  }

  close() {
    this.isOpen = false;
    this.layerSelection.hide();
  }
}
