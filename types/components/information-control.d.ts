import { Map } from 'ol';
import Control from "ol/control/Control";
import InformationElement from '../types/information-element';
export default class InformationControl extends Control {
    map: Map;
    information: InformationElement;
    informationIsOpen: Boolean;
    timout: any;
    constructor(map: Map, information: InformationElement);
    closeInformationBox(): void;
    openInformationBox(): void;
    toogleInformationBox(): void;
}
