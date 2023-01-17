import { Map } from 'ol';
import Control from "ol/control/Control";
import InformationElement from '../types/information-element';
export default class InformationControl extends Control {
    map: Map;
    information: InformationElement;
    informationIsOpen: Boolean;
    constructor(map: Map, information: InformationElement);
    closeInformationBox(): void;
    toogleInformationBox(): void;
}
