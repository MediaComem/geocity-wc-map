import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import Control from 'ol/control/Control';

import style from '../../styles/svg-control.css?inline';
import control from '../../styles/controls.css?inline';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import SVGCreator from '../../utils/svg-creator';

import { useStore } from '../../composable/store';
import LayerSelectionControl from './layer-selection';

@customElement('geo-layer-control-button')
class GeoLayerControlButton extends LitElement {
  static styles = [unsafeCSS(style), unsafeCSS(control)];

  render() {
    return html`<div class="ol-unselectable ol-control center-control" tabindex="0">
                  <div>
                    <div class="control-${useStore().getTheme()}">
                      ${unsafeSVG(SVGCreator.stack)}
                    </div>
                  </div>
                </div> `;
  }
}

export default class GeoLayerControl extends Control {

  isOpen: Boolean = false;
  layerSelection: LayerSelectionControl;

  constructor(target: HTMLElement) {
    const element = document.createElement(
      'geo-layer-control-button'
    ) as GeoLayerControlButton;

    super({
      element: element,
    });

    this.layerSelection = new LayerSelectionControl();
    this.layerSelection.disable();
    useStore().getMap().addControl(this.layerSelection)

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
