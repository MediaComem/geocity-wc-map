import { Map } from 'ol';
import Control from "ol/control/Control";
import InformationElement from '../types/information-element';
export default class InformationControl extends Control {
    map: Map;
    theme: string;
    information: InformationElement;
    informationIsOpen: Boolean;
    timeout: any;
    constructor(map: Map, information: InformationElement, theme: string, customPosition: boolean);
    closeInformationBox(): void;
    openInformationBox(): void;
    toogleInformationBox(): void;
}
