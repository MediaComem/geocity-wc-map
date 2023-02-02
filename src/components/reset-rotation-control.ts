import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import Control from "ol/control/Control";

import style from '../styles/svg-control.css?inline';
import themeStyle from '../styles/theme.css?inline';

import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import SVGCreator from '../utils/svg-creator';

@customElement('rotation-control-button')
class RotationControlButton extends LitElement {

  @property() theme = 'light';

  static styles = [unsafeCSS(style), unsafeCSS(themeStyle)];

  render() {
    return html`<div class="control-${this.theme}">${unsafeSVG(SVGCreator.rotation)}</div>`;
  }
}

export default class ResetRotationControl extends Control {

    constructor(theme:string, customPosition: boolean) {
        const button = document.createElement('div');

        const icon = document.createElement('rotation-control-button') as RotationControlButton;
        icon.theme = theme;
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