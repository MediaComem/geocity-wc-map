import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import Control from "ol/control/Control";

import style from '../../styles/svg-control.css?inline';

import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import SVGCreator from '../../utils/svg-creator';
import { useStore } from '../../composable/store';

@customElement('rotation-control-button')
class RotationControlButton extends LitElement {

  static styles = [unsafeCSS(style)];

  render() {
    return html`<div class="control-${useStore().getTheme()}" tabindex="0">${unsafeSVG(SVGCreator.rotation)}</div>`;
  }
}

export default class ResetRotationControl extends Control {

    constructor(target: HTMLElement) {
        const button = document.createElement('div');

        const icon = document.createElement('rotation-control-button') as RotationControlButton;
        
        button.appendChild(icon);

        const element = document.createElement('div');
        element.className = 'rotation-control ';
        element.appendChild(button);
    
        super({
            element: element,
        });
        button.addEventListener('click', this.resetRotation.bind(this), false);

        this.setTarget(target);
    }

    resetRotation() {
      useStore().getMap().getView().setRotation(0);
    }
}