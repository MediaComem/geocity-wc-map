import { Map } from 'ol';
import Control from "ol/control/Control";
import InformationElement from '../types/information-element';
import OpenLayersUtils from '../utils/openlayers-utils';
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
      }
    
      toogleInformationBox() {
        if (OpenLayersUtils.informationIsOpen) {
            OpenLayersUtils.closeInformationBox(this.map);
        } else {
            this.map.addControl(new InformationBox(this.map, this.information));
        }
        OpenLayersUtils.informationIsOpen = !OpenLayersUtils.informationIsOpen;
      }
    }