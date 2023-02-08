import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import Control from "ol/control/Control";

import { GeocityEvent } from '../utils/geocity-event';
import InformationBoxControl from './information-box';

import style from '../styles/svg-control.css?inline';
import control from '../styles/controls.css?inline';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import SVGCreator from '../utils/svg-creator';
import { useStore } from '../composable/store';

@customElement('information-control-button')
class InformationControlButton extends LitElement {

  @state() className: string = '';

  static styles = [unsafeCSS(style), unsafeCSS(control)];

  constructor() {
    super();
  }

  protected firstUpdated() {
    this.className = useStore().isCustomDisplay() ? `information-control-custom-${useStore().getTargetBoxSize()}` : 'information-control';
  }

  render() {
    return html`<div class="ol-unselectable ol-control information-control" style="position: absolute">
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
    informationIsOpen: Boolean = true;

    constructor() {

        const element = document.createElement('information-control-button') as InformationControlButton;

        super({
          element: element,
        });
        element.addEventListener('click', this.toogleInformationBox.bind(this), false);
        window.addEventListener('close-information-box', this.closeInformationBox.bind(this), false);
        this.openInformationBox();
      }

      closeInformationBox() {
        GeocityEvent.sendEvent('clear-information-box-interval', {});
        useStore().getMap().getControls().forEach((control) => {
            if (control instanceof InformationBoxControl) {
              useStore().getMap().removeControl(control);
            }
        });
        this.informationIsOpen = false;
      }

      openInformationBox() {
        useStore().getMap().addControl(new InformationBoxControl());
        this.informationIsOpen = true;
      }
    
      toogleInformationBox() {
        this.informationIsOpen ? this.closeInformationBox() : this.openInformationBox();
      }
    }