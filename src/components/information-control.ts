import { Map } from 'ol';
import Control from "ol/control/Control";
import InformationElement from '../types/information-element';
import InformationBox from './information-box';

export default class InformationControl extends Control {
    map:Map;
    information: InformationElement;
    informationIsOpen: Boolean = false;

    constructor(map: Map, information: InformationElement) {
        const button = document.createElement('button');
        button.innerHTML = 'i';
    
        const element = document.createElement('div');
        element.className = 'information-control ol-unselectable ol-control';
        element.appendChild(button);
    
        super({
          element: element,
        });
        this.map = map;
        this.information = information;
        button.addEventListener('click', this.toogleInformationBox.bind(this), false);
        window.addEventListener('close-information-box', this.closeInformationBox.bind(this), false);
      }

      closeInformationBox() {
        this.map.getControls().forEach((control) => {
            if (control instanceof InformationBox) {
              this.map.removeControl(control);
            }
        });
        this.informationIsOpen = !this.informationIsOpen;
      }
    
      toogleInformationBox() {
        if (this.informationIsOpen) {
            this.closeInformationBox();
        } else {
            this.map.addControl(new InformationBox(this.map, this.information));
            this.informationIsOpen = !this.informationIsOpen;
        }
      }
    }