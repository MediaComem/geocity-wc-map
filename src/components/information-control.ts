import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import { Map } from 'ol';
import Control from "ol/control/Control";

import InformationElement from '../types/information-element';
import { GeocityEvent } from '../utils/geocity-event';
import InformationBoxControl from './information-box';

import style from '../styles/svg-control.css?inline';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import SVGCreator from '../utils/svg-creator';

@customElement('information-control-button')
class InformationControlButton extends LitElement {

  static styles = [unsafeCSS(style)];

  render() {
    return html`${unsafeSVG(SVGCreator.information)}`;
  }
}

export default class InformationControl extends Control {
    map:Map;
    information: InformationElement;
    informationIsOpen: Boolean = true;
    timeout: any;

    constructor(map: Map, information: InformationElement, customPosition: boolean) {
        const button = document.createElement('div');

        const icon = document.createElement('information-control-button') as InformationControlButton;
        button.appendChild(icon);
    
        const element = document.createElement('div');
        element.className = customPosition ? 'information-control-custom ol-unselectable ol-control' : 'information-control ol-unselectable ol-control';
        element.appendChild(button);
    
        super({
          element: element,
        });
        this.map = map;
        this.information = information;
        button.addEventListener('click', this.toogleInformationBox.bind(this), false);
        window.addEventListener('close-information-box', this.closeInformationBox.bind(this), false);
        this.openInformationBox();
      }

      closeInformationBox() {
        GeocityEvent.sendEvent('clear-information-box-interval', {});
        this.map.getControls().forEach((control) => {
            if (control instanceof InformationBoxControl) {
              this.map.removeControl(control);
            }
        });
        this.informationIsOpen = false;
      }

      openInformationBox() {
        this.map.addControl(new InformationBoxControl(this.information));
        this.informationIsOpen = true;
      }
    
      toogleInformationBox() {
        this.informationIsOpen ? this.closeInformationBox() : this.openInformationBox();
      }
    }