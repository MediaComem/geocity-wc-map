import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import Control from "ol/control/Control";
import { Map } from "ol";

import style from '../../styles/svg-control.css?inline';

import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import SVGCreator from '../../utils/svg-creator';
import { Store } from '../../composable/store';

@customElement('rotation-control-button')
class RotationControlButton extends LitElement {

  static styles = [unsafeCSS(style)];

  render() {
    return html`<div class="control-${Store.getTheme()}" tabindex="0">${unsafeSVG(SVGCreator.rotation)}</div>`;
  }
}

export default class ResetRotationControl extends Control {

    map: Map;

    constructor(target: HTMLElement, map: Map) {
        const button = document.createElement('div');

        const icon = document.createElement('rotation-control-button') as RotationControlButton;

        button.appendChild(icon);

        const element = document.createElement('div');
        element.className = 'rotation-control ';
        element.appendChild(button);

        super({
            element: element,
        });
        if(!map) {
          throw new Error ("Missing map!");
        }
        this.map = map;
        button.addEventListener('click', this.resetRotation.bind(this), false);

        this.setTarget(target);
    }

    resetRotation() {
      this.map.getView().setRotation(0);
    }
}