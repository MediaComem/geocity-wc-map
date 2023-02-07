import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import Control from "ol/control/Control";
import Map from "ol/Map";

import InformationElement from '../types/information-element';
import { GeocityEvent } from '../utils/geocity-event';
import InformationBoxControl from './information-box';

import style from '../styles/svg-control.css?inline';
import control from '../styles/controls.css?inline';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import SVGCreator from '../utils/svg-creator';
import { useStore } from '../composable/store';

@customElement('information-control-button')
class InformationControlButton extends LitElement {

  @state() className: string;

  static styles = [unsafeCSS(style), unsafeCSS(control)];

  constructor() {
    super();
    this.className = useStore().isCustomDisplay() ? `information-control-custom-${useStore().getTargetBoxSize()}` : 'information-control';
  }

  render() {
    return html`<div class="ol-unselectable ol-control ${this.className}" style="position: absolute">
                  <div>
                    <div class="control-${useStore().getTheme()}">
                      ${unsafeSVG(SVGCreator.information)}
                    </div>
                  </div>
                </div>
    `;
  }
}


export default class InformationControl extends Control {
    map: Map;
    information: InformationElement;
    informationIsOpen: Boolean = true;

    constructor(map: Map, information: InformationElement) {

        const element = document.createElement('information-control-button') as InformationControlButton;
    
        super({
          element: element,
        });
        this.map = map;
        this.information = information;
        element.addEventListener('click', this.toogleInformationBox.bind(this), false);
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