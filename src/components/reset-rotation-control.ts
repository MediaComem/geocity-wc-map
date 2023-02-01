import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import Control from "ol/control/Control";

import style from '../styles/svg-control.css?inline';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import SVGCreator from '../utils/svg-creator';

@customElement('rotation-control-button')
class RotationControlButton extends LitElement {

  static styles = [unsafeCSS(style)];

  render() {
    return html`${unsafeSVG(SVGCreator.rotation)}`;
  }
}

export default class ResetRotationControl extends Control {

    constructor(customPosition: boolean) {
        const button = document.createElement('div');

        const icon = document.createElement('rotation-control-button') as RotationControlButton;
        button.appendChild(icon);
    
        const element = document.createElement('div');
        element.className = customPosition ? 'rotation-control-custom ol-unselectable ol-control' : 'rotation-control ol-unselectable ol-control';
        element.appendChild(button);
    
        super({
            element: element,
        });
        button.addEventListener('click', this.resetRotation.bind(this), false);
    }

    resetRotation() {
        this.getMap()?.getView().setRotation(0);
    }
}