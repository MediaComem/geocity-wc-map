import Control from "ol/control/Control";
import Map from "ol/Map";
import InformationElement from '../types/information-element';
export default class InformationControl extends Control {
    map: Map;
    information: InformationElement;
    informationIsOpen: Boolean;
    constructor(map: Map, information: InformationElement);
    closeInformationBox(): void;
    openInformationBox(): void;
    toogleInformationBox(): void;
}
